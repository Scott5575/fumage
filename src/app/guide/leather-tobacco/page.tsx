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
    name: "Smooth Leather",
    tag:  "Suede, soft leather",
    body: "The accessible entry point. Smooth, slightly powdery leather notes. Reads as luxurious rather than rugged. The bridge between mainstream and the more challenging end of the family.",
  },
  {
    name: "Hard Leather",
    tag:  "Birch tar, castoreum",
    body: "Challenging, rugged, and genuinely animalic. Birch tar smells like smoked rubber; castoreum like a warm animal pelt. These divide rooms. Knize Ten lives here.",
  },
  {
    name: "Tobacco",
    tag:  "Cured leaf, pipe tobacco",
    body: "Warm, sweet-edged, and deeply comforting. Tobacco notes in fragrance evoke a well-stocked library — warm, slightly vanillic, complex. Tom Ford's tobacco works live here.",
  },
  {
    name: "Smoky / Tarry",
    tag:  "Smoke, asphalt, burnt wood",
    body: "The most challenging corner. Incense, smoked wood, tar. Not conventionally attractive but genuinely compelling to those who respond to it.",
  },
];

const INGREDIENTS = [
  {
    name: "Birch Tar",
    role: "The hard leather note",
    body: "Produced by dry distillation of birch bark. Smoky, rubbery, and slightly medicinal. The ingredient that gives Russian leather its character. Powerful in small doses.",
  },
  {
    name: "Castoreum",
    role: "The animalic leather",
    body: "Secreted by beavers. Warm, leathery, and animalic. Now almost universally replaced with synthetics. When you smell an old leather fragrance and can't place the warmth — it's probably castoreum.",
  },
  {
    name: "Tobacco Absolute",
    role: "The cured leaf",
    body: "Real tobacco extracted from cured leaves. Warm, slightly sweet, complex. The quality difference between real tobacco absolute and a synthetic accord is immediately apparent.",
  },
  {
    name: "Suederal / Norlimbanol",
    role: "The smooth synthetics",
    body: "Modern molecules that produce smooth, skin-like leather effects without the challenging animalic edge of birch tar. Why contemporary leather fragrances can be soft and approachable.",
  },
  {
    name: "Isobutyl Quinoline",
    role: "The sharp leather molecule",
    body: "A synthetic that produces sharp, almost chemical leather effects — the smell of new leather goods. Gives leather fragrances an edge. The molecule behind the \"new car interior\" quality.",
  },
];

const PICKS = [
  {
    tier:    "Budget",
    price:   "~$40",
    best:    false,
    house:   "Ralph Lauren",
    name:    "Polo (Original)",
    slug:    "ralph-lauren-polo",
    profile: "Pine, basil, leather, tobacco, patchouli, oakmoss, vetiver",
    body:    "One of the most underrated masculine fragrances at any price point. Dark, earthy, genuinely rugged. The dark green bottle specifically. Wear it and feel like you've found something most people walked right past.",
  },
  {
    tier:    "Mid",
    price:   "~$60",
    best:    false,
    house:   "Heeley",
    name:    "Cuir d'Ange",
    slug:    null,
    profile: "Iris, heliotrope, suede, musk, benzoin",
    body:    "The smooth leather gateway. Iris and suede — powdery, soft, and genuinely luxurious without any challenging animalic edge. The leather fragrance for someone who thinks they don't like leather fragrances.",
  },
  {
    tier:    "Mid",
    price:   "~$105",
    best:    true,
    house:   "Maison Margiela",
    name:    "Replica Jazz Club",
    slug:    "maison-margiela-replica-jazz-club",
    profile: "Lemon, neroli, pink pepper, rum, tobacco, vetiver, musk",
    body:    "The tobacco-and-rum combination is the point — warm, smoky, and evocative. This is what a late-night bar smells like when everyone in it is well-dressed. The most accessible tobacco fragrance in niche and the best entry point into this family.",
  },
  {
    tier:    "Niche",
    price:   "~$285",
    best:    true,
    house:   "Tom Ford Private Blend",
    name:    "Tuscan Leather",
    slug:    "tom-ford-tuscan-leather",
    profile: "Raspberry, thyme, saffron, leather, jasmine, suede, amber",
    body:    "The raspberry-and-leather opening divides people on first encounter — then makes complete sense. One of the most commented-upon fragrances in niche perfumery. People stop and ask about it. That is what you want from a leather fragrance.",
  },
  {
    tier:    "Wildcard",
    price:   "~$120",
    best:    false,
    house:   "Knize",
    name:    "Knize Ten",
    slug:    null,
    profile: "Lemon, rose, jasmine, iris, leather, birch tar, vetiver, amber",
    body:    "Launched 1924, beloved ever since by everyone who discovers it. Hard leather — birch tar and vetiver — with a surprisingly elegant floral heart. One of the great hidden classics in men's fragrance at an almost offensively low price for its quality.",
  },
];

const PITFALLS = [
  {
    name: "Rejecting the family based on one challenging experience",
    body: "The leather family has a wider internal range than almost any other. A harsh hard-leather and a soft suede composition are both leather fragrances. If you've tried one and hated it, try three more before forming a view on the family.",
  },
  {
    name: "Wearing hard leather in the wrong context",
    body: "Hard leather fragrances are not office fragrances, not first-date fragrances, not daytime fragrances. They're for occasions with enough latitude to absorb a strong point of view. Match the context carefully.",
  },
  {
    name: "Only trying mainstream leather fragrances",
    body: "The best leather fragrances are almost entirely niche. Knize Ten at $120 and original Polo at $40 are both better than almost everything in a department store. Look outside the usual shelves.",
  },
];

export default function LeatherTobaccoPage() {
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
          Fragrances With Opinions:<br />
          <em className="italic text-amber-400">The Leather and Tobacco Family</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          Not for everyone, on purpose. The leather and tobacco family is where fragrance stops trying
          to be liked and starts trying to be remembered.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          4 subfamilies, 5 key ingredients, 5 recommendations, and 3 pitfalls
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          Every fragrance family has a social contract with the wearer. Fresh fragrances promise to
          make you approachable. Orientals promise to make you compelling. Leather and tobacco
          fragrances don&apos;t make promises — they make statements.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          Wearing one is a deliberate signal that you&apos;ve thought about what you want to communicate
          and you&apos;re comfortable with the fact that not everyone will approve.
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

        {/* Skin chemistry note */}
        <div className="mt-8 border border-amber-900/30 rounded p-5 bg-amber-950/10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/60 mb-2">On wearing leather fragrances</p>
          <p className="text-[11px] text-stone-500 font-light leading-relaxed">
            Leather and tobacco fragrances interact with skin chemistry more than most families. A
            leather fragrance that smells harsh on a blotter may be extraordinary on skin. Always
            wear before deciding.
          </p>
        </div>

        <PullQuote>
          Leather fragrances don&apos;t make promises. They make statements. The difference matters.
        </PullQuote>
      </section>

      {/* Recommendations */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Picks</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          The <em className="italic text-amber-400/80">recommendations</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          Five fragrances across four price tiers. Every one worth knowing.
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
