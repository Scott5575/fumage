import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Second Skin — Fumage Guide",
  description:
    "The fragrance category that makes people lean in — what skin scents are, the science of why they work, and how to wear one well.",
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

const MATERIALS = [
  {
    name: "Musks (clean & skin)",
    body: "Habanolide, Exaltolide, Iso E Super derivatives — radiate warmth and the signature just-skin quality without smelling like anything identifiable. The structural backbone of the category.",
  },
  {
    name: "Ambrette Seed",
    body: "A natural musk from hibiscus seeds — slightly fatty, deeply intimate and animalic without being overtly so. The natural route to the same destination as the synthetic musks.",
  },
  {
    name: "Cashmeran",
    body: "A woody musk with a powdery, softener-like quality — extraordinarily blendable, and the note most responsible for the cashmere-skin effect in drydowns.",
  },
  {
    name: "Ambroxan",
    body: "The gold standard of skin-like materials. Warm, slightly salty, amplifies everything around it. Originally derived from ambergris — now synthesized and sitting at the heart of a vast number of contemporary masculine fragrances.",
  },
  {
    name: "Sandalwood & Papyrus",
    body: "Used not as wood notes but as texture and warmth contributors — in certain applications, these creamy or dry woods mimic the quality of warm skin impressively well.",
  },
  {
    name: "Castoreum & Civet (naturals)",
    body: "Animalic notes that, used in restraint, read as intensely human skin. The old way of achieving the effect — largely restricted now, but still encountered in vintage and some high-end niche releases.",
  },
];

const CONCEPTS = [
  {
    tag:  "Why others smell it more than you",
    name: "Olfactory Fatigue",
    body: "Your nose adapts to your own skin scent within 20–30 minutes. Bystanders catch it fresh — precisely the effect the category is designed to produce. Don't let the silence fool you.",
  },
  {
    tag:  "The chemistry",
    name: "Skin Chemistry Dependency",
    body: "Musks and ambroxan-rich formulas are actively modulated by your skin's pH, warmth, and natural oils. The same bottle can smell meaningfully different on different people — and the results are often extraordinary.",
  },
  {
    tag:  "Projection vs. intimacy",
    name: "Close-Range Architecture",
    body: "Skin scents don't project to the back of the room. They project to whoever is close enough to matter — a fundamentally different strategy, and one with its own considerable power.",
  },
  {
    tag:  "Brain science",
    name: "The Limbic System Effect",
    body: "Smell is directly connected to the brain's emotional and memory centres. Skin-mimicking scents trigger deeply embedded associative responses — comfort, attraction, presence. This is why they linger in memory long after a single encounter.",
  },
];

const RULES = [
  {
    rule: "2–3 sprays, maximum",
    body: "Restraint is not weakness here. You are not trying to announce yourself. You are trying to be discovered.",
  },
  {
    rule: "Moisturize first",
    body: "Dry skin eats fragrance. Musk-heavy formulas perform dramatically better on hydrated skin — hydration is almost certainly the variable when performance differs day to day.",
  },
  {
    rule: "Inner wrist, neck, low chest",
    body: "Warm zones that amplify without blasting. Avoid the spray-and-walk-through approach — skin contact is required for these materials to work.",
  },
  {
    rule: "Don't rub your wrists together",
    body: "Friction generates heat that degrades fragrance structure. Let it dry down naturally.",
  },
  {
    rule: "Give it 20 minutes",
    body: "The opening may not hint at what this becomes. Skin scents need body warmth to fully bloom — the heart and base are where the real story is.",
  },
  {
    rule: "Reapply conservatively",
    body: "You can't smell it; they still can. One top-up spray rather than the full opening dose.",
  },
];

