import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Beyond the Counter — Niche Fragrance Houses — Fumage Guide",
  description:
    "The world of niche fragrance houses: what separates them from designer, eleven essential houses for masculine fragrance, and how to navigate the category.",
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

const HOUSES: {
  name: string;
  origin: string;
  descriptor: string;
  body: string;
  frags: FragRef[];
}[] = [
  {
    name: "Creed",
    origin: "England / France · Est. 1760",
    descriptor: "The Old Guard — Heritage, Longevity, Royal Warrants",
    body: "Perhaps the most famous niche house in the world, Creed occupies a peculiar position: beloved by collectors and worn widely enough that it has genuine mainstream cachet. Their masculine lineup is exceptional. Aventus remains one of the most copied fragrances on earth for a reason — its smoked birch, blackcurrant, and fresh pineapple accord is simply brilliant. Green Irish Tweed is widely regarded as the finest fougère of the modern era, and Original Vetiver is an unimpeachable study in the grass-root complexity of that material.",
    frags: [
      { name: "Aventus",             slug: "creed-aventus"             },
      { name: "Green Irish Tweed",   slug: "creed-green-irish-tweed"   },
      { name: "Original Vetiver",    slug: "creed-original-vetiver"    },
      { name: "Millesime Impérial",  slug: "creed-millesime-imperial"  },
    ],
  },
  {
    name: "Amouage",
    origin: "Oman · Est. 1983",
    descriptor: "Epic Scale — Operatic Depth, Middle Eastern Luxury",
    body: "Founded in Muscat with a mandate to create the world's most precious perfumes, Amouage takes no small steps. Their masculine collection is cinematic in scope — these are fragrances with overtures, movements, and conclusions. Interlude Man is one of the most discussed and argued-over fragrances of the past two decades: a disorienting, incense-forward composition that rewards patience. Memoir Man combines ink, artemisia, and dark woods into something genuinely literary. Reflection Man, by contrast, is luminous and radiant — proof that the house can whisper as well as thunder.",
    frags: [
      { name: "Interlude Man",  slug: "amouage-interlude-man"       },
      { name: "Memoir Man",     slug: "amouage-amouage-memoir-man"  },
      { name: "Reflection Man", slug: "amouage-reflection-man"      },
      { name: "Epic Man",       slug: "amouage-amouage-epic-man"    },
    ],
  },
  {
    name: "Parfums de Marly",
    origin: "France · Est. 2009",
    descriptor: "Accessible Luxury — Crowd-Pleasing with Genuine Sophistication",
    body: "Inspired by the opulence of 18th-century French court life, Parfums de Marly is perhaps the most accessible entry point into serious niche for someone transitioning from designer fragrances. The quality is high, the compositions are intelligible, and the projection is reliable. Layton is frequently cited as one of the best masculine releases of the 2010s — a warm, vanilla-tinged spiced fragrance that manages to be both crowd-pleasing and interesting. Herod takes a cooler, tobacco-inflected path, while Pegasus offers an elegant vanilla-apple take on the niche fougère. If you are new to this world, start here.",
    frags: [
      { name: "Layton",   slug: "parfums-de-marly-layton"   },
      { name: "Herod",    slug: "parfums-de-marly-herod"    },
      { name: "Pegasus",  slug: "parfums-de-marly-pegasus"  },
      { name: "Percival", slug: "parfums-de-marly-percival" },
    ],
  },
  {
    name: "Xerjoff",
    origin: "Italy · Est. 2003",
    descriptor: "Italian Craftsmanship — Opulent Materials, Architectural Flacons",
    body: "Xerjoff is luxury in the truest sense: the ingredients are exceptional, the bottles are works of art in their own right, and the price tags reflect both. Naxos is arguably the definitive tobacco-honey fragrance — a Sicilian-inspired composition of honeysuckle, jasmine, cinnamon, and tobacco that is sumptuous without being heavy. Lira takes a citrus-tobacco approach that is more restrained but equally refined. The house does not shy from opulence; wearing Xerjoff is a statement of intent about one's relationship with material quality.",
    frags: [
      { name: "Naxos",        slug: "xerjoff-naxos"               },
      { name: "Lira",         slug: "xerjoff-lira"                 },
      { name: "Alexandria II",slug: "xerjoff-xerjoff-alexandria-ii"},
      { name: "Nio",          slug: "xerjoff-nio"                  },
    ],
  },
  {
    name: "Initio Parfums Privés",
    origin: "France · Est. 2015",
    descriptor: "The Pheromone Thesis — Raw, Animalic, Magnetic",
    body: "Initio's brand philosophy centres on the idea that fragrance operates on a primal, near-biological level — and their compositions are built to back that claim. Oud for Greatness is one of the most striking masculine ouds available at any price point: dark, smoky, and unapologetically loud. Rehab takes amber and vanilla and pushes them to the edge of indecency in the best possible way. This is not a house for the timid or the minimalist, but for those who want their fragrance to be felt rather than merely noticed, few houses in this price bracket compete.",
    frags: [
      { name: "Oud for Greatness", slug: "initio-parfums-priv-s-oud-for-greatness" },
      { name: "Rehab",             slug: "initio-parfums-priv-s-rehab"              },
      { name: "Atomic Rose",       slug: "initio-parfums-priv-s-atomic-rose"        },
      { name: "Side Effect",       slug: "initio-parfums-priv-s-side-effect"        },
    ],
  },
  {
    name: "Nishane",
    origin: "Turkey · Est. 2012",
    descriptor: "The Rising Star — Bold Concepts, Remarkable Value in Tier",
    body: "Istanbul-based Nishane has emerged as one of the most exciting houses in niche perfumery over the past decade. Their fragrances are conceptually ambitious but remain remarkably wearable. Hacivat — a green, ozonic woody fragrance — has developed a near-cult following as a year-round masculine workhorse. Ani goes fuller and warmer, blending sandalwood and musk into something genuinely meditative. The house's Turkish sensibility shows in an ability to balance Eastern ingredient traditions with contemporary Western structure.",
    frags: [
      { name: "Hacivat",        slug: "nishane-hacivat"          },
      { name: "Ani",            slug: "nishane-ani"              },
      { name: "Fan Your Flames",slug: "nishane-fan-your-flames"  },
      { name: "Wulóng Chá",     slug: "nishane-wulong-cha"       },
    ],
  },
  {
    name: "Nasomatto",
    origin: "Netherlands / Italy · Est. 2007",
    descriptor: "The Provocateur — Conceptual, Difficult, Unforgettable",
    body: "Alessandro Gualtieri's Nasomatto is resolutely confrontational. He names his fragrances after experiences rather than ingredients — Black Afgano, Duro, Pardon — and the compositions are deliberately opaque, often refusing to reveal traditional top-heart-base progressions. Black Afgano, inspired by hashish culture, is a dark, resiny, incense-heavy masculine that has become a genuine collector's piece. Duro (meaning \"hard\" in Italian) is a masculine fougère stripped of everything but its skeletal structure. These are not fragrances for daily commuting.",
    frags: [
      { name: "Black Afgano", slug: "nasomatto-black-afgano"       },
      { name: "Duro",         slug: "nasomatto-duro"               },
      { name: "Pardon",       slug: "nasomatto-nasomatto-pardon"   },
    ],
  },
  {
    name: "D.S. & Durga",
    origin: "United States · Est. 2007",
    descriptor: "American Storytelling — Place, Memory, and Atmosphere",
    body: "Brooklyn-based D.S. & Durga, founded by David Seth Moltz and Kavi Moltz, approaches fragrance as a form of literary fiction. Every release is a story — a specific place, moment, or character rendered in scent. Big Sur After Rain captures exactly what the name promises: coastal sage, mineral stone, fog. I Don't Know What (a bold naming choice) is a warm, mysterious wood-and-smoke composition that rewards those willing to sit with ambiguity. The house is particularly strong for those who find European niche houses too baroque — there is a laconic American directness here that is refreshing.",
    frags: [
      { name: "I Don't Know What", slug: "ds-durga-ds-durga-i-don-t-know-what" },
      { name: "Big Sur After Rain", slug: null                                  },
      { name: "Cowboy Grass",       slug: null                                  },
      { name: "Debaser",            slug: null                                  },
    ],
  },
  {
    name: "Tauer Perfumes",
    origin: "Switzerland · Est. 2004",
    descriptor: "The Independent Master — Perfumer-Owned, Artisanal Quality",
    body: "Andy Tauer is a self-taught perfumer who remains the sole nose behind every Tauer composition, making him a rarity in an industry that often separates brand from craftsman. L'Air du Désert Marocain is widely considered one of the great independent masculine fragrances of the modern era — a dry, mineral, incense-forward desert air composition of rare coherence. Lonestar Memories takes that dryness and pivots toward American West leather and smoke. These fragrances are made with absolute conviction, which shows in every wearing.",
    frags: [
      { name: "L'Air du Désert Marocain", slug: "tauer-tauer-perfumes-l-air-du-d-sert-marocain" },
      { name: "Lonestar Memories",        slug: null                                              },
      { name: "Au Coeur du Désert",       slug: null                                              },
    ],
  },
  {
    name: "Roja Parfums",
    origin: "England · Est. 2011",
    descriptor: "The Pinnacle — Rare Ingredients, Unapologetic Extravagance",
    body: "Roja Dove spent decades as the head of Guerlain's fine fragrance division before founding his own house, and Roja Parfums carries that pedigree in every bottle. Prices routinely sit between £400 and £1,200 per bottle. What you receive in return is access to raw materials that simply do not appear at lower price points: genuine Mysore sandalwood, natural rose absolute at exceptional concentrations, oud sourced with the kind of specificity most houses do not bother with. Elysium Pour Homme is the house's most acclaimed masculine — a transparent, luminous citrus-musk of rare structural elegance. Oligarch is the bolder statement: a rich oriental built around leather, tobacco, and precious wood.",
    frags: [
      { name: "Elysium Pour Homme", slug: "roja-dove-elysium-pour-homme"  },
      { name: "Oligarch",           slug: "roja-dove-oligarch"             },
      { name: "Enigma Pour Homme",  slug: "roja-dove-enigma-pour-homme"   },
      { name: "Apex",               slug: null                             },
    ],
  },
  {
    name: "Maison Margiela Replica",
    origin: "France · Est. 2012",
    descriptor: "The Gateway — Concept-Driven, Broadly Accessible, Genuinely Interesting",
    body: "Technically the fragrance line of a fashion house, Maison Margiela's Replica collection is the most accessible serious fragrance line in this survey, priced firmly in the designer range, yet it operates with a concept-driven intentionality that puts it firmly in the niche conversation. Each Replica fragrance is an attempt to reconstruct a specific sensory memory — a barbershop at 8am, a wood-burning fireplace in December, a jazz club at midnight. For men, Jazz Club is the standout: tobacco leaf, rum, vetiver, and vanilla blended into something unmistakably nocturnal and masculine. Think of it as a supremely well-curated entry point.",
    frags: [
      { name: "Jazz Club",       slug: "maison-margiela-replica-jazz-club"        },
      { name: "By the Fireplace",slug: "maison-margiela-replica-by-the-fireplace" },
      { name: "Sailing Day",     slug: "maison-margiela-replica-sailing-day"      },
      { name: "Coffee Break",    slug: "maison-margiela-replica-coffee-break"     },
    ],
  },
];

