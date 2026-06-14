/**
 * scripts/backfill-from-candidates.ts
 *
 * Write-path for the RivalSearch (agent-driven) backfill. Discovery happens outside
 * this script: an agent runs RivalSearch for each fragrance and records the candidate
 * Fragrantica URLs. This script applies the SAME tested token-set matcher, then
 * fetches → uploads → updates, exactly like fetch-fragrance-images.ts.
 *
 * Input: scripts/candidates.json  → [{ slug, name, house, urls: string[] }]
 * Run with .env/.env.local loaded:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/backfill-from-candidates.ts [--dry-run]
 */
import * as fs from "fs";
import * as https from "https";
import * as http from "http";
import { URL } from "url";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { findFragranticaId } from "./lib/fragrantica-match";

const DRY_RUN = process.argv.includes("--dry-run");
const BUCKET = "fragrance-images";
const IN = "scripts/candidates.json";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const prisma = new PrismaClient();
const supabase = createClient(supabaseUrl, serviceKey);

interface Candidate {
  slug: string;
  name: string;
  house: string;
  urls: string[];
}

function fetchBinary(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const mod = u.protocol === "https:" ? https : http;
    const req = mod.get(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        },
      },
      (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          resolve(fetchBinary(res.headers.location));
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} fetching ${url}`));
          return;
        }
        const chunks: Buffer[] = [];
        res.on("data", (c) => chunks.push(Buffer.from(c)));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      }
    );
    req.on("error", reject);
    req.setTimeout(20000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

async function uploadImage(slug: string, data: Buffer): Promise<string> {
  const fileName = `${slug}.jpg`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, data, { contentType: "image/jpeg", upsert: true });
  if (error) throw new Error(`Upload failed for ${slug}: ${error.message}`);
  return supabase.storage.from(BUCKET).getPublicUrl(fileName).data.publicUrl;
}

async function main() {
  const candidates: Candidate[] = JSON.parse(fs.readFileSync(IN, "utf8"));
  console.log(`Mode: ${DRY_RUN ? "DRY RUN" : "LIVE"} — ${candidates.length} candidates\n`);

  const results = { ok: 0, skipped: 0, failed: 0 };
  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i];
    const prefix = `[${i + 1}/${candidates.length}] ${c.house} — ${c.name}`;
    const id = findFragranticaId(c.name, c.house, c.urls || []);
    if (!id) {
      console.log(`  ${prefix}: no slug match`);
      results.skipped++;
      continue;
    }
    const src = `https://fimgs.net/mdimg/perfume/375x500.${id}.jpg`;
    if (DRY_RUN) {
      console.log(`  ${prefix}: would fetch ${src}`);
      results.ok++;
      continue;
    }
    try {
      const data = await fetchBinary(src);
      const publicUrl = await uploadImage(c.slug, data);
      await prisma.fragrance.update({
        where: { slug: c.slug },
        data: { imageUrl: publicUrl },
      });
      console.log(`  ${prefix}: ✓`);
      results.ok++;
    } catch (err) {
      console.error(`  ${prefix}: FAILED — ${(err as Error).message}`);
      results.failed++;
    }
  }

  console.log(`\nDone. ok=${results.ok} skipped=${results.skipped} failed=${results.failed}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
