import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "So You Want to Make Your Own Cologne — Fumage Guide",
  description:
    "The seductive idea of mixing your own signature scent, the sobering reality of amateur perfumery, and the services that split the difference — wisely.",
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
    <div className="border border-stone-800 border-t-amber-700 bg-stone-900/40 px-6 py-5 my-8" style={{ borderTopWidth: 2 }}>
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

function Dots({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <div className="flex justify-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`inline-block w-2 h-2 rounded-full ${i < filled ? "bg-amber-500" : "bg-stone-700"}`}
        />
      ))}
    </div>
  );
}

const SERVICE_CARDS = [
  {
    name: "Imaginary Authors",
    tag: "Portland · Semi-Bespoke",
    body: "Known for rich storytelling attached to unusual compositions. Their Build-a-Scent experience leans into narrative-led personalization with actual quality materials. A good entry point for the enthusiast who wants input without full DIY commitment.",
  },
  {
    name: "Scentbird / Commodity",
    tag: "Online · Profile-Based",
    body: "Algorithmic customization based on scent preferences. More subscription-service than true bespoke, but Commodity's customizable blending service occupies an interesting space — genuinely wearable results, democratic pricing, no perfume degree required.",
  },
  {
    name: "Olfactive Studio",
    tag: "Paris · Collaborative",
    body: "Collaborations between perfumers and photographers, resulting in fragrance as artistic statement. Their consultation service for personal commissions is priced accordingly, but you're buying access to serious perfumery credentials.",
  },
  {
    name: "Ffern",
    tag: "UK · Seasonal / Curated",
    body: "Not fully bespoke, but Ffern's seasonal, subscriber-led model is worth knowing. Each release is informed by community input, and the quality of materials and formulation is genuinely excellent for the price point.",
  },
  {
    name: "Scent Trunk",
    tag: "Online · Profile-Matched",
    body: "Profiling-based custom fragrance with a monthly sampling model. Better suited to discovery than true signature creation, but the custom formula service is a legitimate option for finding a direction before committing to something more formal.",
  },
  {
    name: "Your Local Perfumer",
    tag: "Appointment · Fully Custom",
    body: "Independent perfumers offering bespoke commissions exist in most major cities, and some work remotely. This is the real thing: a perfumer who interviews you, builds a brief, and creates something singular. Expect $500–$3,000+ for a proper commission.",
  },
];

const MATRIX_ROWS = [
  { route: "Full DIY (Amateur)",              quality: 2, effort: 5, cost: 2 },
  { route: "Online Customization Service",    quality: 3, effort: 1, cost: 2 },
  { route: "Independent Perfumer Commission", quality: 4, effort: 2, cost: 4 },
  { route: "Buying an Established House",     quality: 5, effort: 0, cost: 1 },
];

