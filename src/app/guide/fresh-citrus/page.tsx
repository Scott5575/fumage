import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Misunderstood Family — Fumage Guide",
  description: "Fresh and citrus fragrances done well — why the category deserves a second look and the best it has to offer.",
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
    name:    "Pure Citrus",
    tag:     "Squeeze and brightness",
    body:    "Bergamot, lemon, grapefruit, mandarin. The most traditional strand. Done well: sparkling and joyful. Done poorly: gone in thirty minutes.",
  },
  {
    name:    "Aquatic / Marine",
    tag:     "Sea air and open water",
    body:    "Built around synthetic molecules like calone. Defined the 1990s. Aquatic base notes give longevity that pure citrus can't. Cool Water lives here.",
  },
  {
    name:    "Aromatic / Herbal",
    tag:     "Green, garden, and clean",
    body:    "Lavender, rosemary, mint, basil, sage. Bridges the gap between fresh and fougère. Complex without being heavy.",
  },
  {
    name:    "Fresh Oriental",
    tag:     "The hybrid worth knowing",
    body:    "Fresh opening anchored by warm, spiced base. Acqua di Giò Profumo is the defining example. The most wearable hybrid in the family.",
  },
];

const INGREDIENTS = [
  {
    name:    "Bergamot",
    role:    "The universal opener",
    body:    "Citrus from Calabria — lighter and more floral than lemon. The most common top note in all of perfumery. When a fragrance opens bright and clean, bergamot is usually responsible.",
  },
  {
    name:    "Yuzu",
    role:    "The Japanese citrus",
    body:    "Tart, aromatic, somewhere between grapefruit and mandarin. Issey Miyake built their empire on it. More distinctive than standard citrus.",
  },
  {
    name:    "Calone",
    role:    "The ocean molecule",
    body:    "Synthetic molecule discovered 1966. Smells like melon, sea air, and cut cucumber simultaneously. Defining ingredient of the aquatic subfamily.",
  },
  {
    name:    "Neroli",
    role:    "The floral bridge",
    body:    "Distilled from bitter orange blossoms. Bridges citrus and floral territories. Gives fresh fragrances a lifted, almost powdery quality.",
  },
  {
    name:    "Petitgrain",
    role:    "The woody citrus",
    body:    "From leaves and twigs of the bitter orange tree. Woody, slightly bitter, greener than standard citrus. Gives fresh fragrances structure and longevity.",
  },
  {
    name:    "Ambroxan / Iso E Super",
    role:    "The fresh anchor",
    body:    "Synthetic base note molecules that give modern fresh fragrances lasting depth. Without these, a fresh fragrance evaporates completely. Why contemporary fresh fragrances outlast their 1990s predecessors.",
  },
];

