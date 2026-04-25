import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Smart Shelf — Affordable Fragrance Alternatives — Fumage Guide",
  description:
    "Gulf heritage houses, the clone economy, and building a tiered fragrance wardrobe. Seven value-tier houses worth knowing, with niche-to-value pairing recommendations.",
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

type HouseType = "clone" | "tradition" | "hybrid";

const HOUSES: {
  name: string;
  origin: string;
  type: HouseType;
  typeLabel: string;
  descriptor: string;
  body: string[];
  frags: FragRef[];
}[] = [
  {
    name: "Armaf",
    origin: "United Arab Emirates · Est. 2013 · $20–$45",
    type: "hybrid",
    typeLabel: "Clone + Original",
    descriptor: "The Most Famous Name in Value Fragrance — Indispensable and Occasionally Brilliant",
    body: [
      "Armaf is the house that put the value fragrance category on the radar of mainstream collectors, and it did so almost entirely on the strength of one fragrance: Club de Nuit Intense Man, the notorious Aventus clone that is still, nearly a decade after release, the most discussed budget fragrance in the hobby. CDNIM is genuinely excellent — its birch smoke, blackcurrant, and dry fruit accord is a creditable reconstruction of the Creed formula, and its performance frankly embarrasses its price tag. It is not Aventus. It is close enough that many collectors wear it for everyday use and save their Aventus for special occasions.",
      "Beyond the flagship, Armaf's catalog is varied in quality. Club de Nuit Sillage and the newer Club de Nuit Blue Iconic offer different angles on the same smoky fruity accord family. The Odyssey line provides dependable woody masculines at ultra-accessible prices.",
    ],
    frags: [
      { name: "Club de Nuit Intense Man", slug: "armaf-club-de-nuit-intense-man-edp" },
      { name: "CDNI Sillage",             slug: null                                  },
      { name: "Club de Nuit Blue Iconic", slug: null                                  },
      { name: "Odyssey",                  slug: "armaf-odyssey-homme"                 },
    ],
  },
  {
    name: "Lattafa Perfumes",
    origin: "United Arab Emirates · Est. 2002 · $15–$35",
    type: "tradition",
    typeLabel: "Gulf Tradition",
    descriptor: "The Gulf Specialist — Dense, Rich, Unapologetically Oriental",
    body: [
      "Where Armaf courts the Western collector market, Lattafa is far more rooted in Gulf fragrance tradition. Their catalog skews heavily oriental — thick amber resins, deep oud, sweetened musks, and the kind of longevity that is measured not in hours but in days. This is not a house for those who prefer linear, clean, or aquatic masculines. It is a house for those who want to be noticed in a room and remembered after they leave it.",
      "Asad (“Lion” in Arabic) is the house’s strongest masculine statement — a bold amber and oud composition with a leather backbone that overperforms dramatically at its price. Khamrah is a dessert-like oriental that leans sweet but carries enough resinous depth to avoid reading as simple. Raghba takes the classic Lattafa formula and anchors it in drier, smokier territory. For anyone curious about the Gulf fragrance tradition in its most characteristic form, Lattafa is the obvious starting point.",
    ],
    frags: [
      { name: "Asad",               slug: "lattafa-asad"                     },
      { name: "Khamrah",            slug: "lattafa-khamrah"                  },
      { name: "Raghba",             slug: "lattafa-raghba"                   },
      { name: "Oud for Glory",      slug: "lattafa-bade-e-al-oud-oud-for-glory" },
      { name: "Oud Mood",           slug: "lattafa-oud-mood"                 },
    ],
  },
  {
    name: "Afnan Perfumes",
    origin: "United Arab Emirates · Est. 2016 · $20–$45",
    type: "hybrid",
    typeLabel: "Clone + Oriental",
    descriptor: "The Night-Out Specialist — 9PM Changed the Game",
    body: [
      "Afnan arrived relatively late to the value-tier conversation but made an immediate and outsized impression with 9PM — a rich, gourmand-leaning masculine that draws clear inspiration from YSL's La Nuit de L'Homme but reconstructs it with more sweetness, more amber, and considerably more projection. 9PM has become a legitimate cult fragrance in its own right, worn by collectors who have long since moved past caring about its inspiration. It is simply excellent on its own terms: warm, seductive, evening-appropriate, and built for cold weather.",
      "Afnan's broader catalog includes Supremacy Silver (a clean, soapy masculine for warmer weather) and a growing oriental collection. Their sister brand Zimaya operates in similar territory but pushes further into oud and resin-heavy compositions for those who find Afnan's mainline too restrained.",
    ],
    frags: [
      { name: "9PM",              slug: "afnan-9-pm"               },
      { name: "Supremacy Silver", slug: "afnan-supremacy-silver"   },
      { name: "Supremacy Noir",   slug: null                        },
      { name: "Zimaya Oud & Rose",slug: null                        },
    ],
  },
  {
    name: "Rasasi",
    origin: "United Arab Emirates · Est. 1979 · $25–$60",
    type: "tradition",
    typeLabel: "Gulf Tradition",
    descriptor: "The Veteran — One of the Oldest Houses in the UAE, Quietly Excellent",
    body: [
      "Rasasi is frequently overlooked in discussions of value-tier fragrance simply because it is less aggressively marketed than newer houses. This is a mistake. Founded in 1979, Rasasi predates most of the commercial Gulf fragrance boom and carries the credibility of genuine heritage. Their catalog is extensive and uneven, but the highlights are genuinely impressive.",
      "Daarej Pour Homme is a beautifully constructed spicy woody oriental, built around oud, sandalwood, and a saffron thread that gives it real complexity. La Yuqawam Pour Homme leans fresher and more internationally accessible, making it one of the stronger all-season options in the value tier. Rasasi rewards the patient shopper willing to look past the less distinguished entries to find its genuinely excellent ones.",
    ],
    frags: [
      { name: "Daarej Pour Homme",      slug: null                               },
      { name: "La Yuqawam Pour Homme",  slug: "rasasi-la-yuqawam-pour-homme"    },
      { name: "Habibi Pour Homme",      slug: null                               },
      { name: "Hawas for Him",          slug: "rasasi-hawas"                     },
    ],
  },
  {
    name: "Al Haramain Perfumes",
    origin: "Saudi Arabia · Est. 1970 · $20–$80",
    type: "tradition",
    typeLabel: "Gulf Tradition",
    descriptor: "The Heritage House — Rooted in Makkah, Revered for Oud and Amber",
    body: [
      "Al Haramain is the oldest major house in this survey, founded in Makkah in 1970, and its catalog reflects that deep historical grounding. The house operates across multiple price tiers, from entry-level attars and oils at under $20 through their well-regarded Amber Oud color series in the $40–$60 range. The Amber Oud Blue is a notably fresher, more approachable masculine variant for those wary of going too heavy.",
      "The house's oil-based attar formats are worth specific attention: Al Haramain produces some of the finest and most authentic oud oils available at accessible price points. Their L'Aventure line also bears mention as a creditable masculine collection that reads international without abandoning the house's oriental roots.",
    ],
    frags: [
      { name: "Amber Oud Blue Edition", slug: "al-haramain-amber-oud-blue-edition"  },
      { name: "Amber Oud Gold Edition", slug: "al-haramain-amber-oud-gold-edition"  },
      { name: "L'Aventure",             slug: "al-haramain-l-aventure"              },
      { name: "Madinah Attar",          slug: null                                  },
    ],
  },
  {
    name: "Maison Alhambra",
    origin: "United Arab Emirates (Paris Corner Group) · Est. 2019 · $20–$40",
    type: "clone",
    typeLabel: "Clone-Focused",
    descriptor: "The Most Explicit Clone Catalog — Unapologetic, Surprisingly Accomplished",
    body: [
      "If Armaf is the polished, diplomatically worded version of the clone economy, Maison Alhambra is the unfiltered one. They make no real effort to obscure which fragrances inspired their catalog, and their packaging frequently echoes the visual language of the houses they reference. This directness can feel brazen — and it is — but the quality of execution is often legitimately impressive.",
      "Exclusif Oud is a well-regarded Oud for Greatness alternative. Minerale performs creditably in the Aventus-adjacent space. The caveat here is clear: these fragrances exist in direct dialogue with their inspirations, and wearing them is an unambiguous choice about value over originality. For the right wearer in the right context, that is a perfectly rational choice.",
    ],
    frags: [
      { name: "Exclusif Oud", slug: "maison-alhambra-exclusif-oud" },
      { name: "Minerale",     slug: null                            },
      { name: "Jade",         slug: null                            },
      { name: "Encens Roi",   slug: null                            },
    ],
  },
  {
    name: "Ard Al Zaafaran",
    origin: "United Arab Emirates · Est. 1998 · $10–$30",
    type: "tradition",
    typeLabel: "Gulf Tradition",
    descriptor: "The Best-Kept Secret — Perfume Oil Tradition at Exceptional Value",
    body: [
      "Ard Al Zaafaran operates at the intersection of the perfume oil attar tradition and the modern spray-format market, and it does both with more authenticity than most houses at this price point. Their Dahn Al Oud series represents some of the most affordable access to genuine oud-based fragrance available anywhere, with regional variations — Indian, Cambodian, Hindi — that give serious collectors a way to explore oud's range without committing to the substantial costs of premium sourcing from niche houses.",
      "For spray-format wearers, Oud 24 Hours is a robust oriental masculine that lives up to its name in terms of longevity. The house's price points — some bottles under $15 — make it an essential source for curious explorers operating on tight budgets.",
    ],
    frags: [
      { name: "Dahn Al Oud Cambodi", slug: null                                       },
      { name: "Oud 24 Hours",        slug: "ard-al-zaafaran-ard-al-zaafaran-oud-24-hours" },
      { name: "Director",            slug: null                                       },
      { name: "Shadha",              slug: null                                       },
    ],
  },
];