export default function DiyCologneArticle() {
  return (
    <main className="min-h-screen" style={{ background: "#0c0906" }}>
      <div className="max-w-2xl mx-auto px-6 py-16 pb-24">

        {/* HERO */}
        <SectionLabel>The Craft · DIY &amp; Bespoke</SectionLabel>
        <h1 className="font-serif text-4xl sm:text-5xl font-light leading-[1.1] text-stone-100 mb-5">
          So You Want to Make<br />
          <em className="italic text-amber-400/80">Your Own Cologne</em>
        </h1>
        <p className="font-serif text-lg italic font-light text-stone-400 leading-relaxed mb-3 max-w-xl">
          The seductive idea of mixing your own signature scent, the sobering reality of amateur
          perfumery, and the services that split the difference — wisely.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-12">
          Long read &nbsp;·&nbsp; The Craft &nbsp;·&nbsp; DIY &amp; Bespoke
        </p>

        {/* LEDE */}
        <SectionLabel>The Premise</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          The Fantasy Is Understandable.<br />
          <em className="italic text-amber-400/80">The Reality, Less So.</em>
        </h2>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5 first-letter:text-7xl first-letter:font-semibold first-letter:float-left first-letter:text-amber-400 first-letter:mr-2 first-letter:mt-1 first-letter:leading-none">
          At some point in every fragrance enthusiast&apos;s life, the thought arrives fully formed and
          irresistible: <em>what if I just made my own?</em> You know the notes you love — that particular
          vetiver dryness, the way a good ambergris accord seems to slow time, the oakmoss that every
          regulation keeps trying to kill. You&apos;ve spent hundreds, possibly thousands, learning the
          language of scent. Surely the leap from fluent connoisseur to practitioner isn&apos;t that far.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          It&apos;s a romantic idea, and it&apos;s not entirely delusional. But it is — and we say this with deep
          affection for anyone who has gone down this road — considerably harder than it looks. Not impossible.
          Not even unrewarding. Just significantly more complicated, expensive, and humbling than the YouTube
          tutorials let on.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          This guide is for anyone who has seriously entertained the idea: the aspiring amateur perfumer, the
          man who wants a truly singular signature scent, and the pragmatist who&apos;d like a bespoke result
          without the full DIY adventure. We&apos;ll cover what it actually takes to formulate your own
          fragrance, where the bodies are buried, the services that can meet you halfway, and how to navigate
          any of these routes without producing something that smells like a cleaning supply.
        </p>

        <PullQuote>
          The distance between &ldquo;knowing what you like&rdquo; and &ldquo;knowing how to make it&rdquo; is
          the same distance between being a great restaurant critic and running a Michelin-starred kitchen.
        </PullQuote>

        <div className="border-t border-stone-800/60 my-12" />

        {/* THE REALITY CHECK */}
        <SectionLabel>The Reality Check</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          Five Reasons Your First Attempt<br />
          <em className="italic text-amber-400/80">Will Probably Not Be Wearable</em>
        </h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          Let&apos;s be honest about the obstacles before we discuss the solutions. These aren&apos;t meant to
          discourage you — they&apos;re meant to give you the correct map before you start driving.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          1. Raw Materials Are Both Expensive and Bewildering
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Professional perfumers work with a palette of several hundred individual aromatic materials — naturals
          like absolutes, concretes, and essential oils, and synthetics like musks, aldehydes, and aroma
          chemicals with names that read like industrial safety forms. Your access to quality versions of these
          materials, as a private individual, is limited. Consumer-grade essential oils from the wellness
          industry are, with a few exceptions, not what fine fragrances are built from. The good stuff —
          genuine orris butter, quality oud oil, real ambergris tincture — ranges from &ldquo;surprisingly
          expensive&rdquo; to &ldquo;requires a second mortgage.&rdquo; A small vial of Rose de Mai absolute
          will make you rethink your financial priorities in a hurry.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          2. Formulation Is a Trained Discipline, Not a Feeling
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Professional perfumers spend years — at institutions like ISIPCA in Versailles or Givaudan&apos;s
          training program — learning not just what smells good, but why, and how materials interact over time.
          The same material can smell completely different at 0.5% concentration versus 5%. An accord that sings
          on the blotter may turn feral on skin. Top notes that seem anchoring on first spray will be gone in
          twenty minutes, changing the entire character of the composition beneath. You are not just blending
          pleasant things together; you are engineering a temporal experience across multiple chemical
          interaction surfaces. That is, in fact, a science.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          3. Stability Is a Bigger Problem Than Smell
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Even if your blend smells wonderful on day one, will it smell the same on day thirty? Ninety? Will
          your citrus notes oxidize into something unpleasant? Will your naturals turn? Will the whole thing
          separate, discolor, or — if you&apos;re applying it to skin — cause a reaction? Formulation stability
          testing is a proper process that commercial houses run over months. DIY perfumers often skip this and
          are unpleasantly surprised later.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          4. IFRA Compliance Is Genuinely Complicated
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          The International Fragrance Association maintains restriction and prohibition lists for materials used
          in fragrance — this is why you can no longer find oakmoss-heavy classics the way they were originally
          formulated. If you&apos;re making something solely for personal use, you can technically ignore these
          guidelines. But knowing which materials are restricted, at what concentrations, and for which product
          types is a serious undertaking. Some popular naturals (bergapten-rich bergamot, for example) are
          photosensitizing. Others cause sensitization with repeated use. This isn&apos;t bureaucratic fussiness
          — it&apos;s chemistry with real skin-health consequences.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          5. Dilution Math Is Unforgiving
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          A fragrance concentrate is typically diluted in alcohol (ethanol) to a specific concentration —
          Eau de Toilette, Eau de Parfum, Extrait, etc. Getting this wrong doesn&apos;t just make it weaker or
          stronger; it can fundamentally alter the smell profile, throw off the balance of light and heavy
          molecules, and ruin what may have been a genuinely nice composition. The math is simple in principle
          and surprisingly treacherous in practice when you&apos;re working in fractions of grams.
        </p>

        <Callout label="Quick Reference" title="The Cost of Entry">
          <p className="font-serif text-sm font-light text-stone-400 leading-relaxed mb-4">
            A realistic minimum investment to begin serious amateur perfumery, assuming you want quality
            materials and proper equipment:
          </p>
          <ul className="space-y-2">
            {[
              ["Starter aromatic materials (30–50 materials, quality suppliers)", "$400–$1,200"],
              ["Precision scale (0.01g resolution)", "$30–$80"],
              ["Lab-grade ethanol (sufficient quantity)", "$60–$150 depending on your state"],
              ["Pipettes, beakers, testing strips, atomizers", "$50–$120"],
              ["An introductory perfumery course or text (highly recommended)", "$30–$300"],
            ].map(([item, price]) => (
              <li key={item} className="flex items-baseline gap-3 border-b border-stone-800 pb-2">
                <span className="text-amber-500 text-[8px] flex-shrink-0">◆</span>
                <span className="font-serif text-sm text-stone-400 leading-relaxed flex-1">{item}</span>
                <span className="font-serif text-sm font-medium text-stone-300 whitespace-nowrap">{price}</span>
              </li>
            ))}
          </ul>
          <p className="font-serif text-sm font-light text-stone-500 italic mt-4">
            Total realistic entry: <strong className="font-medium text-stone-300 not-italic">$600–$1,800+</strong>, before you&apos;ve made a single thing you&apos;d actually wear.
          </p>
        </Callout>

        <div className="border-t border-stone-800/60 my-12" />

        {/* THE PATH FORWARD */}
        <SectionLabel>The Path Forward</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          If You&apos;re Still In — Here&apos;s<br />
          <em className="italic text-amber-400/80">How to Give Yourself a Fighting Chance</em>
        </h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Having properly terrified you, let&apos;s talk about how to do this well, because plenty of people
          do. Amateur perfumery is a legitimate hobby with a real community, good resources, and a skill ceiling
          high enough to keep a dedicated practitioner engaged for years.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Start with an Accredited Course or a Serious Text
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Don&apos;t start with YouTube. Start with Mandy Aftel&apos;s <em>Essence and Alchemy</em> —
          possibly the best accessible introduction to natural perfumery for the educated layperson — or with
          Fragrance Foundation courses if you want structure. Tisserand and Young&apos;s{" "}
          <em>Essential Oil Safety</em> is dense but invaluable for anyone using naturals seriously. Online
          courses through places like the Natural Perfumers Guild or Perfumers World will at minimum introduce
          you to the vocabulary and conceptual framework that makes everything else make sense.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Source Materials from Reputable Suppliers
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          The difference between decent materials and aspirational ones is the difference between cooking with
          spice rack powder and sourcing from Épices de Cru. For small-quantity quality materials, suppliers
          like Hermitage Oils, Perfumer&apos;s Apprentice, and Eden Botanicals offer quality naturals. For
          synthetics and aroma chemicals — the building blocks of most contemporary fine fragrance — Barlab,
          Hermitage, and New Directions Aromatics carry what you need. Go to Fragrantica&apos;s forums and
          smell community boards for current supplier opinions; the landscape shifts.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Embrace the Accord as Your Unit of Work
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Rather than attempting full fragrances immediately, work on accords — small, harmonious blends of two
          to five materials that collectively read as a single &ldquo;note.&rdquo; Build a leather accord.
          Build a tobacco accord. Build an amber. These become the building blocks you actually construct a
          fragrance from, and the process of making them teaches you inter-material relationships far more
          directly than blending a full formula from scratch.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Keep Meticulous Records
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          If you don&apos;t write down exact formulas in grams — not drops, not &ldquo;a little of this&rdquo;
          — you will never be able to reproduce anything you like. This is the single most common failure mode
          in amateur perfumery: someone creates something they love, changes one thing, loses the thread
          entirely, and can never get back to what they had. A simple spreadsheet per formula, updated with
          each modification, is your most important tool.
        </p>

        <PullQuote>
          The accord is to perfumery what the chord is to music — the elemental unit of harmony from which
          everything larger is built. Learn to build chords before you try to write symphonies.
        </PullQuote>

        <div className="border-t border-stone-800/60 my-12" />

        {/* BESPOKE SERVICES */}
        <SectionLabel>The Shortcut Worth Taking</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          Bespoke &amp; Customization Services:<br />
          <em className="italic text-amber-400/80">Someone Else Does the Chemistry</em>
        </h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          If the DIY path sounds like more chemistry homework than you signed up for, there is a genuinely
          excellent middle road: bespoke fragrance services. These range from high-end atelier experiences with
          a trained perfumer to online tools that let you build a scent profile and receive a custom
          formulation.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-8">
          The spectrum is wide, and the quality range is equally wide. Here is an honest assessment of the main
          categories and some notable players.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {SERVICE_CARDS.map((card) => (
            <div
              key={card.name}
              className="bg-stone-900 border border-stone-800 p-5 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, #b45309 0%, transparent 100%)" }}
              />
              <p className="font-serif text-base font-medium text-amber-400 mb-1">{card.name}</p>
              <p className="text-[9px] uppercase tracking-[0.25em] text-stone-600 mb-3">{card.tag}</p>
              <p className="font-serif text-sm font-light text-stone-400 leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-800/60 my-12" />

        {/* PRACTICAL FRAMEWORK */}
        <SectionLabel>The Practical Framework</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          How to Make a Scent<br />
          <em className="italic text-amber-400/80">That Doesn&apos;t Actually Suck</em>
        </h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Whether you&apos;re going full DIY, working with a service, or briefing a perfumer, the following
          principles apply to any route. They are the closest thing to a universal framework for &ldquo;how not
          to produce something terrible.&rdquo;
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Start with Your Reference Library, Not a Blank Page
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          You almost certainly know what you love. Write it down: five to ten fragrances you own, have owned,
          or would wear without hesitation. Pull out their stated notes, their houses, their eras. What do they
          share? There&apos;s a through-line — there always is. That through-line is your olfactory DNA, and
          it&apos;s the most useful brief you can give yourself, a service, or a perfumer. &ldquo;I like
          everything Lutens made between 1990 and 2002&rdquo; is a more useful creative brief than &ldquo;I
          want something woody and masculine.&rdquo;
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Constrain Aggressively
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          The impulse in fragrance creation — amateur or otherwise — is to want everything: the fresh opening,
          the rich heart, the lasting base, the complexity, the projection, the longevity. In practice, every
          additional demand is a compromise against every other demand. The most wearable fragrances are the
          ones built around a clear, constraining idea. One central accord, developed beautifully, beats an
          ambitious mess of twelve competing accords. Less is not always more, but less that&apos;s coherent is
          almost always better than more that isn&apos;t.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Test on Skin Early and Often — and Wait
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          The blotter is a liar. Skin chemistry changes everything, and it does so unpredictably. What reads as
          warm and sensual on a strip may turn powdery-sour on your particular skin chemistry. What seems too
          sharp off the strip may mellow magnificently on skin. The only way to know is to wear it — and to
          wear it for three to four hours, through the full drydown, before making any judgments. Many
          beautiful fragrances smell unremarkable or even off-putting in their first ten minutes.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Resist the Urge to Keep Adding
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          This is the single most common amateur mistake: a blend that is close but not quite right gets
          improved by addition rather than subtraction or ratio adjustment. Professional perfumers — the good
          ones — know that a formula with forty materials is rarely better than one with twenty well-chosen
          ones. More materials means more points of failure, more opportunities for something to clash, more
          complexity for its own sake. If your blend needs something, try adjusting what&apos;s already there
          before reaching for another ingredient.
        </p>

        <h3 className="font-serif text-xl font-medium italic text-stone-200 mt-8 mb-3">
          Give It Time, Literally
        </h3>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          A freshly blended formula needs maceration time — at minimum 48 hours in a sealed container before
          serious evaluation, and ideally two to four weeks for naturals to fully integrate. The materials need
          time to interact and settle. Evaluating a fragrance at hour two is like judging a stew that&apos;s
          been on the stove for ten minutes. The thing you think you&apos;re tasting is not the thing
          you&apos;ll actually be eating.
        </p>

        <Callout label="The Minimum Viable Brief" title="Before You Start (Or Brief Anyone), Answer These">
          <ul className="space-y-2 mt-1">
            {[
              ["What five words describe the feeling you want?", "Not notes — feelings. (Austere. Warm. Animalic. Cerebral. Coastal.)"],
              ["What three fragrances would be in your personal canon?", "Include at least one you'd wear on your most important day."],
              ["What is the one note or material you cannot live without?", "And the one you would never tolerate?"],
              ["When and where will this be worn?", "Intimate proximity or projection? Office or weekend? Day or evening?"],
              ["What concentration do you want?", "EdT, EdP, or Extrait changes everything about formulation."],
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

        {/* THE COMPARISON */}
        <SectionLabel>The Honest Comparison</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          DIY vs. Bespoke vs. Buying<br />
          <em className="italic text-amber-400/80">the Real Thing</em>
        </h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          It would be intellectually dishonest to write this guide without noting that there is a strong case —
          a genuinely compelling one — for simply buying the masterwork that already exists.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          A bottle of vintage Habit Rouge. A flacon of original Chanel Pour Monsieur. A properly sourced bottle
          of Knize Ten. These are the products of decades of perfumery expertise, access to materials at scales
          no individual can replicate, and in the best cases, genuine artistic vision. The fact that they are
          mass-produced does not diminish the craft that went into them any more than a symphony is diminished
          by the fact that a recording of it can be pressed onto ten million discs.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-8">
          The question &ldquo;should I make my own or just buy something great?&rdquo; is not really about
          capability — it&apos;s about intent. If the goal is wearing an excellent fragrance, buying something
          excellent is almost certainly the more efficient and possibly even the more rewarding path. If the
          goal is the process of creation — the learning, the refinement, the singular pride of wearing
          something that exists only because you made it — then DIY or bespoke serves something no purchase
          can. These are different satisfactions, and there is no shame in either.
        </p>

        {/* MATRIX */}
        <div className="border border-stone-800 overflow-hidden mb-3">
          <div className="bg-stone-900 grid grid-cols-4 px-4 py-3 gap-2">
            {["Route", "Quality Ceiling", "Effort Required", "Cost"].map((h, i) => (
              <span
                key={h}
                className={`text-[9px] uppercase tracking-[0.25em] text-amber-500 ${i === 0 ? "text-left" : "text-center"}`}
              >
                {h}
              </span>
            ))}
          </div>
          {MATRIX_ROWS.map((row, i) => (
            <div
              key={row.route}
              className={`grid grid-cols-4 px-4 py-3 gap-2 border-t border-stone-800 items-center ${i % 2 === 1 ? "bg-stone-900/30" : ""}`}
            >
              <span className="font-serif text-sm text-stone-300">{row.route}</span>
              <Dots filled={row.quality} />
              <Dots filled={row.effort} />
              <Dots filled={row.cost} />
            </div>
          ))}
        </div>
        <p className="text-[10px] text-stone-600 text-center mb-10">
          Quality ceiling and effort are relative to informed pursuit; cost reflects typical entry point, not maximum possible spend.
        </p>

        <div className="border-t border-stone-800/60 my-12" />

        {/* CONCLUSION */}
        <SectionLabel>The Verdict</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2] mb-6">
          <em className="italic text-amber-400/80">In Closing:</em> Know What Game<br />
          You&apos;re Actually Playing
        </h2>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          Making your own fragrance — truly making it, with real materials and genuine formulation effort — is
          one of the more rewarding rabbit holes available to the fragrance obsessive. It will teach you more
          about what you love and why than any amount of reviewing or sampling. It will also frustrate you in
          ways that professional reviewers tend not to prepare you for, and it will cost more than you think.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          The bespoke and customization services represent a genuinely excellent middle path: you get something
          singular, built around your brief, without the need to become a trained perfumer first. The quality
          range across these services is real, so do your research — but the best of them are genuinely capable
          of producing something you&apos;ll wear with pride.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-5">
          And if all you want is a magnificent fragrance to wear — one made by people who have spent lifetimes
          developing the vocabulary to make it — the world is full of those. No apology required for choosing
          the direct route to the destination.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-12">
          Whatever path you take: take it with your nose open, your expectations calibrated, and your records
          meticulously kept. This is, ultimately, a discipline of paying attention — to what you smell, when
          you smell it, and why it moves you. Every other skill follows from that.
        </p>

        <div className="border-t border-stone-800/60 pt-8 text-center">
          <p className="font-serif text-2xl italic text-amber-400/70 mb-2">— The Editors</p>
          <p className="text-[9px] uppercase tracking-[0.3em] text-stone-600">
            Written for the man who notices
          </p>
        </div>

      </div>
    </main>
  );
}
