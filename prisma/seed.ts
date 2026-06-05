/**
 * prisma/seed.ts
 * Fumage — The Gentleman's Atlas
 *
 * Seeds the database from fragrance_database.json (684 entries, V3 build).
 *
 * Run:  npx prisma db seed
 *   or: ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
 *
 * Safe to re-run: all inserts use upsert. Existing user data (reviews,
 * collections) is never touched. Pass --reset flag to wipe catalog tables first.
 */

import { PrismaClient, Prisma } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

// ── Types mirroring fragrance_database.json ───────────────────────────────────

interface RawFragrance {
  id: string;           // slug, e.g. "dior-sauvage"
  name: string;
  house: string;
  year: number | null;
  category: string;     // "Designer" | "Niche"
  family: string;       // lowercase: "aromatic", "woody", etc.
  subfamily: string;
  notes: {
    top: string[];
    heart: string[];    // ← JSON uses "heart", schema uses MIDDLE
    base: string[];
  };
  price: number;        // 1–5
  priceRaw: string;     // "$80–$160"
  performance: {
    longevity: number;
    projection: number;
    sillage: number;
  };
  seasons: string[];    // ["spring", "fall", "winter"]
  occasions: string[];  // ["casual", "business", "date"]
  timeOfDay: string[];  // ["day", "night"]
  availability: string;
  rating: string;       // "4.2/5"
  popularity: number;
  sentiment: string;
  hasDupes?: string;    // entry is the original; lists its clones (free-text, parsed below)
  isDupeOf?: string;    // entry is the clone; lists the originals it copies
  similar: string;      // comma-separated names
  unique: string;
  massAppeal: string;   // "Yes" | "No" | ""
  compliment: string;   // "Very High" | "High" | etc.
  trend: string;        // "Rising" | "Stable" | "Declining slightly"
  hype: string;         // "Underrated" | "Accurately rated" | etc.
  beginner: string;
  collector: string;
  source: string;
}

// ── Enum maps ──────────────────────────────────────────────────────────────────

const CATEGORY_MAP: Record<string, string> = {
  designer: "DESIGNER",
  niche:    "NICHE",
};

const FAMILY_MAP: Record<string, string> = {
  fresh:    "FRESH",
  aromatic: "AROMATIC",
  woody:    "WOODY",
  oriental: "ORIENTAL",
  gourmand: "GOURMAND",
  leather:  "LEATHER",
  citrus:   "CITRUS",
  chypre:   "CHYPRE",
};

const PRICE_TIER_MAP: Record<number, string> = {
  1: "BUDGET",
  2: "ACCESSIBLE",
  3: "MID",
  4: "PREMIUM",
  5: "ULTRA",
};

const AVAILABILITY_MAP: Record<string, string> = {
  "widely available": "WIDELY_AVAILABLE",
  "limited":         "LIMITED",
  "discontinued":    "DISCONTINUED",
  "seasonal":        "SEASONAL",
};

const COMPLIMENT_MAP: Record<string, string> = {
  "low":       "LOW",
  "moderate":  "MODERATE",
  "high":      "HIGH",
  "very high": "VERY_HIGH",
};

const TREND_MAP: Record<string, string> = {
  "rising":            "RISING",
  "stable":            "STABLE",
  "declining":         "DECLINING",
  "declining slightly":"DECLINING",
};

const HYPE_MAP: Record<string, string> = {
  "underrated":           "UNDERRATED",
  "accurately rated":     "ACCURATELY_RATED",
  "slightly overhyped":   "SLIGHTLY_OVERHYPED",
  "overhyped":            "OVERHYPED",
};

const SEASON_MAP: Record<string, string> = {
  spring: "SPRING",
  summer: "SUMMER",
  fall:   "FALL",
  winter: "WINTER",
};

const OCCASION_MAP: Record<string, string> = {
  casual:    "CASUAL",
  business:  "BUSINESS",
  date:      "DATE",
  special:   "SPECIAL",
  "night-out":"NIGHT_OUT",
};

const TIME_MAP: Record<string, string> = {
  day:     "DAY",
  night:   "NIGHT",
  all_day: "ALL_DAY",
};

// ── House tier inference ───────────────────────────────────────────────────────
// Manually curated — covers all 158 houses in the V3 dataset.