const BENCHMARKS = [
  {
    name:       "Molecule 01",
    house:      "Escentric Molecules",
    angle:      "Pure Iso E Super — cedar-skin, woody, radically individual. The most polarizing skin scent in existence, and the most educational.",
    dependency: "Extreme",
  },
  {
    name:       "L'Homme Idéal Intense",
    house:      "Guerlain",
    angle:      "Almond, leather, tonka — a warm, intimate skin scent dressed in a suit. Criminally underrated.",
    dependency: "Moderate",
  },
  {
    name:       "Skin Oud",
    house:      "YSL",
    angle:      "Rose and oud bent toward the intimate and the warm. High concept, accessible execution.",
    dependency: "Moderate–High",
  },
  {
    name:       "Santal 33",
    house:      "Le Labo",
    angle:      "Woody, leathery, smoky — but the skin musk accord underneath is the real engine.",
    dependency: "High",
  },
  {
    name:       "Philosykos",
    house:      "Diptyque",
    angle:      "Fig milk and creamy woods reading as clean, almost edible skin. A more literal interpretation of the category.",
    dependency: "Moderate",
  },
  {
    name:       "Pure Distance White",
    house:      "Puredistance",
    angle:      "The high-niche argument that skin-like can also be genuinely complex and architectural.",
    dependency: "Moderate",
  },
  {
    name:       "Terre d'Hermès EDP",
    house:      "Hermès",
    angle:      "Not a pure skin scent — but the EDP's warmer base has significant skin-musk presence. A gateway drug into the category.",
    dependency: "Low–Moderate",
  },
];

