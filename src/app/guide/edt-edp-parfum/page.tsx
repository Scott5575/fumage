import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EDT, EDP, Parfum — Fumage Guide",
  description: "The difference between Eau de Toilette, Eau de Parfum, and Parfum — and how to choose the right concentration.",
};

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-amber-500/30 pl-6 my-10">
      <p className="font-serif text-xl italic font-light text-stone-300 leading-relaxed">
        {children}
      </p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-4 flex items-center gap-3">
      {children}
      <span className="flex-1 h-px bg-stone-800 max-w-[60px]" />
    </p>
  );
}

const CONCENTRATION = [
  { label: "Parfum",         pct: "20–40%",  hours: "8–12+ hrs",  depth: "bg-amber-900/60",  desc: "Highest concentration. Oily, rich, applied by dabbing. Low projection, high intimacy. The most expensive to produce — and not always the right choice." },
  { label: "Eau de Parfum",  pct: "15–20%",  hours: "6–8 hrs",    depth: "bg-amber-900/45",  desc: "The sweet spot for most people. Good projection, sprayable, dominant in modern niche perfumery. Usually the richest expression of a fragrance." },
  { label: "Eau de Toilette", pct: "5–15%",  hours: "3–5 hrs",    depth: "bg-amber-900/30",  desc: 'The classic format. Lighter, brighter, airier. Excellent for warm weather and office. Not “weaker” — just different in character.' },
  { label: "Eau de Cologne",  pct: "2–5%",   hours: "2–3 hrs",    depth: "bg-amber-900/18",  desc: "Light and fresh. The original format, invented in Cologne, Germany in the early 1700s. Often used as a post-shower splash." },
  { label: "Eau Fraîche",     pct: "1–3%",   hours: "< 2 hrs",    depth: "bg-amber-900/10",  desc: "Mostly water. Very light and brief — more of a scented body splash than a true fragrance." },
];

const COMPARISONS = [
  {
    verdict: "EDT",
    name: "Acqua di Giò",
    house: "Giorgio Armani",
    slug: "giorgio-armani-acqua-di-gi-edt",
    body: "The original EDT is bright and properly aquatic. The EDP adds a heavy sweetness many find cloying. The EDT is what made this fragrance iconic.",
  },
  {
    verdict: "EDT",
    name: "Terre d'Hermès",
    house: "Hermès",
    slug: "herm-s-terre-d-herm-s-edt",
    body: "The EDT's mineral-woody balance is a masterpiece. The EDP leans darker and woodier — the delicate grapefruit-and-flint balance is harder to find in the thicker version.",
  },
  {
    verdict: "EDP",
    name: "Sauvage",
    house: "Dior",
    slug: "dior-sauvage-edp",
    body: "The EDT is good. The EDP is considerably better — smoother, warmer, more complex. The ambroxan base is better integrated. One of the clearest upgrade cases in mainstream fragrance.",
  },
  {
    verdict: "EDP",
    name: "L'Homme YSL",
    house: "Yves Saint Laurent",
    slug: "yves-saint-laurent-l-homme-ysl",
    body: "The EDT is forgettable. The EDP adds spicy warmth with ginger and vetiver reading clearly where they barely register in the lighter version.",
  },
];

const MYTHS = [
  {
    myth:    "Parfum is always the best version of a fragrance.",
    reality: "Parfum is richest, not always most appropriate. A heavy Parfum concentration of a light summer citrus is like wearing a wool coat on the beach. Format should match the fragrance's intention and your context.",
  },
  {
    myth:    "EDT is a budget version for people who can't afford EDP.",
    reality: 'EDT is a legitimate format with specific strengths. Many perfumers consider the EDT their definitive expression. Thinking of EDT as "EDP-lite" costs you great fragrances.',
  },
  {
    myth:    "More sprays fixes low longevity.",
    reality: "Over-applying doesn't extend longevity — it makes the opening overwhelming before it fades at the same rate. Moisturise skin first, apply to pulse points, or layer with an unscented lotion instead.",
  },
  {
    myth:    "EDP and EDT of the same fragrance smell identical, just different intensities.",
    reality: "They're frequently different formulas with different ingredient balances. Smell both before assuming. The difference is sometimes subtle, sometimes dramatic.",
  },
];