const HOUSE_TIER_MAP: Record<string, string> = {
  // ── Designer ──────────────────────────────────────────────────────────────
  "Dior":                "DESIGNER",
  "Chanel":              "DESIGNER",
  "Yves Saint Laurent":  "DESIGNER",
  "Giorgio Armani":      "DESIGNER",
  "Paco Rabanne":        "DESIGNER",
  "Jean Paul Gaultier":  "DESIGNER",
  "Versace":             "DESIGNER",
  "Hugo Boss":           "DESIGNER",
  "Calvin Klein":        "DESIGNER",
  "Dolce & Gabbana":     "DESIGNER",
  "Gucci":               "DESIGNER",
  "Prada":               "DESIGNER",
  "Hermès":              "DESIGNER",
  "Issey Miyake":        "DESIGNER",
  "Givenchy":            "DESIGNER",
  "Acqua di Parma":      "DESIGNER",
  "Montblanc":           "DESIGNER",
  "Viktor & Rolf":       "DESIGNER",
  "Ralph Lauren":        "DESIGNER",
  "Davidoff":            "DESIGNER",
  "Bvlgari":             "DESIGNER",
  "Cartier":             "DESIGNER",
  "Nautica":             "DESIGNER",
  "Diesel":              "DESIGNER",
  "Azzaro":              "DESIGNER",
  "Carolina Herrera":    "DESIGNER",
  "Thierry Mugler":      "DESIGNER",
  "Lacoste":             "DESIGNER",
  "Narciso Rodriguez":   "DESIGNER",
  "Tommy Hilfiger":      "DESIGNER",
  "Kenzo":               "DESIGNER",
  "John Varvatos":       "DESIGNER",
  "Abercrombie & Fitch": "DESIGNER",
  "Michael Kors":        "DESIGNER",
  "Cerruti":             "DESIGNER",
  "Salvatore Ferragamo": "DESIGNER",
  "Ferrari":             "DESIGNER",
  "Jaguar":              "DESIGNER",
  "Guy Laroche":         "DESIGNER",
  "Guerlain":            "DESIGNER",
  "Burberry":            "DESIGNER",
  "Dunhill":             "DESIGNER",
  "Valentino":           "DESIGNER",
  "Bentley":             "DESIGNER",
  "Police":              "DESIGNER",
  "Perry Ellis":         "DESIGNER",
  "Kenneth Cole":        "DESIGNER",
  "Loewe":               "DESIGNER",
  "Rochas":              "DESIGNER",
  "Lalique":             "DESIGNER",
  "Jo Malone":           "DESIGNER",
  "Bottega Veneta":      "DESIGNER",
  "Chloe":               "DESIGNER",
  "Chloé":               "DESIGNER",
  "Jil Sander":          "DESIGNER",
  "Antonio Puig":        "DESIGNER",
  "Pierre Cardin":       "DESIGNER",
  "Jacques Bogart":      "DESIGNER",
  "Lolita Lempicka":     "DESIGNER",
  "Giorgio Beverly Hills":"DESIGNER",
  "Caron":               "DESIGNER",
  "Aramis":              "DESIGNER",
  "Geoffrey Beene":      "DESIGNER",
  "Fabergé":             "DESIGNER",
  "Jovan":               "DESIGNER",
  "Van Cleef & Arpels":  "DESIGNER",
  "Estée Lauder":        "DESIGNER",
  "Clinique":            "DESIGNER",

  // ── Niche ──────────────────────────────────────────────────────────────────
  "Creed":                     "NICHE",
  "Tom Ford":                  "NICHE",
  "Parfums de Marly":          "NICHE",
  "Amouage":                   "NICHE",
  "Xerjoff":                   "NICHE",
  "Nishane":                   "NICHE",
  "Maison Francis Kurkdjian":  "NICHE",
  "Initio Parfums Privés":     "NICHE",
  "By Kilian":                 "NICHE",
  "Maison Margiela":           "NICHE",
  "Le Labo":                   "NICHE",
  "Byredo":                    "NICHE",
  "Diptyque":                  "NICHE",
  "Frédéric Malle":            "NICHE",
  "Serge Lutens":               "NICHE",
  "Mancera":                   "NICHE",
  "Montale":                   "NICHE",
  "Penhaligon's":              "NICHE",
  "Tiziana Terenzi":           "NICHE",
  "Histoires de Parfums":      "NICHE",
  "Orto Parisi":               "NICHE",
  "Nasomatto":                 "NICHE",
  "Escentric Molecules":       "NICHE",
  "Memo Paris":                "NICHE",
  "Mind Games":                "NICHE",
  "Stéphane Humbert Lucas":    "NICHE",
  "Ormonde Jayne":             "NICHE",
  "Liquides Imaginaires":      "NICHE",
  "Parfums de Nicolaï":        "NICHE",
  "Roja Dove":                 "NICHE",
  "Clive Christian":           "ULTRA_LUXURY",
  "Boadicea":                  "NICHE",
  "Ex Nihilo":                 "NICHE",
  "Vilhelm":                   "NICHE",
  "Heeley":                    "NICHE",
  "4160 Tuesdays":             "ARTISAN",
  "Imaginary Authors":         "ARTISAN",
  "Commodity":                 "NICHE",
  "Atelier Cologne":           "NICHE",
  "Tauer":                     "ARTISAN",
  "Beaufort London":           "ARTISAN",
  "Bogue Profumo":             "ARTISAN",
  "Slumberhouse":              "ARTISAN",
  "Bortnikoff":                "ARTISAN",
  "Atelier Materi":            "NICHE",
  "Parfums Dusita":            "NICHE",
  "Zoologist":                 "NICHE",
  "Papillon Artisan Perfumes": "ARTISAN",
  "Papillon":                  "ARTISAN",
  "Perfumer H":                "ARTISAN",
  "DS & Durga":                "ARTISAN",
  "Laboratorio Olfattivo":     "NICHE",
  "Malin + Goetz":             "NICHE",
  "Odin":                      "NICHE",
  "Pacific Perfumes":          "ARTISAN",
  "Bruno Fazzolari":           "ARTISAN",
  "Frapin":                    "NICHE",
  "Comme des Garçons":         "NICHE",
  "Officine Universelle Buly": "NICHE",
  "Helmut Lang":               "NICHE",
  "Atkinsons":                 "NICHE",
  "MPG":                       "NICHE",
  "Biehl":                     "ARTISAN",
  "Jacques Zolty":             "ARTISAN",
  "Lubin":                     "NICHE",
  "Shalini":                   "ARTISAN",

  // ── Budget Niche (ME / value houses) ─────────────────────────────────────
  "Lattafa":            "BUDGET_NICHE",
  "Armaf":              "BUDGET_NICHE",
  "Al Haramain":        "BUDGET_NICHE",
  "Afnan":              "BUDGET_NICHE",
  "Rasasi":             "BUDGET_NICHE",
  "Maison Alhambra":    "BUDGET_NICHE",
  "Orientica":          "BUDGET_NICHE",
  "Fragrance World":    "BUDGET_NICHE",
  "Paris Corner":       "BUDGET_NICHE",
  "Khadlaj":            "BUDGET_NICHE",
  "Abdul Samad Al Qurashi": "NICHE",
  "Nabeel":             "BUDGET_NICHE",
  "Al Rehab":           "BUDGET_NICHE",
  "Asdaaf":             "BUDGET_NICHE",
  "Widian":             "NICHE",
  "Ajmal":              "BUDGET_NICHE",
  "Swiss Arabian":      "BUDGET_NICHE",
  "Arabian Oud":        "BUDGET_NICHE",
  "Ard Al Zaafaran":    "BUDGET_NICHE",
  "Zimaya":             "BUDGET_NICHE",
  "Zara":               "BUDGET_NICHE",

  // ── Special cases ─────────────────────────────────────────────────────────
  "ELDO":    "NICHE",  // Etat Libre d'Orange
  "Antonio Lupi": "NICHE",
};

