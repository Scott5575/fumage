import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Presence Over Performance — Fumage Guide",
  description:
    "The performance era of men's fragrance is over. What the market has moved toward instead — and why presence is the harder thing to pull off.",
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

const CONCEPTS = [
  {
    name: "Skin Scent",
    tag:  "Personal, close-range, merged",
    body: "A fragrance that merges with the wearer's skin chemistry rather than projecting above it. Detectable up close, nearly invisible at distance. The goal is not to be scented but to be irresistible at proximity.",
  },
  {
    name: "Phantom Sillage",
    tag:  "Memory, impression, trace",
    body: "The trace a fragrance leaves in memory — a room, a coat, a car — even after the wearer has gone. Not loudness but impressiveness. Some of the most powerful fragrance experiences are not noticed in the moment but recalled vividly afterward.",
  },
  {
    name: "Proximity Effect",
    tag:  "Distance, revelation, depth",
    body: "The way a presence fragrance reveals different facets as the distance closes. A scent that smells unremarkable at arm's length but startlingly beautiful inches away is not a weak scent — it is a precision instrument.",
  },
  {
    name: "Olfactory Signature",
    tag:  "Identity, individuality, belonging",
    body: "The ideal: a scent that becomes inseparable from the person wearing it. Not 'he wears Sauvage' but 'he smells like him.' This is what separates a fragrance wardrobe from a fragrance identity.",
  },
];

const SHIFTS = [
  {
    num:  "01",
    name: "Genderless Architecture",
    body: "Unisex releases now dominate prestige launches. Florals and gourmands that once skewed feminine are being built for any wearer — the last partition in the category is coming down.",
  },
  {
    num:  "02",
    name: "Inverted Pyramids",
    body: "The classical structure — bold top notes fading to a quiet base — is being reversed. The most celebrated recent releases open quietly and grow warmer, stranger, more unexpected over hours.",
  },
  {
    num:  "03",
    name: "Refined Gourmand",
    body: "Demand for wearable sweetness has matured. Vanilla, tonka, and coffee accords with genuine structure — not confectionary flatness — have become the sophisticate's comfort scent.",
  },
  {
    num:  "04",
    name: "EDP as Default",
    body: "EDT concentrations are giving way to EDP and extrait formats. The priority is all-day evolution — a drydown as interesting as the opening, not a two-hour blast followed by silence.",
  },
  {
    num:  "05",
    name: "Boozy Complexity",
    body: "Cognac, rum, and whiskey-inspired accords are replacing generic amber warmth. Complexity over comfort: these scents reward the nose rather than soothe it.",
  },
  {
    num:  "06",
    name: "Layering Culture",
    body: "Combining body mists, scented oils, and EDP from the same olfactory family is now mainstream masculine behaviour — a fragrance wardrobe rather than a single signature, personalised by combination.",
  },
];

const PAIRS = [
  {
    perf_name: "Creed Aventus",
    perf_body: "Pineapple and smoke projected at maximum volume. Superb, iconic, built to announce.",
    pres_name: "Creed Silver Mountain Water",
    pres_body: "Aquatic clarity and bergamot at intimate throw. The same house, quieter and more precise.",
  },
  {
    perf_name: "Dior Sauvage",
    perf_body: "Ambroxan wall, lavender thrust, enormous projection. A fragrance as weather system.",
    pres_name: "Dior Homme Parfum",
    pres_body: "Iris, incense, cacao. Wears close. Reveals itself slowly. Startling at proximity.",
  },
  {
    perf_name: "Versace Eros",
    perf_body: "Mint-vanilla sweetness at maximum amplitude. Compliment-catching by design.",
    pres_name: "Chanel Sycomore",
    pres_body: "Vetiver, smoke, dry wood. Minimal projection, maximum character. Rewards patience.",
  },
  {
    perf_name: "Paco Rabanne 1 Million",
    perf_body: "Spiced amber at loudspeaker volume. Dominant, festive, impossible to miss.",
    pres_name: "Maison Margiela Replica Jazz Club",
    pres_body: "Rum, tobacco, vetiver — a room suggested, not reproduced. Worn for the wearer.",
  },
  {
    perf_name: "Tom Ford Noir",
    perf_body: "Dark spice broadcast widely. Confident, direct, leaves a trail.",
    pres_name: "Tom Ford Taormina Orange",
    pres_body: "Blood orange, oakmoss, sea salt — vibrant but controlled, present without dominating.",
  },
  {
    perf_name: "Creed Viking",
    perf_body: "Spice and woods in high projection. Designed to be smelled before you arrive.",
    pres_name: "Creed Wild Vetiver",
    pres_body: "English garden restraint — vetiver, rose, cedar — character over broadcast.",
  },
];

const PRESENCE_NOTES = [
  { label: "Vetiver",               core: true  },
  { label: "Iris",                  core: true  },
  { label: "Sandalwood",            core: true  },
  { label: "Cedarwood",             core: true  },
  { label: "Tonka Bean",            core: true  },
  { label: "Vanilla",               core: false },
  { label: "Amber",                 core: false },
  { label: "Oud (refined)",         core: false },
  { label: "Incense",               core: false },
  { label: "Coffee",                core: false },
  { label: "Rum accord",            core: false },
  { label: "Bergamot",              core: false },
  { label: "Sage",                  core: false },
  { label: "Neroli",                core: false },
  { label: "Soft patchouli",        core: false },
  { label: "Sea salt",              core: false },
  { label: "Rose (masc. context)",  core: false },
  { label: "Saffron",               core: false },
];