export default function SkinScentsPage() {
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
          Education · Technique
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 leading-[1.08] mb-6">
          The Second Skin:<br />
          <em className="italic text-amber-400">Understanding Skin Scents</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          The fragrance category that makes people lean in — intimate, addictive, and more technically
          complex than it has any right to look.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          6 key materials · 4 science concepts · 6 wearing rules · 7 benchmarks
        </p>
      </div>

      {/* Intro */}
      <div className="mb-16 pb-16 border-b border-stone-800/60">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          There is a certain kind of fragrance that makes people lean in. Not because it announces
          itself from across the room — but precisely because it doesn&apos;t. You catch it in passing,
          something warm and clean and almost biological, the olfactory equivalent of a whisper. You
          find yourself wondering whether it&apos;s a fragrance at all, or just someone who happens to
          smell extraordinarily good. That, in essence, is a skin scent.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          A skin scent is a fragrance designed to smell like an idealized, elevated version of human
          skin. Not post-workout skin. Not fresh-out-of-the-shower skin. More like the idea of warm,
          clean, slightly musky skin — the kind of scent that registers as intimate and personal rather
          than perfumed. The goal is for the wearer to smell like themselves, only better. Considerably
          better.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          For a long time, &quot;subtle&quot; was almost a dirty word in men&apos;s fragrance. The prestige lay in
          projection — in the room knowing you&apos;d walked in before they saw you do it. Then something
          shifted. The niche fragrance movement, and the community of enthusiasts it created, changed
          the question from &quot;how far does it carry?&quot; to &quot;what is it actually doing?&quot; The answer,
          increasingly, is this.
        </p>
      </div>

      {/* What it is + materials */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Definition</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          What a skin scent <em className="italic text-amber-400/80">actually is</em>
        </h2>

        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          The phrase gets misused constantly. A skin scent isn&apos;t simply a fragrance with low
          sillage — weak projection doesn&apos;t automatically make something a skin scent. It&apos;s a
          specific character, a category defined more by intent than by volume. Skin scents are
          built around materials that are chemically predisposed to behave like the surface they&apos;re
          applied to: blending, warming, evolving with your body chemistry rather than sitting on
          top of it as a separate layer.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-8">
          Think of it this way. Most fragrances are like a painting hung on a wall — you observe
          it from a comfortable distance. A skin scent is more like a stain that soaks into the
          canvas: inseparable from the material beneath it. This is not an accident of formulation.
          It&apos;s the entire point.
        </p>

        <PullQuote>
          A skin scent isn&apos;t a fragrance that sits on top of you. It&apos;s a fragrance that becomes you —
          which is either the most intimate thing in perfumery or the most unsettling, depending on
          your temperament.
        </PullQuote>

        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-4">Key Materials</p>
        <div className="space-y-3">
          {MATERIALS.map(({ name, body }) => (
            <div key={name} className="border border-stone-800 rounded p-4 bg-stone-950/30">
              <p className="text-stone-300 text-[12px] font-light mb-1.5">{name}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The science */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Science</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          Why they <em className="italic text-amber-400/80">work</em>
        </h2>

        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          The effectiveness of skin scents isn&apos;t marketing language — there&apos;s real psychophysiology
          at work. Human beings are deeply primed to respond to skin-like olfactory cues. Our sense
          of smell is the oldest of our senses and is wired with intimate connections to the limbic
          system — the part of the brain that processes emotion and memory. The scent of warm skin
          carries associations of safety, closeness, and attraction that have been imprinted long
          before we had language to describe them.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-8">
          There is also olfactory habituation — the well-documented phenomenon where your nose stops
          registering a scent you&apos;ve been exposed to for long enough. Skin scents are particularly
          susceptible to this. Wearers frequently can&apos;t smell their own skin scent after twenty
          minutes, while everyone within handshake distance can. This isn&apos;t a flaw. It&apos;s the feature:
          the fragrance codes as part of you rather than something added.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CONCEPTS.map(({ tag, name, body }) => (
            <div key={name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <p className="text-[10px] uppercase tracking-[0.12em] text-amber-500/50 mb-1.5">{tag}</p>
              <p className="text-stone-200 font-light text-sm mb-3">{name}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cultural shift */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Context</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          The cultural <em className="italic text-amber-400/80">shift</em>
        </h2>

        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          The early 2000s were not a golden era for masculine subtlety. The market was dominated by
          aquatics, fresh aromatics, and a generation of flankers that competed on sheer olfactory
          volume. The idea that a man&apos;s fragrance should be encountered up close, rather than across a
          meeting room, was not exactly mainstream. Restraint wasn&apos;t aspirational — it read as timidity,
          or a thin budget.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          The niche fragrance movement brought a generation of enthusiasts who cared deeply about
          craft, complexity, and intent. With that came a reevaluation of what impressive actually
          meant. Big projection stopped being the only metric. Alongside this, the ongoing
          renegotiation of what &quot;masculine&quot; means opened space for olfactory approaches that
          prioritized warmth, intimacy, and softness without those qualities needing to be defended.
          A man could choose Escentric Molecules 01 or Maison Margiela Replica Jazz Club not despite
          their intimacy but because of it.
        </p>

        <PullQuote>
          There&apos;s a particular confidence in wearing a fragrance that doesn&apos;t perform for the room.
          It signals that you&apos;re not dressing for the crowd. You&apos;re dressing for yourself, and
          perhaps for whoever gets close enough to notice.
        </PullQuote>

        <p className="text-sm text-stone-400 font-light leading-relaxed">
          Fragrance communities on YouTube, Reddit&apos;s r/fragrance, and dedicated forums spent years
          building vocabulary and sharing reference points. &quot;Skin scent&quot; entered the enthusiast
          lexicon as a coherent category worth pursuing rather than a polite euphemism for poor
          performance. When a reviewer says something &quot;wears like a skin scent&quot; and means it as
          high praise, that is a meaningful cultural moment.
        </p>
      </section>

      {/* How to wear */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Technique</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          How to wear <em className="italic text-amber-400/80">them well</em>
        </h2>

        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          Wearing a skin scent badly is difficult — the category is forgiving by design. But wearing
          one brilliantly requires recalibration, particularly if you&apos;ve come up in the school of
          heavier, projecting fragrances.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          Pulse points remain correct, but the reasoning matters. Wrists, neck, and chest are warm
          and well-vascularized — they gently amplify musk materials without shouting them.
          Over-application is the main trap: with skin scents, the goal is suggestion, not saturation.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-8">
          The intimacy of the category is also its greatest contextual strength. Skin scents are
          exceptional when you want to be noticed by the person next to you rather than the person
          across the room — dates, close conversations, small gatherings. Written off as simply
          &quot;date fragrances,&quot; they would be severely underestimated: the best carry a quiet authority
          in daytime professional settings that projecting fragrances often can&apos;t manage.
        </p>

        <div className="border border-stone-800/60 rounded overflow-hidden">
          <div className="px-4 py-2.5 bg-stone-900/40 border-b border-stone-800">
            <p className="text-[9px] uppercase tracking-[0.2em] text-stone-600">Six Rules</p>
          </div>
          {RULES.map(({ rule, body }) => (
            <div key={rule} className="flex gap-4 px-4 py-4 border-b border-stone-800/60 last:border-0">
              <span className="text-[10px] uppercase tracking-[0.08em] text-amber-500/60 border border-amber-900/30 px-2 py-0.5 rounded flex-shrink-0 h-fit bg-amber-950/10">
                Rule
              </span>
              <div>
                <p className="text-stone-300 text-[12px] font-light mb-1">{rule}</p>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benchmarks */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Benchmarks</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Seven <em className="italic text-amber-400/80">essential bottles</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          These are the reference points: fragrances that define the category, set the standards, or
          represent intelligently specific angles within it. Personal chemistry means what sings on
          one person sits flat on another — use this as a starting map, not a buying list.
        </p>

        <div className="border border-stone-800 rounded overflow-hidden">
          <div className="grid grid-cols-[1fr_auto] px-4 py-2.5 bg-stone-900/40 border-b border-stone-800">
            <p className="text-[9px] uppercase tracking-[0.2em] text-stone-600">Fragrance</p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-stone-600">Chemistry</p>
          </div>
          {BENCHMARKS.map(({ name, house, angle, dependency }) => (
            <div key={name} className="px-4 py-4 border-b border-stone-800/60 last:border-0">
              <div className="flex items-baseline justify-between gap-4 mb-1.5">
                <div className="min-w-0">
                  <span className="text-stone-300 text-[12px] font-light">{name}</span>
                  <span className="text-[11px] text-stone-600 italic font-light ml-2">{house}</span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.1em] text-stone-700 flex-shrink-0">
                  {dependency}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{angle}</p>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-stone-600 font-light leading-relaxed mt-4">
          For further reading: Serge Lutens Chergui, Vilhelm Parfumerie Mango Skin, and the broader
          Maison Martin Margiela Replica line offer excellent entry points into the category&apos;s range.
        </p>
      </section>

      {/* Longevity + close */}
      <section className="mb-16">
        <SectionLabel>The Honest Part</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          The longevity <em className="italic text-amber-400/80">question</em>
        </h2>

        <p className="text-sm text-stone-400 font-light leading-relaxed mb-5">
          Skin scents can struggle with longevity on certain skin types. Compared to the barnacle-like
          tenacity of a heavy amber or a dense oud, some of them feel ephemeral. This is a real
          consideration, not a marketing-copy flaw to minimize.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-6">
          The honest answer is this: skin-musk molecules are designed to behave like skin, which means
          they integrate rather than layer. You haven&apos;t lost the fragrance — it has become part of your
          skin&apos;s signature rather than sitting above it. People near you are still registering it
          hours after you&apos;ve stopped being aware of it.
        </p>

        <div className="border border-stone-800/60 rounded p-5 bg-stone-950/20 mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-2">Practical note</p>
          <p className="text-[11px] text-stone-500 font-light leading-relaxed">
            Keep a travel atomizer. Two or three targeted top-up sprays across a long day will handle
            the occasions where you need more than the intimate close-range performance the category
            naturally provides.
          </p>
        </div>

        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed">
          The person who still remembers what you smelled like when you walked past them? That wasn&apos;t
          a loud fragrance. That was a skin scent doing exactly what it was designed to do.
        </p>
      </section>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
