import type { Metadata } from "next";
import Dispatch, { type DispatchRelease } from "@/components/Dispatch";

export const metadata: Metadata = {
  title: "New Releases: May 2026 — The Fumage Dispatch",
  description:
    "The seven men's fragrance launches worth knowing from May 2026 — from Acqua di Parma's hand-pressed bergamot to Azzaro's 24-hour amber.",
};

const RELEASES: DispatchRelease[] = [
  {
    name: "Bergamotto La Spugnatura",
    house: "Acqua di Parma",
    slug: "acqua-di-parma-bergamotto-la-spugnatura",
    notes: "Bergamot, mandarin, bitter orange, soft woods",
    price: "~$230",
    verdict: "A limited La Caletta edition built on sea-sponge-pressed bergamot. Luminous and green — luxurious, if fleeting, like the cologne tradition it descends from.",
  },
  {
    name: "1 Million Night Elixir",
    house: "Paco Rabanne",
    slug: "rabanne-1-million-night-elixir",
    notes: "Mandarin, maple syrup, cinnamon, vanilla, amber",
    price: "$135–$170",
    verdict: "1 Million after dark: maple-syrup sweetness over warm amber. Loud, limited, and unapologetically a crowd-pleaser.",
  },
  {
    name: "Legend Elixir",
    house: "Montblanc",
    slug: "montblanc-legend-elixir",
    notes: "Lavender, cardamom, pink pepper, vanilla, benzoin",
    price: "$70–~$115",
    verdict: "An amber-fougère spin on Legend in a mirror-silver bottle. Polished, versatile, and the best value on this list.",
  },
  {
    name: "Grey Blazer",
    house: "D.S. & Durga",
    slug: "ds-durga-grey-blazer",
    notes: "Wool, green spices, tea, guaiac wood, tonka",
    price: "$225",
    verdict: "Smells like the herringbone blazer it's named for. Conceptual, tactile, and not for everyone — the most interesting bottle here.",
  },
  {
    name: "Forever Wanted Absolu",
    house: "Azzaro",
    slug: "azzaro-forever-wanted-absolu",
    notes: "Cardamom, whiskey, incense, vanilla, amber",
    price: "$155",
    verdict: "The most concentrated Wanted yet — boozy, sweet, and built for cold date nights. Apply sparingly; it lasts.",
  },
  {
    name: "Polo 67 Eau de Parfum Extreme",
    house: "Ralph Lauren",
    slug: "ralph-lauren-polo-67-extreme",
    notes: "Bergamot, pineapple, clary sage, leather, cedar",
    price: "~$89",
    verdict: "The line's signature pineapple, now over a leather-and-cedar base the original lacked. A real addition rather than a louder rerun — and the value pick of the month.",
  },
  {
    name: "Cool Elixir Safran Mineral",
    house: "Davidoff",
    slug: "davidoff-cool-elixir-safran-mineral",
    notes: "Apple, saffron, cedar",
    price: "~$70",
    verdict: "Saffron and cedar over a crisp apple top. A pleasant, affordable cool-weather woody — the value play, not the standout.",
  },
];

export default function DispatchMay2026Page() {
  return (
    <Dispatch
      monthLabel="May 2026"
      deck="Spring tipped into summer and the houses answered with woods, ambers, and a wave of intensified flankers. Seven launches worth knowing — fresh citrus for the daytime, boozy amber for the night, and one literal blazer."
      releases={RELEASES}
    />
  );
}
