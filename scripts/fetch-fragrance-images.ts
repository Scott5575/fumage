/**
 * scripts/fetch-fragrance-images.ts
 *
 * For each fragrance without an imageUrl:
 *   1. Search Fragrantica by name + house
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
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import * as cheerio from "cheerio";

// ── Config ─────────────────────────────────────────────────────────────────────

const BUCKET = "fragrance-images";
const DELAY_MS = 2500; // between Fragrantica requests
const MAX_RETRIES = 2;
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

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

function fetchUrl(url: string): Promise<{ body: string; finalUrl: string }> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const mod = parsedUrl.protocol === "https:" ? https : http;

    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    };

    const req = mod.get(options, (res) => {
      // Follow redirects
      if (
        res.statusCode &&
        res.statusCode >= 300 &&
        res.statusCode < 400 &&
        res.headers.location
      ) {
        const redirectUrl = res.headers.location.startsWith("http")
          ? res.headers.location
          : `${parsedUrl.protocol}//${parsedUrl.hostname}${res.headers.location}`;
        resolve(fetchUrl(redirectUrl));
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }

      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ body, finalUrl: url }));
    });

    req.on("error", reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

function fetchBinary(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const mod = parsedUrl.protocol === "https:" ? https : http;

    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      headers: { "User-Agent": USER_AGENT },
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

// ── Fragrantica search ─────────────────────────────────────────────────────────

async function findFragranticaImageUrl(
  name: string,
  house: string
): Promise<string | null> {
  const query = encodeURIComponent(`${name} ${house}`);
  const searchUrl = `https://www.fragrantica.com/search/?query=${query}`;

  let searchHtml: string;
  try {
    const { body } = await fetchUrl(searchUrl);
    searchHtml = body;
  } catch (err) {
    throw new Error(`Search request failed: ${(err as Error).message}`);
  }

  const $ = cheerio.load(searchHtml);

  // Fragrantica search results: links to /perfume/House/Name-year-id.html
  let fragrancePageUrl: string | null = null;

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") ?? "";
    if (href.match(/\/perfume\/[^/]+\/[^/]+-\d+\.html/)) {
      fragrancePageUrl = href.startsWith("http")
        ? href
        : `https://www.fragrantica.com${href}`;
      return false; // break
    }
  });

  if (!fragrancePageUrl) {
    return null;
  }

  await sleep(1000);

  let pageHtml: string;
  try {
    const { body } = await fetchUrl(fragrancePageUrl);
    pageHtml = body;
  } catch (err) {
    throw new Error(
      `Fragrance page request failed: ${(err as Error).message}`
    );
  }

  const $page = cheerio.load(pageHtml);
  const ogImage = $page('meta[property="og:image"]').attr("content") ?? null;

  return ogImage;
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
    select: { id: true, slug: true, name: true, house: { select: { name: true } } },
    orderBy: { popularityScore: "desc" },
  });

  const target = fragrances.slice(0, LIMIT);
  console.log(`Processing ${target.length} fragrance(s)…\n`);

  const results = { ok: 0, skipped: 0, failed: 0 };
  const failures: string[] = [];

  for (let i = 0; i < target.length; i++) {
    const f = target[i];
    const prefix = `[${i + 1}/${target.length}] ${f.house.name} — ${f.name}`;

    let imageSourceUrl: string | null = null;
    let attempt = 0;

    while (attempt <= MAX_RETRIES && !imageSourceUrl) {
      try {
        imageSourceUrl = await findFragranticaImageUrl(f.name, f.house.name);
      } catch (err) {
        attempt++;
        if (attempt > MAX_RETRIES) {
          console.error(`  ${prefix}: FAILED — ${(err as Error).message}`);
          results.failed++;
          failures.push(`${f.slug}: ${(err as Error).message}`);
          break;
        }
        await sleep(3000);
      }
    }

    if (!imageSourceUrl) {
      if (attempt === 0) {
        console.log(`  ${prefix}: no image found on Fragrantica`);
        results.skipped++;
      }
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

  console.log(`\nDone. ok=${results.ok} skipped=${results.skipped} failed=${results.failed}`);

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
