import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Resting Bottle — Fumage Guide",
  description: "Forums swear that letting a bottle sit for months wakes it up. Here's what maceration actually is, what really happens to your fragrance on the shelf, and how to store it so it lasts.",
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

export default function FragranceAgingPage() {
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
          The Resting Bottle:<br />
          <em className="italic text-amber-400">Does Fragrance Really Get Better With Age?</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          One of the hobby&rsquo;s most repeated pieces of advice sits in that frustrating middle ground where it isn&rsquo;t quite a lie and isn&rsquo;t quite true. Let&rsquo;s pull it apart.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          A myth-busting field guide to maceration, oxidation, and storage · 11 min read
        </p>
      </div>

      {/* Intro */}
      <div className="mb-12">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          Somewhere right now, a grown adult is hiding a brand-new bottle of cologne in a sock drawer, setting a mental timer for six months, and refusing to touch it. Not because they don&rsquo;t want to wear it — they&rsquo;re dying to — but because a stranger on a forum told them the fragrance needs to &ldquo;macerate&rdquo; first. Rest. Marry. Come into its own. Spray it too early, the logic goes, and you&rsquo;re wasting the good stuff on an immature scent.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          It&rsquo;s a lovely ritual, and it&rsquo;s also where the trouble starts — because there is real chemistry buried under the folklore, just not as much of it as the sock-drawer crowd believes. The job here is to separate the part that&rsquo;s genuine from the part that&rsquo;s a blend of wishful thinking, a nose that&rsquo;s quietly adjusted, and the simple fact that you got better at spraying. Pour yourself something. Let&rsquo;s sort the real from the romantic.
        </p>
      </div>

      {/* Definition */}
      <section className="mb-14">
        <SectionLabel>Definition</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          What maceration <em className="italic text-amber-400/80">actually</em> means
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Start with the real thing, because it does exist. After a perfumer&rsquo;s concentrate — the blend of aromatic oils — is mixed into its alcohol-and-water base, the whole batch is left to rest. Days, sometimes weeks, occasionally longer, often at a controlled temperature, with a chill-and-filter step at the end to pull out any haze. During that rest the molecules settle into a stable equilibrium, the raw alcoholic bite softens, and the composition stops smelling like its ingredients and starts smelling like itself. This is deliberate, it is chemistry, and it is genuinely important.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Notice where it happens: at the factory, in a vat, before a single bottle is filled and sealed. By the time a fragrance reaches a shelf, the meaningful maceration is already done. Somewhere along the way hobbyists borrowed the word for the at-home version — the bottle resting on your dresser — and that&rsquo;s where the line between fact and folklore gets blurry. What you do at home is, at most, a faint echo of what the lab already finished.
          </p>
        </div>

        <PullQuote>
          The serious maceration already happened. It just didn&rsquo;t happen in your sock drawer.
        </PullQuote>
      </section>

      {/* The Kernel of Truth */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Kernel of Truth</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Yes, a fresh bottle <em className="italic text-amber-400/80">can settle</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Here&rsquo;s the part the forums get right, and it&rsquo;s worth saying clearly: a sealed bottle is not a frozen system. Slow reactions keep ticking along inside the glass — a little gentle oxidation, the ethanol quietly interacting with the aromatic molecules around it. So a genuinely fresh bottle, one filled from a very recent production run, really can smell a touch sharp or boozy on day one and soften over its first couple of weeks of normal life on a shelf. People who buy straight from a brand&rsquo;s newest batch sometimes do notice an edge come off. That is real.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            But notice how modest that is. We&rsquo;re talking about a slight rounding of the opening, over a few weeks, on a bottle that happened to be very young when you got it. That&rsquo;s the entire legitimate effect — and crucially, it happens whether you ceremonially &ldquo;rest&rdquo; the bottle or just wear it like a normal person.
          </p>
        </div>

        <Callout label="The Honest Version">
          If your bottle came from a very recent batch, give it two or three weeks of ordinary shelf life and the raw alcohol bite will likely settle on its own. That&rsquo;s the whole real phenomenon. No sock drawer, no calendar reminder — just time passing while you enjoy the thing.
        </Callout>
      </section>

      {/* The Confounds */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Confounds</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Why the big claims <em className="italic text-amber-400/80">fall apart</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The version that gets oversold is the dramatic one: shelve a bottle for six months and it transforms into a deeper, richer, fundamentally better fragrance. That story runs into four problems, and they stack on top of each other until there&rsquo;s very little left standing.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            <strong className="text-stone-300 font-normal">First, batch age.</strong> Most bottles have already spent months, sometimes years, between the factory and your hands — sitting in a warehouse, a distributor, a shop. They are already fully macerated. There is nothing left for your dresser to accomplish.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            <strong className="text-stone-300 font-normal">Second, your nose adapts.</strong> Smell anything often enough and your brain learns to pick out its details — the nuances that were always there but took a few wears to register. You experience that as the fragrance getting &ldquo;richer.&rdquo; What actually got richer is your familiarity with it.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            <strong className="text-stone-300 font-normal">Third, spray drift.</strong> Nobody sprays a brand-new, expensive bottle with confidence. A few months in, you&rsquo;ve relaxed — two sprays became four, the cautious dab became a proper application. Suddenly it &ldquo;performs better.&rdquo; You&rsquo;re just using more of it.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            <strong className="text-stone-300 font-normal">Fourth, expectation.</strong> You were told it would improve, so you went looking for improvement — and the human nose is wonderfully obliging when its owner is hoping for a result. The most potent ingredient in any maceration story is the person rooting for it to be true.
          </p>
        </div>

        <PullQuote>
          Half of what people call maceration is the fragrance changing. The other half is the wearer changing.
        </PullQuote>
      </section>

      {/* The Performance Claim */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Performance Claim</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          The weakest claim <em className="italic text-amber-400/80">of all</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Of everything attributed to resting a bottle, one claim is shakier than the rest: that it boosts longevity or projection — that a macerated fragrance lasts longer and throws further. This one barely survives contact with the basic chemistry. Resting integrates and smooths a composition; it does not add aromatic material, and it does not raise the concentration. There is simply no mechanism by which sitting still makes a fragrance louder.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            If anything, time pushes the needle the other way. The lightest, most volatile molecules — your bright citruses and crisp top notes — are the first to break down. So a bottle that has genuinely aged tends to lose its sparkling opening, not gain power. Performance is the one thing maceration almost certainly cannot give you.
          </p>
        </div>

        <Callout label="Field Note">
          A fragrance that seems to &ldquo;project more&rdquo; after a few months on the shelf is, nine times out of ten, a fragrance you&rsquo;ve quietly learned to apply more generously. Test it honestly: same number of sprays, same spots, a fresh nose first thing in the morning. The difference usually evaporates.
        </Callout>
      </section>

      {/* What Actually Changes */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>What Actually Changes</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          The real story of a <em className="italic text-amber-400/80">bottle aging</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            None of this means fragrance is changeless in the bottle. It changes plenty — just not in the flattering, romantic way the folklore promises. Over months and years, three quiet processes do their work. Oxygen seeps into the headspace, the growing pocket of air above the liquid as you use the bottle down, and slowly oxidizes the oils. Light and heat accelerate the breakdown of delicate molecules. And the top notes — citrus above all — fade first, leaving a heavier, occasionally sour or flattened character behind.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Vintage collectors know this intimately. An old bottle is a different animal — sometimes gloriously so, the base notes deepened into something the modern reformulation can&rsquo;t touch; sometimes just tired, the brightness gone and a faint staleness in its place. Either way, the change is real, meaningful, and has nothing to do with molecules &ldquo;marrying.&rdquo; It is slow decay, sped up or held off entirely by one thing you actually control: how you store the bottle.
          </p>
        </div>
      </section>

      {/* Storage */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Storage</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          How to actually <em className="italic text-amber-400/80">keep a bottle alive</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            If you want a fragrance to stay as close as possible to the day you bought it, flip the goal: your job isn&rsquo;t to coax it forward, it&rsquo;s to slow it down. The composition has three enemies, and conveniently they&rsquo;re the same three for almost everything else that spoils — heat, light, and air.
          </p>
        </div>

        <Callout label="The Rules That Matter">
          Keep bottles cool and stable — a closet or a drawer beats a sunny windowsill every time. Keep them dark, because ultraviolet light is genuinely brutal on aromatic molecules; the original boxes earn their keep here. Keep them capped and upright. And get them out of the bathroom: the daily temperature and humidity swings of a shower room are the single most common way people quietly cook their own collection.
        </Callout>

        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            You don&rsquo;t need to become a museum conservator about it. A dedicated fragrance fridge is real and does extend the life of prized bottles, but it&rsquo;s overkill for most people. The headline is simpler than that: the same bottle stored in a dark closet will outlive one baking on a bright shelf by years. That gap — closet versus windowsill — dwarfs anything &ldquo;maceration&rdquo; could ever do, in either direction.
          </p>
        </div>
      </section>

      {/* Verdict */}
      <section className="mb-16">
        <SectionLabel>Verdict</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          So — <em className="italic text-amber-400/80">real, or hype?</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Both, in the proportions that matter. The deliberate, meaningful maceration is a manufacturing step you&rsquo;ll never see and don&rsquo;t need to think about. A genuinely fresh bottle can settle a little over its first few weeks — real, but minor, and it happens whether you stage a ceremony around it or simply wear the thing. Everything past that point — the months-long shelf vigil, the promised leap in performance — is mostly your nose, your habits, and your hopes doing the heavy lifting.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            So don&rsquo;t lock a new bottle away waiting for it to bloom. Wear it. Enjoy the slightly sharp opening of a fresh batch knowing it&rsquo;ll round off on its own. Store it somewhere cool and dark so it stays good for years instead of months. And the next time a forum solemnly tells you to macerate for half a year before your very first spray — smile, nod, and go spray it. Life is short, and so, more to the point, are top notes.
          </p>
        </div>

        <PullQuote>
          The best thing you can do for a new bottle isn&rsquo;t to rest it. It&rsquo;s to wear it.
        </PullQuote>
      </section>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