const TYPE_STYLE: Record<HouseType, string> = {
  clone:     "text-amber-500 border-amber-800/40 bg-amber-900/10",
  tradition: "text-sky-400 border-sky-800/40 bg-sky-900/10",
  hybrid:    "text-stone-400 border-stone-700/40 bg-stone-900/10",
};

const TIERS = [
  {
    name: "Pinnacle",
    price: "$400–$1,200+",
    color: "text-amber-500",
    body: "Reserved for occasions that demand the best. Roja Parfums, high-end Amouage, Xerjoff. One or two bottles worn sparingly, preserved carefully. These are the fragrances you want to be wearing at the moments you will actually remember.",
  },
  {
    name: "Niche Core",
    price: "$150–$400",
    color: "text-amber-400/80",
    body: "The backbone of a serious collection. Creed, Parfums de Marly, Nishane, Initio, Nasomatto. These earn regular rotation and represent genuine investment in quality. Three to six bottles covering different seasons, moods, and contexts.",
  },
  {
    name: "Gateway",
    price: "$60–$150",
    color: "text-sky-400",
    body: "Maison Margiela Replica, the better Rasasi releases, Al Haramain's upper catalog. These occupy the bridge between value and niche — not quite as singular as true niche, but offering real quality and genuine wearability. Excellent for building contextual coverage.",
  },
  {
    name: "Smart Shelf",
    price: "$15–$50",
    color: "text-stone-400",
    body: "Armaf, Lattafa, Afnan, Ard Al Zaafaran, Maison Alhambra. The workhorses — worn daily, worn to the gym, worn in weather that would make you wince applying something expensive. Large bottles, liberal application, no anxiety. This tier earns its place precisely because no anxiety is the correct emotional relationship with a $25 fragrance.",
  },
];

