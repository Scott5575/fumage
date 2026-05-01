/**
 * scripts/fetch-fragrance-images.ts
 *
 * For each fragrance without an imageUrl:
 *   1. Search Fragrantica by name + house (via headless Chromium — bypasses bot protection)
 *   2. Follow the first result link to the fragrance page
 *   3. Extract the og:image URL (the official bottle shot)
 *   4. Download the image and upload to Supabase Storage
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
const DELAY_MS = 3000; // between Fragrantica requests
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

    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
    };

    const req = mod.get(options, (res) => {
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
        reject(new Error(`HTTP ${res.statusCode} fetching image ${url}`));
        return;
      }

      const chunks: Buffer[] = [];
      res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    });

    req.on("error", reject);
    req.setTimeout(20000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching image ${url}`));
    });
  });
}

// ── Fragrantica search (Playwright) ────────────────────────────────────────────

async function findFragranticaImageUrl(
  page: import("playwright").Page,
  name: string,
  house: string
): Promise<string | null> {
  const query = encodeURIComponent(`${name} ${house}`);
  const searchUrl = `https://www.fragrantica.com/search/?query=${query}`;

  await page.goto(searchUrl, { waitUntil: "load", timeout: 30000 });
  // Fragrantica renders search results client-side via AlgoliaSearch; 5s is enough to settle
  await sleep(5000);

  // Wait up to 5s for at least one perfume result link to appear
  let fragrancePageUrl: string | null = null;
  try {
    await page.waitForSelector('a[href*="/perfume/"]', { timeout: 5000 });
  } catch {
    // no results found within timeout
  }

  fragrancePageUrl = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll("a[href]"));
    for (const a of links) {
      const href = (a as HTMLAnchorElement).href;
      if (/\/perfume\/[^/]+\/[^/]+-\d+\.html/.test(href)) {
        return href;
      }
    }
    return null;
  });

  if (!fragrancePageUrl) return null;

  await sleep(500);

  // Click the first result link so Cloudflare sees a natural navigation from the search page
  const firstLink = page.locator(`a[href="${fragrancePageUrl}"], a[href*="${new URL(fragrancePageUrl).pathname}"]`).first();
  await firstLink.click();
  await page.waitForLoadState("load", { timeout: 30000 });
  await sleep(3000);

  const ogImage = await page.evaluate(() => {
    const meta = document.querySelector('meta[property="og:image"]');
    return meta ? (meta as HTMLMetaElement).content : null;
  });

  return ogImage ?? null;
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

  const browser = await chromium.launch({
    headless: false, // headful mode bypasses Cloudflare fingerprinting
    args: ["--disable-blink-features=AutomationControlled"],
  });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    locale: "en-US",
    viewport: { width: 1280, height: 800 },
  });
  // Hide automation signals that Cloudflare detects
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    // @ts-ignore
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Array;
    // @ts-ignore
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Promise;
    // @ts-ignore
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Symbol;
  });
  const page = await context.newPage();

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
        // already logged above
      } else if (!imageSourceUrl) {
        console.log(`  ${prefix}: no image found on Fragrantica`);
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

      if (i < target.length - 1) {
        await sleep(DELAY_MS);
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
