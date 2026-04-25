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

type FragRef = { name: string; slug: string | null };

function FragLinks({ frags }: { frags: FragRef[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {frags.map(({ name, slug }) =>
        slug ? (
          <Link
            key={name}
            href={`/fragrances/${slug}`}
            className="text-[10px] px-2 py-0.5 border border-stone-800 hover:border-amber-800/50 text-stone-500 hover:text-amber-400 rounded transition-colors"
          >
            {name}
          </Link>
        ) : (
          <span
            key={name}
            className="text-[10px] px-2 py-0.5 border border-stone-800 text-stone-600 rounded"
          >
            {name}
          </span>
        )
      )}
    </div>
  );
}

const INGREDIENTS = [
  {
    name: "Oud (Agarwood)",
    price: "$3,000–$30,000/kg",
    body: "Resinous wood from infected Aquilaria trees. Smoky, animalic, complex. Most \"oud\" in affordable fragrances is a synthetic approximation — good, but different.",
  },
  {
    name: "Orris Root (Iris)",
    price: "~$50,000/kg absolute",
    body: "From iris rhizomes dried for three years. Smells like violet, powder, and cold earth simultaneously. One of perfumery's most expensive naturals by weight.",
  },
  {
    name: "Grasse Rose Absolute",
    price: "~$8,000–12,000/kg",
    body: "Hand-harvested at dawn in southern France. The difference between this and a synthetic rose is the difference between a live performance and a recording.",
  },
  {
    name: "Ambergris",
    price: "~$10,000/kg",
    body: "Produced in sperm whale digestive tracts and found aged on beaches. Warm, smooth, oceanic, and animalic. Synthetic ambroxan approximates it; nothing fully replaces it.",
  },
  {
    name: "Mysore Sandalwood",
    price: "~$1,500–3,000/kg",
    body: "Old-growth sandalwood from Karnataka, India — effectively regulated out of the market. Creamy, warm, smooth. The gap from modern alternatives is real and noticeable.",
  },
  {
    name: "Haitian Vetiver",
    price: "~$400–600/kg",
    body: "Darker, more complex, more smoky than Indonesian vetiver. The difference is audible in a finished fragrance. Appears in the best vetiver-forward compositions.",
  },
];

const HOUSES = [
  {
    tier: "Start here",
    tierColor: "text-emerald-400 border-emerald-800/40 bg-emerald-900/10",
    entries: [
      {
        name: "Maison Margiela Replica",
        origin: "Paris",
        price: "$130–180",
        body: "The most accessible niche line for newcomers. Each fragrance is built around a specific memory or place — a beach house, a jazz club, a barbershop. Conceptually distinct, consistently excellent.",
        frags: [
          { name: "Jazz Club",        slug: "maison-margiela-replica-jazz-club"        },
          { name: "Sailing Day",      slug: "maison-margiela-replica-sailing-day"      },
          { name: "By the Fireplace", slug: "maison-margiela-replica-by-the-fireplace" },
        ],
      },
      {
        name: "Diptyque",
        origin: "Paris, 1961",
        price: "$150–200",
        body: "One of the oldest niche houses, founded by three artists. Beautifully balanced fragrances that never feel aggressive or obvious. The oval bottle is iconic.",
        frags: [
          { name: "Tam Dao",    slug: "diptyque-tam-dao"    },
          { name: "Philosykos", slug: "diptyque-philosykos" },
          { name: "Vetyverio",  slug: null                  },
        ],
      },
    ],
  },
  {
    tier: "Essential",
    tierColor: "text-sky-400 border-sky-800/40 bg-sky-900/10",
    entries: [
      {
        name: "Le Labo",
        origin: "New York",
        price: "$185–245",
        body: "Named fragrances after raw ingredients. Made-to-order in boutiques. The presentation is deliberately anti-luxury while quality is unimpeachably niche. Santal 33 became one of the defining scents of the 2010s.",
        frags: [
          { name: "Santal 33",    slug: "le-labo-santal-33"    },
          { name: "Bergamote 22", slug: "le-labo-bergamote-22" },
          { name: "Thé Noir 29",  slug: "le-labo-th-noir-29"   },
        ],
      },
      {
        name: "Byredo",
        origin: "Stockholm",
        price: "$195–260",
        body: "Founded by a former professional basketball player with no formal perfumery training — which produced one of the most consistent and distinctive houses in niche fragrance. Clean, Scandinavian, emotionally evocative.",
        frags: [
          { name: "Bal d'Afrique", slug: "byredo-bal-d-afrique" },
          { name: "Gypsy Water",   slug: "byredo-gypsy-water"   },
          { name: "Blanche",       slug: null                    },
        ],
      },
      {
        name: "Creed",
        origin: "London / Paris",
        price: "$300–500",
        body: "The house that made niche mainstream. Aventus remains one of the most discussed fragrances in the world. Whether Creed is still \"niche\" in any meaningful sense is a lively debate. The fragrances are still excellent.",
        frags: [
          { name: "Aventus",               slug: "creed-aventus"               },
          { name: "Green Irish Tweed",     slug: "creed-green-irish-tweed"     },
          { name: "Silver Mountain Water", slug: "creed-silver-mountain-water" },
        ],
      },
    ],
  },
  {
    tier: "Go deep",
    tierColor: "text-amber-400 border-amber-800/40 bg-amber-900/10",
    entries: [
      {
        name: "Serge Lutens",
        origin: "Paris",
        price: "$150–300",
        body: "The house that proved niche fragrance could be genuinely strange and still find an audience. Dark, dense, and literary. Not for the timid, but extraordinary once you're ready.",
        frags: [
          { name: "Chergui",           slug: "serge-lutens-chergui"                      },
          { name: "Féminité du Bois",  slug: null                                         },
          { name: "Ambre Sultan",      slug: "serge-lutens-serge-lutens-ambre-sultan"     },
        ],
      },
      {
        name: "Amouage",
        origin: "Oman",
        price: "$250–400",
        body: "Founded by the Sultan of Oman with a brief to create the world's most expensive perfume. Still one of the most lavish, complex, and opulent houses. The fragrances are enormous in projection and longevity.",
        frags: [
          { name: "Reflection Man", slug: "amouage-reflection-man" },
          { name: "Interlude Man",  slug: "amouage-interlude-man"  },
          { name: "Gold Man",       slug: "amouage-gold-man"       },
        ],
      },
    ],
  },
  {
    tier: "Avant-garde",
    tierColor: "text-rose-400 border-rose-800/40 bg-rose-900/10",
    entries: [
      {
        name: "Nasomatto",
        origin: "Amsterdam",
        price: "$180–250",
        body: "Alessandro Gualtieri's one-man operation. No notes listed on packaging. No explanation offered. Either the most pretentious thing in niche or the purest expression of its philosophy, depending on your perspective.",
        frags: [
          { name: "Black Afgano", slug: "nasomatto-black-afgano" },
          { name: "Duro",         slug: "nasomatto-duro"         },
          { name: "Baraonda",     slug: null                     },
        ],
      },
    ],
  },
];

const RULES = [
  {
    n: "01",
    body: "Start with entry-level houses. Maison Margiela and Diptyque exist to give new niche explorers a soft landing. Both are excellent. Neither will make you question your life choices.",
  },
  {
    n: "02",
    body: "Never blind buy above $150. Sample first. Every time. No exceptions. This rule has saved thousands of people from expensive regret.",
  },
  {
    n: "03",
    body: "Ignore the hype cycle. A fragrance everyone is excited about in February is often quietly forgotten by August. Let releases settle before committing.",
  },
  {
    n: "04",
    body: "Read reviews for direction, not decisions. Reviews are useful for finding things worth sampling. They're not useful for telling you whether something is right for you.",
  },
  {
    n: "05",
    body: "Don't let price anchor your judgment. A $400 bottle that smells wrong on you is a worse purchase than a $60 bottle you'll wear every day.",
  },
  {
    n: "06",
    body: "Give weird fragrances time. Some of the best niche fragrances open strangely, smell challenging for twenty minutes, then reveal themselves as something extraordinary. The ones worth patience usually announce themselves clearly.",
  },
];

export default function NicheFragrancePage() {
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
          Down the Rabbit Hole:<br />
          <em className="italic text-amber-400">A Sane Person&apos;s Guide to the Niche World</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          Somewhere between a $35 bottle of Cool Water and a $450 bottle of something that smells
          like a burning library lies a vast, eccentric, occasionally brilliant universe.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          What niche means, why it costs that much, the houses worth knowing, and how to go deep
          without going broke · 14 min read
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          The word &ldquo;niche&rdquo; in fragrance has a specific meaning. Niche doesn&apos;t simply mean
          expensive. It doesn&apos;t mean better. It means something more specific: fragrance built
          around the scent first.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          Smaller production runs, no celebrity contracts, minimal advertising, distribution through
          specialist retailers. The perfumer has more creative freedom because they&apos;re not
          accountable to a marketing brief that requires the fragrance to sell a million units.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          The result is fragrances that can be weirder, more specific, more challenging, and — at
          their best — more extraordinary than most of what the designer world produces. They can
          also be pretentious, overpriced, and genuinely unwearable. The niche world contains
          multitudes. Your job is learning to tell the difference.
        </p>
      </div>

      {/* Why it costs that much */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Price</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Why it costs <em className="italic text-amber-400/80">that much</em>
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-8">
          The honest answer is: several reasons, and not all of them are legitimate. The legitimate
          reasons first: higher concentrations of raw materials, including naturals that are genuinely
          expensive to source. Small production runs mean no economies of scale. Selective
          distribution. Beautiful bottles. The less legitimate reason: prestige pricing. A fragrance
          that costs $40 to produce can retail at $350 if the positioning is right. Price in the
          niche world is a much weaker signal of quality than it is in fine wine.
        </p>

        {/* Cost table */}
        <div className="border border-stone-800 rounded overflow-hidden mb-10">
          <div className="grid grid-cols-3 bg-stone-900/40 px-4 py-2.5 border-b border-stone-800">
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-500">Cost component</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-500">Designer</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-500">Niche</p>
          </div>
          {[
            ["Raw fragrance materials",     "$4–8",     "$15–60+ depending on naturals used"],
            ["Bottle and packaging",         "$3–6",     "$8–25 — often a genuine design object"],
            ["Marketing and advertising",    "$30–60+",  "$2–10 — word of mouth, no campaigns"],
            ["Brand premium",                "Amortised celebrity deal cost", "Prestige positioning — varies wildly"],
          ].map(([component, designer, niche]) => (
            <div key={component} className="grid grid-cols-3 px-4 py-3 border-b border-stone-800/50 last:border-0">
              <p className="text-[11px] text-stone-400 font-light pr-4">{component}</p>
              <p className="text-[11px] text-stone-500 font-light pr-4">{designer}</p>
              <p className="text-[11px] text-stone-500 font-light">{niche}</p>
            </div>
          ))}
        </div>

        {/* Ingredients */}
        <h3 className="font-serif text-xl font-light text-stone-200 mb-6">
          The ingredients that justify the price
        </h3>
        <div className="space-y-3">
          {INGREDIENTS.map(({ name, price, body }) => (
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <div className="flex items-baseline justify-between gap-4 mb-2 flex-wrap">
                <p className="text-stone-200 font-light text-sm">{name}</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-amber-500/70 shrink-0">{price}</p>
              </div>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Houses */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Landscape</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          The houses <em className="italic text-amber-400/80">worth knowing</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-10">
          Organised by where to start. Each tier is a genuine step up in difficulty and sometimes in
          price — but start at the top and work down, not the reverse.
        </p>

        <div className="space-y-10">
          {HOUSES.map(({ tier, tierColor, entries }) => (
            <div key={tier}>
              <span className={`inline-block text-[10px] uppercase tracking-[0.15em] border rounded px-2.5 py-1 mb-5 ${tierColor}`}>
                {tier}
              </span>
              <div className="space-y-3">
                {entries.map(({ name, origin, price, body, frags }) => (
                  <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
                    <div className="flex items-baseline justify-between gap-4 mb-1 flex-wrap">
                      <p className="text-stone-200 font-light">{name}</p>
                      <p className="text-[10px] text-stone-600 shrink-0">{origin} · {price}</p>
                    </div>
                    <p className="text-[11px] text-stone-500 font-light leading-relaxed mb-0">{body}</p>
                    <FragLinks frags={frags} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <PullQuote>
          A fragrance you&apos;ll never wear is not a fragrance. It&apos;s an expensive opinion.
        </PullQuote>
      </section>

      {/* Navigation rules */}
      <section className="mb-16">
        <SectionLabel>Going Deep</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          How to navigate <em className="italic text-amber-400/80">the niche world</em>
        </h2>

        <div className="space-y-0">
          {RULES.map(({ n, body }) => (
            <div key={n} className="flex gap-5 py-6 border-b border-stone-800/60 last:border-0">
              <span className="font-serif text-3xl font-light text-stone-700 leading-none flex-shrink-0 w-8 text-right pt-0.5">
                {n}
              </span>
              <p className="text-sm text-stone-400 font-light leading-relaxed">{body}</p>
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