const PAIRINGS: {
  niche: { name: string; slug: string | null };
  value: { name: string; slug: string | null };
  context: string;
}[] = [
  {
    niche: { name: "Creed Aventus",             slug: "creed-aventus"                              },
    value: { name: "Armaf Club de Nuit Intense Man", slug: "armaf-club-de-nuit-intense-man-edp"   },
    context: "Daily wear, travel, outdoor events, any occasion where applying a $400 fragrance would cause genuine anxiety",
  },
  {
    niche: { name: "Initio Oud for Greatness",  slug: "initio-parfums-priv-s-oud-for-greatness"   },
    value: { name: "Maison Alhambra Exclusif Oud", slug: "maison-alhambra-exclusif-oud"           },
    context: "Casual evenings, weekends at home, getting familiar with the oud-smoke accord before committing",
  },
  {
    niche: { name: "YSL La Nuit de L'Homme",    slug: "yves-saint-laurent-la-nuit-de-l-homme"     },
    value: { name: "Afnan 9PM",                 slug: "afnan-9-pm"                                },
    context: "Whenever you want the warm spiced-cardamom effect without rationing the bottle",
  },
  {
    niche: { name: "Amouage Interlude Man",      slug: "amouage-interlude-man"                     },
    value: { name: "Lattafa Asad",              slug: "lattafa-asad"                              },
    context: "Cold-weather daily driver — captures the amber-oud-leather register at a fraction of the cost",
  },
  {
    niche: { name: "Creed Millesime Impérial",  slug: "creed-millesime-imperial"                  },
    value: { name: "Al Haramain Amber Oud Blue",slug: "al-haramain-amber-oud-blue-edition"        },
    context: "Summer versatility — light, aquatic-leaning oriental without the price anxiety",
  },
  {
    niche: { name: "Tauer L'Air du Désert Marocain", slug: "tauer-tauer-perfumes-l-air-du-d-sert-marocain" },
    value: { name: "Rasasi Daarej Pour Homme",  slug: null                                        },
    context: "Autumn/winter daily wear when the dry incense-and-spice register is right but the Tauer feels too precious",
  },
  {
    niche: { name: "Nishane Hacivat",           slug: "nishane-hacivat"                           },
    value: { name: "Armaf Club de Nuit Blue Iconic", slug: null                                   },
    context: "Professional settings — the green-woody-ozonic accord family at commuter-friendly volume and price",
  },
];

