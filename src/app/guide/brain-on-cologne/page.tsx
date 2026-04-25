import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Your Brain on Cologne — Fumage Guide",
  description: "The neuroscience of scent — how fragrance shapes memory, mood, and why certain smells stop you in your tracks.",
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

const FAMILIES = [
  {
    name: "Woody / Aromatic",
    tag: "The Classic Masculine",
    notes: "Sandalwood, cedar, vetiver, patchouli.",
    desc: "Grounding, warm, and versatile. The broadest family in men's fragrance.",
  },
  {
    name: "Fresh / Citrus",
    tag: "The Clean Slate",
    notes: "Bergamot, lemon, neroli, sea breeze.",
    desc: "Uplifting and approachable. Great for warm weather and offices.",
  },
  {
    name: "Oriental / Amber",
    tag: "The Seductive Anchor",
    notes: "Vanilla, tonka bean, resins.",
    desc: "Rich, warm, heavy — best in cool weather and evenings. Powerful sillage.",
  },
  {
    name: "Fougère",
    tag: "The Original Blueprint",
    notes: "Lavender, oakmoss, coumarin.",
    desc: "The structural DNA of most classic men's colognes since 1882.",
  },
  {
    name: "Leather / Tobacco",
    tag: "The Character Actor",
    notes: "Birch tar, castoreum, cured tobacco.",
    desc: "Rugged and divisive — in the best way. These fragrances have opinions.",
  },
  {
    name: "Aquatic / Marine",
    tag: "The '90s Classic",
    notes: "Calone, sea salt, ozonic notes.",
    desc: "Clean, bright, and very much of their era — still beloved, always inoffensive.",
  },
];

