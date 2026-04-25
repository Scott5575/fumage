import Link from "next/link";

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
    name: "Classic Aquatic",
    tag:  "Calone, sea air, ozonic",
    body: "The 1990s template. Calone-led, ozonic, slightly metallic. Cool Water and the original Acqua di Giò live here. Clean, breezy, and of their era — which is both a limitation and a kind of charm.",
  },
  {
    name: "Sea Salt / Mineral",
    tag:  "Salt, driftwood, minerals",
    body: "Contemporary aquatic — more naturalistic than calone-heavy classics. Smells like a specific beach rather than a generic ocean. Sailing Day lives here. More interesting and distinctive.",
  },
  {
    name: "Marine Oriental",
    tag:  "Sea + incense, smoke, amber",
    body: "Aquatic opening over a warm, substantial base. Acqua di Giò Profumo is the defining example. The contrast is the point. The most complex and interesting end of the family.",
  },
  {
    name: "Green / Freshwater",
    tag:  "Rivers, rain, green water",
    body: "Inland water rather than ocean. Green aquatics that smell like rain on stone or river reeds. More unusual and specific than marine aquatics.",
  },
];

const INGREDIENTS = [
  {
    name: "Calone",
    role: "The ocean molecule",
    body: "Discovered 1966, deployed massively from 1992. Smells like the sea, melon, and cut cucumber simultaneously. The defining molecule of classic aquatic fragrance. A little goes far; too much smells synthetic.",
  },
  {
    name: "Sea Salt / Ambrette",
    role: "The naturalistic marine",
    body: "Materials that recreate the mineral, slightly iodine quality of actual sea air without calone's plasticky excess. What makes contemporary aquatics smell real.",
  },
  {
    name: "Dihydromyrcenol",
    role: "The transparent fresh",
    body: "A synthetic molecule that gives aquatics their clean, slightly metallic freshness. Invisible when you know it — immediately recognisable once you do. A key molecule in Cool Water's success.",
  },
  {
    name: "Driftwood / Oakwood",
    role: "The naturalistic base",
    body: "Contemporary aquatics use wood base notes to give longevity and warmth that pure aquatic notes can't provide. The difference between a fragrance that lasts and one that's gone in an hour.",
  },
  {
    name: "Geranium / Sage",
    role: "The herbal bridge",
    body: "Green herbal notes that bridge aquatic top notes and woody bases. Prevents aquatic fragrances from smelling one-dimensional. Most great aquatics have something herbal in the heart.",
  },
];

const PICKS = [
  {
    tier:    "Budget",
    price:   "~$35",
    best:    true,
    house:   "Davidoff",
    name:    "Cool Water EDT",
    slug:    "davidoff-cool-water",
    profile: "Calone, mint, lavender, sandalwood, musk, oakmoss, cedar",
    body:    "The fragrance that invented a genre. Wear it and immediately understand why it sold in the millions. The calone-lavender-sandalwood combination is so well-balanced it seems obvious. Required listening.",
  },
  {
    tier:    "Budget",
    price:   "~$30",
    best:    false,
    house:   "Nautica",
    name:    "Nautica Voyage",
    slug:    "nautica-nautica-voyage",
    profile: "Apple, green leaves, lotus, cedarwood, musk, oakmoss",
    body:    "The apple-lotus-oakmoss combination is one of the more interesting accord constructions at this price point. Light, pleasant, and more memorable than it ought to be.",
  },
  {
    tier:    "Mid",
    price:   "~$75",
    best:    false,
    house:   "Issey Miyake",
    name:    "L'Eau d'Issey Pour Homme",
    slug:    "issey-miyake-l-eau-d-issey-pour-homme",
    profile: "Yuzu, calone, sage, nutmeg, cedarwood, amber, musk",
    body:    "Gold standard for what a mid-range marine can be. The yuzu-and-sage heart gives this aquatic a depth most don't achieve. Launched 1994; unreplaced.",
  },
  {
    tier:    "Mid",
    price:   "~$120",
    best:    true,
    house:   "Giorgio Armani",
    name:    "Acqua di Giò Profumo",
    slug:    "giorgio-armani-acqua-di-gi-profumo",
    profile: "Marine notes, bergamot, geranium, sage, incense, patchouli, labdanum",
    body:    "The best marine-oriental at the mainstream price point. The incense and labdanum base transforms what could have been another aquatic flanker into something genuinely complex and memorable. One of the most important designer fragrances of the last twenty years.",
  },
  {
    tier:    "Niche",
    price:   "~$195",
    best:    false,
    house:   "Maison Margiela",
    name:    "Replica: Sailing Day",
    slug:    "maison-margiela-replica-sailing-day",
    profile: "Bergamot, sea salt, oakwood, cedar, musk",
    body:    "Genuinely briny sea salt without synthetic quality. The oakwood base has real warmth and character. Smells like being somewhere specific. The Replica line's best masculine entry.",
  },
  {
    tier:    "Wildcard",
    price:   "~$350",
    best:    false,
    house:   "Heeley",
    name:    "Sel Marin",
    slug:    null,
    profile: "Sea salt, marine accord, cedar, iris, musks, ambergris",
    body:    "The niche marine benchmark. The ambergris-and-iris base is extraordinary — warm, mineral, and genuinely complex in a way most marine fragrances never attempt. The most sophisticated bottle in the family at any price.",
  },
];

const PITFALLS = [
  {
    name: "Dismissing the family based on snob consensus",
    body: "Cool Water and L'Eau d'Issey are objectively excellent fragrances. Anyone who tells you otherwise is performing taste rather than exercising it. Wear what smells good.",
  },
  {
    name: "Wearing aquatics in cold weather",
    body: "Cold air kills aquatic fragrance projection significantly. The calone-and-citrus combination needs warmth to develop and project. Aquatics below 15°C are a frustrating experience. Save them for when the weather cooperates.",
  },
  {
    name: "Stopping at the classic aquatics",
    body: "The marine family has evolved significantly since the 1990s. Sea salt, mineral notes, and marine-oriental hybrids are all more interesting than the calone-heavy classics. Explore the contemporary end before forming a final view.",
  },
];

export default function AquaticMarinePage() {
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
          Better Than Its Reputation:<br />
          <em className="italic text-amber-400">The Aquatic and Marine Family</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          Written off as dated by fragrance snobs, beloved by everyone else, and secretly the source
          of some of the most genuinely enjoyable warm-weather fragrances ever made.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          4 subfamilies, 5 key ingredients, 6 recommendations, and 3 pitfalls
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          Aquatic fragrances are associated with the 1990s, with department store basics, with
          &ldquo;safe&rdquo; and &ldquo;boring&rdquo; — and in fairness, a lot of aquatic fragrances are exactly those
          things.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          But the best aquatics are among the most genuinely pleasurable scents available to wear,
          and several are classics by any serious measure. Ease, done well, is a form of craft.
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
          The aquatic family doesn&apos;t try to impress you. It just makes everything feel slightly better than it did before you put it on.
        </PullQuote>
      </section>

      {/* Recommendations */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Picks</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          The <em className="italic text-amber-400/80">recommendations</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          Six fragrances across four price tiers. Every one worth knowing.
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
