/**
 * scripts/fetch-fragrance-images.ts
 *
 * For each fragrance without an imageUrl:
 *   1. Search DuckDuckGo via Playwright with name + house + year (avoids Fragrantica/Cloudflare)
 *   2. Scan all Fragrantica result URLs and pick the first one whose slug matches our fragrance
 *      name (slug verification rejects wrong versions like "Oud Wood Intense" for "Oud Wood")
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
 *   --force     Re-process fragrances that already have an imageUrl (overwrites existing)
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
const FORCE = args.includes("--force");
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

// ── Slug verification ──────────────────────────────────────────────────────────

// Words that Fragrantica appends to URL slugs but aren't part of the product name
// ("pour Homme", "pour Femme"). Do NOT include "de"/"le"/"la" — those appear inside
// real fragrance names (Le Male, Bleu de Chanel) and must not be stripped.
const IGNORABLE_URL_WORDS = new Set([
  "pour", "homme", "femme", "men", "women", "man", "woman",
]);

// Only strip true concentration abbreviations that appear differently in our DB vs Fragrantica URLs.
// Do NOT strip product-variant words like "parfum", "elixir", "intense", "absolu" —
// those distinguish separate products (Sauvage vs Sauvage Parfum, Oud Wood vs Oud Wood Intense).
const CONCENTRATION_TERMS = [
  "eau de parfum", "eau de toilette", "eau fraiche", "eau de cologne",
  "edp", "edt", "edc",
];

function normalizeForComparison(raw: string): string {
  let s = raw
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics (é→e, ò→o)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " "); // drop punctuation

  // Strip concentration terms
  for (const term of CONCENTRATION_TERMS) {
    s = s.replace(new RegExp(`\\b${term}\\b`, "g"), " ");
  }

  return s.replace(/\s+/g, " ").trim();
}

function urlMatchesFragrance(ourName: string, houseName: string, fragUrl: string): boolean {
  // Extract the fragrance name slug from the URL
  // URL pattern: /perfume/House-Name/Frag-Name-YEAR-ID.html or /Frag-Name-ID.html
  const urlMatch = fragUrl.match(/\/perfume\/[^/]+\/(.+?)-(\d+)\.html/);
  if (!urlMatch) return false;

  const urlNameSlug = urlMatch[1]; // e.g. "Oud-Wood-Intense" or "Sauvage-2015"

  // Strip the house name prefix from our product name if present.
  // Some DB entries store "Giorgio Armani Acqua di Giò Elixir" under house "Giorgio Armani",
  // but Fragrantica's URL slug is just "Acqua-di-Gio-Elixir".
  const houseNorm = normalizeForComparison(houseName);
  let effectiveName = normalizeForComparison(ourName);
  if (effectiveName.startsWith(houseNorm + " ")) {
    effectiveName = effectiveName.slice(houseNorm.length).trim();
  }

  // Use original normalized name for IGNORABLE word filtering (preserves words like
  // "homme"/"man" that belong to the product name, e.g. "Light Blue Pour Homme")
  const fullNorm = normalizeForComparison(ourName);
  const fullWords = new Set(fullNorm.split(" ").filter(Boolean));

  // Normalize the URL name: replace hyphens with spaces, strip year,
  // strip IGNORABLE words only when they do NOT appear in our product name
  let urlName = urlNameSlug.replace(/-/g, " ").toLowerCase();
  urlName = urlName.replace(/\b\d{4}\b/g, " "); // strip 4-digit years
  urlName = urlName
    .split(" ")
    .filter((w) => w && !(IGNORABLE_URL_WORDS.has(w) && !fullWords.has(w)))
    .join(" ");
  urlName = normalizeForComparison(urlName);

  // Helper: true if a and b match (equal, or one is a prefix of the other with no remaining words)
  function nameMatches(a: string, b: string): boolean {
    if (a === b) return true;
    if (a.startsWith(b + " ") || b.startsWith(a + " ")) {
      const extra = a.length > b.length ? a.slice(b.length).trim() : b.slice(a.length).trim();
      return extra === "";
    }
    return false;
  }

  // Try full name first, then house-stripped name.
  // Two-way attempt handles both cases:
  //   "Dior Homme Intense" → URL "Dior-Homme-Intense" → full name matches directly
  //   "Giorgio Armani Acqua di Gio Elixir" → URL "Acqua-di-Gio-Elixir" → stripped name matches
  return nameMatches(fullNorm, urlName) || (fullNorm !== effectiveName && nameMatches(effectiveName, urlName));
}

// ── DuckDuckGo search via Playwright → Fragrantica ID ─────────────────────────

async function findFragranticaImageUrl(
  page: import("playwright").Page,
  name: string,
  house: string,
  year: number | null
): Promise<string | null> {
  const queryParts = [`site:fragrantica.com/perfume`, name, house];
  if (year) queryParts.push(String(year));
  const query = encodeURIComponent(queryParts.join(" "));

  await page.goto(`https://duckduckgo.com/?q=${query}&ia=web`, {
    waitUntil: "networkidle",
    timeout: 30000,
  });

  // Collect all distinct Fragrantica perfume URLs from the results page
  const fragUrls: string[] = await page.evaluate(() => {
    const seen = new Set<string>();
    const urls: string[] = [];
    for (const a of Array.from(document.querySelectorAll("a[href]"))) {
      const href = (a as HTMLAnchorElement).href;
      if (
        /fragrantica\.com\/perfume\/[^/]+\/[^/]+-\d+\.html/.test(href) &&
        !seen.has(href)
      ) {
        seen.add(href);
        urls.push(href);
      }
    }
    return urls;
  });

  // Pick the first URL whose slug matches our fragrance name
  for (const url of fragUrls) {
    if (urlMatchesFragrance(name, house, url)) {
      const idMatch = url.match(/-(\d+)\.html$/);
      if (idMatch) {
        return `https://fimgs.net/mdimg/perfume/375x500.${idMatch[1]}.jpg`;
      }
    }
  }

  return null;
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

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    locale: "en-US",
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  // Establish a DuckDuckGo session before searching
  await page.goto("https://duckduckgo.com/", {
    waitUntil: "networkidle",
    timeout: 30000,
  });
  await sleep(1500);

  try {
    for (let i = 0; i < target.length; i++) {
      const f = target[i];
      const prefix = `[${i + 1}/${target.length}] ${f.house.name} — ${f.name}${f.year ? ` (${f.year})` : ""}`;

      let imageSourceUrl: string | null = null;
      let attempt = 0;

      while (attempt <= MAX_RETRIES && !imageSourceUrl) {
        try {
          imageSourceUrl = await findFragranticaImageUrl(
            page,
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
          } else {
            await sleep(3000);
          }
        }
      }

      if (attempt > MAX_RETRIES) {
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
