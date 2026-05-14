import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Dry Sun & The Dark Timber — Fumage Guide",
  description: "Mastering the citrus-woody accord — the chemistry of bridging two opposites, the historical lineage, and the bottles that prove it works.",
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

function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-amber-700/50 pl-5 py-1 bg-stone-950/40 pr-5 my-8">
      <p className="text-[10px] uppercase tracking-[0.2em] text-amber-600/70 mb-2">{label}</p>
      <p className="text-sm text-stone-400 font-light leading-relaxed">{children}</p>
    </div>
  );
}

const BOTTLES = [
  {
    name: "Terre d’Hermès EDT",
    house: "Hermès, 2006",
    tag: "Designer Anchor",
    desc: "The reference. Earthy citrus over flint and vetiver. Endlessly office-appropriate, quietly distinctive. Buy the EDT, not the EDP — they are different fragrances.",
  },
  {
    name: "Allure Homme Édition Blanche",
    house: "Chanel, 2007",
    tag: "Designer Sleeper",
    desc: "Chalk-white lemon over cedar and white musk. Pristine, summery, criminally underworn. The Chanel citrus-woody almost nobody talks about.",
  },
  {
    name: "Cedrat Boisé",
    house: "Mancera, 2011",
    tag: "Niche Reference",
    desc: "Beast-mode citrus that lasts. The proof that the accord can have projection. Best-in-class performance for under $150.",
  },
  {
    name: "Bergamote 22",
    house: "Le Labo, 2006",
    tag: "Niche Cult",
    desc: "Bergamot wrapped in cedar, vetiver, and a soft amber. The hipster-niche flagship that earned its reputation honestly. Skin-close and intimate.",
  },
  {
    name: "Rehab",
    house: "Initio Parfums Privés, 2016",
    tag: "Avant-Garde",
    desc: "Citrus and cedar through a haze of pink pepper and incense. The genre stretched toward something stranger — for collectors who already own Cedrat Boisé.",
  },
  {
    name: "Man Wood Neroli",
    house: "Bvlgari, 2017",
    tag: "Polished Modern",
    desc: "Neroli-forward, with a creamy cedar base. The most overtly handsome bottle in the genre. Punches above its price point.",
  },
  {
    name: "Himalaya",
    house: "Creed, 2002",
    tag: "Cool Outlier",
    desc: "Lemon, vetiver, sandalwood — Creed at its driest and most restrained. Less popular than Aventus for good reason, but the construction is textbook.",
  },
  {
    name: "Colonia",
    house: "Acqua di Parma, 1916",
    tag: "Historical Reference",
    desc: "Not strictly citrus-woody by modern taxonomy, but the structural ancestor. Worth smelling once to understand where the genre came from.",
  },
];