const CHEATSHEET = [
  { when: "Hot weather, active use, or office-safe clean projection needed", buy: "EDT" },
  { when: "All-day wear with good projection — the safe default",            buy: "EDP" },
  { when: "Intimate, personal, lasting all day without broadcasting",         buy: "Parfum" },
  { when: "Summer, post-shower, something light and brief",                   buy: "EDC / Eau Fraîche" },
  { when: "EDT version is historically the superior formula",                 buy: "EDT specifically" },
  { when: "Heavy oriental or amber in cool weather or evening",               buy: "EDP or Parfum" },
];

export default function EdtEdpParfumPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">

      {/* Back */}
      <Link
        href="/guide"
        className="text-[10px] uppercase tracking-[0.2em] text-stone-600 hover:text-stone-400 transition-colors block mb-12"
      >
        ← Guide
      </Link>

      {/* Masthead */}
      <div className="mb-16 pb-16 border-b border-stone-800/60">
        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-6">
          The Art of Fragrance
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 leading-[1.08] mb-6">
          EDT, EDP, Parfum:<br />
          <em className="italic text-amber-400">What the Letters Actually Mean</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          Every fragrance bottle has a concentration label. Most people ignore it. Here&apos;s why that&apos;s a mistake — and how understanding it will immediately make you a smarter buyer.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          Concentration, longevity, projection, and the reformulation problem · 11 min read
        </p>
      </div>

      {/* Intro */}
      <div className="mb-12">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          Walk into any fragrance counter and you&apos;ll notice the same names appear in multiple versions. Dior Sauvage EDT. Dior Sauvage EDP. Dior Sauvage Parfum. Three bottles, three prices, same name on the front. The instinct is to assume they&apos;re basically the same thing in different strengths — and that stronger is better.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          That instinct is wrong. The concentration of a fragrance doesn&apos;t just determine how strong it is. It changes the character, the balance, and sometimes the entire personality of the scent. The EDP version is not simply the EDT turned up. It&apos;s a different formula, often with different ingredients, built around different priorities.
        </p>
      </div>

      {/* Concentration ladder */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Basics</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          The concentration <em className="italic text-amber-400/80">ladder</em>
        </h2>

        <div className="space-y-px">
          {CONCENTRATION.map(({ label, pct, hours, depth, desc }, i) => (
            <div
              key={label}
              className={[
                "flex gap-0 border border-stone-800 overflow-hidden",
                i === 0 ? "rounded-t" : i === CONCENTRATION.length - 1 ? "rounded-b" : "",
              ].join(" ")}
            >
              <div className={`w-28 flex-shrink-0 ${depth} border-r border-stone-800 p-4 flex flex-col justify-center`}>
                <p className="text-[10px] uppercase tracking-[0.12em] text-amber-400 font-medium leading-tight mb-1">{label}</p>
                <p className="text-[10px] text-amber-600/60">{pct}</p>
                <p className="text-[10px] text-stone-600 mt-0.5">{hours}</p>
              </div>
              <div className="flex-1 p-4 bg-stone-950/30">
                <p className="text-[11px] text-stone-400 font-light leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDP ≠ stronger EDT */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Key Insight</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Why EDP isn&apos;t just <em className="italic text-amber-400/80">stronger EDT</em>
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-6">
          When a brand releases both EDT and EDP versions, they rarely just dilute or concentrate the same formula — they reformulate. The EDP is usually built to be warmer, richer, and drier; the higher oil content allows heavier base note materials to shine. The EDT is typically brighter and more transparent. In practice, the EDP and EDT of a fragrance can smell genuinely different from the first spray.
        </p>

        <PullQuote>
          A great EDP isn&apos;t a great EDT amplified. It&apos;s a different argument made by the same perfumer.
        </PullQuote>

        {/* Comparison cards */}
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 pb-3 border-b border-stone-800/60 mb-0">
          When EDT wins — and when EDP wins
        </p>
        <div className="space-y-0">
          {COMPARISONS.map(({ verdict, name, house, slug, body }) => (
            <div
              key={name}
              className="flex gap-4 py-5 border-b border-stone-800/60 last:border-0"
            >
              <div className="flex-shrink-0 pt-0.5">
                <span className={[
                  "text-[10px] uppercase tracking-[0.12em] font-medium px-2 py-0.5 rounded",
                  verdict === "EDT"
                    ? "bg-sky-900/30 text-sky-400/80 border border-sky-800/40"
                    : "bg-amber-900/30 text-amber-400/80 border border-amber-800/40",
                ].join(" ")}>
                  {verdict} wins
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/fragrances/${slug}`}
                  className="text-stone-200 font-light text-sm hover:text-amber-400 transition-colors"
                >
                  {name}
                </Link>
                <span className="text-[10px] uppercase tracking-[0.12em] text-stone-600 ml-2">{house}</span>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed mt-1.5">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projection vs longevity */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Performance</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Projection vs. <em className="italic text-amber-400/80">longevity</em>
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          Longevity is how long a fragrance lasts on your skin. Projection (also called sillage) is how far it radiates into surrounding space. These don&apos;t always move together.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          {[
            { label: "Parfum",  lon: "Highest",  proj: "Low — sits on skin, evolves slowly" },
            { label: "EDP",     lon: "High",     proj: "Good — the sweet spot" },
            { label: "EDT",     lon: "Moderate", proj: "Freely projects in the first hour" },
          ].map(({ label, lon, proj }) => (
            <div key={label} className="border border-stone-800 rounded p-4 bg-stone-950/30">
              <p className="text-[10px] uppercase tracking-[0.15em] text-amber-500/70 mb-3">{label}</p>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-stone-600 mb-0.5">Longevity</p>
                  <p className="text-xs text-stone-300 font-light">{lon}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-stone-600 mb-0.5">Projection</p>
                  <p className="text-xs text-stone-400 font-light">{proj}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          Counterintuitively, Parfum often has the highest longevity but lower projection than EDP. The oil-heavy formula sits on skin and evolves slowly — but it doesn&apos;t radiate the way a sprayable alcohol-based EDP does. EDT often projects more freely in the first hour due to its high alcohol content, before fading more quickly.
        </p>
      </section>

      {/* Myths */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Common Mistakes</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          Common myths, <em className="italic text-amber-400/80">corrected</em>
        </h2>

        <div className="space-y-0">
          {MYTHS.map(({ myth, reality }) => (
            <div key={myth} className="py-5 border-b border-stone-800/60 last:border-0">
              <div className="flex gap-3 mb-2">
                <span className="text-[10px] uppercase tracking-[0.12em] text-rose-500/60 border border-rose-900/30 px-2 py-0.5 rounded flex-shrink-0 h-fit">
                  Myth
                </span>
                <p className="text-sm text-stone-400 font-light italic leading-relaxed">&ldquo;{myth}&rdquo;</p>
              </div>
              <div className="flex gap-3">
                <span className="text-[10px] uppercase tracking-[0.12em] text-emerald-500/60 border border-emerald-900/30 px-2 py-0.5 rounded flex-shrink-0 h-fit">
                  Reality
                </span>
                <p className="text-sm text-stone-400 font-light leading-relaxed">{reality}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cheat sheet */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Quick Reference</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          The practical <em className="italic text-amber-400/80">cheat sheet</em>
        </h2>
        <p className="text-sm text-stone-500 font-light mb-8">Buy this concentration when…</p>

        <div className="border border-stone-800 rounded overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {CHEATSHEET.map(({ when, buy }) => (
                <tr key={when} className="border-b border-stone-800/60 last:border-0">
                  <td className="px-4 py-3.5 text-[11px] text-stone-400 font-light leading-snug">{when}</td>
                  <td className="px-4 py-3.5 text-[10px] uppercase tracking-[0.12em] text-amber-500/80 font-medium whitespace-nowrap text-right">{buy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Reformulation */}
      <section className="mb-16">
        <SectionLabel>Advanced</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          The reformulation <em className="italic text-amber-400/80">problem</em>
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          Regulatory changes — primarily EU restrictions on allergens like oakmoss and IFRA guidelines — have forced brands to reformulate their fragrances repeatedly. The fragrance on the shelf today isn&apos;t always the fragrance that made the reputation. The community obsessively tracks production batch codes for this reason.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          You don&apos;t need to go deep on batch codes as a beginner — but knowing reformulation exists will save you from a specific kind of bewilderment when something smells different to what you expected.
        </p>

        <PullQuote>
          The fragrance on the shelf today isn&apos;t always the fragrance that made the reputation.
        </PullQuote>
      </section>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
