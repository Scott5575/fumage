import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Original Blueprint — Fumage Guide",
  description: "The fougère accord: the 19th-century blueprint behind most men's fragrances, and why it still dominates shelves.",
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

const TIER_STYLES: Record<string, string> = {
  Budget:   "text-emerald-400 border-emerald-800/40 bg-emerald-900/10",
  Mid:      "text-sky-400 border-sky-800/40 bg-sky-900/10",
  Niche:    "text-amber-400 border-amber-800/40 bg-amber-900/10",
};

const SUBFAMILIES = [
  {
    name: "Classic Fougère",
    tag:  "Lavender, oakmoss, coumarin",
    body: "The original structure, unchanged. Brut, Old Spice, Habit Rouge. Smells like barbershops, confidence, and a time when men wore one fragrance their entire lives. Unfashionable and correct.",
  },
  {
    name: "Aquatic Fougère",
    tag:  "Lavender, calone, moss",
    body: "The 1990s explosion. Cool Water invented this direction. Cleaner and fresher than classic fougère, massively influential. The dominant men's fragrance style of its decade.",
  },
  {
    name: "Aromatic Fougère",
    tag:  "Lavender, herbs, ambroxan",
    body: "Modern fougère. Sauvage is this. Lavender and aromatic herbs over a dry, ambroxan-heavy base. The dominant style in mainstream men's fragrance right now.",
  },
  {
    name: "Soft Fougère",
    tag:  "Lavender, woods, musk",
    body: "A lighter take — lavender over clean musks and soft woods rather than oakmoss and coumarin. Office-safe, skin-close. Easy to wear, harder to make distinctive.",
  },
];

const INGREDIENTS = [
  {
    name: "Lavender",
    role: "The fougère signature",
    body: "Defining top note of the family. Herbal, floral, slightly medicinal in excess. In a fougère it reads as clean and masculine rather than floral. Ubiquitous but irreplaceable.",
  },
  {
    name: "Oakmoss",
    role: "The damp base",
    body: "An actual moss — dark, earthy, slightly marine. Now heavily restricted by IFRA due to sensitisation concerns. Its absence is one of the most-mourned reformulation losses in the fragrance community.",
  },
  {
    name: "Coumarin",
    role: "The hay-sweet anchor",
    body: "Smells like warm hay, fresh grass, and gentle sweetness. The founding synthetic of modern perfumery. Gives fougères their characteristic warmth and approachability.",
  },
  {
    name: "Geranium",
    role: "The herbal bridge",
    body: "Green, slightly rosy, and herbal. The heart of most fougères — bridges lavender top and oakmoss-coumarin base. Gives the structure coherence without drawing attention to itself.",
  },
  {
    name: "Ambroxan",
    role: "The modern base",
    body: "The contemporary replacement for some of what oakmoss used to do. Diffusive, skin-like, and persistent. Sauvage is essentially a fougère built around ambroxan instead of oakmoss.",
  },
];

const PICKS = [
  {
    tier:    "Budget",
    price:   "~$15",
    best:    false,
    house:   "Fabergé",
    name:    "Brut Original",
    slug:    "faberg-brut",
    profile: "Anise, lavender, geranium, oakmoss, vetiver",
    body:    "Wear it without irony. The fougère structure at its most direct and honest. Unchanged since 1964 and still correct. The price makes it essentially free. Required education.",
  },
  {
    tier:    "Budget",
    price:   "~$40",
    best:    false,
    house:   "Davidoff",
    name:    "Cool Water EDT",
    slug:    "davidoff-cool-water",
    profile: "Mint, calone, lavender, sandalwood, musk, oakmoss, cedar",
    body:    "The fragrance that redefined the fougère for the 1990s. Still remarkably good. The lavender-and-calone combination ages far better than most of its contemporaries.",
  },
  {
    tier:    "Mid",
    price:   "~$120",
    best:    true,
    house:   "Dior",
    name:    "Sauvage EDP",
    slug:    "dior-sauvage-edp",
    profile: "Bergamot, pepper, lavender, geranium, ambroxan, patchouli",
    body:    "The best-selling men's fragrance in the world — and the best argument that ubiquity and quality are not mutually exclusive. The EDP specifically. Wear it with the confidence of knowing you chose it because it's excellent, not because it's popular.",
  },
  {
    tier:    "Mid",
    price:   "~$130",
    best:    false,
    house:   "Dior",
    name:    "Fahrenheit EDT",
    slug:    "dior-fahrenheit",
    profile: "Violet leaf, nutmeg, lavender, leather, vetiver, patchouli, amber",
    body:    "One of the most distinctive fougères ever made. The gasoline-leather-violet combination is polarising on first encounter and unforgettable once understood. A fougère for people who find Sauvage too obvious.",
  },
  {
    tier:    "Niche",
    price:   "~$260",
    best:    true,
    house:   "Amouage",
    name:    "Reflection Man",
    slug:    "amouage-reflection-man",
    profile: "Neroli, lavender, rosewood, jasmine, musk, sandalwood, oakmoss",
    body:    "What the fougère sounds like when the budget is unlimited and the perfumer has complete creative freedom. Lavender elevated to something luminous and complex. One of the most underappreciated fragrances in niche perfumery.",
  },
];

