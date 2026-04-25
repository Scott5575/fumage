import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rich, Warm, Unapologetic — Fumage Guide",
  description: "Oriental and amber fragrances: the richest, warmest end of the spectrum, and the fragrances that made it famous.",
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
    name: "Soft Oriental",
    tag:  "Vanilla, tonka, amber",
    body: "The gateway oriental. Warm and approachable — sweet but not cloying, rich but not heavy. The orientals that convert people who thought they didn't like orientals.",
  },
  {
    name: "Hard Oriental",
    tag:  "Spice, incense, resin",
    body: "Full-strength oriental. Cardamom, cinnamon, clove, labdanum, benzoin. Heavy, dry, and complex. These require commitment and context. Extraordinary when both are present.",
  },
  {
    name: "Floral Oriental",
    tag:  "Rose, jasmine over amber",
    body: "Floral notes over an oriental base — romantic and complex. The warmth of amber grounds what might otherwise be straightforward florals.",
  },
  {
    name: "Woody Oriental",
    tag:  "Oud, smoke, deep woods",
    body: "Where oriental meets woody. Oud-heavy fragrances live here — smoky, animalic, and genuinely complex. The most demanding and most rewarding subfamily.",
  },
];

const INGREDIENTS = [
  {
    name: "Benzoin",
    role: "The sweet resin",
    body: "A balsamic resin — warm, sweet, and slightly vanilla-like. The smoothing agent of oriental bases: rounds and integrates harsher notes around it.",
  },
  {
    name: "Labdanum",
    role: "The amber backbone",
    body: "The key component of amber accords — warm, slightly animalic, balsamic. When a fragrance is described as \"ambery,\" labdanum is usually doing the work.",
  },
  {
    name: "Tonka Bean",
    role: "The coumarin carrier",
    body: "Smells like warm almonds, fresh hay, and vanilla simultaneously. Gives orientals a soft, inviting quality that vanilla alone can't achieve. The difference between sweet and warm.",
  },
  {
    name: "Cardamom",
    role: "The aromatic bridge",
    body: "Spicy, green, and aromatic. Cardamom opens an oriental fragrance up and prevents it feeling suffocating. In virtually every great oriental — doing the most structural work.",
  },
  {
    name: "Vanilla",
    role: "The accessible sweet",
    body: "Done well — restrained and warm — it's inviting and comforting. Done poorly, it becomes cloying. Quality and proportion separate great vanilla fragrances from cheap ones.",
  },
  {
    name: "Myrrh / Frankincense",
    role: "The sacred smoke",
    body: "Ancient resins that add a medicinal, smoky, incense-like quality. Both used in religious contexts for millennia. Not widely loved at first; deeply loved once understood.",
  },
];

const PICKS = [
  {
    tier:    "Budget",
    price:   "~$35",
    best:    false,
    house:   "Yves Saint Laurent",
    name:    "L'Homme Ultime",
    slug:    "yves-saint-laurent-l-homme-ultime",
    profile: "Ginger, iris, cardamom, vetiver, wood amber",
    body:    "Warm and spicy with enough iris-and-vetiver structure to prevent it collapsing into sweetness. Underrated in YSL's lineup. A genuine soft oriental done well on a real-world budget.",
  },
  {
    tier:    "Mid",
    price:   "~$95",
    best:    true,
    house:   "Yves Saint Laurent",
    name:    "La Nuit de L'Homme EDP",
    slug:    "yves-saint-laurent-la-nuit-de-l-homme",
    profile: "Cardamom, lavender, cedar, vetiver, coumarin, white cedar",
    body:    "The quintessential accessible oriental. The cardamom-and-lavender opening is one of the best combinations in mainstream fragrance. Evenings, cool weather, close company. The EDP over the EDT, always.",
  },
  {
    tier:    "Mid",
    price:   "~$140",
    best:    false,
    house:   "Viktor & Rolf",
    name:    "Spicebomb Extreme",
    slug:    "viktor-rolf-spicebomb-extreme",
    profile: "Cinnamon, black pepper, lava accord, tobacco, vanilla, vetiver",
    body:    "The Extreme flanker — not the original — is a genuinely excellent oriental. Cinnamon and tobacco over a warm vanilla-vetiver base. Heavy, confident, and perfect for cold weather evenings.",
  },
  {
    tier:    "Niche",
    price:   "~$310",
    best:    true,
    house:   "Tom Ford Private Blend",
    name:    "Tobacco Vanille",
    slug:    "tom-ford-tobacco-vanille",
    profile: "Tobacco leaf, vanilla, tonka bean, cacao, spices, dry fruit",
    body:    "Everything a hard oriental should be — rich, warm, complex, long-lasting — with the refinement that separates great niche from merely expensive fragrance. One spray maximum.",
  },
  {
    tier:    "Wildcard",
    price:   "~$250",
    best:    false,
    house:   "Amouage",
    name:    "Interlude Man",
    slug:    "amouage-interlude-man",
    profile: "Oregano, rose, oud, patchouli, incense, amber, labdanum",
    body:    "One of the most complex and demanding fragrances in niche perfumery. The oregano-and-rose opening is unlike anything else. The oud and incense base is cathedral-dark. Not for everyday wear; extraordinary for the right occasion.",
  },
];

const PITFALLS = [
  {
    name: "Over-spraying",
    body: "The single biggest mistake with orientals. One spray on the chest. That's it to start. Orientals amplify with body heat — what smells right at application often becomes overwhelming an hour later if you've over-applied.",
  },
  {
    name: "Wrong occasion",
    body: "A heavy oriental before noon is rarely right. Save the big ones for after dark. They're evening fragrances that some people wear all day.",
  },
  {
    name: "Dismissing sweet notes",
    body: "Vanilla and tonka have a reputation they don't deserve. The sweetness in a great oriental is the point — it makes the spice and smoke accessible. Don't reject an oriental because it reads as sweet. Ask whether the sweet is well-balanced.",
  },
];

export default function OrientalAmberPage() {
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
          Rich, Warm, Unapologetic:<br />
          <em className="italic text-amber-400">The Oriental and Amber Family</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          The most divisive family in men&apos;s fragrance is also the most memorable. Worn correctly,
          orientals are devastating. Worn incorrectly, they clear rooms.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          4 subfamilies, 6 key ingredients, 5 recommendations, and 3 pitfalls to avoid
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          Orientals are the fragrances people remember. A well-chosen oriental in the right context
          doesn&apos;t just smell good — it creates an atmosphere.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          Warm, dense, and complex, these are the scents built for cool evenings, close company, and
          situations where you&apos;d rather be memorable than inoffensive. The tradeoff: the same
          qualities that make them powerful make them the most context-sensitive family to wear.
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

        {/* Projection warning */}
        <div className="mt-8 border border-amber-900/30 rounded p-5 bg-amber-950/10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/60 mb-2">Projection warning</p>
          <p className="text-[11px] text-stone-500 font-light leading-relaxed">
            Oriental fragrances project more in warmth and close spaces. Start with one spray and
            build from there. The worst outcome with orientals is being the person everyone in the
            room is aware of but none of them pleased about.
          </p>
        </div>
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

        <PullQuote>
          Worn correctly, orientals are devastating. Worn incorrectly, they clear rooms. The difference is one spray.
        </PullQuote>
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