export default function BrainOnColognePage() {
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
          Your Brain on Cologne:<br />
          <em className="italic text-amber-400">The Psychology of Scent</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          Fragrance is the only sense with a direct line to your emotions and memory. Here&apos;s what&apos;s actually happening when a scent stops you in your tracks — and how to use that knowledge to smell incredible.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          A deep dive for first-timers and fragrance heads alike · 12 min read
        </p>
      </div>

      {/* Intro */}
      <div className="mb-12">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          Picture this: you&apos;re walking through an airport, minding your own business, when someone walks past wearing a cologne you haven&apos;t smelled in twenty years. Suddenly you&apos;re not in Terminal B anymore. You&apos;re seventeen, nervous, at a school dance, and somehow you can smell the gym floor and the punch bowl too. You blink. You&apos;re back. The stranger is gone. You feel mildly insane.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          Welcome to the strange and deeply human world of scent psychology. No other sense does this to us. You can hear a song from your past and feel nostalgic. But smell doesn&apos;t just make you feel nostalgic — it teleports you. Neuroscientists call it the &ldquo;Proustian memory effect,&rdquo; named after the French author Marcel Proust, who wrote about a single bite of a madeleine dipped in tea unlocking an entire childhood. Scent and memory are wired together in a way that sight, sound, and touch simply aren&apos;t.
        </p>
      </div>

      {/* Why smell is different */}
      <section className="mb-14">
        <SectionLabel>The Neuroscience</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Why smell is wired <em className="italic text-amber-400/80">differently</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Every other sense — sight, hearing, touch, taste — travels through the thalamus, the brain&apos;s central relay station, before reaching the cortex where conscious thought happens. Smell skips that step entirely. Olfactory signals go straight to the limbic system: the part of your brain that handles emotion, memory, and survival instinct. This is why a smell can produce a physical emotional reaction before you&apos;ve even consciously registered what you&apos;re smelling.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            For fragrance, this has enormous implications. It means that wearing a great scent isn&apos;t just an aesthetic choice — it&apos;s a neurological one. The right fragrance influences how you feel about yourself, how others process your presence, and the memories people form when they&apos;re around you.
          </p>
        </div>

        <Callout label="Science Corner">
          Humans can distinguish between roughly 1 trillion different scent combinations — far more than the 10 million colors we can see or the 340,000 tones we can hear. You are, whether you know it or not, a sophisticated scent machine.
        </Callout>

        <PullQuote>
          Of all the senses, smell is the most direct. It doesn&apos;t stop to think. It just feels.
        </PullQuote>
      </section>

      {/* Fragrance Pyramid */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Structure</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          The fragrance <em className="italic text-amber-400/80">pyramid</em>
        </h2>
        <p className="text-sm text-stone-500 font-light mb-8">
          Every fragrance is built in layers. Think of it like a good story: what grabs you first isn&apos;t always what stays with you.
        </p>

        <div className="space-y-px">
          {/* Top notes */}
          <div className="flex gap-0 border border-stone-800 rounded-t overflow-hidden">
            <div className="w-24 flex-shrink-0 bg-amber-900/20 border-r border-stone-800 p-4 flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.15em] text-amber-500 font-medium">Top</p>
              <p className="text-[10px] text-stone-600 mt-1">0–30 min</p>
            </div>
            <div className="flex-1 p-4 bg-stone-950/30">
              <p className="text-stone-200 font-light text-sm mb-1">The first impression.</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                Bright, fresh, citrusy — bergamot, lemon, black pepper. Fleeting and volatile. What you smell in the bottle.{" "}
                <span className="text-amber-600/70">Don&apos;t judge a fragrance by its top notes alone.</span>
              </p>
            </div>
          </div>

          {/* Heart notes */}
          <div className="flex gap-0 border-x border-stone-800 overflow-hidden">
            <div className="w-24 flex-shrink-0 bg-amber-900/30 border-r border-stone-800 p-4 flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.15em] text-amber-500 font-medium">Heart</p>
              <p className="text-[10px] text-stone-600 mt-1">20 min–6 hrs</p>
            </div>
            <div className="flex-1 p-4 bg-stone-950/40">
              <p className="text-stone-200 font-light text-sm mb-1">The soul of the fragrance.</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                Emerge as top notes fade. Florals, spices, herbs — lavender, rose, cardamom. This defines the scent&apos;s character.{" "}
                <span className="text-amber-600/70">If you love a fragrance, you love its heart.</span>
              </p>
            </div>
          </div>

          {/* Base notes */}
          <div className="flex gap-0 border border-stone-800 rounded-b overflow-hidden">
            <div className="w-24 flex-shrink-0 bg-amber-900/40 border-r border-stone-800 p-4 flex flex-col justify-center">
              <p className="text-[10px] uppercase tracking-[0.15em] text-amber-500 font-medium">Base</p>
              <p className="text-[10px] text-stone-600 mt-1">6–12+ hrs</p>
            </div>
            <div className="flex-1 p-4 bg-stone-950/50">
              <p className="text-stone-200 font-light text-sm mb-1">The lasting impression.</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                Deep, slow-drying: sandalwood, vetiver, musks, amber. What people smell when they hug you goodbye.{" "}
                <span className="text-amber-600/70">These elevate a fragrance from good to unforgettable.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scent & Identity */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Identity</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Scent, identity, <em className="italic text-amber-400/80">and the self</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            We use fragrance to signal how we want to feel — and how we want others to experience us. Research in environmental psychology shows that warm, woody fragrances are associated with confidence and groundedness; fresh, citrus-forward scents with approachability and energy. Neither is better — they&apos;re different tools for different moments.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            This is also why fragrance is so personal. Wearing someone else&apos;s &ldquo;signature scent&rdquo; can feel genuinely wrong — like wearing their personality like a coat that doesn&apos;t fit. The goal isn&apos;t to smell like the guy in the ad. It&apos;s to find something that amplifies a version of yourself that already exists.
          </p>
        </div>

        <PullQuote>
          A signature scent is just the olfactory version of knowing your own handwriting.
        </PullQuote>
      </section>

      {/* Fragrance Families */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Taxonomy</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          The fragrance <em className="italic text-amber-400/80">families</em>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FAMILIES.map(({ name, tag, notes, desc }) => (
            <div
              key={name}
              className="border border-stone-800 rounded p-4 bg-stone-950/30"
            >
              <p className="text-stone-200 font-light text-sm mb-0.5">{name}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-amber-500/60 mb-2">{tag}</p>
              <p className="text-[11px] text-amber-700/70 font-light mb-2">{notes}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skin chemistry */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Application</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Skin chemistry <em className="italic text-amber-400/80">is real</em>
        </h2>
        <div className="space-y-4 mb-6">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            A fragrance doesn&apos;t smell the same on everyone. Skin pH, body temperature, diet, hydration, and medication can all alter how a fragrance develops. A vetiver-heavy scent that smells like cold soil on one person might smell like warm pencil shavings on another. Neither is wrong — it&apos;s just chemistry. This is why you can&apos;t fully trust what a fragrance smells like on your friend, in an ad, or in a YouTube review.
          </p>
        </div>

        <Callout label="Pro Tip">
          Don&apos;t rub your wrists together after spraying. This breaks down the fragrance&apos;s molecular structure and accelerates the top notes&apos; evaporation. Just spray and wait.
        </Callout>
      </section>

      {/* Emotional architecture */}
      <section className="mb-16">
        <SectionLabel>Psychology</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          The emotional <em className="italic text-amber-400/80">architecture of scent</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Fragrance researchers have identified consistent emotional responses to specific scent categories. Lavender and chamomile reduce physiological markers of stress. Citrus notes improve mood and alertness. Warm, spicy oriental fragrances tend to increase feelings of confidence.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            A specific scent for a specific ritual — the cologne you wear on days when you need to feel like a slightly better version of yourself — becomes a neurological cue. Your brain has filed that scent under &ldquo;this is what it feels like when things go well.&rdquo;
          </p>
        </div>

        <PullQuote>
          Scent doesn&apos;t just describe a mood. It can create one.
        </PullQuote>
      </section>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
