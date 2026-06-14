/**
 * scripts/fetch-fragrance-images.ts
 *
 * For each fragrance without an imageUrl:
 *   1. Search via the firecrawl REST API with name + house + year, restricted to
 *      site:fragrantica.com/perfume (firecrawl orchestrates engines server-side, so
 *      it isn't blocked the way scraped DuckDuckGo/Bing now are)
 *   2. Scan all Fragrantica result URLs and pick the first one whose slug matches our fragrance
 *      name (slug verification rejects wrong versions like "Oud Wood Intense" for "Oud Wood")
 *   3. Fetch the clean bottle shot directly from fimgs.net (open CDN, no bot protection)
 *   4. Upload to Supabase Storage
 *   5. Update fragrance.imageUrl in the database
 *
 * Run (from project root, with .env + .env.local loaded into the shell):
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/fetch-fragrance-images.ts
 *
 * Options:
 *   --dry-run   Print what would be fetched without writing to DB or Storage
 *   --limit N   Process only the first N fragrances (useful for testing)
 *   --slug S    Process only the fragrance with this slug
 *   --force     Re-process fragrances that already have an imageUrl (overwrites existing)
 *
 * Required env vars (in addition to those in .env):
 *   SUPABASE_SERVICE_ROLE_KEY — service role key for Storage writes
 *   FIRECRAWL_API_KEY         — firecrawl key for the search step
 */

import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import * as http from "http";
import { URL } from "url";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { findFragranticaId } from "./lib/fragrantica-match";

// ── Config ─────────────────────────────────────────────────────────────────────

const BUCKET = "fragrance-images";
const MAX_RETRIES = 2;

// ── Args ───────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const FORCE = args.includes("--force");
const limitIdx = args.indexOf("--limit");
const LIMIT = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : Infinity;
const slugIdx = args.indexOf("--slug");
const ONLY_SLUG = slugIdx !== -1 ? args[slugIdx + 1] : null;

// ── Clients ────────────────────────────────────────────────────────────────────

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const firecrawlKey = process.env.FIRECRAWL_API_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error(
    "Missing env: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required."
  );
  process.exit(1);
}

