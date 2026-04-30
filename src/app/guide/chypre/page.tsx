import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Aristocrat — Fumage Guide",
  description: "Chypre fragrances: the most historically significant family in perfumery, and the most changed by regulation. What a chypre is, why oakmoss was restricted, and what remains.",
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
  Wildcard: "text-rose-400 border-rose-800/40 bg-rose-900/10",
};

const SUBFAMILIES = [
  {
    name: "Classic Green Chypre",
    tag:  "Oakmoss, bergamot, labdanum",
    body: "The original structure as Coty defined it in 1917: bright bergamot opening, mossy heart, warm labdanum base. These fragrances smell simultaneously fresh and ancient. Almost impossible to produce authentically today due to oakmoss restrictions.",
  },
  {
    name: "Leather Chypre",
    tag:  "Birch tar, suede over moss",
    body: "A chypre base wearing a leather coat. The combination of labdanum and birch tar or castoreum produces a fragrance that is both structured and animalic — authoritative in a way that neither family achieves alone. Robert Piguet Bandit is the reference.",
  },
  {
    name: "Floral Chypre",
    tag:  "Rose, jasmine over the base",
    body: "Rose or jasmine anchored to the mossy base rather than floating freely. The result is more grounded, more lasting, and more complex than a pure floral. Guerlain's Mitsouko is the undisputed masterwork of the form — formally feminine, genuinely genderless.",
  },
  {
    name: "Modern / Neo-Chypre",
    tag:  "Synthetic reconstruction",
    body: "What the family looks like after the IFRA restrictions. Oakmoss replaced with synthetic alternatives — evernyl methyl ether, ISO E Super, musks — over a bergamot-and-labdanum frame. Not the same thing; often excellent in their own right.",
  },
];

const INGREDIENTS = [
  {
    name: "Oakmoss",
    role: "The restricted foundation",
    body: "Evernia prunastri — a lichen that grows on oak bark. Damp, earthy, and green with a quality unlike anything else in perfumery. The IFRA (International Fragrance Association) classified its key aroma compounds as skin sensitisers and restricted usage levels in 2004, with further tightening in 2012. Classical chypre cannot be authentically made under current limits.",
  },
  {
    name: "Labdanum",
    role: "The amber base",
    body: "Resin from the cistus rockrose plant — warm, slightly animalic, balsamic. The mossy top needs a warm, resinous bottom to complete the chypre structure. Labdanum provides it. Where oakmoss gives chypres their head, labdanum gives them their backbone.",
  },
  {
    name: "Bergamot",
    role: "The citrus frame",
    body: "The essential top note that makes the classical chypre feel bright and accessible despite its dark base. Bergamot's green, almost floral citrus character bridges the gap between the mossy heart and the amber base. Without it, a chypre risks feeling heavy and airless.",
  },
  {
    name: "Vetiver",
    role: "The earthy depth",
    body: "The rooty, earthy, smoky element that appears in many chypres — particularly leather chypres and modern reconstructions. Vetiver and labdanum share a warm earthiness that reinforces each other. The combination is what gives chypres their sense of weight and permanence.",
  },
  {
    name: "Cistus (Rockrose)",
    role: "The resinous warmth",
    body: "The plant that labdanum derives from. In fragrance, cistus contributes a slightly different character than labdanum absolute — warmer, more ambiguous, closer to leather than pure resin. Used alongside labdanum to add complexity to the base and partially compensate for restricted oakmoss.",
  },
  {
    name: "Evernyl Methyl Ether",
    role: "The synthetic alternative",
    body: "The molecule most commonly used to reconstruct oakmoss's characteristic damp, earthy quality within IFRA limits. It captures something of the original — enough to signal chypre — but lacks the full complexity of the natural. The reason modern chypres are different, not wrong.",
  },
];