const PITFALLS = [
  {
    name: "Confusing \"smells familiar\" with \"smells generic\"",
    body: "The fougère structure is deeply familiar because it's been used for 140 years. Familiar isn't the same as generic. A well-made, well-balanced fougère is a well-made fragrance. Don't reject something for being recognisable.",
  },
  {
    name: "Buying the EDT when the EDP is better",
    body: "For Sauvage specifically — and several modern aromatic fougères — the EDP is the superior formula. The EDT's higher alcohol dissipates the ambroxan base faster. Try both before committing.",
  },
  {
    name: "Overlooking vintage classics",
    body: "Classic fougères — Brut, Habit Rouge, vintage Drakkar Noir — are systematically undervalued. These fragrances are excellent. The fact that your father wore them is not an argument against wearing them; it's an argument that they passed a forty-year test.",
  },
];

export default function FougerePage() {
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
          Family Deep Dive
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 leading-[1.08] mb-6">
          The Original Blueprint:<br />
          <em className="italic text-amber-400">Understanding the Fougère Family</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          The structural DNA of men&apos;s cologne since 1882. If you&apos;ve ever smelled a &ldquo;classic
          masculine&rdquo; fragrance and couldn&apos;t place why — it was probably a fougère.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          4 subfamilies, 5 key ingredients, 5 recommendations, and 3 pitfalls
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          The fougère family has the most dramatic founding moment in fragrance history: Houbigant&apos;s
          Fougère Royale in 1882, which introduced coumarin — a synthetic aroma molecule — into fine
          fragrance for the first time.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          The name means &ldquo;fern-like&rdquo; in French, which describes the imaginary thing this fragrance
          smells like — a living fern doesn&apos;t actually smell this way. The accord worked, and it has
          never stopped working.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          The fougère structure — lavender on top, oakmoss and coumarin in the base, usually something
          herbal in the heart — is so deeply embedded in Western men&apos;s fragrance culture that most men
          have encountered it dozens of times without knowing it. Brut is a fougère. Old Spice is a
          fougère. Drakkar Noir is a fougère. Cool Water is a fougère. And Dior Sauvage — the
          world&apos;s best-selling men&apos;s fragrance — is a fougère.
        </p>
      </div>

      {/* Subfamilies */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Landscape</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          The <em className="italic text-amber-400/80">subfamilies</em>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUBFAMILIES.map(({ name, tag, body }) => (
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <p className="text-stone-200 font-light text-sm mb-0.5">{name}</p>
              <p className="text-[10px] uppercase tracking-[0.12em] text-amber-500/50 mb-3">{tag}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key ingredients */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Chemistry</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          Key <em className="italic text-amber-400/80">ingredients</em>
        </h2>

        <div className="space-y-3">
          {INGREDIENTS.map(({ name, role, body }) => (
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <p className="text-stone-200 font-light text-sm">{name}</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-stone-600">{role}</p>
              </div>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <PullQuote>
          Every man&apos;s first cologne was probably a fougère. The best ones make sure it&apos;s not his last.
        </PullQuote>
      </section>

      {/* Recommendations */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Picks</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          The <em className="italic text-amber-400/80">recommendations</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          Five fragrances across three price tiers. Every one worth knowing.
        </p>

        <div className="space-y-3">
          {PICKS.map(({ tier, price, best, house, name, slug, profile, body }) => (
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className={`text-[9px] uppercase tracking-[0.15em] border rounded px-2 py-0.5 ${TIER_STYLES[tier]}`}>
                  {tier} · {price}
                </span>
                {best && (
                  <span className="text-[9px] uppercase tracking-[0.12em] border border-amber-700/30 text-amber-500/60 rounded px-2 py-0.5 bg-amber-900/10">
                    Best in class
                  </span>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-stone-500 mb-0.5">{house}</p>
              <Link
                href={`/fragrances/${slug}`}
                className="text-stone-200 font-light hover:text-amber-400 transition-colors block mb-2"
              >
                {name}
              </Link>
              <p className="text-[10px] text-stone-600 mb-3 leading-relaxed">{profile}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pitfalls */}
      <section className="mb-16">
        <SectionLabel>Watch Out</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          The <em className="italic text-amber-400/80">pitfalls</em>
        </h2>

        <div className="space-y-0">
          {PITFALLS.map(({ name, body }) => (
            <div key={name} className="flex gap-4 py-5 border-b border-stone-800/60 last:border-0">
              <span className="text-[10px] uppercase tracking-[0.12em] text-rose-500/50 border border-rose-900/30 px-2 py-0.5 rounded flex-shrink-0 h-fit">
                Trap
              </span>
              <div>
                <p className="text-stone-300 font-light text-sm mb-1.5">{name}</p>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