if (!firecrawlKey) {
  console.error("Missing env: FIRECRAWL_API_KEY is required for the search step.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

// ── Helpers ────────────────────────────────────────────────────────────────────

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchBinary(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const mod = parsedUrl.protocol === "https:" ? https : http;
    const req = mod.get(
      {
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname + parsedUrl.search,
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

// ── firecrawl search → Fragrantica ID ─────────────────────────────────────────

// POST a query to the firecrawl REST search API and return the result URLs.
// Throws on a non-2xx response (caller retries); 429 is surfaced so the retry
// loop backs off.
function firecrawlSearch(query: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query, limit: 8 });
    const req = https.request(
      {
        hostname: "api.firecrawl.dev",
        path: "/v2/search",
        method: "POST",
        headers: {
          Authorization: `Bearer ${firecrawlKey}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (c) => chunks.push(Buffer.from(c)));
        res.on("end", () => {
          if (res.statusCode === 429) {
            reject(new Error("firecrawl 429 rate limited"));
            return;
          }
          if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
            reject(new Error(`firecrawl HTTP ${res.statusCode}`));
            return;
          }
          try {
            const json = JSON.parse(Buffer.concat(chunks).toString());
            const web = Array.isArray(json?.data?.web)
              ? json.data.web
              : Array.isArray(json?.data)
              ? json.data
              : [];
            resolve(
              web
                .map((r: { url?: string }) => r.url)
                .filter((u: unknown): u is string => typeof u === "string")
            );
          } catch (e) {
            reject(e as Error);
          }
        });
      }
    );
    req.on("error", reject);
    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error(`firecrawl search timeout for "${query}"`));
    });
    req.write(body);
    req.end();
  });
}

async function findFragranticaImageUrl(
  name: string,
  house: string,
  _year: number | null
): Promise<string | null> {
  // NB: the release year is deliberately NOT added to the query. Many Fragrantica
  // perfume pages don't surface the year prominently, so including it pushes the
  // correct page out of the top results (verified: "Nouveau Monde", "Barakkat Rouge
  // 540"). Name + house alone rank the right page first.
  const query = `site:fragrantica.com/perfume ${name} ${house}`;

  const resultUrls = await firecrawlSearch(query);

  // Resolve the matching Fragrantica id via the token-set matcher (see
  // scripts/lib/fragrantica-match.ts), then build the open-CDN bottle-shot URL.
  const id = findFragranticaId(name, house, resultUrls);
  return id ? `https://fimgs.net/mdimg/perfume/375x500.${id}.jpg` : null;
}

// ── Storage ────────────────────────────────────────────────────────────────────

async function ensureBucket() {
  const { data: buckets } = await supabase.storage.listBuckets();
  const exists = buckets?.some((b) => b.name === BUCKET);
  if (!exists) {
    const { error } = await supabase.storage.createBucket(BUCKET, {
      public: true,
    });
    if (error) throw new Error(`Failed to create bucket: ${error.message}`);
    console.log(`Created Supabase Storage bucket: ${BUCKET}`);
  }
}

async function uploadImage(slug: string, imageData: Buffer): Promise<string> {
  const fileName = `${slug}.jpg`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, imageData, {
      contentType: "image/jpeg",
      upsert: true,
    });
  if (error) throw new Error(`Upload failed for ${slug}: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName);
  return data.publicUrl;
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Mode: ${DRY_RUN ? "DRY RUN" : "LIVE"}${FORCE ? " (force)" : ""}`);

  if (!DRY_RUN) {
    await ensureBucket();
  }

  const where = ONLY_SLUG
    ? { slug: ONLY_SLUG }
    : FORCE
    ? {}
    : { imageUrl: null as string | null };

  const fragrances = await prisma.fragrance.findMany({
    where,
    select: {
      id: true,
      slug: true,
      name: true,
      year: true,
      house: { select: { name: true } },
    },
    orderBy: { popularityScore: "desc" },
  });

  const target = fragrances.slice(0, LIMIT);
  console.log(`Processing ${target.length} fragrance(s)…\n`);

  const results = { ok: 0, skipped: 0, failed: 0 };
  const failures: string[] = [];

  for (let i = 0; i < target.length; i++) {
    const f = target[i];
    const prefix = `[${i + 1}/${target.length}] ${f.house.name} — ${f.name}${f.year ? ` (${f.year})` : ""}`;

    let imageSourceUrl: string | null = null;
    let attempt = 0;
    let hardFailed = false;

    while (attempt <= MAX_RETRIES && !imageSourceUrl) {
      try {
        imageSourceUrl = await findFragranticaImageUrl(
          f.name,
          f.house.name,
          f.year
        );
        break;
      } catch (err) {
        attempt++;
        if (attempt > MAX_RETRIES) {
          console.error(`  ${prefix}: FAILED — ${(err as Error).message}`);
          results.failed++;
          failures.push(`${f.slug}: ${(err as Error).message}`);
          hardFailed = true;
        } else {
          // back off harder on rate limits
          await sleep(/429/.test((err as Error).message) ? 8000 : 3000);
        }
      }
    }

    if (hardFailed) {
      // already logged
    } else if (!imageSourceUrl) {
      console.log(`  ${prefix}: not found / no slug match`);
      results.skipped++;
      failures.push(`${f.slug}: no matching Fragrantica URL found`);
    } else if (DRY_RUN) {
      console.log(`  ${prefix}: would fetch ${imageSourceUrl}`);
      results.ok++;
    } else {
      try {
        const imageData = await fetchBinary(imageSourceUrl);
        const publicUrl = await uploadImage(f.slug, imageData);
        await prisma.fragrance.update({
          where: { id: f.id },
          data: { imageUrl: publicUrl },
        });
        console.log(`  ${prefix}: ✓`);
        results.ok++;
      } catch (err) {
        console.error(`  ${prefix}: FAILED — ${(err as Error).message}`);
        results.failed++;
        failures.push(`${f.slug}: ${(err as Error).message}`);
      }
    }

    // be polite to the firecrawl API between searches
    await sleep(400);
  }

  console.log(
    `\nDone. ok=${results.ok} skipped=${results.skipped} failed=${results.failed}`
  );

  if (failures.length > 0) {
    const logPath = path.join(process.cwd(), "image-fetch-failures.log");
    fs.writeFileSync(logPath, failures.join("\n") + "\n");
    console.log(`Failures written to ${logPath}`);
  }

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