const PICKS = [
  {
    tier:       "Budget",
    price:      "~$15",
    best:       false,
    house:      "Nautica",
    name:       "Nautica Voyage",
    slug:       "nautica-nautica-voyage",
    profile:    "Apple, green leaves, lotus, cedarwood, musk, oakmoss",
    body:       "The cult budget fresh. That apple-and-aquatic opening is so distinctive for the price it launched a thousand fragrance forum recommendations. Buy this and feel smug about it.",
  },
  {
    tier:       "Budget",
    price:      "~$25",
    best:       false,
    house:      "Azzaro",
    name:       "Chrome",
    slug:       "azzaro-azzaro-chrome",
    profile:    "Neroli, bergamot, anise, coriander, oakmoss, tonka bean",
    body:       "A legitimate classic. The anise and oakmoss combination gives it herbal depth that separates it from straightforwardly aquatic competition.",
  },
  {
    tier:       "Mid",
    price:      "~$75",
    best:       true,
    house:      "Issey Miyake",
    name:       "L'Eau d'Issey Pour Homme",
    slug:       "issey-miyake-l-eau-d-issey-pour-homme",
    profile:    "Yuzu, calone, sage, nutmeg, cedarwood, amber, musk",
    body:       "The gold standard. The yuzu-and-sage heart is extraordinary. The amber base gives longevity that most fresh fragrances never achieve. Launched 1994, still unreplaced at this price.",
  },
  {
    tier:       "Mid",
    price:      "~$90",
    best:       false,
    house:      "Hermès",
    name:       "Terre d'Hermès EDT",
    slug:       "herm-s-terre-d-herm-s-edt",
    profile:    "Grapefruit, flint, cedar, vetiver, benzoin",
    body:       "Opens so freshly — grapefruit and cold mineral flint — that it belongs in this conversation despite its woody classification. The flint accord smells like the moment just before rain.",
  },
  {
    tier:       "Mid",
    price:      "~$120",
    best:       true,
    house:      "Giorgio Armani",
    name:       "Acqua di Giò Profumo",
    slug:       "giorgio-armani-acqua-di-gi-profumo",
    profile:    "Marine notes, bergamot, geranium, sage, incense, patchouli, labdanum",
    body:       "The upgrade that turned a genre-defining fresh into something genuinely great. Marine up top, incense underneath. Simultaneously cooling and smouldering. A rare case of a flanker being the definitive version.",
  },
  {
    tier:       "Mid",
    price:      "~$110",
    best:       false,
    house:      "Hermès",
    name:       "Voyage d'Hermès",
    slug:       "herm-s-voyage-d-herm-s",
    profile:    "Grapefruit, cardamom, vetiver, cedarwood, frankincense, white woods",
    body:       "Hermès' most versatile fragrance. Opens fresh and citrusy, settles into a clean woody-mineral drydown. The refillable sphere bottle is the most satisfying object in mainstream fragrance design.",
  },
  {
    tier:       "Niche",
    price:      "~$155",
    best:       false,
    house:      "Maison Margiela",
    name:       "Replica: Sailing Day",
    slug:       "maison-margiela-replica-sailing-day",
    profile:    "Bergamot, sea salt, oakwood, cedar, musk",
    body:       "The sea salt and bergamot opening is genuinely briny, not synthetic ocean spray. The oakwood base has real warmth. Smells like being somewhere rather than wearing a fragrance.",
  },
  {
    tier:       "Niche",
    price:      "~$190",
    best:       false,
    house:      "Hermès",
    name:       "Eau d'Orange Verte",
    slug:       null,
    profile:    "Mandarin, orange, mint, blackcurrant, mossy woods, patchouli",
    body:       "Originally created as the house fragrance for Hermès boutiques in 1979. Wears like something that has nothing to prove. Timeless in a way most fresh fragrances never manage.",
  },
  {
    tier:       "Wildcard",
    price:      "~$185",
    best:       false,
    house:      "Le Labo",
    name:       "Bergamote 22",
    slug:       "le-labo-bergamote-22",
    profile:    "Bergamot, grapefruit, petitgrain, musk, white amber, vetiver",
    body:       "Le Labo took the most common fragrance ingredient and asked how deep they could make it. The answer: considerably. Deceptively simple, quietly masterful. A fresh fragrance that earns niche status without any theatrics.",
  },
];

const PITFALLS = [
  {
    name: "The \"clean laundry\" trap",
    body: "Dozens of fresh fragrances are built almost entirely around laundry musks. Pleasant, completely inoffensive, utterly forgettable. If you can't describe what it smells like beyond \"clean,\" it's probably this. Look for a distinctive heart note before buying.",
  },
  {
    name: "Buying a top note",
    body: "Fresh is where the \"spray once, decide immediately\" mistake does the most damage. Top notes here are universally appealing. The real fragrance starts twenty minutes in. Always wait for the heart.",
  },
  {
    name: "Ignoring the Profumo / Intense upgrade",
    body: "Many fresh fragrances have \"Intense\" or \"Profumo\" flankers that are superior. Try those first. The added depth is almost always worth the extra cost.",
  },
  {
    name: "Wearing it in cold weather",
    body: "Cold air suppresses fresh fragrance projection significantly. Fresh fragrances need warmth to perform. Rotate something richer in from October onward.",
  },
];

export default function FreshCitrusPage() {
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
          The Misunderstood Family:<br />
          <em className="italic text-amber-400">Everything You Need to Know About Fresh and Citrus</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          The most approachable family is also the most underestimated. &ldquo;Fresh&rdquo; is harder to do
          well than it looks — here&apos;s what separates the great ones from the forgettable.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          Subfamilies, key ingredients, 9 recommendations, and the pitfalls to avoid
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          Fresh and citrus fragrance has a reputation problem. Because it&apos;s the easiest family to
          like, it&apos;s also the family most associated with forgettable mid-range cologne.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          But the best fresh fragrances are among the most technically demanding compositions in
          perfumery — citrus molecules are volatile esters that evaporate fast, hard to fix to skin,
          difficult to build longevity around. Making a fresh fragrance that lasts and remains
          interesting past the first twenty minutes requires genuine craft.
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
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30 flex gap-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <p className="text-stone-200 font-light text-sm">{name}</p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-stone-600">{role}</p>
                </div>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <PullQuote>
          A great fresh fragrance feels like standing somewhere specific, not like standing in a clean room.
        </PullQuote>
      </section>

      {/* Recommendations */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Picks</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          The <em className="italic text-amber-400/80">recommendations</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          Nine fragrances across four price tiers. Every one worth knowing.
        </p>

        <div className="space-y-3">
          {PICKS.map(({ tier, price, best, house, name, slug, profile, body }) => (
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              {/* Header row */}
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
              {/* Name */}
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
              {/* Profile */}
              <p className="text-[10px] text-stone-600 mb-3 leading-relaxed">{profile}</p>
              {/* Body */}
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
