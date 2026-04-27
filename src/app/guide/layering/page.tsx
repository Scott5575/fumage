import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Invisible Third — Fumage Guide",
  description:
    "Layering two fragrances doesn't give you two — it gives you a third that belongs to neither bottle. How to build it deliberately.",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-4 flex items-center gap-3">
      {children}
      <span className="flex-1 h-px bg-stone-800 max-w-[60px]" />
    </p>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-amber-500/30 pl-6 my-10">
      <p className="font-serif text-xl italic font-light text-stone-300 leading-relaxed">
        {children}
      </p>
    </div>
  );
}

function Callout({
  label,
  title,
  children,
}: {
  label?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="border border-stone-800 border-t-amber-700 bg-stone-900/40 px-6 py-5 my-8"
      style={{ borderTopWidth: 2 }}
    >
      {label && (
        <p className="text-[9px] uppercase tracking-[0.3em] text-amber-500 mb-3">{label}</p>
      )}
      {title && (
        <p className="font-serif text-lg font-medium text-stone-200 mb-3">{title}</p>
      )}
      {children}
    </div>
  );
}

type FragRef = { name: string; slug: string | null };

const COMBINATIONS: {
  name: string;
  principle: string;
  base: FragRef;
  top: FragRef;
  order: string;
  body: string;
}[] = [
  {
    name: "The Amplifier",
    principle: "Projection Boost",
    base: { name: "Molecule 01 (Iso E Super)", slug: "escentric-molecules-iso-e-super-molecule-01" },
    top: { name: "any woody or aromatic fragrance", slug: null },
    order: "Apply Molecule 01 first, let dry, then add your main fragrance on top.",
    body:
      "Iso E Super is a single aroma chemical — a synthetic cedar-woody molecule that functions as a molecular amplifier. Alone, it reads as an abstract, shifting woods note that different noses perceive very differently. Under another fragrance, it extends projection, improves skin adhesion, and adds a subterranean woody hum. This is the most versatile layering tool available. If you own one thing for layering, it should be this.",
  },
  {
    name: "The Sweet Anchor",
    principle: "Warmth Beneath Freshness",
    base: { name: "Tobacco Vanille", slug: "tom-ford-tobacco-vanille" },
    top: { name: "Bergamote 22", slug: "le-labo-bergamote-22" },
    order: "Apply Tobacco Vanille to chest and neck, let dry completely, then spray Bergamote 22.",
    body:
      "Tobacco Vanille is the problem it is precisely because it is dense, sweet, and utterly without apology. That density becomes an asset here: it turns a fresh, sharp bergamot-and-vetiver fragrance into something that has warmth and staying power. The vanilla and tobacco do not compete with the citrus — they become the thing the citrus rests on. The result is a fresh fragrance with a heartbeat.",
  },
  {
    name: "The Dark and Warm",
    principle: "Contrast Calibration",
    base: { name: "Encre Noire", slug: "lalique-lalique-encre-noire" },
    top: { name: "Amber Pour Homme", slug: "prada-amber-pour-homme" },
    order: "Apply Encre Noire to skin, Amber Pour Homme to pulse points after drying.",
    body:
      "Encre Noire is a monument of cool, severe vetiver — austere to the point of deliberate hostility toward warmth. Amber Pour Homme is smooth, dry amber with a powdery labdanum character. Together they do something that neither does alone: the vetiver prevents the amber from becoming comforting to the point of sweetness, and the amber gives the vetiver a finish that is warm rather than cold. The tension between them is the fragrance.",
  },
  {
    name: "The Famous Pair",
    principle: "Structural Complement",
    base: { name: "Santal 33", slug: "le-labo-santal-33" },
    top: { name: "Baccarat Rouge 540", slug: "maison-francis-kurkdjian-baccarat-rouge-540" },
    order: "Santal 33 on skin as foundation, Baccarat Rouge 540 over the top.",
    body:
      "Baccarat Rouge 540 is difficult precisely because its ambroxan-heavy, jasmine-and-cedar composition reads so differently on different skin chemistries — on some people it is magnificent; on others, overwhelming. Santal 33's cedar-and-iris structure gives it the grounding it sometimes lacks on its own, and the sandalwood prevents the ambroxan from turning sharp. This is the combination that gets discussed most in enthusiast circles for good reason: it reliably works across a wider range of skin chemistries than either alone.",
  },
  {
    name: "The Base Layer",
    principle: "Depth Without Weight",
    base: { name: "Oud Wood", slug: "tom-ford-oud-wood" },
    top: { name: "Sauvage", slug: "dior-sauvage" },
    order: "Oud Wood on chest and upper arms, Sauvage on wrists and neck.",
    body:
      "Oud Wood as a pure skin fragrance can feel formal, even airless. Sauvage without a base can feel synthetic-fresh in the way that every department store now smells. Together: the oud gives Sauvage a resinous, anchored quality that keeps its bergamot opening honest, while Sauvage gives Oud Wood an opening it never had on its own. The drydown — where the rosy oud and Sauvage's ambroxan meet — is worth four hours of your patience.",
  },
  {
    name: "The Cut",
    principle: "Density Control",
    base: { name: "Black Afgano", slug: "nasomatto-black-afgano" },
    top: { name: "Bleu de Chanel EDP", slug: "chanel-bleu-de-chanel-edp" },
    order: "One light application of Black Afgano to chest only, then Bleu de Chanel EDP normally.",
    body:
      "Black Afgano at full strength is a commitment most rooms are not prepared to receive — dense, hashish-dark, radically opaque. At one-third strength as a base, it becomes something different: a dark, resinous foundation that gives Bleu de Chanel's polished cedar-grapefruit composition something to push against. The effect is a clean, wearable fragrance with a shadow underneath it. The clean man who smells, on closer approach, slightly dangerous.",
  },
];

