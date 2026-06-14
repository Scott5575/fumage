/**
 * scripts/test-matcher.ts — offline unit tests for the Fragrantica matcher.
 * No network / no credits. Run:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/test-matcher.ts
 *
 * Each case gives an ordered candidate list (as a real search would return it) and
 * the expected resolved id (or null). URLs use real ids/house-slugs where known;
 * flanker decoy ids are illustrative — the matcher only inspects house + name slug.
 */
import { findFragranticaId } from "./lib/fragrantica-match";

// F(houseSlug, "Name-Slug-id")
const F = (house: string, slug: string) =>
  `https://www.fragrantica.com/perfume/${house}/${slug}.html`;

interface Case {
  name: string;
  house: string;
  urls: string[];
  expect: string | null;
  why: string;
}

const CASES: Case[] = [
  {
    name: "Dylan Blue",
    house: "Versace",
    urls: [
      F("Versace", "Versace-Pour-Homme-Dylan-Blue-40031"),
      F("Versace", "Versace-Pour-Femme-Dylan-Blue-47459"),
      F("Versace", "Versace-Pour-Femme-Dylan-Blush-Pink-113091"),
      F("Versace", "Blue-Jeans-637"),
    ],
    expect: "40031",
    why: "house+gender prefix; pick homme (first), reject femme/blush/blue-jeans",
  },
  {
    name: "9 PM",
    house: "Afnan",
    urls: [
      F("Afnan", "9pm-65414"),
      F("Afnan", "9-PM-Night-Out-123313"),
      F("Afnan", "9-PM-Rebel-99238"),
      F("Afnan", "9PM-Elixir-111894"),
      F("Afnan", "9am-70706"),
    ],
    expect: "65414",
    why: "whitespace: '9 PM' ≡ '9pm'; reject Night Out / Rebel / Elixir / 9am",
  },
  {
    name: "Stronger with You",
    house: "Giorgio Armani",
    urls: [
      F("Giorgio-Armani", "Emporio-Armani-Stronger-With-You-45258"),
      F("Giorgio-Armani", "Emporio-Armani-Stronger-With-You-Freeze-58808"),
      F("Giorgio-Armani", "Emporio-Armani-Stronger-With-You-Intensely-50001"),
      F("Giorgio-Armani", "Emporio-Armani-Because-It-s-You-45257"),
    ],
    expect: "45258",
    why: "URL line 'Emporio Armani' ≠ house 'Giorgio Armani'; reject flankers",
  },
  {
    name: "Stronger with You Intensely",
    house: "Giorgio Armani",
    urls: [
      F("Giorgio-Armani", "Emporio-Armani-Stronger-With-You-45258"),
      F("Giorgio-Armani", "Emporio-Armani-Stronger-With-You-Intensely-50001"),
    ],
    expect: "50001",
    why: "the flanker IS our fragrance; pick Intensely, not the base",
  },
  {
    name: "YSL Libre Intense",
    house: "Yves Saint Laurent",
    urls: [
      F("Yves-Saint-Laurent", "Libre-Intense-66666"),
      F("Yves-Saint-Laurent", "Libre-55555"),
    ],
    expect: "66666",
    why: "DB embeds 'YSL'; URL omits brand; reject base 'Libre'",
  },
  {
    name: "Chanel Bleu de Chanel Eau de Toilette Intense",
    house: "Chanel",
    urls: [
      F("Chanel", "Bleu-de-Chanel-Eau-de-Toilette-Intense-77777"),
      F("Chanel", "Bleu-de-Chanel-Eau-de-Toilette-12345"),
      F("Chanel", "Bleu-de-Chanel-Eau-de-Parfum-23456"),
    ],
    expect: "77777",
    why: "concentration spelled out both sides; Intense flanker distinguishes EDT/EDP",
  },
  {
    name: "Oud Mood Gold",
    house: "Lattafa",
    urls: [
      F("Lattafa-Perfumes", "Oud-Mood-46814"),
      F("Lattafa-Perfumes", "Oud-Mood-Elixir-74234"),
      F("Lattafa-Perfumes", "Oud-Mood-Silver-72718"),
    ],
    expect: null,
    why: "no 'Gold' variant on Fragrantica; must NOT attach a wrong bottle",
  },
  {
    name: "Naxos",
    house: "Xerjoff",
    urls: [F("Xerjoff", "Naxos-19635"), F("Xerjoff", "Naxos-Aqua-90909")],
    expect: "19635",
    why: "simple exact; reject Aqua flanker",
  },
  {
    // house whose only distinctive token is "World" — must still verify, not blank out
    name: "Barakkat Rouge 540",
    house: "Fragrance World",
    urls: [
      F("Fragrance-World", "Barakkat-Rouge-540-Extrait-de-Parfum-107710"),
      F("Maison-Francis-Kurkdjian", "Baccarat-Rouge-540-33519"),
    ],
    expect: "107710",
    why: "match Barakkat (Fragrance World); reject MFK Baccarat (diff house + diff name)",
  },
  {
    // wrong-house precision guard: only other brands' "Aventador" exist
    name: "Aventador",
    house: "Maison Alhambra",
    urls: [
      F("Maison-Alhambra", "Avant-92621"),
      F("Maison-Viegas", "Aventador-134406"),
      F("Automobili-Lamborghini", "Lamborghini-Aventador-67634"),
    ],
    expect: null,
    why: "Maison Viegas / Lamborghini 'Aventador' are different houses — must reject",
  },
];

let pass = 0;
let fail = 0;
for (const c of CASES) {
  const got = findFragranticaId(c.name, c.house, c.urls);
  const ok = got === c.expect;
  if (ok) pass++;
  else fail++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${c.house} — ${c.name}\n      expect=${c.expect} got=${got}${ok ? "" : `   ⟵ ${c.why}`}`
  );
}
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
