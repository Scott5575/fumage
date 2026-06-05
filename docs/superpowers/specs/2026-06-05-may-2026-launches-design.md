# May 2026 Launches — Catalog Entries + Two Articles

**Date:** 2026-06-05
**Status:** Approved design, pre-implementation
**Branch:** `may-2026-launches`

## Goal

Two deliverables built from RivalSearch research on the best men's fragrance
launches of May 2026:

1. **Catalog** — add the seven May 2026 releases to the Fumage fragrance
   database (Supabase / Postgres via Prisma), then reindex search.
2. **Editorial** — publish two site articles in the established Fumage voice:
   an evergreen essay anchored by these launches, and a repeatable monthly
   new-releases roundup.

## Source data

Research was gathered via RivalSearch + Firecrawl on 2026-06-05. Note pyramids
are Fragrantica- or manufacturer-confirmed. US pricing ranges from
retailer-confirmed (Azzaro, Montblanc 30ml, D.S. & Durga, Polo 67) to
soft/unconfirmed (Rabanne, Acqua di Parma, Davidoff). One name correction
surfaced: the Davidoff is officially **Cool Elixir Safran Mineral** (Cool Elixir
collection), not "Cool Water Elixir Safran" as the T3 roundup called it.

## Part A — Database: seven catalog entries

### Mechanism

- New file `prisma/data/fragrance_ext_2026_may.json`, conforming to the existing
  `RawFragrance` interface in `prisma/seed.ts` (`notes.top/heart/base`,
  `price` 1–5, `priceRaw`, `performance`, `seasons/occasions/timeOfDay`,
  `availability`, `rating`, `popularity`, `sentiment`, `similar`, `unique`,
  `massAppeal`, `compliment`, `trend`, `hype`, `beginner`, `collector`,
  `source`).
- A small patch to `seed.ts main()`: after loading `fragrance_database.json`,
  glob/load any `fragrance_ext_2026_*.json` in `data/` and concatenate onto the
  `raw` array before house/note/fragrance processing. Keeps new data isolated
  and version-controlled rather than hand-editing the 1.2 MB main file.
- The seed is upsert-only and safe to re-run; user data (reviews, collections)
  is never touched. Do **not** pass `--reset`.
- After seeding: `npm run search:reindex` to push the new documents to
  self-hosted Meilisearch.

All seven map to **existing** house records — no new `House` rows. Rabanne maps
to the stored name "Paco Rabanne".

### Data-quality policy

Per decision: **full editorial estimate**. Confirmed facts (name, house, year
2026, note pyramid, family, price tier, availability) are populated from
research. Subjective fields (performance 1–10, `communityRating`,
`popularityScore`, `sentiment`, `beginnerNote`, `collectorNote`,
seasons/occasions/timeOfDay) are reasoned estimates from note structure and
early reviewer consensus. Every entry carries:

- `verified: false`
- `dataSource: "Editorial — May 2026 launches"`

so the estimates are flagged and upgradeable when real community data arrives.

### The seven

| # | Slug | Name | House | Family / subfamily | Price tier / priceRaw | Availability |
|---|------|------|-------|--------------------|------------------------|--------------|
| 1 | `acqua-di-parma-bergamotto-la-spugnatura` | Bergamotto La Spugnatura | Acqua di Parma | CITRUS / Citrus-Woody | PREMIUM / "~$230 (est)" | LIMITED |
| 2 | `rabanne-1-million-night-elixir` | 1 Million Night Elixir | Paco Rabanne | ORIENTAL / Amber Gourmand | MID / "$135–$170" | LIMITED |
| 3 | `montblanc-legend-elixir` | Legend Elixir | Montblanc | AROMATIC / Amber Fougère | MID / "$70 (30ml)–~$115 (100ml)" | WIDELY_AVAILABLE |
| 4 | `ds-durga-grey-blazer` | Grey Blazer | D.S. & Durga | WOODY / Woody-Spicy | PREMIUM / "$225" | LIMITED |
| 5 | `azzaro-forever-wanted-absolu` | Forever Wanted Absolu | Azzaro | ORIENTAL / Woody-Amber | MID / "$155 (100ml)" | WIDELY_AVAILABLE |
| 6 | `ralph-lauren-polo-67-extreme` | Polo 67 Eau de Parfum Extreme | Ralph Lauren | WOODY / Fruity-Woody | MID / "~$89 (125ml)" | WIDELY_AVAILABLE |
| 7 | `davidoff-cool-elixir-safran-mineral` | Cool Elixir Safran Mineral | Davidoff | WOODY / Woody-Spicy | ACCESSIBLE / "~$70 (est)" | WIDELY_AVAILABLE |

### Confirmed note pyramids