export default function PresenceOverPerformancePage() {
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
          Culture · Trends
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 leading-[1.08] mb-6">
          Presence Over<br />
          <em className="italic text-amber-400">Performance</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          The era of scent as territory is over. What the market, the perfumers, and the culture are
          all moving toward instead — and why presence is the harder thing to pull off.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          4 concepts, 6 defining shifts, 6 comparison pairs
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          There is a kind of fragrance that announces itself before you enter the room. It competes.
          It occupies airspace. It is built, above all else, to be noticed — and for a long time, this
          was simply what men&apos;s cologne was for. The cultural script was clear: project widely, leave a
          trail. Performance, in both senses of the word.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          That script is being rewritten. Across the market — from the niche atelier releases that set
          the tone to the designer houses finally catching up — the defining quality of the most
          celebrated men&apos;s fragrances today is not how far they carry, but what happens when someone
          leans close. The vocabulary has shifted accordingly: skin scent, proximity effect, phantom
          sillage. These are not euphemisms for weakness. They describe something more precise, and
          more difficult to achieve.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          The performance era — roughly the late 1990s through the mid-2010s — was governed by
          longevity, projection, and what the fragrance community calls &quot;beast mode.&quot; Creed Aventus
          offered the fantasy of the conqueror. Dior Sauvage gave every man access to projecting,
          lavender-ambroxan broadness that was impossible to ignore. These are not bad fragrances.
          They are superb fragrances for a set of values that is no longer ascendant.
        </p>
      </div>

      {/* The vocabulary */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Vocabulary</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          What presence <em className="italic text-amber-400/80">actually means</em>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CONCEPTS.map(({ name, tag, body }) => (
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <p className="text-stone-200 font-light text-sm mb-0.5">{name}</p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-amber-500/50 mb-3">{tag}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <PullQuote>
          Performance fragrances are built for territory. Presence fragrances are built for intimacy.
          One announces. The other reveals.
        </PullQuote>
      </section>

      {/* Six defining shifts */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Landscape</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Six <em className="italic text-amber-400/80">defining shifts</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          The move toward presence is not a single trend but a convergence of forces reshaping the
          market simultaneously.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SHIFTS.map(({ num, name, body }) => (
            <div key={num} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <p className="font-serif text-3xl font-light text-stone-800 leading-none mb-3">{num}</p>
              <p className="text-stone-200 font-light text-sm mb-2">{name}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison pairs */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Evidence</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Performance vs. presence:<br />
          <em className="italic text-amber-400/80">six bottles</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          The same broad character translated through two different philosophies. Neither column is
          inferior — but the direction of critical attention has shifted decisively to the right.
        </p>

        <div className="border border-stone-800 rounded overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-2 bg-stone-900/60">
            <div className="px-4 py-3 border-r border-stone-800">
              <p className="text-[10px] uppercase tracking-[0.15em] text-stone-600">Performance</p>
            </div>
            <div className="px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.15em] text-amber-500/70">Presence</p>
            </div>
          </div>

          {/* Rows */}
          {PAIRS.map(({ perf_name, perf_body, pres_name, pres_body }) => (
            <div key={perf_name} className="grid grid-cols-2 border-t border-stone-800/60">
              <div className="p-4 border-r border-stone-800/60 bg-stone-950/20">
                <p className="text-stone-400 text-[12px] font-light mb-1.5">{perf_name}</p>
                <p className="text-[11px] text-stone-600 font-light leading-relaxed">{perf_body}</p>
              </div>
              <div className="p-4 bg-amber-950/5">
                <p className="text-amber-300/60 text-[12px] font-light mb-1.5">{pres_name}</p>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">{pres_body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Notes + application */}
      <section className="mb-16">
        <SectionLabel>The Grammar</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Notes that define<br />
          <em className="italic text-amber-400/80">the moment</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-6">
          These notes appear repeatedly across the most critically successful presence-oriented
          releases. Highlighted ones are the defining core; the rest form the supporting grammar.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {PRESENCE_NOTES.map(({ label, core }) => (
            <span
              key={label}
              className={
                core
                  ? "text-[10px] border rounded px-3 py-1 border-amber-700/40 text-amber-400/70 bg-amber-900/10"
                  : "text-[10px] border rounded px-3 py-1 border-stone-800 text-stone-600"
              }
            >
              {label}
            </span>
          ))}
        </div>

        <PullQuote>
          The goal is not to be the most scented person in the room. It is to be the most memorable
          person to those who come close.
        </PullQuote>

        <div className="border border-stone-800/60 rounded p-5 bg-stone-950/20">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-2">On application</p>
          <p className="text-[11px] text-stone-500 font-light leading-relaxed">
            A presence fragrance is calibrated for restraint. Three to four sprays to pulse points —
            inner wrists, base of throat, behind the ears — is typically sufficient. An EDP worn with
            restraint occupies the intimate register; the same formula applied heavily performs like a
            performance fragrance. Concentration is not destiny. Application is.
          </p>
        </div>
      </section>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