function inferHouseTier(houseName: string): string {
  return HOUSE_TIER_MAP[houseName] ?? "NICHE";
}

// ── Mapping helpers ───────────────────────────────────────────────────────────

function mapEnum<T extends string>(
  map: Record<string, string>,
  value: string,
  fallback?: string
): T | null {
  const key = value.toLowerCase().trim();
  const result = map[key];
  if (result) return result as T;
  if (fallback) return fallback as T;
  return null;
}

function parseRating(raw: string): number | null {
  // "4.2/5" → 4.2
  const match = raw.match(/^(\d+\.?\d*)\//);
  return match ? parseFloat(match[1]) : null;
}

// ── Dupe parsing ──────────────────────────────────────────────────────────────
//
// Input formats we handle:
//   "ASAD (Lattafa) ~$25–$35"
//   "Wajaha (Lattafa) ~$25–$35 | Fakhar Man (Lattafa) ~$20–$30"
//   "Direct target: Initio Oud for Greatness"
//   "Adjacent to PdM Layton but not a direct clone"
//   "Kilian Rolling in Love adjacent; no single close target"
//   "Original-ish — inspired by Kayali Vanilla 28"
//
// Returns an array of parsed dupe records.

interface ParsedDupe {
  dupeNameRaw: string;    // The name we'll try to match to a slug
  houseHint?: string;     // House name if parenthesised
  priceNote?: string;     // "~$25–$35"
  similarity: string;     // DupeSimilarity enum value
  notes?: string;         // Free-text context kept for humans
}

function parseDupeString(raw: string): ParsedDupe[] {
  if (!raw.trim()) return [];

  const results: ParsedDupe[] = [];

  // Split on | for multiple dupes
  const segments = raw.split("|").map((s) => s.trim());

  for (const seg of segments) {
    // Pattern: "Name (House) ~$25–$35"
    const structuredMatch = seg.match(
      /^(.+?)\s*\(([^)]+)\)\s*(~\$[\d–$,\-]+)?/
    );
    if (structuredMatch) {
      const dupeName = structuredMatch[1].trim();
      const houseHint = structuredMatch[2].trim();
      const priceNote = structuredMatch[3]?.trim();

      // Skip if it's clearly just a note with no fragrance name
      if (dupeName.length < 2) continue;

      results.push({
        dupeNameRaw: dupeName,
        houseHint,
        priceNote,
        similarity: "CLOSE",
        notes: seg,
      });
      continue;
    }

    // Pattern: "Direct target: Fragrance Name"
    const directTarget = seg.match(/direct target:\s*(.+)/i);
    if (directTarget) {
      results.push({
        dupeNameRaw: directTarget[1].trim(),
        similarity: "STRONG",
        notes: seg,
      });
      continue;
    }

    // Pattern: "Adjacent to X" or "X adjacent" or "X territory"
    const adjacentMatch = seg.match(
      /adjacent to\s+(.+?)(?:\s+but|$)|(.+?)\s+adjacent(?:\s|$)|(.+?)\s+territory/i
    );
    if (adjacentMatch) {
      const name = (adjacentMatch[1] || adjacentMatch[2] || adjacentMatch[3])?.trim();
      if (name && name.length > 2) {
        results.push({
          dupeNameRaw: name,
          similarity: "ADJACENT",
          notes: seg,
        });
      }
      continue;
    }

    // Pattern: "inspired by X"
    const inspiredMatch = seg.match(/inspired by\s+(.+)/i);
    if (inspiredMatch) {
      results.push({
        dupeNameRaw: inspiredMatch[1].trim(),
        similarity: "INSPIRED",
        notes: seg,
      });
      continue;
    }

    // Pattern: "Somewhat close to X and Y territory"
    const somewhatMatch = seg.match(/somewhat close to\s+(.+?)\s+(?:and\s+(.+?)\s+)?territory/i);
    if (somewhatMatch) {
      for (const name of [somewhatMatch[1], somewhatMatch[2]].filter(Boolean)) {
        results.push({
          dupeNameRaw: name!.trim(),
          similarity: "ADJACENT",
          notes: seg,
        });
      }
      continue;
    }

    // "No single close target" / "no direct target" → skip, nothing to link
    if (/no single|no clear|no direct/i.test(seg)) continue;

    // Fallback: if the segment is short and looks like a name, treat as ADJACENT
    if (seg.length < 80 && !seg.includes("no ") && !/^\d/.test(seg)) {
      // Strip trailing descriptors
      const cleaned = seg.replace(/\s*[-–]\s*[\w\s]+$/, "").trim();
      if (cleaned.length > 4) {
        results.push({
          dupeNameRaw: cleaned,
          similarity: "ADJACENT",
          notes: seg,
        });
      }
    }
  }

  return results;
}