const PICKS = [
  {
    tier:    "Budget",
    price:   "~$65",
    best:    false,
    house:   "Chanel",
    name:    "Pour Monsieur EDT",
    slug:    null,
    profile: "Bergamot, neroli, lemon, spice, vetiver, oakmoss, amber",
    body:    "The understated entry point. A citrus-forward chypre of exceptional restraint — nothing announces itself, everything coheres. The oakmoss note is light by chypre standards, which is part of why it survives reformulation better than most of its peers. The correct choice when you want a chypre that works everywhere.",
  },
  {
    tier:    "Mid",
    price:   "~$120",
    best:    true,
    house:   "Hermès",
    name:    "Terre d'Hermès EDP",
    slug:    null,
    profile: "Orange, grapefruit, flint, pepper, vetiver, benzene",
    body:    "The defining chypre of the twenty-first century. Jean-Claude Ellena built a woody chypre around flint, vetiver, and orange that created an entirely new vocabulary for the family. No oakmoss — and it doesn't need it. The EDP over the EDT for depth. One of the great masculine fragrances made in the past thirty years.",
  },
  {
    tier:    "Mid",
    price:   "~$130",
    best:    false,
    house:   "Dior",
    name:    "Eau Sauvage Parfum",
    slug:    null,
    profile: "Grapefruit, iris, smoky rose, leather, vetiver, musk",
    body:    "The 2012 Parfum — not the 1966 original and not the 2017 reformulation — is the version worth finding. A smoky rose over a leather-chypre base: iris and grapefruit up front, vetiver and leather behind. More challenging than Terre d'Hermès; more rewarding at close range. The mid-tier chypre that rewards attention.",
  },
  {
    tier:    "Niche",
    price:   "~$150",
    best:    false,
    house:   "Robert Piguet",
    name:    "Bandit",
    slug:    null,
    profile: "Bergamot, aldehydes, geranium, galbanum, leather, vetiver, oakmoss",
    body:    "Launched 1944, reformulated but not ruined. The leather chypre as it was meant to be: severe, elegant, entirely uncompromising. Galbanum and aldehydes sharpen the opening into something austere; leather and oakmoss close it into something timeless. The fragrance worn by people who have stopped caring whether they're approved of.",
  },
  {
    tier:    "Wildcard",
    price:   "~$90",
    best:    false,
    house:   "Guerlain",
    name:    "Mitsouko EDT",
    slug:    null,
    profile: "Bergamot, peach, rose, jasmine, spice, oakmoss, labdanum, vetiver",
    body:    "Marketed as feminine. Genuinely genderless. The Platonic ideal of the classical chypre — peach and bergamot over rose and jasmine, anchored to the deepest oakmoss-and-labdanum base in perfumery. Understand Mitsouko and you understand the family. Created 1919; nothing else has replaced it. Worth hunting the vintage for the oakmoss that the current formula can no longer fully carry.",
  },
];

const PITFALLS = [
  {
    name: "Expecting classical oakmoss in modern bottles",
    body: "Every chypre released after 2004, and virtually every reformulation of earlier ones, operates under oakmoss restrictions that materially change what the base smells like. This is not a brand failing its customers — it is a regulatory constraint no perfumer can override. If you want classical chypre, you need vintage fragrance. If you want modern chypre, accept that it is a different thing — and often a genuinely good one.",
  },
  {
    name: "Writing off the family as outdated",
    body: "The Chypre family's reputation for being old-fashioned comes from a generation of reformulated versions that lost the base that made them work. The family itself is not dated — it was starved of its defining ingredient. The best modern chypres, built from the ground up around what is available, demonstrate that the structural idea is as powerful as ever.",
  },
  {
    name: "Confusing fresh-aromatic fragrances with chypres",
    body: "Bergamot and a vaguely earthy quality don't make something a chypre. The mossy-labdanum base is the point — without it you have a fresh or aromatic fragrance. The category is precise: if there's no warm, resinous, earthy anchor beneath the citrus, it isn't a chypre. Knowing the difference protects you from buying something that merely gestures at the family.",
  },
];

export default function ChyprePage() {
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
          The Aristocrat:<br />
          <em className="italic text-amber-400">The Chypre Family</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          The most historically significant family in perfumery — and the one most transformed by
          regulation. One lichen, one rulebook, and a century of consequence.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          4 subfamilies, 6 key ingredients, 5 recommendations, and 3 pitfalls to avoid
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          In 1917, François Coty released a fragrance called Chypre — named after the French word for
          Cyprus, where legend says the accord was first worn by ancient sailors returning with exotic
          resins. The formula was bergamot over oakmoss and labdanum. That structure became the most
          influential template in the history of perfumery.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          Then, in the early 2000s, the International Fragrance Association identified key compounds in
          oakmoss — the mossy lichen that gives chypres their defining character — as skin sensitisers.
          Usage levels were restricted in 2004 and tightened again in 2012. Classical chypre, as it
          existed from 1917 to 2004, cannot be authentically reproduced within current regulatory limits.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          The story of the chypre family is therefore two stories: what was built before the restriction,
          and what has been rebuilt since. Both chapters are worth knowing.
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

        {/* Vintage note */}
        <div className="mt-8 border border-amber-900/30 rounded p-5 bg-amber-950/10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/60 mb-2">On vintage fragrance</p>
          <p className="text-[11px] text-stone-500 font-light leading-relaxed">
            More than any other family, chypre rewards hunting vintage. A sealed bottle of pre-2004
            Mitsouko, Miss Dior, or Aromatics Elixir is a document — evidence of what the family was
            before its defining ingredient was restricted. eBay, Fragrantica swap forums, and specialist
            decant communities are the access points. Learn to read the batch codes.
          </p>
        </div>

        <PullQuote>
          Classical chypre cannot be made within current regulatory limits. What has been built
          in its place is different — and often, in its own way, excellent.
        </PullQuote>
      </section>

      {/* Recommendations */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Picks</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          The <em className="italic text-amber-400/80">recommendations</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          Five fragrances across four price tiers — spanning classical, modern, and the genderless
          masterwork the family is built around.
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
              {slug ? (
                <Link
                  href={`/fragrances/${slug}`}
                  className="text-stone-200 font-light hover:text-amber-400 transition-colors block mb-2"
                >
                  {name}
                </Link>
              ) : (
                <p className="text-stone-200 font-light mb-2">{name}</p>
              )}
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