const PYRAMID = [
  { label: "Top Notes", desc: "First impression — 5 to 20 minutes", width: "42%" },
  { label: "Heart Notes", desc: "The true character — 30 minutes to 3 hours", width: "68%" },
  { label: "Base Notes", desc: "The lasting impression — hours to a full day", width: "100%" },
];

export default function LayeringArticle() {
  return (
    <main className="min-h-screen" style={{ background: "#0c0906" }}>
      <div className="max-w-2xl mx-auto px-6 py-16 pb-24">

        {/* HERO */}
        <SectionLabel>The Craft · Technique</SectionLabel>
        <h1 className="font-serif text-4xl sm:text-5xl font-light leading-[1.1] text-stone-100 mb-5">
          The Invisible<br />
          <em className="italic text-amber-400/80">Third</em>
        </h1>
        <p className="font-serif text-lg italic font-light text-stone-400 leading-relaxed mb-3 max-w-xl">
          Layering two fragrances doesn&apos;t give you two — it gives you a third that belongs to neither
          bottle. How to build it deliberately.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-12">
          Long read &nbsp;·&nbsp; The Craft &nbsp;·&nbsp; Beginner to Advanced
        </p>

        {/* LEDE */}
        <SectionLabel>The Premise</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          Fragrance Was Never Meant<br />
          <em className="italic text-amber-400/80">to Come from One Bottle</em>
        </h2>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5 first-letter:text-7xl first-letter:font-semibold first-letter:float-left first-letter:text-amber-400 first-letter:mr-2 first-letter:mt-1 first-letter:leading-none">
          Long before eau de parfum existed, people built scent the way a composer builds music — note by
          note, layer by layer, with intention. Before customization services, before bespoke commissions
          were accessible without a Parisian atelier contact, before the proliferation of niche houses
          made &ldquo;unique&rdquo; feel paradoxically mass-market, enthusiasts were already doing the
          thing that required no budget, no perfumer, and no access to restricted materials: they were
          layering. Two bottles on a dresser, applied in a particular order, to produce something that
          didn&apos;t exist in either.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          The phenomenon has a name inside perfumery circles — the &ldquo;third scent&rdquo; — and the name
          is apt. When two fragrances meet on warm skin, they do not simply coexist. The top notes of one
          interact with the dry-down compounds of the other. Your skin chemistry serves as the medium in
          which they integrate. What emerges is something genuinely new: not Fragrance A, not Fragrance B,
          but a composite that would not exist if either bottle were missing.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Done carelessly, this produces a chemical disagreement — two fragrances that clash rather than
          converse. Done with intention, it elevates a good fragrance into a signature. This guide covers
          both: the theory, the technique, and the specific combinations that prove it works.
        </p>

        <PullQuote>
          Two fragrances applied to the same skin are not two soloists. They are an ensemble — and the
          quality of the ensemble depends entirely on whether they were chosen to play together.
        </PullQuote>

        <div className="border-t border-stone-800/60 my-12" />

        {/* WHY LAYER */}
        <SectionLabel>The Case for It</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          Why Layer<br />
          <em className="italic text-amber-400/80">at All?</em>
        </h2>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          A single fragrance, however beautifully constructed, is a fixed statement. Layering gives you
          flexibility — the ability to shift a scent warmer for winter, fresher for summer, headier for
          evening, quieter for the office. It also gives you depth. Two well-chosen fragrances interact on
          skin in ways neither can achieve alone, creating a third scent that exists only because you exist.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          There is also a practical argument that rarely gets mentioned: longevity. Applying an unscented
          body oil or moisturising lotion before your fragrance gives the molecules something to hold onto —
          skin that is hydrated retains fragrance significantly longer than dry skin. Taking this a step
          further and combining a body lotion with a complementary scent means your fragrance evolves
          through the day rather than simply fading. The base layer carries the composition forward even
          as the top notes dissipate.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          You also don&apos;t need a vast collection to start. Two fragrances — one simple, one complex —
          are enough to begin exploring. Many experienced layerers work with four or five bottles,
          combined in different ways depending on mood and occasion.
        </p>

        <div className="border-t border-stone-800/60 my-12" />

        {/* THE PYRAMID */}
        <SectionLabel>The Foundation</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          Understanding the<br />
          <em className="italic text-amber-400/80">Scent Pyramid</em>
        </h2>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          Before layering, it helps to understand how a single fragrance is structured. The classic model
          is the scent pyramid — three tiers that unfold over time. Every perfume you wear is already
          layered in this sense; your skin is continuously revealing new material as the hours pass.
        </p>

        {/* Pyramid visual */}
        <div className="my-8 space-y-px">
          {PYRAMID.map(({ label, desc, width }) => (
            <div
              key={label}
              className="mx-auto bg-stone-900 border border-stone-800 px-4 py-3 text-center"
              style={{ width }}
            >
              <p className="text-[9px] uppercase tracking-[0.25em] text-amber-500 mb-1">{label}</p>
              <p className="font-serif text-sm font-light italic text-stone-400">{desc}</p>
            </div>
          ))}
        </div>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          When you layer two fragrances, you are composing a new pyramid. Your base-heavy fragrance —
          musks, woods, ambers, resins — sets the foundation. A lighter, fresher scent applied on top
          rides above it as the heart and top layer. Over time, as the lighter fragrance fades, the
          deeper one takes over, giving the whole composition an arc. That arc is what distinguishes
          a deliberate combination from two fragrances applied without thought.
        </p>

        <div className="border-t border-stone-800/60 my-12" />

        {/* WHEN TO LAYER */}
        <SectionLabel>The Occasions</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          When Layering<br />
          <em className="italic text-amber-400/80">Makes the Most Sense</em>
        </h2>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          Layering suits certain moments more than others. These are the most natural occasions to
          reach for a second bottle.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Seasonal Transitions
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          When the weather is neither fully warm nor cool, a single fragrance can feel off — too
          heavy for the afternoon, too light for the evening. Layering a warm amber or musk base with
          a light aquatic or citrus top bridges the gap, keeping you comfortable across temperatures
          without needing to rotate your entire shelf.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Long Days Across Different Contexts
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          You start at the office, continue to dinner, end at a bar. Instead of reapplying the same
          scent, layer a quiet professional base in the morning and mist something more sensual over
          the top before the evening begins. The foundation continues beneath; the character shifts
          above it.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          When a Fragrance Is Almost Right
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          You love a fragrance&apos;s heart but find the opening harsh, or the base too sweet, or the
          whole thing slightly one-dimensional. A complementary layer can soften, brighten, or deepen
          the problem area. This is how experienced collectors make regular-rotation fragrances feel
          like something rarer than they are.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Creative Exploration
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Sometimes you layer simply because you&apos;re curious. This is how you discover combinations
          that become your most treasured signatures — the ones other people ask about. No one stumbled
          into a signature by only ever wearing one bottle at a time.
        </p>

        <div className="border-t border-stone-800/60 my-12" />

        {/* CHEMISTRY */}
        <SectionLabel>The Chemistry</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          Why Some Combinations<br />
          <em className="italic text-amber-400/80">Work and Others Don&apos;t</em>
        </h2>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Fragrance compatibility is not random, and it is not entirely a matter of taste. It has a
          structural logic that can be reasoned about before you open a single bottle.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          The safest and most reliable approach is to choose fragrances that share a note family —
          both are woody, or both have a citrus core, or both contain a prominent amber accord. The
          shared thread acts as a bridge, making the combination feel cohesive rather than jarring.
          Fragrances built around shared molecular architecture tend to integrate without effort.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          The most interesting pairings, however, create contrast within a shared framework. A cool,
          austere fragrance paired with a warm, resinous one can achieve something neither manages alone:
          the cool note prevents the warm one from becoming oppressive; the warm note prevents the cool
          one from becoming cold. The key word is <em className="italic text-stone-200">contrast</em>,
          not <em className="italic text-stone-200">conflict</em>. Opposing scents from completely
          different families — a sweet gourmand over a sharp aquatic — usually produce conflict:
          discordant, confusing, unpleasant.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Your skin — its pH, warmth, microbiome, and natural oil profile — is not a passive surface.
          It is an active participant in the blend. The same combination applied to two different people
          will smell recognizably similar but not identical. This is not a problem to be solved; it
          is the point.
        </p>

        <div className="border-t border-stone-800/60 my-12" />

        {/* THREE TECHNIQUES */}
        <SectionLabel>The Methods</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          Three Ways to Layer —<br />
          <em className="italic text-amber-400/80">Each With a Different Effect</em>
        </h2>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          Not all layering is the same technique. The method determines what kind of composite emerges.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          1. Skin-on-Skin: The Full Blend
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          This is the most integrative method. Apply it in four steps:
        </p>
        <ol className="space-y-2 mb-5 pl-4">
          {[
            "Moisturise. Apply a fragrance body lotion or unscented oil to clean skin — this creates an invisible foundation layer and extends longevity significantly.",
            "Apply your base fragrance — the heavier, warmer one — to pulse points: wrists, inner elbows, chest, neck.",
            "Wait. Give the first fragrance at least ten to fifteen minutes to begin development. Twenty is better. A wet fragrance applied over a wet fragrance competes rather than blends.",
            "Apply your secondary fragrance — typically something lighter or brighter — to the same pulse points or slightly higher.",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-amber-500 text-[10px] font-medium mt-1 shrink-0">{i + 1}.</span>
              <p className="font-serif text-base font-light text-stone-300 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          This method requires that you select fragrances with compatible development speeds. A
          fast-evaporating citrus as a base layer under a slow-developing oud will be gone before the
          oud opens. You will be left wearing just the oud — which is fine if that was the plan,
          but is not layering.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          2. Skin and Fabric: The Proximity Blend
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Apply one fragrance to skin and a different fragrance to clothing — jacket collar, shirt
          chest, scarf. The two fragrances do not physically merge; instead, they exist in proximity
          and are perceived together. The effect is less integration and more layered impression:
          the skin scent is intimate, perceived by those close to you; the fabric scent is the
          first-impression projection. This works particularly well when the fabric fragrance is a
          heavy, tenacious oriental or oud — fabric holds those safely — while the skin carries
          something lighter that reads as the dominant signal at conversational distance.
        </p>

        <Callout label="Advanced Technique" title="The Hair Mist">
          <p className="font-serif text-sm font-light text-stone-400 leading-relaxed">
            Hair holds fragrance exceptionally well — far better than skin. Misting a lighter
            fragrance through your hair while wearing a heavier one on skin creates a two-register
            effect: the hair scent trails behind you at distance, while the skin scent is what
            someone encounters up close. The contrast between the two registers, experienced
            simultaneously, can be remarkably elegant. Use this with discretion — hair concentrates
            and projects over hours, so a single light mist is almost always sufficient.
          </p>
        </Callout>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          3. Concentration Stacking: Weight Management
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Apply a higher-concentration formulation (Parfum or EDP) as the anchoring base, a lower
          concentration (EDT or Cologne) as the top layer. The logic is evaporation rates: denser
          molecular compounds in the Extrait phase evaporate slowly, creating a long-lasting substrate.
          Lighter compounds in the EDT phase evaporate faster, providing the opening impression.
          The result mimics the multi-phase structure that professional perfumers engineer into a
          single bottle — but assembled from two separate compositions, which can create a profile
          that no single fragrance achieves alone.
        </p>

        <PullQuote>
          The first bottle is the foundation. The second bottle is the statement. Which one you
          reach for first is not a small decision.
        </PullQuote>

        <div className="border-t border-stone-800/60 my-12" />

        {/* RULES OF ORDER */}
        <SectionLabel>The Rules</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          Before You Open<br />
          <em className="italic text-amber-400/80">Either Bottle</em>
        </h2>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          These are the principles that separate a deliberate combination from an accidental one.
          Most failed layering experiments violate at least one of them.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          1. Moisturise First, Always
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Dry skin cannot hold fragrance molecules effectively, and layered fragrances on dry skin
          will evaporate unevenly, making the composition fall apart quickly. Hydrated skin is not
          a comfort preference — it is a structural requirement for layering to function at all.
          An unscented or lightly scented body oil is the cleanest foundation; avoid heavily fragranced
          body products unless you know exactly how their compounds interact with what you are applying
          on top.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          2. Heavier Molecule Goes First
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Base notes — musks, resins, woods, ambers — have large, slow-evaporating molecules. They
          are designed to anchor a fragrance, not to open it. When you apply them first to warm skin
          and allow them to begin their development before adding the second fragrance, you are
          replicating the pyramid structure of a professional composition: foundation established,
          then structure built above it. Reverse the order and you get competition, not a foundation.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          3. Think in Ratios, Not Equal Parts
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Layering is not 50/50. One fragrance should dominate; the other should support. Think of
          it as seasoning — your dominant scent is the dish, the second is the spice. A ratio of
          roughly 70/30 (two sprays of the primary, one of the secondary) is a good starting point
          for most combinations. Because you are combining two fragrances, the combined projection
          will always be greater than either alone. Start with half the amount you would normally
          apply of each.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          4. Choose Complements, Not Twins
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Two fragrances from the same olfactive family, applied in the same quantity, tend to amplify
          rather than build. Two powerful ouds create an oud at twice the volume, not a new composition.
          Productive layering usually involves fragrances from adjacent — not identical — families, or
          the same family at very different weights. Look for a shared note as the bridge, then let
          the differences do the work.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          5. Wait. Then Wait Again.
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          The single most common error is impatience. A wet fragrance applied over a wet fragrance
          competes for the same skin chemistry at the same moment. Give the first fragrance at least
          ten to fifteen minutes before applying the second. If the first is a dense oriental or oud,
          thirty minutes will yield a fundamentally different result than five.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          6. Judge the Drydown, Not the Opening
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          The opening of a layered combination is the most misleading moment. Top notes are in
          competition until they evaporate; what seems to clash in the first ten minutes may resolve
          beautifully in the heart. Conversely, a combination that smells pleasant immediately may
          reveal dissonance when the base notes surface and interact. Allow at least two hours before
          deciding whether a combination works. The verdict at hour two is the verdict that matters.
        </p>

        <div className="border-t border-stone-800/60 my-12" />

        {/* COMBINATIONS */}
        <SectionLabel>Six Combinations Worth Trying</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          Proven Pairings —<br />
          <em className="italic text-amber-400/80">and Why Each One Works</em>
        </h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-8">
          These are not arbitrary selections. Each illustrates a different layering principle, and
          each produces a result that is quantifiably different from either fragrance worn alone.
        </p>

        <div className="space-y-3 mb-10">
          {COMBINATIONS.map((combo) => (
            <div
              key={combo.name}
              className="bg-stone-900 border border-stone-800 p-5 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, #b45309 0%, transparent 100%)" }}
              />

              <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                <p className="font-serif text-base font-medium text-amber-400">{combo.name}</p>
                <span className="text-[9px] uppercase tracking-[0.25em] text-stone-600 mt-1">
                  {combo.principle}
                </span>
              </div>

              {/* Fragrance pair */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {combo.base.slug ? (
                  <Link
                    href={`/fragrances/${combo.base.slug}`}
                    className="font-serif text-sm text-stone-300 hover:text-amber-400 transition-colors"
                  >
                    {combo.base.name}
                  </Link>
                ) : (
                  <span className="font-serif text-sm text-stone-300">{combo.base.name}</span>
                )}
                <span className="text-amber-700 text-xs">→</span>
                {combo.top.slug ? (
                  <Link
                    href={`/fragrances/${combo.top.slug}`}
                    className="font-serif text-sm text-stone-300 hover:text-amber-400 transition-colors"
                  >
                    {combo.top.name}
                  </Link>
                ) : (
                  <span className="font-serif text-sm text-stone-300">{combo.top.name}</span>
                )}
              </div>

              <p className="text-[9px] uppercase tracking-[0.15em] text-stone-600 mb-3">
                {combo.order}
              </p>
              <p className="font-serif text-sm font-light text-stone-400 leading-relaxed">{combo.body}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-800/60 my-12" />

        {/* BUILDING YOUR OWN */}
        <SectionLabel>The Method</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          Building Your Own<br />
          <em className="italic text-amber-400/80">Combinations from Scratch</em>
        </h2>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          The six combinations above are starting points, not conclusions. The more interesting
          outcome is developing a systematic approach that lets you build your own combinations
          reliably — and an advanced practice that goes further than any specific pairing can.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Start with a Shared Note
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Look for a note or accord that appears in both fragrances — sandalwood, amber, a particular
          musk — and make it the bridge. When both compositions share structural DNA at some layer,
          they have a point of connection that helps them read as one thing rather than two. It does
          not need to be the dominant note in either; it simply needs to exist as a through-line.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Assign Roles Before Applying
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Decide before you open either bottle: which fragrance is the foundation, and which is the
          modifier? The foundation is what you would wear alone and be happy. The modifier is what
          you are adding to change something specific — to add warmth, lift, persistence, or depth.
          A modifier without a clear job tends to muddle. A modifier with a specific task tends to
          perform it.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Vary One Axis at a Time
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          If you are developing a combination, change one variable per test: the ratio, the timing,
          the application site, the order. Changing all four at once tells you nothing about which
          change made the difference. Keep notes — not elaborate ones, but enough to reconstruct what
          you did. &ldquo;Bottle A twice on wrist, fifteen minutes, one spray of Bottle B on
          neck&rdquo; is enough. Without notes, you will stumble onto something excellent and lose
          it immediately.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          The Soliflore as a Tool
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          A soliflore — a fragrance built around a single flower — is one of the most useful tools
          in an advanced layerer&apos;s kit. Rather than thinking of a quality rose soliflore as a
          rose perfume, think of it as a rose modifier: something you use in small doses to add a
          floral dimension to a woody or musky base without committing to a full floral fragrance.
          The same logic applies to violet, iris, and jasmine soliflores. You are not wearing the
          soliflore; you are using it to add a note to something else.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Drydown Layering
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Most people apply both fragrances simultaneously. A more advanced approach is to apply the
          first fragrance, wait ninety minutes for its drydown phase — when the top notes are gone and
          the heart is fully exposed — and only then apply the second. This ensures the two fragrances
          interact at their most stable, most characteristic phases, producing a cleaner and more
          intentional result than two opening accords meeting at the same moment.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Seasonal Rotation Through Ratio
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Keep two anchor fragrances — one warm and heavy, one light and airy — and use layering ratios
          to move between seasons without switching your signature entirely. In early autumn: 70% light,
          30% warm. By December: 30% light, 70% warm. You maintain continuity in your signature while
          moving naturally through the year, and the combination always carries some trace of both poles.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Know When to Stop
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          Not every two fragrances can be made to work together. If a combination reads as discordant
          at the drydown after two serious tests with different ratios, the fragrances are not compatible.
          Two is the practical maximum for most wearers; three is only for experienced noses, and only
          when the third fragrance is used in trace quantities as a final modifier. Adding a third
          frequently produces the olfactory equivalent of overpainting: muddy, indistinct, forgettable.
        </p>

        <div className="border-t border-stone-800/60 my-12" />

        {/* MISTAKES */}
        <SectionLabel>The Pitfalls</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          Seven Ways Layering<br />
          <em className="italic text-amber-400/80">Goes Wrong</em>
        </h2>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          Failed layering is almost always the result of one of these.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          1. Applying to Dry Skin Without a Base
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Dry skin cannot hold fragrance molecules effectively. Layered fragrances on dry skin
          evaporate unevenly, making the composition fall apart within an hour. Moisturise first —
          always. And be aware that many seemingly &ldquo;unscented&rdquo; body products contain
          synthetic fragrance or natural materials (beeswax, shea butter) that interact with
          perfume in unpredictable ways. For clean, predictable layering, use a genuinely fragrance-free
          oil or lotion.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          2. Too Much of Both
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          The default application of two separate fragrances at full normal volume produces something
          that is overwhelming before it is interesting. Layering requires reducing — not doubling.
          If you typically apply three sprays of each fragrance, apply two of the base and one of the
          modifier. You can always add; you cannot subtract once you have applied.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          3. Mismatched Concentrations at Equal Volume
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          An Extrait de Parfum layered with an Eau de Toilette in equal spray quantities will almost
          always be dominated entirely by the Extrait — it is not a 50/50 blend, it is an Extrait
          with a ghost of an EDT underneath. Adjust the ratio by concentration, not just preference.
          The higher-concentration fragrance almost always needs to be applied more sparingly.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          4. Incompatible Development Speeds
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Citrus top notes vanish within twenty minutes. Oud and resinous base notes take forty-five
          minutes to fully open. If you use a bergamot-dominant fragrance as your base under an oud
          modifier, the base is gone before the modifier opens. Layering works best when both fragrances
          have comparable longevity on your skin, or when the faster-evaporating fragrance is
          deliberately chosen as the top layer — applied second, intended to open the combination
          and then fade gracefully into the base beneath.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          5. Competing Loudness
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Two high-projection fragrances worn simultaneously do not create a blend. They create an
          argument. The combination projects more than either alone, and projection without coherence
          is simply more loud. At least one of the two fragrances should be moderate in projection —
          present on skin, not broadcasting across the room.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          6. Forcing Incompatible Families
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          An aquatic-marine fragrance and a dark animalic oriental do not share structural vocabulary.
          Forcing them together does not produce sophistication; it produces a smell the brain cannot
          resolve into a coherent object. Avoid combinations that span more than two olfactive families,
          and — if crossing families — ensure one is clearly dominant and the other is clearly a
          modifier at a fraction of the first&apos;s intensity.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          7. Judging at Application
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          The moment immediately after applying two fragrances is the worst possible moment to evaluate
          them. Everything is at peak competition, no integration has occurred, and the combined
          first impression will almost always read as busy. Give any combination at least twenty minutes
          before evaluating, and ideally two hours. The test is at the drydown — and the drydown, for
          a layered combination, arrives later than for either fragrance worn alone.
        </p>

        <Callout label="Before You Layer" title="The Quick Decision Checklist">
          <ul className="space-y-2 mt-1">
            {[
              [
                "Which fragrance is the foundation?",
                "It should be the one you'd wear alone with confidence. Apply it first.",
              ],
              [
                "What is the modifier adding?",
                "Name the specific quality: warmth, lift, persistence, depth, freshness. If you cannot name it, reconsider.",
              ],
              [
                "Do the two fragrances share a note or family?",
                "At least one structural point of contact makes integration more likely than not.",
              ],
              [
                "Is one of them restrained in projection?",
                "At least one should be a skin-close fragrance, not a room-filling one.",
              ],
              [
                "Have you committed to the drydown test?",
                "Judge at sixty minutes minimum. The opening is the opening act, not the verdict.",
              ],
            ].map(([q, hint]) => (
              <li key={q} className="flex items-baseline gap-3 border-b border-stone-800 pb-2">
                <span className="text-amber-500 text-[8px] flex-shrink-0 mt-1">◆</span>
                <span className="font-serif text-sm text-stone-400 leading-relaxed">
                  <strong className="font-medium text-stone-300">{q}</strong>{" "}
                  {hint}
                </span>
              </li>
            ))}
          </ul>
        </Callout>

        <div className="border-t border-stone-800/60 my-12" />

        {/* CONCLUSION */}
        <SectionLabel>The Verdict</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          <em className="italic text-amber-400/80">In Closing:</em> The Only Fragrance<br />
          That Is Exactly Yours
        </h2>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          The perfumers who formulate the fragrances in your collection were not making them for you.
          They were making something that would appeal to enough people across enough skin chemistries
          to justify the production run. That is not a criticism — it is the economic reality of
          fragrance, even at the niche level. Every bottle on your shelf was optimised for a
          population, not for the specific chemistry of your particular skin in your particular climate.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Layering is the corrective: the moment you deliberately combine two fragrances on your skin,
          you are creating something that was not engineered by anyone, that does not exist in any
          catalogue, and that will perform differently on your skin than on anyone else&apos;s. The
          invisible third it produces is yours — not in a commercial or possessive sense, but in the
          only sense that matters with fragrance: it is singular, it is personal, and you built it.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Layering fragrance is a practice, not a formula. The combinations and techniques here are
          starting points, not conclusions. Your skin chemistry, your wardrobe, the climate you live
          in, the version of yourself you want to project on a given day — all of these inform the
          right choice. Keep notes. Be patient with pairings that need time to develop.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-12">
          Start with two bottles. Begin with a ratio. Give it an hour. Then decide.
        </p>

        <div className="border-t border-stone-800/60 pt-8 text-center">
          <p className="font-serif text-xl italic text-stone-300 mb-1">
            &ldquo;Perfume is the art that makes memory speak.&rdquo;
          </p>
          <p className="font-serif text-sm text-stone-600 mb-6">— Francis Kurkdjian</p>
          <p className="font-serif text-2xl italic text-amber-400/70 mb-2">— The Editors</p>
          <p className="text-[9px] uppercase tracking-[0.3em] text-stone-600">
            Written for the man who notices
          </p>
        </div>

      </div>
    </main>
  );
}
