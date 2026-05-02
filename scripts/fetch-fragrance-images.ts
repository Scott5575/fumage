/**
 * scripts/fetch-fragrance-images.ts
 *
 * For each fragrance without an imageUrl:
 *   1. Search DuckDuckGo via Playwright (handles JS bot checks; never touches Fragrantica)
 *   2. Extract the numeric fragrance ID from the first Fragrantica result URL
 *   3. Fetch the clean bottle shot directly from fimgs.net (open CDN, no bot protection)
 *   4. Upload to Supabase Storage
 *   5. Update fragrance.imageUrl in the database
 *
 * Run (from project root):
 *   SUPABASE_SERVICE_ROLE_KEY=... npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/fetch-fragrance-images.ts
 *
 * Options:
 *   --dry-run   Print what would be fetched without writing to DB or Storage
 *   --limit N   Process only the first N fragrances (useful for testing)
 *   --slug S    Process only the fragrance with this slug
 *
 * Required env vars (in addition to those in .env):
 *   SUPABASE_SERVICE_ROLE_KEY — service role key for Storage writes
 */

import * as fs from "fs";
import * as path from "path";
import * as https from "https";
import * as http from "http";
import { URL } from "url";
import { chromium } from "playwright";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

// ── Config ─────────────────────────────────────────────────────────────────────

const BUCKET = "fragrance-images";
const MAX_RETRIES = 2;

// ── Args ───────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const limitIdx = args.indexOf("--limit");
const LIMIT = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : Infinity;
const slugIdx = args.indexOf("--slug");
const ONLY_SLUG = slugIdx !== -1 ? args[slugIdx + 1] : null;

// ── Clients ────────────────────────────────────────────────────────────────────

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error(
    "Missing env: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required."
  );
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

// ── DuckDuckGo search → Fragrantica ID ────────────────────────────────────────

async function findFragranticaImageUrl(
  page: import("playwright").Page,
  name: string,
  house: string
): Promise<string | null> {
  const query = encodeURIComponent(
    `site:fragrantica.com/perfume ${name} ${house}`
  );
  await page.goto(`https://duckduckgo.com/?q=${query}&ia=web`, {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  // Extract the first Fragrantica perfume URL from search results
  const fragUrl = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("a[href]"));
    for (const a of links) {
      const href = (a as HTMLAnchorElement).href;
      if (/fragrantica\.com\/perfume\/[^/]+\/[^/]+-\d+\.html/.test(href)) {
        return href;
      }
    }
    return null;
  });

  if (!fragUrl) return null;

  const idMatch = fragUrl.match(/-(\d+)\.html$/);
  if (!idMatch) return null;

  return `https://fimgs.net/mdimg/perfume/375x500.${idMatch[1]}.jpg`;
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
  console.log(`Mode: ${DRY_RUN ? "DRY RUN" : "LIVE"}`);

  if (!DRY_RUN) {
    await ensureBucket();
  }

  const where = ONLY_SLUG
    ? { slug: ONLY_SLUG }
    : { imageUrl: null as string | null };

  const fragrances = await prisma.fragrance.findMany({
    where,
    select: {
      id: true,
      slug: true,
      name: true,
      house: { select: { name: true } },
    },
    orderBy: { popularityScore: "desc" },
  });

  const target = fragrances.slice(0, LIMIT);
  console.log(`Processing ${target.length} fragrance(s)…\n`);

  const results = { ok: 0, skipped: 0, failed: 0 };
  const failures: string[] = [];

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    locale: "en-US",
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  // Warm up: navigate to DuckDuckGo home to establish session before searching
  await page.goto("https://duckduckgo.com/", {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await sleep(1500);

  try {
    for (let i = 0; i < target.length; i++) {
      const f = target[i];
      const prefix = `[${i + 1}/${target.length}] ${f.house.name} — ${f.name}`;

      let imageSourceUrl: string | null = null;
      let attempt = 0;

      while (attempt <= MAX_RETRIES && !imageSourceUrl) {
        try {
          imageSourceUrl = await findFragranticaImageUrl(
            page,
            f.name,
            f.house.name
          );
          break;
        } catch (err) {
          attempt++;
          if (attempt > MAX_RETRIES) {
            console.error(`  ${prefix}: FAILED — ${(err as Error).message}`);
            results.failed++;
            failures.push(`${f.slug}: ${(err as Error).message}`);
          } else {
            await sleep(3000);
          }
        }
      }

      if (attempt > MAX_RETRIES) {
        // already logged
      } else if (!imageSourceUrl) {
        console.log(`  ${prefix}: not found on Fragrantica`);
        results.skipped++;
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
    }
  } finally {
    await browser.close();
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
