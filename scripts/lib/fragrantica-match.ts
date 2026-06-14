/**
 * scripts/lib/fragrantica-match.ts
 *
 * Pure, testable logic for matching our DB fragrance (name + house) against a
 * Fragrantica perfume URL, and for picking the right URL from a search result list.
 *
 * Strategy: distinctive-token-set matching.
 *   - Normalize both the DB name and the URL's name slug (strip diacritics,
 *     punctuation, multi-word concentration terms).
 *   - Drop house tokens and a set of GENERIC tokens (gender, articles, single-word
 *     concentrations, a few brand-line/abbreviation words) from BOTH sides.
 *   - Compare the remaining tokens by sorted, separator-less concatenation. This is
 *     whitespace/order tolerant ("9 PM" ≡ "9pm") yet still rejects flankers
 *     ("Stronger With You" ≠ "Stronger With You Intensely") because a flanker token
 *     like "intensely" survives stripping and changes the key.
 *
 * Stripping the same tokens from both sides is safe (symmetric): it cannot turn a
 * base fragrance into a flanker or vice-versa.
 */

// Multi-word concentration phrases removed before tokenizing (longest first).
const CONCENTRATION_TERMS = [
  "eau de parfum",
  "eau de toilette",
  "eau de cologne",
  "eau fraiche",
];

// Single tokens dropped from both sides: gender, articles/connectives, single-word
// concentrations, and a few brand-line / brand-abbreviation words that appear on one
// side only (e.g. Fragrantica files "Stronger With You" under "Emporio Armani" while
// the designer house is "Giorgio Armani"; our DB stores "YSL Libre" while the URL is
// just "Libre"). Distinctive flanker words (intense, extreme, elixir, noir, gold,
// silver, sport, nuit, …) are deliberately NOT here.
const GENERIC = new Set([
  // gender
  "pour", "homme", "femme", "men", "women", "man", "woman", "for", "him", "her", "unisex",
  // articles / connectives / common prepositions
  "de", "du", "des", "la", "le", "les", "l", "di", "of", "the", "et", "and",
  // single-word concentrations / generic descriptors
  "eau", "parfum", "parfums", "toilette", "cologne", "colonia", "fraiche", "extrait",
  "edp", "edt", "edc", "perfume", "perfumes", "fragrance",
  // brand-line / brand-abbreviation noise that appears on only one side
  "emporio", "ysl",
]);

export function normalizeForComparison(raw: string): string {
  let s = raw
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics (é→e, ò→o)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " "); // drop punctuation → spaces

  for (const term of CONCENTRATION_TERMS) {
    s = s.replace(new RegExp(`\\b${term}\\b`, "g"), " ");
  }

  return s.replace(/\s+/g, " ").trim();
}

function tokenize(s: string): string[] {
  return normalizeForComparison(s).split(" ").filter(Boolean);
}

// Distinctive-token key: drop house + GENERIC tokens, sort, concatenate without
// separators (so "9 pm" and "9pm" collapse to the same key).
function coreKey(name: string, houseTokens: Set<string>): string {
  const core = tokenize(name).filter(
    (t) => !houseTokens.has(t) && !GENERIC.has(t)
  );
  return core.slice().sort().join("");
}

// Pull the house-slug, name-slug and numeric id out of a Fragrantica perfume URL.
// Pattern: /perfume/House-Name/Frag-Name-<id>.html (works for www + beta).
export function parseFragranticaUrl(
  fragUrl: string
): { houseSlug: string; nameSlug: string; id: string } | null {
  const m = fragUrl.match(/\/perfume\/([^/]+)\/(.+?)-(\d+)\.html/);
  if (!m) return null;
  return {
    houseSlug: m[1].replace(/-/g, " "),
    nameSlug: m[2].replace(/-/g, " "),
    id: m[3],
  };
}

// Generic house words that don't identify a specific maker, so they don't count as
// evidence that two house names refer to the same brand ("Maison" is shared by Maison
// Margiela, Maison Alhambra, Maison Viegas, … — matching on it would be meaningless).
const HOUSE_GENERIC = new Set([
  "maison", "perfumes", "perfume", "parfums", "parfum", "parfumeur", "parfumerie",
  "house", "atelier", "fragrances", "fragrance", "the", "de", "di", "of", "and",
  "les", "la", "le", "co", "ltd", "official",
]);

function houseSignificantTokens(houseName: string): Set<string> {
  return new Set(tokenize(houseName).filter((t) => !HOUSE_GENERIC.has(t)));
}

// True if the URL's house path shares a distinctive token with our house — guards
// against attaching another brand's same-named fragrance (e.g. Maison Viegas
// "Aventador" to Maison Alhambra "Aventador"). Margiela ("Maison Margiela" vs path
// "Maison Martin Margiela") still matches on the shared "margiela".
function houseMatchesUrl(ourHouse: string, urlHouseSlug: string): boolean {
  const ours = houseSignificantTokens(ourHouse);
  const theirs = houseSignificantTokens(urlHouseSlug);
  if (ours.size === 0 || theirs.size === 0) return false;
  for (const t of ours) if (theirs.has(t)) return true;
  return false;
}

export function urlMatchesFragrance(
  ourName: string,
  houseName: string,
  fragUrl: string
): boolean {
  const parsed = parseFragranticaUrl(fragUrl);
  if (!parsed) return false;
  if (!houseMatchesUrl(houseName, parsed.houseSlug)) return false;

  const houseTokens = new Set(tokenize(houseName));
  const ourKey = coreKey(ourName, houseTokens);
  if (!ourKey) return false;
  const urlKey = coreKey(parsed.nameSlug, houseTokens);
  return ourKey === urlKey;
}

/**
 * Given ordered Fragrantica URLs (search-relevance order), return the numeric id of
 * the first one whose name matches, or null. Taking the first match resolves
 * gender-ambiguous cases (a DB name without a gender token reduces to the same key as
 * both the "pour homme" and "pour femme" variants) toward the higher-ranked result,
 * which search relevance puts first.
 */
export function findFragranticaId(
  ourName: string,
  houseName: string,
  fragUrls: string[]
): string | null {
  const seen = new Set<string>();
  for (const url of fragUrls) {
    if (
      !/fragrantica\.com\/perfume\/[^/]+\/[^/]+-\d+\.html/.test(url) ||
      seen.has(url)
    ) {
      continue;
    }
    seen.add(url);
    if (urlMatchesFragrance(ourName, houseName, url)) {
      const parsed = parseFragranticaUrl(url);
      if (parsed) return parsed.id;
    }
  }
  return null;
}
