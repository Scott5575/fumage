import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pleasure Is the Point — Fumage Guide",
  description: "Gourmand fragrances: the most immediately pleasurable family in perfumery, and the most technically demanding to do well.",
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
    name: "Vanilla / Tonka",
    tag:  "Creamy, skin-close warmth",
    body: "The accessible entry point. Warm, enveloping, and comforting without the darkness of chocolate or the sharpness of caramel. Tonka gives vanilla complexity — the difference between a candle and a fragrance.",
  },
  {
    name: "Chocolate / Coffee",
    tag:  "Dark, edible, intense",
    body: "The most obviously food-adjacent corner. Bitter coffee and dark chocolate prevent the sweetness from becoming cloying. The best compositions here are as complex as a well-made espresso — nothing like the cheap imitations.",
  },
  {
    name: "Caramel / Praline",
    tag:  "Amber-touched, nutty sweet",
    body: "Where gourmand overlaps with oriental. Caramelised sugar and roasted nuts over warm amber bases — the family's most richly textured territory. Often mistaken for oriental; the distinction is whether warmth or sweetness leads.",
  },
  {
    name: "Fruity Gourmand",
    tag:  "Ripe fruit over a sweet base",
    body: "The most approachable and most dismissed subfamily. Ripe berries, plum, or pear over a vanillic base. Done well, it's genuinely sophisticated. Done poorly, it reads as cheap. The quality gap between good and bad is widest here.",
  },
];

const INGREDIENTS = [
  {
    name: "Ethyl Maltol",
    role: "The defining molecule",
    body: "Smells of spun sugar and warm caramel — the synthetic molecule that created the modern gourmand. Thierry Mugler's perfumer used it in Angel (1992) in an unprecedented quantity. Everything that followed is, in some sense, a response to that decision.",
  },
  {
    name: "Vanillin",
    role: "The workhouse sweet",
    body: "The synthetic form of vanilla's key aroma compound. Cheaper and more stable than natural vanilla extract — and in skilled hands, every bit as effective. The vast majority of vanilla in fragrance is vanillin. Quality is in the formulation, not the sourcing.",
  },
  {
    name: "Tonka Bean",
    role: "The complexity anchor",
    body: "Almond, warm hay, and vanilla simultaneously. It is coumarin — the molecule it contains in high concentration — that does the work: softening, connecting, and adding a dry warmth that prevents pure vanilla compositions from collapsing into sweetness.",
  },
  {
    name: "Heliotropin (Piperonal)",
    role: "The powdery almond",
    body: "Smells like almonds but also like powder, like certain florals, like warm skin. The ingredient that separates a gourmand with depth from one that is merely sweet. In the best vanilla compositions, heliotropin is what you can't quite identify — but would immediately miss.",
  },
  {
    name: "Coumarin",
    role: "The warm connective tissue",
    body: "Found naturally in tonka beans, sweet clover, and new-mown hay. In fragrance, it's the warm, slightly medicinal sweetness that holds everything else together. Coumarin is why so many gourmands feel genuinely comforting rather than simply sweet.",
  },
  {
    name: "Praline Accord",
    role: "The synthetic nut-caramel",
    body: "A constructed accord rather than a single molecule — roasted nuts, caramel, and warm sugar combined to create the smell of confectionery. The technical achievement behind a good praline accord is significant. The cheap versions are immediately obvious.",
  },
];