// ── Similar fragrance parsing ─────────────────────────────────────────────────

function parseSimilarString(raw: string): string[] {
  if (!raw.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
}

// ── Slug → ID lookup helpers ──────────────────────────────────────────────────

// Aliases: common shorthand names → canonical fragrance slug
// Covers shortened references ("Chrome"), house-prefixes ("PdM Layton"),
// and dupe text variants ("Club de Nuit Intense Man" without concentration).
const NAME_ALIASES: Record<string, string> = {
  // Shortened names
  "chrome":                       "azzaro-azzaro-chrome",
  "chrome intense":               "azzaro-azzaro-chrome-intense",
  "terre d'hermès":               "hermes-terre-d-hermes-edt",
  "jazz club":                    "maison-margiela-replica-jazz-club",
  "amouage interlude man":        "amouage-interlude-man",
  "amouage jubilation xxv":       "amouage-jubilation-xxv-man",
  "jubilation xxv":               "amouage-jubilation-xxv-man",
  "sauvage edt":                  "dior-sauvage",
  "l'eau d'issey":                "issey-miyake-l-eau-d-issey-pour-homme",
  "cerruti 1881":                 "cerruti-cerruti-1881-pour-homme",
  // House-prefixed shorthands
  "pdm layton":                   "parfums-de-marly-layton",
  "creed aventus":                "creed-aventus",
  "xerjoff naxos":                "xerjoff-naxos",
  "armaf cdn intense":            "armaf-club-de-nuit-intense-man-edp",
  "armaf cdni":                   "armaf-club-de-nuit-intense-man-edp",
  "tf tuscan leather":            "tom-ford-tuscan-leather",
  "tf tobacco vanille":           "tom-ford-tobacco-vanille",
  "tf oud wood":                  "tom-ford-oud-wood",
  "roja aoud":                    "roja-dove-aoud-parfum",
  "nishane hacivat":              "nishane-hacivat",
  "memo irish leather":           "memo-paris-memo-paris-irish-leather",
  "khadlaj has gold":             "khadlaj-hareem-al-sultan-gold",
  "initio oud for greatness":     "initio-parfums-prives-oud-for-greatness",
  "initio ofg":                   "initio-parfums-prives-oud-for-greatness",
  // Dupe name variants (missing concentration suffix, etc.)
  "club de nuit intense man":     "armaf-club-de-nuit-intense-man-edp",
  "asad edp":                     "lattafa-asad",
  "a*men clone":                  "thierry-mugler-a-men",
  "ultra male clone":             "jean-paul-gaultier-ultra-male",
  "cool water inspired":          "davidoff-cool-water",
};

function buildNameSlugMap(raw: RawFragrance[]): Map<string, string> {
  // name (case-insensitive) → slug
  const map = new Map<string, string>();
  for (const f of raw) {
    map.set(f.name.toLowerCase(), f.id);
    // Also index "House Name" combination for disambiguation
    map.set(`${f.house.toLowerCase()} ${f.name.toLowerCase()}`, f.id);
  }
  // Inject static aliases (these override any catalog entry with the same key)
  for (const [alias, slug] of Object.entries(NAME_ALIASES)) {
    map.set(alias.toLowerCase(), slug);
  }
  return map;
}

function resolveSlug(
  rawName: string,
  houseHint: string | undefined,
  nameSlugMap: Map<string, string>
): string | null {
  const key = rawName.toLowerCase();
  // Try "House Name" first for precision
  if (houseHint) {
    const full = `${houseHint.toLowerCase()} ${key}`;
    if (nameSlugMap.has(full)) return nameSlugMap.get(full)!;
  }
  // Fall back to name only
  if (nameSlugMap.has(key)) return nameSlugMap.get(key)!;
  return null;
}

// ── Main seed ──────────────────────────────────────────────────────────────────

const prisma = new PrismaClient({
  log: process.env.SEED_VERBOSE ? ["query", "info", "warn"] : ["warn", "error"],
});

async function main() {
  console.log("🌿 Fumage seed starting…");
  const startTime = Date.now();

  // ── Load source data ──────────────────────────────────────────────────────
  const dataPath = path.resolve(__dirname, "data/fragrance_database.json");
  if (!fs.existsSync(dataPath)) {
    throw new Error(
      `Cannot find ${dataPath}. Copy fragrance_database.json to data/ first.`
    );
  }
  const raw: RawFragrance[] = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  console.log(`  Loaded ${raw.length} fragrances from JSON`);

  // ── Merge editorial extension files (fragrance_ext_2026_*.json) ───────────
  // Keeps post-launch editorial additions in their own version-controlled
  // files instead of hand-editing the 1.2 MB main database.
  const dataDir = path.resolve(__dirname, "data");
  const extFiles = fs
    .readdirSync(dataDir)
    .filter((f) => /^fragrance_ext_2026_.*\.json$/.test(f))
    .sort();
  for (const file of extFiles) {
    const ext: RawFragrance[] = JSON.parse(
      fs.readFileSync(path.join(dataDir, file), "utf-8")
    );
    raw.push(...ext);
    console.log(`  + Merged ${ext.length} fragrances from ${file}`);
  }

  const nameSlugMap = buildNameSlugMap(raw);

  // ── 1. Upsert Houses ──────────────────────────────────────────────────────
  console.log("\n📦 Step 1/6 — Houses");
  const houseNames = [...new Set(raw.map((f) => f.house))].sort();
  const houseIdMap = new Map<string, string>(); // name → db id

  for (const name of houseNames) {
    const tier = inferHouseTier(name);
    const house = await prisma.house.upsert({
      where: { name },
      create: {
        slug: name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
        name,
        tier: tier as any,
      },
      update: { tier: tier as any },
    });
    houseIdMap.set(name, house.id);
  }
  console.log(`  ✓ ${houseNames.length} houses upserted`);

  // ── 2. Upsert Notes ───────────────────────────────────────────────────────
  console.log("\n🌸 Step 2/6 — Notes");
  const allNoteNames = [
    ...new Set(
      raw.flatMap((f) => [
        ...f.notes.top,
        ...f.notes.heart,
        ...f.notes.base,
      ])
    ),
  ].sort();
  const noteIdMap = new Map<string, string>(); // name → db id

  // Batch in groups of 100 to avoid overwhelming the connection
  for (let i = 0; i < allNoteNames.length; i += 100) {
    const batch = allNoteNames.slice(i, i + 100);
    await Promise.all(
      batch.map(async (name) => {
        const note = await prisma.note.upsert({
          where: { name },
          create: {
            name,
            slug: name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, ""),
          },
          update: {},
        });
        noteIdMap.set(name, note.id);
      })
    );
  }
  console.log(`  ✓ ${allNoteNames.length} notes upserted`);

  // ── 3. Upsert Fragrances (core fields + junctions) ───────────────────────
  console.log("\n🧪 Step 3/6 — Fragrances");
  let fragCount = 0;
  const fragSlugIdMap = new Map<string, string>(); // slug → db id

  for (const entry of raw) {
    const houseId = houseIdMap.get(entry.house);
    if (!houseId) {
      console.warn(`  ⚠ Unknown house "${entry.house}" for "${entry.name}" — skipping`);
      continue;
    }

    // Map all enum fields (with safe fallbacks)
    const category = mapEnum(CATEGORY_MAP, entry.category) ?? "DESIGNER";
    const family   = mapEnum(FAMILY_MAP, entry.family) ?? "AROMATIC";
    const priceTier = (PRICE_TIER_MAP[entry.price] ?? "MID") as any;
    const availability = mapEnum(AVAILABILITY_MAP, entry.availability) ?? "WIDELY_AVAILABLE";
    const complimentFactor = mapEnum(COMPLIMENT_MAP, entry.compliment) as any ?? undefined;
    const trend = mapEnum(TREND_MAP, entry.trend) as any ?? undefined;
    const hypeRating = mapEnum(HYPE_MAP, entry.hype) as any ?? undefined;

    const fragrance = await prisma.fragrance.upsert({
      where: { slug: entry.id },
      create: {
        slug:            entry.id,
        name:            entry.name,
        houseId,
        year:            entry.year ?? undefined,
        category:        category as any,
        family:          family as any,
        subfamily:       entry.subfamily || undefined,
        priceTier,
        priceRange:      entry.priceRaw || undefined,
        longevity:       entry.performance.longevity || undefined,
        projection:      entry.performance.projection || undefined,
        sillage:         entry.performance.sillage || undefined,
        availability:    availability as any,
        communityRating: parseRating(entry.rating) ?? undefined,
        popularityScore: entry.popularity || undefined,
        sentiment:       entry.sentiment || undefined,
        uniqueChars:     entry.unique || undefined,
        massAppeal:      entry.massAppeal === "Yes" ? true
                       : entry.massAppeal === "No"  ? false
                       : undefined,
        complimentFactor,
        trend,
        hypeRating,
        beginnerNote:    entry.beginner || undefined,
        collectorNote:   entry.collector || undefined,
        dataSource:      entry.source || undefined,
      },
      update: {
        // Keep editorial metadata fresh on re-seed but don't overwrite
        // user-entered fields (ratings, reviews are separate models)
        houseId,
        name:            entry.name,
        year:            entry.year ?? undefined,
        category:        category as any,
        family:          family as any,
        subfamily:       entry.subfamily || undefined,
        priceTier,
        priceRange:      entry.priceRaw || undefined,
        longevity:       entry.performance.longevity || undefined,
        projection:      entry.performance.projection || undefined,
        sillage:         entry.performance.sillage || undefined,
        availability:    availability as any,
        communityRating: parseRating(entry.rating) ?? undefined,
        popularityScore: entry.popularity || undefined,
        sentiment:       entry.sentiment || undefined,
        uniqueChars:     entry.unique || undefined,
        massAppeal:      entry.massAppeal === "Yes" ? true
                       : entry.massAppeal === "No"  ? false
                       : undefined,
        complimentFactor,
        trend,
        hypeRating,
        beginnerNote:    entry.beginner || undefined,
        collectorNote:   entry.collector || undefined,
        dataSource:      entry.source || undefined,
      },
    });

    fragSlugIdMap.set(entry.id, fragrance.id);

    // ── FragranceNotes ────────────────────────────────────────────────────
    // Delete existing and re-insert (notes rarely change but content might)
    await prisma.fragranceNote.deleteMany({ where: { fragranceId: fragrance.id } });

    const noteInserts: Prisma.FragranceNoteCreateManyInput[] = [];

    for (const [idx, noteName] of entry.notes.top.entries()) {
      const noteId = noteIdMap.get(noteName);
      if (noteId) noteInserts.push({ fragranceId: fragrance.id, noteId, position: "TOP",    order: idx });
    }
    for (const [idx, noteName] of entry.notes.heart.entries()) {
      const noteId = noteIdMap.get(noteName);
      if (noteId) noteInserts.push({ fragranceId: fragrance.id, noteId, position: "MIDDLE", order: idx });
    }
    for (const [idx, noteName] of entry.notes.base.entries()) {
      const noteId = noteIdMap.get(noteName);
      if (noteId) noteInserts.push({ fragranceId: fragrance.id, noteId, position: "BASE",   order: idx });
    }

    const seenNotes = new Set<string>();
    const dedupedNoteInserts = noteInserts.filter(({ noteId, position }) => {
      const key = `${noteId}:${position}`;
      if (seenNotes.has(key)) return false;
      seenNotes.add(key);
      return true;
    });
    if (dedupedNoteInserts.length) {
      await prisma.fragranceNote.createMany({ data: dedupedNoteInserts });
    }

    // ── Season junctions ─────────────────────────────────────────────────
    await prisma.fragranceSeason.deleteMany({ where: { fragranceId: fragrance.id } });
    const seasonInserts: Prisma.FragranceSeasonCreateManyInput[] = entry.seasons
      .map((s) => mapEnum(SEASON_MAP, s))
      .filter(Boolean)
      .map((s) => ({ fragranceId: fragrance.id, season: s as any }));
    if (seasonInserts.length) {
      await prisma.fragranceSeason.createMany({ data: seasonInserts });
    }

    // ── Occasion junctions ───────────────────────────────────────────────
    await prisma.fragranceOccasion.deleteMany({ where: { fragranceId: fragrance.id } });
    const occasionInserts: Prisma.FragranceOccasionCreateManyInput[] = entry.occasions
      .map((o) => mapEnum(OCCASION_MAP, o))
      .filter(Boolean)
      .map((o) => ({ fragranceId: fragrance.id, occasion: o as any }));
    if (occasionInserts.length) {
      await prisma.fragranceOccasion.createMany({ data: occasionInserts });
    }

    // ── TimeOfDay junctions ──────────────────────────────────────────────
    await prisma.fragranceTimeOfDay.deleteMany({ where: { fragranceId: fragrance.id } });
    const timeInserts: Prisma.FragranceTimeOfDayCreateManyInput[] = entry.timeOfDay
      .map((t) => mapEnum(TIME_MAP, t))
      .filter(Boolean)
      .map((t) => ({ fragranceId: fragrance.id, timeOfDay: t as any }));
    if (timeInserts.length) {
      await prisma.fragranceTimeOfDay.createMany({ data: timeInserts });
    }

    fragCount++;
    if (fragCount % 100 === 0) {
      console.log(`  … ${fragCount}/${raw.length}`);
    }
  }
  console.log(`  ✓ ${fragCount} fragrances upserted`);

  // ── 4. Dupe relationships ─────────────────────────────────────────────────
  console.log("\n🔗 Step 4/6 — Dupe relationships");
  let dupeLinked = 0;
  let dupeSkipped = 0;
  const dupeInserts: Prisma.DupeRelationshipCreateManyInput[] = [];

  // hasDupes: entry is the original; field lists its clones
  for (const entry of raw) {
    if (!entry.hasDupes?.trim()) continue;

    const targetFragId = fragSlugIdMap.get(entry.id);
    if (!targetFragId) continue;

    const parsed = parseDupeString(entry.hasDupes);

    for (const dupe of parsed) {
      const sourceSlug = resolveSlug(dupe.dupeNameRaw, dupe.houseHint, nameSlugMap);
      const sourceFragId = sourceSlug ? fragSlugIdMap.get(sourceSlug) : null;

      if (!sourceFragId) { dupeSkipped++; continue; }
      if (sourceFragId === targetFragId) continue;

      dupeInserts.push({
        sourceId:   sourceFragId,
        targetId:   targetFragId,
        similarity: dupe.similarity as any,
        notes:      dupe.notes || undefined,
        priceNote:  dupe.priceNote || undefined,
      });
      dupeLinked++;
    }
  }

  // isDupeOf: entry is the clone; field lists the originals it copies
  for (const entry of raw) {
    if (!entry.isDupeOf?.trim()) continue;

    const sourceFragId = fragSlugIdMap.get(entry.id);
    if (!sourceFragId) continue;

    const parsed = parseDupeString(entry.isDupeOf);

    for (const dupe of parsed) {
      const targetSlug = resolveSlug(dupe.dupeNameRaw, dupe.houseHint, nameSlugMap);
      const targetFragId = targetSlug ? fragSlugIdMap.get(targetSlug) : null;

      if (!targetFragId) { dupeSkipped++; continue; }
      if (sourceFragId === targetFragId) continue;

      dupeInserts.push({
        sourceId:   sourceFragId,
        targetId:   targetFragId,
        similarity: dupe.similarity as any,
        notes:      dupe.notes || undefined,
        priceNote:  dupe.priceNote || undefined,
      });
      dupeLinked++;
    }
  }

  // Deduplicate (source+target pairs) before inserting
  const uniqueDupes = Array.from(
    new Map(dupeInserts.map((d) => [`${d.sourceId}:${d.targetId}`, d])).values()
  );

  // Delete existing and re-insert
  await prisma.dupeRelationship.deleteMany({});
  if (uniqueDupes.length) {
    await prisma.dupeRelationship.createMany({ data: uniqueDupes, skipDuplicates: true });
  }
  console.log(`  ✓ ${uniqueDupes.length} dupe relationships created`);
  console.log(`  ⊘ ${dupeSkipped} dupe names unresolved (not in catalog)`);

  // ── 5. Similar fragrance relationships ───────────────────────────────────
  console.log("\n🔀 Step 5/6 — Similar fragrance relationships");
  let simLinked = 0;
  let simSkipped = 0;
  const simPairs = new Map<string, Prisma.SimilarFragranceCreateManyInput>();

  for (const entry of raw) {
    if (!entry.similar.trim()) continue;

    const fragAId = fragSlugIdMap.get(entry.id);
    if (!fragAId) continue;

    const names = parseSimilarString(entry.similar);

    for (const simName of names) {
      const simSlug = resolveSlug(simName, undefined, nameSlugMap);
      const fragBId = simSlug ? fragSlugIdMap.get(simSlug) : null;

      if (!fragBId || fragBId === fragAId) {
        simSkipped++;
        continue;
      }

      // Enforce symmetric key: lower id first
      const [idA, idB] = [fragAId, fragBId].sort();
      const key = `${idA}:${idB}`;

      if (!simPairs.has(key)) {
        simPairs.set(key, { fragranceAId: idA, fragranceBId: idB });
        simLinked++;
      }
    }
  }

  await prisma.similarFragrance.deleteMany({});
  if (simPairs.size) {
    await prisma.similarFragrance.createMany({
      data: [...simPairs.values()],
      skipDuplicates: true,
    });
  }
  console.log(`  ✓ ${simPairs.size} similar relationships created`);
  console.log(`  ⊘ ${simSkipped} similar names unresolved`);

  // ── 6. Log the import ─────────────────────────────────────────────────────
  console.log("\n📋 Step 6/6 — Import log");
  await prisma.dataImportLog.create({
    data: {
      version:     "v3-niche",
      description: "Seed from fragrance_database.json — 684 entries (500 original + 80 ME + 104 niche)",
      count:       fragCount,
    },
  });
  console.log("  ✓ Import logged");

  // ── Summary ───────────────────────────────────────────────────────────────
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`
╔═══════════════════════════════════════╗
║       Fumage seed complete  ✓         ║
╠═══════════════════════════════════════╣
║  Houses:          ${String(houseNames.length).padEnd(20)} ║
║  Notes:           ${String(allNoteNames.length).padEnd(20)} ║
║  Fragrances:      ${String(fragCount).padEnd(20)} ║
║  Dupe relations:  ${String(uniqueDupes.length).padEnd(20)} ║
║  Similar pairs:   ${String(simPairs.size).padEnd(20)} ║
║  Duration:        ${String(elapsed + "s").padEnd(20)} ║
╚═══════════════════════════════════════╝
`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