1. **Bergamotto La Spugnatura** — Top: bergamotto "spungato" DOP, mandarin,
   bitter orange, grapefruit. Heart: green/floral accents. Base: soft woods.
2. **1 Million Night Elixir** — Top: mandarin, bergamot, lemon. Heart: maple
   syrup, cinnamon (lavandin per Ulta). Base: vanilla, benzoin, labdanum.
3. **Legend Elixir** — Top: lavender, cardamom, bergamot, pink pepper.
   Base: Ambrofix™, vanilla, benzoin, labdanum. (Fougère-amber.)
4. **Grey Blazer** — Top: floral notes, tea, wool, spices. Heart: guaiac wood,
   mandarin, cyclamen. Base: lavender, carnation, tonka.
5. **Forever Wanted Absolu** — vanilla, whiskey, woody notes, incense, amber
   (cardamom, lavender per T3).
6. **Polo 67 EDP Extreme** — Top: bergamot, lemon, cardamom. Heart: pineapple,
   clary sage, geranium. Base: leather, cedar, vetiver, sandalwood.
7. **Cool Elixir Safran Mineral** — Top: apple accord. Heart: saffron accord.
   Base: cedarwood trio. (Woody-spicy.)

### `similar` links

Populate only where the target bottle is likely already in the catalog, to
avoid unmatched free-text:
- Polo 67 Extreme → "Polo 67"
- 1 Million Night Elixir → "1 Million", "1 Million Elixir"
- Forever Wanted Absolu → "Azzaro Wanted", "Forever Wanted Elixir" (if present)

Skip dupe relationships — none of these are clones.

## Part B — Article 1: evergreen essay

- **Working title:** "More of Everything: The Rise of the Intensified Flanker"
  (final two-part title written in-voice during implementation).
- **Slug:** `/guide/the-intensification`
- **Category:** `guide`, tag "Culture · Trends", ~13 min read.
- **Format:** hand-coded `src/app/guide/the-intensification/page.tsx` reusing the
  established component vocabulary (SectionLabel, PullQuote, Callout, bottle
  grid), masthead, "fin" close, and `metadata` export.

**Thesis.** Five of the seven May releases are concentration-escalation
flankers — Elixir, Absolu, Extreme, Parfum Intense. The essay treats
*intensification* as the defining commercial pattern of the moment: what drives
it (the presence-over-performance market, the amber-gourmand wave, margin on
"the same scent, darker"), what it does to a composition technically (boosted
fixatives, amplified base, compressed top), and how to buy intelligently — when
the intense version earns its premium versus when it is a recolored bottle.

**Differentiation / cross-links.** The existing `/guide/reformulations` piece
covers "the flanker flood" broadly and `/guide/presence-over-performance` covers
the market shift. This essay must stay narrowly on the *concentration-escalation*
sub-pattern and explicitly cross-link both so it complements rather than repeats
them. The bottle grid links to the new catalog entries at `/fragrances/[slug]`.

## Part C — Article 2: recurring roundup

- **Title:** "The Dispatch — May 2026"
- **Slug:** `/guide/dispatch-2026-05`
- **Format:** a new, repeatable monthly format. Tight masthead + one card per
  release (notes, price, one-line verdict, link to `/fragrances/[slug]`).
  Implemented as a small reusable layout component (e.g.
  `src/components/Dispatch.tsx` or a local module) so future months are cheap to
  produce.
- **Navigation:** add one new category to `GuideIndex.tsx` — "Dispatch" (or
  "New Releases") — extending the `Category` union type and the `FILTERS` array,
  and a `GUIDES` entry for this article.

## Integration

Both articles link inward to the seven new catalog pages, so Part A precedes the
article internal-linking work (the slugs above are the link targets).

## Sequencing & consent checkpoints

1. Write `fragrance_ext_2026_may.json` + patch `seed.ts`.
2. **Run seed against the database.** This writes to production Supabase
   (`DATABASE_URL`). Stop for explicit go-ahead. Option to target a Supabase
   branch first if preferred. Upsert-only; no `--reset`.
3. `npm run search:reindex`.
4. Build Article 1 + register in `GuideIndex.tsx`.
5. Build Dispatch component + Article 2 + new category/filter + register.
6. Verify: `tsc`/`next build` typecheck + visual check of both pages and the
   guide index.

## Open items / assumptions

- All seven included, though Bergamotto La Spugnatura and Grey Blazer are
  unisex-leaning; both appeared on the men's launch list and fit the catalog.
- US prices for Acqua di Parma, Rabanne, and Davidoff are soft estimates;
  `priceRaw` carries "(est)" and `verified: false` reflects this.
- Final essay title and exact section breakdown are set during implementation,
  matching the voice of `/guide/citrus-woody-accord`.