const PICKS = [
  {
    tier:    "Budget",
    price:   "~$50",
    best:    false,
    house:   "Thierry Mugler",
    name:    "A*Men",
    slug:    "thierry-mugler-a-men",
    profile: "Lavender, coffee, caramel, chocolate, tar, patchouli, musk",
    body:    "The masculine gourmand blueprint. Coffee and tar over caramel and patchouli — complex, deliberately odd, and genuinely compelling. A*Men proved that gourmand notes and masculine fragrance were not a contradiction. Everything in this subfamily owes it a debt.",
  },
  {
    tier:    "Mid",
    price:   "~$90",
    best:    true,
    house:   "Guerlain",
    name:    "L'Homme Idéal EDP",
    slug:    null,
    profile: "Almond, coffee, iris, tonka, benzoin, vetiver",
    body:    "What a mid-tier gourmand should be. Almond and coffee over a crisp iris-and-vetiver structure that prevents the sweetness from overwhelming. Guerlain's mastery of tonka and benzoin is on full display. Versatile enough for day or evening; complex enough to deserve close attention.",
  },
  {
    tier:    "Mid",
    price:   "~$115",
    best:    false,
    house:   "Jean Paul Gaultier",
    name:    "Le Male Elixir",
    slug:    null,
    profile: "Lavender, vanilla, tonka, amber, labdanum, iris",
    body:    "The Elixir flanker — not the original — takes the classic Le Male DNA and intensifies it into something genuinely luxurious. Lavender and vanilla in this proportion is a combination that shouldn't work as well as it does. Dense and skin-close, with projection that lasts a full day.",
  },
  {
    tier:    "Niche",
    price:   "~$200",
    best:    true,
    house:   "Parfums de Marly",
    name:    "Herod",
    slug:    null,
    profile: "Tobacco, cinnamon, vanilla, pepper, patchouli, heliotrope",
    body:    "The gourmand that doesn't announce itself as one. Tobacco and cinnamon at the top; vanilla and heliotrope in the base — a composition that reads as oriental on first encounter and reveals its gourmand depth over hours. The restraint is remarkable. This is what the family looks like at its most sophisticated.",
  },
  {
    tier:    "Wildcard",
    price:   "~$180",
    best:    false,
    house:   "Serge Lutens",
    name:    "Jeux de Peau",
    slug:    null,
    profile: "Wheat, bread, apricot, sandalwood, vanilla, milk",
    body:    "A gourmand about bread and warmth rather than sugar and sweetness — the most unusual interpretation in the family. Where most gourmands reach for confectionery, Jeux de Peau reaches for a bakery. Not for everyone. Deeply interesting to everyone who has smelled it.",
  },
];

const PITFALLS = [
  {
    name: "Wearing gourmands in heat",
    body: "Sweet notes amplify with body heat and humidity in ways that other families don't. What reads as warm and comforting at room temperature can become overwhelming in summer. Gourmands perform best in cool weather — autumn and winter are their natural season.",
  },
  {
    name: "Judging the family by its worst examples",
    body: "The gourmand category has more poor-quality flankers and cheap imitations than almost any other. Angel's success created a wave of badly-made sweet fragrances that shaped the family's reputation. The best gourmands share almost nothing with these. Find three well-regarded examples before forming a view on the family.",
  },
  {
    name: "Mistaking cloying for rich",
    body: "A clinging, headache-inducing sweetness is not depth — it's a formulation problem, usually too much ethyl maltol or vanillin with nothing to balance it. A genuinely good gourmand is dense and warm without being suffocating. The benchmark: you want another spray at the end of the day, not relief from the first one.",
  },
];

export default function GourmandPage() {
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
          Pleasure Is the Point:<br />
          <em className="italic text-amber-400">The Gourmand Family</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          Written off as sugary indulgence by people who haven&apos;t encountered the right ones.
          The gourmand family is the most immediately gratifying in perfumery — and technically
          the most demanding to execute well.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          4 subfamilies, 6 key ingredients, 5 recommendations, and 3 pitfalls to avoid
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          In 1992, Thierry Mugler&apos;s Angel put caramel, chocolate, and cotton candy into a fragrance
          and did not apologise. The industry was horrified. The public bought it by the millions.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          That gap between critical reaction and commercial reality tells you something about what
          gourmand fragrances actually do. They bypass the part of the brain that evaluates and speaks
          directly to the part that enjoys. This is not a weakness. In the right hands, it is a
          precise instrument — and the best gourmand fragrances are among the most technically complex
          compositions in perfumery.
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

        {/* Temperature note */}
        <div className="mt-8 border border-amber-900/30 rounded p-5 bg-amber-950/10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/60 mb-2">On temperature</p>
          <p className="text-[11px] text-stone-500 font-light leading-relaxed">
            Sweet molecules amplify with heat more than almost any other class of aroma compound.
            A gourmand that reads as warm and close indoors can become overwhelming outside in summer.
            Test any gourmand on skin before committing to a full application — and default to cool
            weather and evening contexts until you know how it behaves on yours.
          </p>
        </div>

        <PullQuote>
          The best gourmands bypass the part of the brain that evaluates and speak directly to the
          part that enjoys. This is not a weakness — it is a precise instrument.
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