function FragLink({ name, slug }: { name: string; slug: string | null }) {
  if (slug) {
    return (
      <Link href={`/fragrances/${slug}`} className="text-stone-300 hover:text-amber-400 transition-colors underline underline-offset-2 decoration-stone-700">
        {name}
      </Link>
    );
  }
  return <span className="text-stone-400">{name}</span>;
}

export default function SmartShelfPage() {
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
          Buying Guide · Value
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 leading-[1.08] mb-6">
          The Smart Shelf:<br />
          <em className="italic text-amber-400">Affordable Alternatives for the Fragrance-Obsessed</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          Some of the most interesting, longest-lasting scents available today come in bottles
          that cost less than a decent dinner. Once you know they exist, it becomes very
          difficult to pretend they don&apos;t.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          Gulf heritage houses · the clone economy · building a tiered wardrobe · 15 min read
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          This article is not about cutting corners. A niche fragrance collection built around
          houses like Creed, Amouage, or Roja Parfums remains the gold standard, and nothing
          here should suggest otherwise. What we are talking about is intelligence — the kind that
          recognizes a $30 bottle can earn a place on the same shelf as a $400 one, for different
          reasons, worn at different moments, serving different purposes in a well-considered wardrobe.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          There is also, frankly, an entire cultural tradition at play here that deserves respect in
          its own right. The Gulf fragrance industry is not a footnote to European perfumery. It is
          a rich, ancient, and distinct olfactory heritage that predates the modern French perfume
          industry by centuries — one that has simply found a new commercial vehicle in the
          value-priced bottles now flooding the global market.
        </p>
      </div>

      {/* Section I: Gulf tradition */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Context and Culture</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          The Gulf fragrance tradition
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          The Arabian Peninsula has been at the centre of the global fragrance trade for millennia.
          The incense routes that carried oud, frankincense, myrrh, and ambergris across the ancient
          world originated in Yemen and Oman. The cultural practice of perfuming — of burning oud
          wood, applying attar oils, and scenting clothing and living spaces — is woven into the
          fabric of Gulf social and religious life in a way that has no real parallel in Western culture.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          What this means in practical terms is that the palate being catered to by houses like
          Lattafa, Rasasi, and Al Haramain is not a discount approximation of the Western luxury
          palate. It is a distinct tradition, with its own vocabulary of preferred ingredients:
          heavy oud, thick amber resins, rose absolute, saffron, musk, and the kind of tenacious
          base notes that can still be detected on fabric three days after wearing. When these
          fragrances smell different from their European counterparts — denser, sweeter, more
          persistently animalic — that is not a deficiency. It is a feature.
        </p>
        <div className="border border-stone-800 rounded p-5 bg-stone-950/30">
          <p className="text-[10px] uppercase tracking-[0.2em] text-sky-400 mb-3">A note on terminology</p>
          <p className="text-[11px] text-stone-500 font-light leading-relaxed">
            Within fragrance communities, these houses are often grouped under the umbrella of
            &ldquo;Arabian&rdquo; or &ldquo;Middle Eastern&rdquo; perfumery, or simply &ldquo;budget orientals.&rdquo; Neither
            term is fully satisfactory. For our purposes: these are value-tier commercial houses
            operating primarily out of the UAE and Saudi Arabia, producing fragrances at price
            points designed for wide accessibility. Their quality ranges from serviceable to
            genuinely impressive, and their cultural roots run deeper than their price tags suggest.
          </p>
        </div>
      </section>

      {/* Section II: Clone economy */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Elephant in the Room</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          The clone economy — <em className="italic text-amber-400/80">what it is and how to use it</em>
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          We should address the subject that dominates any discussion of houses like Armaf and
          Maison Alhambra directly: these houses produce fragrances that are deliberately and
          explicitly designed to smell like more expensive ones. The industry term is &ldquo;inspired by.&rdquo;
          The more direct word is clone.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          The fragrance clone economy is substantial, global, and largely accepted by the collecting
          community. Fragrance formulas cannot be patented in most jurisdictions — you can trademark
          a name and bottle design, but not a smell. This means that a skilled perfumer who has
          analysed the composition of, say, Creed Aventus is entirely within their legal rights to
          reconstruct a near-identical accord and sell it under a different name. Many do. Some are
          quite good.
        </p>

        <PullQuote>
          Wearing a clone is not a statement of poverty. It is a statement of pragmatism — the
          recognition that smelling excellent and spending wisely are not mutually exclusive goals.
        </PullQuote>

        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          The practical applications are clear: if you love a $400 fragrance but cannot justify
          wearing it to the gym or running weekend errands, a well-made clone at $30 solves that
          problem elegantly. You preserve the expensive bottle for occasions that justify it.
          You smell the same.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          The important caveat is quality variance. Not all clones are created equal, and many are
          transparently inferior — thin, synthetic, fleeting versions of their inspiration that
          capture only the broadest outlines of the original. The houses covered here have been
          selected on the basis of being <span className="text-stone-300 italic">genuinely good</span>,
          not merely passable. There is a difference, and it matters.
        </p>
      </section>

      {/* Section III: House cards */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Essential Houses</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Who&apos;s worth <em className="italic text-amber-400/80">your attention</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-10">
          Seven houses representing the best of what the value tier has to offer — from explicit
          clone catalogs to genuine original oriental compositions, and everything in between.
        </p>

        <div className="space-y-3">
          {HOUSES.map(({ name, origin, type, typeLabel, descriptor, body, frags }) => (
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
                <p className="text-stone-200 font-light">{name}</p>
                <span className={`text-[10px] uppercase tracking-[0.1em] border rounded px-2 py-0.5 shrink-0 ${TYPE_STYLE[type]}`}>
                  {typeLabel}
                </span>
              </div>
              <p className="text-[10px] text-stone-600 mb-1">{origin}</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-amber-500/70 mb-3">{descriptor}</p>
              {body.map((para, i) => (
                <p key={i} className="text-[11px] text-stone-500 font-light leading-relaxed mb-2 last:mb-0">
                  {para}
                </p>
              ))}
              <FragLinks frags={frags} />
            </div>
          ))}
        </div>
      </section>

      {/* Section IV: Tiered wardrobe */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Building Your Collection</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          A tiered fragrance wardrobe
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-8">
          The most intelligent fragrance collection is not the most expensive one — it is the most
          considered one. A four-tier approach, mixing premium niche investment pieces with
          accessible daily drivers and targeted value acquisitions, allows a collector to cover
          more contextual ground while managing the financial reality that a full wardrobe of
          niche fragrances would be prohibitively expensive for almost anyone.
        </p>

        <div className="border border-stone-800 rounded overflow-hidden">
          {TIERS.map(({ name, price, color, body }, i) => (
            <div
              key={name}
              className={`flex gap-0 ${i < TIERS.length - 1 ? "border-b border-stone-800/60" : ""}`}
            >
              <div className="w-28 shrink-0 p-4 border-r border-stone-800/60 flex flex-col justify-center">
                <p className={`text-[10px] uppercase tracking-[0.15em] font-medium mb-1 ${color}`}>{name}</p>
                <p className="text-[10px] text-stone-600 font-light">{price}</p>
              </div>
              <div className="flex-1 p-4 bg-stone-950/30">
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section V: Pairing table */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Practical Reference</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Pairing your shelf — <em className="italic text-amber-400/80">niche to value</em>
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-8">
          Collector-vetted combinations — a niche reference fragrance alongside its best available
          value-tier counterpart, with notes on when each version earns the call.
        </p>

        <div className="border border-stone-800 rounded overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1.2fr] bg-stone-900/60 border-b border-stone-800">
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-500 px-4 py-2.5">Niche Reference</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-500 px-4 py-2.5 border-l border-stone-800">Value Alternative</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-500 px-4 py-2.5 border-l border-stone-800 hidden sm:block">Wear the value version when…</p>
          </div>
          {PAIRINGS.map(({ niche, value, context }, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_1fr] sm:grid-cols-[1fr_1fr_1.2fr] ${i < PAIRINGS.length - 1 ? "border-b border-stone-800/50" : ""}`}
            >
              <div className="px-4 py-3">
                <p className="text-[11px] font-light leading-snug">
                  <FragLink name={niche.name} slug={niche.slug} />
                </p>
              </div>
              <div className="px-4 py-3 border-l border-stone-800/60">
                <p className="text-[11px] text-amber-500/80 font-light leading-snug">
                  <FragLink name={value.name} slug={value.slug} />
                </p>
              </div>
              <div className="px-4 py-3 border-l border-stone-800/60 hidden sm:block">
                <p className="text-[11px] text-stone-600 font-light leading-relaxed">{context}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing note */}
      <section className="mb-12">
        <SectionLabel>A Final Word on Snobbery</SectionLabel>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          The fragrance hobby has a tendency toward hierarchy that can curdle into snobbery, and
          nowhere is that more apparent than in discussions of value-tier houses. The collector who
          dismisses Armaf or Lattafa categorically is not making a quality judgment — they are
          making a status one. There is a difference, and it is worth being honest about it.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          A $25 bottle that lasts twelve hours on skin and earns genuine compliments is objectively
          doing its job better than a $300 designer fragrance that fades in two hours and smells
          like everyone else in the elevator. Fragrance is ultimately about the sensory experience,
          the personal statement, and the pleasure of the wearing. Price contributes to some of
          those things and is irrelevant to others.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          The smartest collectors we know own bottles across every tier. They wear the right thing
          for the right moment, carry no anxiety about applying generously when the occasion calls
          for it, and reserve their reverence — and their most expensive bottles — for the moments
          that deserve it. That, in the end, is what a smart shelf looks like.
        </p>
      </section>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