const OCCASIONS = [
  {
    numeral: "I",
    title: "Evening & Social",
    body: "The natural home of bold niche masculines. Dark, resinous, and animalic fragrances thrive when skin is warmer and context is more relaxed — Initio, Nasomatto, Amouage's heavier releases.",
  },
  {
    numeral: "II",
    title: "Professional Wear",
    body: "Lighter, structured entries from Creed, Nishane, and Parfums de Marly translate well to office environments. Think Hacivat, Green Irish Tweed, or Layton at a conservative application.",
  },
  {
    numeral: "III",
    title: "Seasonal Anchors",
    body: "Many collectors build a seasonal rotation: Tauer and Amouage for autumn and winter, Creed Millesime Impérial and D.S. & Durga for warmer months.",
  },
  {
    numeral: "IV",
    title: "Signature Scent",
    body: "For those who commit to one fragrance as a personal signature, versatile picks like Aventus, Ani, or Pegasus offer the longevity and character to carry that role.",
  },
];

export default function NicheFragranceHousesPage() {
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
          Niche · Houses
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 leading-[1.08] mb-6">
          Beyond the Counter:<br />
          <em className="italic text-amber-400">The World of Niche Fragrance Houses</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          Every bottle in a department store smells like a variation on the last one. The same safe musks.
          The same inoffensive citrus openings. That frustration has an answer.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          Eleven houses worth knowing, when to wear them, and the difference between niche and bespoke · 16 min read
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          Niche fragrance houses operate outside the commercial machinery that governs designer scent
          production. Where a luxury fashion label might commission a fragrance that needs to sell to
          40 million people globally, a niche house produces scents built around artistic vision, raw
          ingredient quality, and storytelling — not focus groups.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          For men — and for anyone drawn to the traditionally masculine end of the fragrance spectrum —
          the niche world is especially rewarding. The big commercial houses tend to be most conservative
          with men's fragrances, defaulting to a narrow palette of aquatics, sporty greens, and barbershop
          fougères. Niche houses suffer no such hesitation. They will put actual oud resin, charred wood,
          tobacco leaf, old leather, gunpowder, and raw vetiver in a bottle and charge you accordingly —
          and the results are often extraordinary.
        </p>
      </div>

      {/* What is niche */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Understanding the Category</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          What makes a house <em className="italic text-amber-400/80">&ldquo;niche&rdquo;?</em>
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          The term &ldquo;niche&rdquo; in perfumery refers less to market size and more to intent. A niche house
          prioritises the formula over the brand story, the raw material over the margin. These houses
          typically maintain smaller distribution — often sold through independent boutiques, specialty
          retailers, and their own websites — and produce in lower volumes with higher concentrations
          of quality ingredients. Pricing tends to reflect this: expect to pay between $150 and $600 or
          more for a standard 50–100ml bottle, with certain ultra-premium houses asking considerably more.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          Niche should not be confused with indie or artisan — though there is genuine overlap. Some niche
          houses are large, storied institutions with decades of history; others are genuinely small
          operations run by a single perfumer. What unites them is the commitment to a vision that
          isn&apos;t primarily commercial.
        </p>

        <PullQuote>
          A designer fragrance asks: will people like this? A niche fragrance asks: is this true?
        </PullQuote>
      </section>

      {/* House cards */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Essential Players</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Niche houses <em className="italic text-amber-400/80">worth knowing</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-10">
          The following houses have earned significant reputations in the masculine and masculine-leaning
          space. This is not an exhaustive list — the niche world is vast — but these are the names that
          come up most consistently among serious collectors, ranging from accessible gateway entries to
          the rarefied apex of the category.
        </p>

        <div className="space-y-3">
          {HOUSES.map(({ name, origin, descriptor, body, frags }) => (
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <div className="flex items-baseline justify-between gap-4 mb-1 flex-wrap">
                <p className="text-stone-200 font-light">{name}</p>
                <p className="text-[10px] text-stone-600 shrink-0">{origin}</p>
              </div>
              <p className="text-[10px] uppercase tracking-[0.1em] text-amber-500/70 mb-2">{descriptor}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
              <FragLinks frags={frags} />
            </div>
          ))}
        </div>
      </section>

      {/* When to wear */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Contextual Wearing</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          When does niche <em className="italic text-amber-400/80">make sense?</em>
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-8">
          Many niche masculines are high-projection, high-longevity, or deliberately unusual. Context
          matters considerably more than it does with a safe designer fragrance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {OCCASIONS.map(({ numeral, title, body }) => (
            <div key={numeral} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <p className="font-serif text-2xl font-light text-stone-700 mb-2">{numeral}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-stone-300 mb-2">{title}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Niche vs Bespoke */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>An Important Distinction</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Niche vs. Bespoke
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          Niche fragrances are often mistakenly conflated with bespoke or custom fragrance services.
          The distinction is significant — both in process and in what you are actually purchasing.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          A <span className="text-stone-300">niche fragrance</span> is a completed, commercially available
          product created by a perfumer and sold to anyone willing to pay for it. The artistry belongs
          to the house. Your relationship to it is one of curation and discovery.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-8">
          A <span className="text-stone-300">bespoke fragrance</span> is one designed specifically for you,
          through an extended consultation with a perfumer who creates something that exists nowhere else.
          Services typically begin at $1,000–$2,000 at the low end and extend to $10,000 or more for the
          most exclusive commissions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              label: "Niche Fragrance House",
              items: [
                "Pre-formulated, commercially available",
                "$150–$600+ per bottle, typically",
                "Artistic vision belongs to the perfumer",
                "Sample and decide before committing",
                "Wide (though selective) distribution",
                "Community of fellow wearers; shared reference",
                "Available immediately",
                "Longevity and batch consistency",
              ],
            },
            {
              label: "Bespoke / Custom Perfumery",
              items: [
                "Created exclusively for you",
                "$1,000–$10,000+ for commission",
                "Collaborative; your input shapes the outcome",
                "Extended consultation (weeks to months)",
                "No sampling prior — requires trust",
                "Entirely singular; no shared reference",
                "Significant lead time",
                "Reformulation risk if perfumer moves on",
              ],
            },
          ].map(({ label, items }) => (
            <div key={label} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <p className="text-[10px] uppercase tracking-[0.15em] text-amber-500 mb-4 pb-3 border-b border-stone-800">
                {label}
              </p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-amber-500/50 text-[10px] shrink-0 mt-0.5">—</span>
                    <span className="text-[11px] text-stone-500 font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-sm text-stone-400 font-light leading-relaxed mt-6">
          The practical upshot: niche fragrances offer extraordinary quality and artistry at a price point
          that, while premium, is accessible to anyone who takes fragrance seriously. Bespoke is for those
          who have already exhausted the niche world&apos;s existing vocabulary and require something the
          market cannot provide. Most serious collectors will find more than enough within the niche
          universe to spend a lifetime exploring.
        </p>
      </section>

      {/* Where to begin */}
      <section className="mb-12">
        <SectionLabel>Final Word</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Where to begin
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          The single best advice for anyone entering the niche fragrance space is simple: sample before
          you buy. Nearly every house listed here offers decant programmes, sample sets, or sells
          individual trial vials. Given that a full bottle of something you dislike is an expensive
          mistake, the economics of sampling are straightforwardly in your favour.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          Think of the houses here as a loose ladder of entry. Maison Margiela Replica is the sensible
          first rung — concept-driven, immediately intelligible, and priced low enough that sampling
          several bottles carries no great financial risk. Parfums de Marly, Nishane, and Creed occupy
          the middle tier: consistently excellent, broadly wearable, and complex enough to reward
          sustained attention.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          From there, the more demanding territory of Amouage, Nasomatto, Initio, and Tauer awaits
          those whose noses have developed the vocabulary to meet them. And at the summit, Roja Parfums
          sits as a destination for those who regard fragrance as they do any serious luxury — something
          in which excellence and expense are genuinely and proportionally related. The journey is, as
          anyone who has taken it will tell you, one of the more rewarding rabbit holes a well-dressed
          person can descend into.
        </p>

        <p className="text-sm text-stone-600 font-light leading-relaxed mt-6 italic font-serif">
          Your nose will thank you. Your wallet may have complicated feelings about it.
        </p>
      </section>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