export default function CitrusWoodyAccordPage() {
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
          The Dry Sun &amp; The Dark Timber:<br />
          <em className="italic text-amber-400">Mastering the Citrus-Woody Accord</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          Citrus is the most fleeting material in a perfumer&apos;s palette. Wood is the most enduring. Putting them in the same bottle is a calculated act of opposition — and when it works, the result is one of the most quietly devastating compositions in masculine perfumery.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          A subfamily deep dive for serious collectors and the office-bound · 10 min read
        </p>
      </div>

      {/* Intro */}
      <div className="mb-12">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          There is a specific kind of fragrance that announces nothing on entry, then proves impossible to forget by hour six. It opens with the snap of cold citrus peel — bergamot, citron, sometimes a knife-edge of grapefruit — and you assume, as the world has trained you to assume, that it will be gone in twenty minutes. It isn&apos;t. Three hours later, the light is still there, suspended above something darker now. Cedar, perhaps. Vetiver. A whisper of amber soft enough to miss if you weren&apos;t already looking.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          The citrus has not faded so much as been held — propped up on a structure of wood that refuses to let it go. This is the citrus-woody accord, and it is masculine perfumery&apos;s most underrated technical achievement. It is also, when done well, one of the most wearable propositions in the entire library — a fragrance you can spray at 7 a.m. and trust to be there at 9 p.m. without once feeling heavy.
        </p>
      </div>

      {/* Definition */}
      <section className="mb-14">
        <SectionLabel>Definition</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          A subfamily defined by <em className="italic text-amber-400/80">tension</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The citrus-woody subfamily is not citrus aromatic (Cool Water and its marine progeny), not citrus chypre (Eau Sauvage, technically), and not the pure citrus cologne tradition (Acqua di Parma&apos;s original Colonia, Eau d&apos;Hadrien). It is a compositional strategy: bright, hesperidic top notes — bergamot, lemon, citron, neroli, sometimes mandarin or grapefruit — tethered to a base of dry woods, typically cedar, vetiver, or sandalwood, with modern fixatives doing the heavy lifting on longevity.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The defining tension is structural. Citrus oils are <em>volatile</em> — their aromatic molecules are small and unstable, evaporating from skin within an hour under normal conditions. Wood molecules are heavy, sometimes nearly stationary. To make them coexist convincingly, the perfumer engineers a handoff: as the citrus thins, the wood rises to meet it without ever fully eclipsing it.
          </p>
        </div>

        <PullQuote>
          The trick is not making the citrus stronger. It is making the wood quieter — so the citrus sings over a hum that holds for hours.
        </PullQuote>
      </section>

      {/* Chemistry */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Chemistry</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          The art of <em className="italic text-amber-400/80">holding the light</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Modern citrus-woody fragrances are made possible by three families of synthetic materials that simply did not exist a century ago. Hedione, introduced by Firmenich in 1962, is a jasmine-adjacent molecule that adds a transparent, radiant quality to citrus accords without smelling overtly floral — it makes lemon and bergamot feel lit from within. Iso E Super provides a velvety, slightly cedar-ambery veil that doesn&apos;t compete with citrus brightness but extends its perceived presence. And ambroxan, the synthetic analog of ambergris, acts as a fixative — slowing the evaporation of everything around it.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            You can hear this engineering at work in Mancera Cedrat Bois&eacute;, perhaps the most quoted modern reference for the genre. The opening is almost vulgar in its citrus density — citron, lemon, bergamot, a touch of pineapple — and yet eight hours later the fragrance is still recognisably citric on skin, anchored by oud, amber, and musk. The same logic, executed with more restraint, animates Terre d&apos;Herm&egrave;s, in which Jean-Claude Ellena reduced the entire genre to a single radical pairing: bitter orange and flint, vetiver and grapefruit. There is almost nothing else in the bottle, and that minimalism is the point.
          </p>
        </div>

        <Callout label="The Synthetic Trio">
          Hedione (radiant transparency, the citrus-lifter), Iso E Super (woody-amber veil, the structural anchor), and ambroxan (the fixative that slows everything down). Most great citrus-woody fragrances of the last twenty years use some combination of all three.
        </Callout>
      </section>

      {/* Lineage */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Lineage</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Four bottles, <em className="italic text-amber-400/80">one century</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The citrus-woody accord is older than it appears. Its philosophical ancestor is Acqua di Parma Colonia (1916), the Italian cologne that dressed lemon and bergamot in a soft woody-floral wrapper — closer to citrus aromatic than the modern subfamily, but the structural intuition is there: citrus needs something to lean against. Fifty years later, Edmond Roudnitska&apos;s Eau Sauvage (1966) reframed the question with the early use of Hedione, giving citrus an aerial luminosity it had never had before. Officially a chypre, Eau Sauvage is the door through which the modern citrus-woody walks.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The genre as we recognise it today crystallises in two bottles, eight years apart. Terre d&apos;Herm&egrave;s EDT (2006) is the designer-tier manifesto: orange, grapefruit, flint, cedar, vetiver. Restrained, mineral, instantly identifiable. Mancera&apos;s Cedrat Bois&eacute; (2011) is the niche thesis: take the citrus opening of Terre d&apos;Herm&egrave;s, dial it to eleven, and bolt it onto a Middle Eastern base with oud and amber. It should not work. It does, in fact, work — well enough that the bottle remains one of the most-blind-bought niche masculines fifteen years on.
          </p>
        </div>
      </section>

      {/* Tier Map */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Tier Map</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Where the <em className="italic text-amber-400/80">accord lives</em>
        </h2>
        <p className="text-sm text-stone-500 font-light mb-8">
          The genre rewards exploration across price points more than most. A working map across designer, niche, and historical tiers — what to reach for and what each one is doing differently.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BOTTLES.map(({ name, house, tag, desc }) => (
            <div
              key={name}
              className="border border-stone-800 rounded p-4 bg-stone-950/30"
            >
              <p className="text-stone-200 font-light text-sm mb-0.5">{name}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-amber-500/60 mb-2">{tag}</p>
              <p className="text-[11px] text-amber-700/70 font-light mb-2">{house}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wearability */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Wearability</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          When the accord <em className="italic text-amber-400/80">sings</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Citrus-woody is the closest thing masculine perfumery has to a truly year-round subfamily, but it has clear sweet spots. It outperforms in shoulder seasons — late March through May, September through early November — where the citrus reads as the bridge between winter heaviness and summer transparency. It performs better in humidity than most assume, since heat amplifies the volatile top notes the structure was designed to preserve. And it is, by some measure, the most reliably office-appropriate subfamily in the masculine library.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Time of day matters too. Citrus-woody peaks between roughly 10 a.m. and 3 p.m., when the citrus reads brightest against ambient light and the wood has not yet had a chance to dominate. By evening, the composition collapses into its base — which can be a feature (Terre d&apos;Herm&egrave;s becomes a different, quieter fragrance after dark) or a limitation depending on the bottle.
          </p>
        </div>

        <Callout label="Field Note">
          For a true night-out citrus-woody, look to the amber-leaning options like Cedrat Bois&eacute; or Rehab. For the rest of the genre, accept that what you spray at 8 a.m. will be a softer, woodier version of itself by 7 p.m. — and that this is the point.
        </Callout>
      </section>

      {/* Pitfalls */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Pitfalls</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Common <em className="italic text-amber-400/80">mistakes</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The first mistake is confusing marine-aquatic with citrus-woody. Acqua di Gi&ograve; and its descendants are aquatic citrus, not citrus-woody — the watery accord (calone, helional) sits in the heart instead of wood. Different genre, different occasions. The second mistake is over-reliance on ambroxan. A poorly composed citrus-woody can read as just ambroxan and citrus, which produces the metallic, slightly headache-inducing thinness common to budget interpretations. Real wood notes give the base dimensionality; synthetics alone cannot.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The third mistake is treating the genre as the safe choice. At its best, citrus-woody is one of the most distinctive and quietly opinionated subfamilies in masculine perfumery. The boring versions are boring on purpose — built for mass appeal. The great ones are anything but.
          </p>
        </div>

        <PullQuote>
          The best citrus-woody fragrances feel like they are doing nothing in particular. That invisibility is the technical achievement. The work is invisible, and that is the work.
        </PullQuote>
      </section>

      {/* Wardrobe */}
      <section className="mb-16">
        <SectionLabel>Wardrobe</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Building a citrus-woody <em className="italic text-amber-400/80">rotation</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            You do not need ten bottles in this category. A working rotation is small and strategic: one designer for daily wear (Terre d&apos;Herm&egrave;s is the obvious answer), one niche for performance and presence (Cedrat Bois&eacute;, or Bergamote 22 if you prefer restraint), and — if you want range — one polished modern for warm-weather formality (Man Wood Neroli or Allure Homme &Eacute;dition Blanche).
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Three bottles will cover roughly 200 days of the year in any temperate climate. The remaining 165 belong to the woods, the orientals, and whatever else lives on your shelf. The citrus-woody accord is masculine perfumery&apos;s quiet rebellion — proof that sophistication is not a function of heaviness, that brightness can have weight, and that the technically hardest compositions are sometimes the ones that announce themselves the least.
          </p>
        </div>

        <PullQuote>
          The wood holds the light. The light makes the wood human.
        </PullQuote>
      </section>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
