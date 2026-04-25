import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Backbone of Men's Fragrance — Fumage Guide",
  description: "Woody and aromatic fragrances: the family that defines the masculine canon, from office-safe aromatics to statement ouds.",
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
    name: "Dry / Smoky",
    tag:  "Cedar, vetiver, smoke",
    body: "Cool, slightly austere, and sophisticated. These are the woody fragrances that feel architectural — structured, considered, quietly powerful.",
  },
  {
    name: "Creamy / Warm",
    tag:  "Sandalwood, cashmere wood",
    body: "Soft, enveloping, and intimate. Sandalwood-forward fragrances sit between woody and oriental — warm without being sweet. The most skin-friendly subfamily.",
  },
  {
    name: "Spicy / Aromatic",
    tag:  "Pepper, cardamom, oud",
    body: "Woody fragrance with spice as the bridge. Cardamom and black pepper add brightness; oud adds smokiness and depth. Where the most interesting modern woody fragrances live.",
  },
  {
    name: "Mossy / Earthy",
    tag:  "Patchouli, oakmoss, earth",
    body: "Damp, organic, and complex. Often classified as chypre. Divisive but deeply loved by those who get it.",
  },
];

const INGREDIENTS = [
  {
    name: "Cedarwood",
    role: "The structural woody",
    body: "Clean, dry, slightly pencil-shavings. The most commonly used woody material — versatile, long-lasting. The backbone of almost every masculine fragrance base.",
  },
  {
    name: "Vetiver",
    role: "The complex earthy",
    body: "Rooty, smoky, and deeply earthy. Haitian and Réunion vetiver are darker and more complex. One of perfumery's most sophisticated base materials.",
  },
  {
    name: "Sandalwood",
    role: "The creamy anchor",
    body: "Warm, soft, milky. Old-growth Mysore sandalwood is extraordinarily rare. Most modern sandalwood is Australian or synthetic. The most skin-friendly wood.",
  },
  {
    name: "Patchouli",
    role: "The polariser",
    body: "Dark, earthy, medicinal in excess — compelling in balance. Cheap patchouli smells like a head shop. Quality patchouli is rich and complex.",
  },
  {
    name: "Iso E Super",
    role: "The skin amplifier",
    body: "A synthetic molecule that smells like an abstract cedar — woody, clean, diffusive. Used in almost everything. Terre d'Hermès is essentially built around it.",
  },
  {
    name: "Oud",
    role: "The apex material",
    body: "Smoky, animalic, complex. Natural oud is rare; synthetic approximations are good but different. When a woody fragrance costs $300+, oud is usually the reason.",
  },
];

const PICKS = [
  {
    tier:    "Budget",
    price:   "~$30",
    best:    false,
    house:   "Nautica",
    name:    "Nautica Voyage",
    slug:    "nautica-nautica-voyage",
    profile: "Apple, aquatic, cedarwood, oakmoss, musk",
    body:    "Primarily aquatic but the woody-mossy base is substantial. One of the great budget fragrances full stop — remarkable longevity for the price.",
  },
  {
    tier:    "Mid",
    price:   "~$110",
    best:    true,
    house:   "Chanel",
    name:    "Bleu de Chanel EDP",
    slug:    "chanel-bleu-de-chanel-edp",
    profile: "Grapefruit, ginger, labdanum, sandalwood, cedar, vetiver",
    body:    "The modern benchmark. The transition from its bright citrus opening to the dry cedar-vetiver base is near-perfect. Works on everyone. If someone tells you this is boring, they were performing sophistication they don't have.",
  },
  {
    tier:    "Mid",
    price:   "~$90",
    best:    false,
    house:   "Hermès",
    name:    "Terre d'Hermès EDT",
    slug:    "herm-s-terre-d-herm-s-edt",
    profile: "Grapefruit, flint, Iso E Super, cedar, vetiver, benzoin",
    body:    "Jean-Claude Ellena's masterpiece. The mineral flint-and-grapefruit opening is completely original. One of the ten most important men's fragrances of the 21st century.",
  },
  {
    tier:    "Mid",
    price:   "~$130",
    best:    false,
    house:   "Tom Ford",
    name:    "Santal Blush",
    slug:    null,
    profile: "Sandalwood, rose, cinnamon, cardamom, oud",
    body:    "A gender-fluid woody that leans into sandalwood's creamy warmth. The rose-and-cinnamon heart is unusual and compelling.",
  },
  {
    tier:    "Niche",
    price:   "~$320",
    best:    true,
    house:   "Tom Ford Private Blend",
    name:    "Oud Wood",
    slug:    "tom-ford-oud-wood",
    profile: "Oud, rosewood, cardamom, sandalwood, vetiver, tonka, amber",
    body:    "The gateway drug for niche fragrance. Smooth, smoky, and extraordinarily well-integrated. The cardamom-and-rosewood opening gives it brightness before the oud takes over. The best first niche bottle for most people.",
  },
  {
    tier:    "Wildcard",
    price:   "~$290",
    best:    false,
    house:   "Guerlain",
    name:    "Vétiver",
    slug:    "guerlain-vetiver",
    profile: "Lemon, vetiver, tobacco, oakmoss, cedar, iris",
    body:    "The definitive vetiver fragrance. Launched 1959, still unbeaten. Austere, smoky, and completely self-assured. The one you wear when you want to smell like you've been wearing fragrance for thirty years.",
  },
];

const PITFALLS = [
  {
    name: "The generic sandalwood trap",
    body: "Synthetic sandalwood quality varies enormously. Some is excellent; a lot smells like sweet, slightly soapy nothing. If a fragrance's primary claim is sandalwood and it costs $40, smell it for an hour before deciding.",
  },
  {
    name: "Oud overconfidence",
    body: "Oud appears on labels far more than it appears in the actual formula. Many \"oud\" fragrances contain a small synthetic approximation. Real oud changes character as it warms on skin. Synthetic oud largely doesn't.",
  },
  {
    name: "Wearing heavy woodies in summer",
    body: "Dense sandalwood, patchouli, and oud fragrances project intensely in heat. Rotate toward drier, lighter woods — cedar, vetiver — in summer and save the heavier ones for cool weather.",
  },
];

export default function WoodyAromaticPage() {
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
          The Backbone of Men&apos;s Fragrance:<br />
          <em className="italic text-amber-400">Woody and Aromatic Scents</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          The widest and most versatile family in men&apos;s perfumery. Warm, grounding, and almost
          universally flattering — but &ldquo;woody&rdquo; covers more ground than most people realise.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          4 subfamilies, 6 key ingredients, 6 recommendations, and 3 pitfalls to avoid
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          Woody fragrances have formed the structural core of men&apos;s perfumery since the category
          existed. Woody base notes are what give almost every fragrance its lasting power and skin
          warmth.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          The difference in this family is that those base notes are the point rather than the
          support.
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
          Woody fragrances don&apos;t announce themselves. They make the room feel different and let people figure out why.
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
