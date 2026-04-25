import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why They Change What You Love — Fumage Guide",
  description:
    "On reformulations, discontinued legends, and the flanker flood — a clear-eyed guide to navigating what fragrance houses do when they think no one is paying attention.",
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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-stone-800 bg-amber-900/5 rounded-sm px-5 py-4 my-7">
      <p className="font-serif text-sm font-light text-stone-400 italic leading-relaxed">{children}</p>
    </div>
  );
}

function VerdictBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-amber-700/40 bg-stone-900/60 rounded-sm p-6 my-8">
      <p className="text-[9px] uppercase tracking-[0.35em] text-amber-500 mb-3">The verdict</p>
      <p className="font-serif text-base italic font-light text-stone-200 leading-relaxed">{children}</p>
    </div>
  );
}

function PartHeader({
  part,
  title,
}: {
  part: string;
  title: React.ReactNode;
}) {
  return (
    <div className="border-t border-stone-800/60 mt-14 mb-8 pt-8">
      <p className="text-[10px] uppercase tracking-[0.35em] text-amber-500/60 mb-3">{part}</p>
      <h2 className="font-serif text-3xl font-light text-stone-100 leading-[1.2]">{title}</h2>
    </div>
  );
}

const REFORM_CARDS = [
  {
    icon: "⚗️",
    title: "IFRA Restrictions",
    body: "Regulatory limits on sensitizing ingredients like oakmoss, certain musks, and citrus compounds force formula changes regardless of house preference.",
  },
  {
    icon: "📈",
    title: "Cost of Naturals",
    body: "Volatile prices for rose, oud, sandalwood, and ambergris push houses toward synthetic substitutes or reduced concentrations to protect margins.",
  },
  {
    icon: "🏢",
    title: "Consolidation",
    body: "Conglomerate ownership rationalizes ingredient sourcing across brands, harmonizing formulas in ways that prioritize efficiency over artistry.",
  },
  {
    icon: "🌍",
    title: "New Markets",
    body: "Formulas are sometimes lightened or sweetened to appeal to emerging markets — particularly in Asia and the Middle East — where preference profiles differ significantly.",
  },
];

const FLANKER_CARDS = [
  {
    icon: "🎯",
    title: "Try Before Committing",
    body: "Never purchase a flanker blind based solely on its name equity. Sample first. Flanker quality is genuinely unpredictable; the name tells you nothing about the juice.",
  },
  {
    icon: "🏷️",
    title: "Watch the Sales Cycle",
    body: "Flankers typically discount steeply 12–18 months after release. Unless it's a limited edition that will sell out, patience is rewarded. Let the initial price premium evaporate.",
  },
  {
    icon: "🔍",
    title: "Evaluate Independently",
    body: "Does this smell good? Does it work for how you want to smell? Those are the only meaningful questions. Whether it's \"better than\" the original is interesting bar-talk, not buying criteria.",
  },
  {
    icon: "📅",
    title: "Know the Season",
    body: "Most flankers are designed with a specific seasonal context — summer freshness, winter warmth. Wearing them in their intended context closes half the gap between flanker and classic.",
  },
];

function CardGrid({ cards }: { cards: typeof REFORM_CARDS }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-8">
      {cards.map((c) => (
        <div
          key={c.title}
          className="border border-stone-800 bg-stone-900/30 rounded-sm p-4"
        >
          <span className="block text-xl mb-2">{c.icon}</span>
          <p className="text-[9px] uppercase tracking-[0.25em] text-amber-500/70 mb-2">{c.title}</p>
          <p className="font-serif text-sm font-light text-stone-400 leading-relaxed">{c.body}</p>
        </div>
      ))}
    </div>
  );
}

export default function ReformulationsPage() {
  return (
    <main className="min-h-screen" style={{ background: "#0c0906" }}>
      <div className="max-w-2xl mx-auto px-6 py-16 pb-24">

        {/* HERO */}
        <SectionLabel>Industry &amp; Culture</SectionLabel>
        <h1 className="font-serif text-4xl sm:text-5xl font-light leading-[1.1] text-stone-100 mb-5">
          Why They Change<br />
          <em className="italic text-amber-400/80">What You Love</em>
        </h1>
        <p className="font-serif text-lg italic font-light text-stone-400 leading-relaxed mb-3 max-w-xl">
          On reformulations, discontinued legends, and the flanker flood — a clear-eyed guide to navigating what
          fragrance houses do when they think no one is paying attention.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-12">
          Long read &nbsp;·&nbsp; Industry &amp; Culture &nbsp;·&nbsp; Collector&apos;s Guide
        </p>

        {/* LEDE — drop cap via first-letter */}
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6 first-letter:text-7xl first-letter:font-semibold first-letter:float-left first-letter:text-amber-400 first-letter:mr-2 first-letter:mt-1 first-letter:leading-none">
          There is a particular kind of grief unique to fragrance enthusiasts. It strikes without warning — mid-spritz,
          on an otherwise ordinary Tuesday — when you realize the bottle in your hand no longer smells the way the
          bottle in your memory did. The oakmoss is quieter. The civet is gone entirely. That deep, slightly animalic
          bass note that used to rumble beneath everything like a well-tuned subwoofer has been replaced by something
          polite, something clean, something <em>inoffensive</em>. You haven&apos;t imagined it. The formula changed.
          Welcome to the frustrating, fascinating, and occasionally infuriating world of fragrance reformulation.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          To truly understand what&apos;s happening — and to navigate it like a veteran instead of feeling victimized
          by it — you need to understand three separate but deeply connected phenomena: why houses reformulate their
          classics, why beloved fragrances get discontinued altogether, and what to make of the endless flanker releases
          that clutter shelves and confuse loyalists. These aren&apos;t random acts of corporate cruelty. They&apos;re
          business decisions, regulatory responses, and creative experiments — each with its own logic, its own
          casualties, and yes, occasionally, its own hidden gems.
        </p>

        {/* PART ONE */}
        <PartHeader
          part="Part One"
          title={
            <>
              The Invisible Hand in Your{" "}
              <em className="italic text-amber-400/80">Favorite Bottle</em>
            </>
          }
        />

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          Reformulations happen for reasons that are mostly unglamorous, occasionally legitimate, and rarely anything
          to do with creative improvement. The most significant driver — the one you&apos;ll encounter most often in
          serious fragrance discussion — is regulation.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The International Fragrance Association, known as IFRA, periodically updates its guidelines on which aromatic
          materials can be used, at what concentrations, and in which product categories. These guidelines exist for
          genuine public health reasons: certain musks, some oakmoss-derived compounds (atranol and chloroatranol
          specifically), several citrus chemicals, and a handful of other materials have been identified as sensitizers
          — meaning they can cause allergic reactions in some people over time. IFRA restricts or outright bans them,
          and responsible houses comply.
        </p>

        <Callout>
          <strong className="font-medium text-stone-200 not-italic">The IFRA Reality:</strong> The 49th Amendment to
          IFRA standards, which took effect in 2023, brought sweeping changes to oakmoss and treemoss concentration
          limits — two of the foundational pillars of the classic fougère and chypre fragrance families. If your
          favorite aromatic fern or classic chypre smells &ldquo;lighter&rdquo; than it used to, this is very likely
          why.
        </Callout>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The result? Some of the most storied chypre and fougère fragrances — the pillars of classic masculine
          perfumery — have been fundamentally altered. Fragrances built on oakmoss, the earthy, forestal ingredient
          that gave mid-century classics their almost geological depth, have been hit particularly hard. When you spray
          a vintage bottle of something like early Kouros and compare it to a contemporary bottle, you&apos;re not just
          experiencing nostalgia bias. You&apos;re experiencing actual chemistry.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          But IFRA isn&apos;t the whole story. Cost is just as significant, and houses are considerably less
          forthcoming about it. Natural ingredients fluctuate wildly in price. Rose absolute from Bulgaria can see
          30–40% price swings in a single year depending on the harvest. Oud from Laos commands eye-watering sums.
          When a fragrance sells at a certain price point and the raw material costs climb, something has to give —
          and it&apos;s rarely the margin.
        </p>

        <PullQuote>
          A reformulation that &ldquo;maintains the spirit&rdquo; of the original is the olfactory equivalent of a
          cover band. It might be good. It might even be great. But it is not the thing itself.
        </PullQuote>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The third driver is something we might charitably call &ldquo;portfolio management&rdquo; — which is what
          marketing executives say when they mean &ldquo;we&apos;re simplifying the supply chain.&rdquo; As fragrance
          companies consolidate under large conglomerates (LVMH, Coty, Puig, ELC — the alphabet soup of luxury holding
          companies), individual brands are pressured to rationalize their ingredient lists, reduce unique materials,
          and align formulas across shared production facilities. It&apos;s efficient. It&apos;s sensible. It is also,
          for those of us who loved the original, deeply annoying.
        </p>

        <CardGrid cards={REFORM_CARDS} />

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          So what do you do with all this? First, smell critically. Don&apos;t assume the bottle you buy today is the
          formula you fell in love with. Check release dates. Communities like Fragrantica&apos;s forums and Basenotes
          are extraordinarily good at tracking when formulas shifted and which batch numbers to seek out. Second, when
          you find an older batch of something you love — a pre-reformulation backup — buy it. Two or three backup
          bottles of a beloved fragrance may sound eccentric to non-enthusiasts. To us, it&apos;s just Tuesday.
        </p>

        {/* PART TWO */}
        <PartHeader
          part="Part Two"
          title={
            <>
              Gone &amp; Not Forgotten:{" "}
              <em className="italic text-amber-400/80">The Discontinuation Question</em>
            </>
          }
        />

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          If reformulation is the slow erosion of something you love, discontinuation is the sudden cliff edge. One
          day a fragrance is simply no longer available. No announcement, no farewell tour, no chance to stock up.
          Just gone — and when you finally think to check the website, you find that familiar empty page: &ldquo;This
          product is no longer available.&rdquo;
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The question that haunts every enthusiast: why would any house discontinue something that people love? The
          answer, frustratingly, is the same as much of the reformulation story — money, but from a different angle. A
          fragrance requires ongoing investment to remain in production: ingredient sourcing, quality control, bottle
          manufacturing, marketing support, retail placement fees, and shelf real estate. If a fragrance is beloved but
          represents a small percentage of a house&apos;s revenue, it can make purely cold financial sense to retire
          it and concentrate resources on blockbuster flankers of the current mega-seller.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          There&apos;s also what we might call the <em>catalog weight problem</em>. A house with 400 SKUs in its
          lineup is a house with an unmanageable inventory problem. Every few years, major brands conduct portfolio
          reviews and cull anything that doesn&apos;t move enough units. The fact that those 200 units per year are
          sold to passionate, devoted collectors who will be furious when it disappears is, regrettably, not a
          variable that appears in the spreadsheet.
        </p>

        <Callout>
          <strong className="font-medium text-stone-200 not-italic">The Cruel Irony:</strong> Discontinuation often
          increases a fragrance&apos;s desirability dramatically. Pre-discontinuation, a fragrance might sell quietly
          and steadily. Post-announcement, secondary market prices spike 300–500% as collectors scramble. The
          fragrance becomes <em>more</em> beloved in absence than it ever was in availability — a lesson in scarcity
          that the houses themselves seem perpetually surprised by.
        </Callout>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          Ingredient availability also forces the issue. Some natural materials come from geographically specific
          sources — a particular region of sandalwood, a specific species of iris, a patch of Bulgarian rose valley —
          and supply chain disruptions, ethical sourcing concerns, or simple scarcity can make it genuinely impossible
          to continue production without fundamentally altering the formula. When that threshold is crossed,
          discontinuation is sometimes the more honest choice. At least it doesn&apos;t pretend to be the same thing
          while smelling different.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The secondary market — eBay, Fragrantica&apos;s marketplace, dedicated collector groups, StockX for
          fragrance — is where discontinued fragrances live on. Prices vary enormously based on condition, fill level,
          batch number, and the vagaries of collector demand. Buying from these channels requires due diligence: learn
          to read fill levels, understand that heat and light degrade fragrance over time, and always request batch
          codes when possible. A sealed, cellophane-wrapped bottle of a discontinued classic from a reputable seller
          can be as close to the original experience as you&apos;ll ever get.
        </p>

        <VerdictBox>
          The secondary market is not a consolation prize. For serious collectors, it is the primary market — the
          place where great fragrances outlive the business decisions that tried to bury them. Develop your sellers,
          learn the tells of authentic stock, and treat it with the same discernment you&apos;d bring to buying a
          bottle at retail.
        </VerdictBox>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          And sometimes — sometimes — the story has a happy ending. Consumer pressure occasionally works. Houses have
          been known to bring back discontinued fragrances as limited re-releases, &ldquo;archive editions,&rdquo; or
          &ldquo;vintage reformulations&rdquo; when enough noise is made. It happens more often in the niche and
          artisanal sector, where the founder is closer to the customer and more emotionally invested in the catalog.
          But it happens in designer houses too, particularly when a fragrance develops a cult profile significant
          enough to generate press. Your voice as a consumer — your social presence, your direct communication with
          brand representatives — has value. Use it.
        </p>

        {/* PART THREE */}
        <PartHeader
          part="Part Three"
          title={
            <>
              The Flanker Question:{" "}
              <em className="italic text-amber-400/80">Imitation, Iteration, or Inspiration?</em>
            </>
          }
        />

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          And then there are flankers. They arrive every year like clockwork — usually in the late-summer-to-autumn
          sprint before the holiday gifting season — bearing names that riff on something beloved:{" "}
          <em>Intense, Bleu, Privé, Absolu, Noir, Ultra, Gold, Cedar, Sport, Aqua</em>. Each one promises a fresh
          perspective on an established masterwork. Some deliver. Most do not.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          A flanker is a fragrance that uses an existing, successful fragrance as its commercial and often olfactory
          launchpad. It trades on the equity of the parent fragrance&apos;s name recognition while offering something
          differentiated — a seasonal variation, a concentration shift, an accord added or removed, a different
          cultural angle, or simply a different bottle color for the holiday gift market. The business rationale is
          clean: why build a new brand from scratch when you can extend one that already has traction?
        </p>

        <div className="border-t border-stone-800/60 my-10" />

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          Here&apos;s the thing about flankers that takes most enthusiasts a while to accept:{" "}
          <strong className="font-medium text-stone-200">
            the relationship to the original is almost irrelevant to whether the flanker is good.
          </strong>{" "}
          Some flankers are inferior imitations that exist purely to monetize a name. But others are genuinely
          excellent fragrances that happen to share a name with something famous — and they deserve to be evaluated on
          their own merits.
        </p>

        {/* FLANKER SPECTRUM */}
        <div className="border border-stone-800 bg-stone-900/30 rounded-sm p-5 my-8">
          <p className="text-[9px] uppercase tracking-[0.3em] text-amber-500/60 text-center mb-4">
            The Flanker Quality Spectrum
          </p>
          <div
            className="h-1.5 rounded-full mb-3"
            style={{
              background:
                "linear-gradient(90deg, #3a6b8a, #6baa8e, #c9a84c, #c0703a, #8a3a3a)",
            }}
          />
          <div className="grid grid-cols-5 gap-1">
            {["Cash Grab", "Safe Riff", "Solid Variant", "Better Than Original", "Standalone Classic"].map(
              (label) => (
                <p
                  key={label}
                  className="text-[9px] text-stone-600 uppercase tracking-[0.04em] text-center leading-tight"
                >
                  {label}
                </p>
              )
            )}
          </div>
        </div>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The &ldquo;cash grab&rdquo; end of the spectrum is self-explanatory — a flanker that exists solely to place
          a recognizable name on shelf space in the duty-free corridor, offering nothing of olfactory merit beyond the
          association. Released, worn once by the person who received it as a gift, and forgotten.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The &ldquo;safe riff&rdquo; is the most common flanker archetype. It takes the core DNA of the original —
          perhaps a citrus-forward freshness, or a warm woody base — and adjusts the concentration, adds an aquatic
          top note for summer, or substitutes cedar for vetiver in the base. These flankers are competent, sometimes
          pleasant. They are not revelations. They are variations.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          But then there are the others. The flankers that escape their parents entirely and become their own
          arguments. The ones that enthusiasts recommend without qualification, without the asterisk of &ldquo;well,
          if you can&apos;t find the original.&rdquo; These exist. They&apos;re rarer than they should be, but they
          exist — and learning to recognize them is part of what separates a serious collector from someone who simply
          owns a lot of fragrance.
        </p>

        <PullQuote>
          The best flankers don&apos;t try to be better versions of the original. They try to be something else
          entirely — and when they succeed, they earn a permanent place on the shelf by merit alone, not by
          association.
        </PullQuote>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The pragmatic collector&apos;s guide to flankers breaks down simply:
        </p>

        <CardGrid cards={FLANKER_CARDS} />

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          A specific note on concentration flankers — the <em>Intense, Parfum, Extrait,</em> and{" "}
          <em>Eau de Parfum</em> variants of existing Eau de Toilette formulas: these are frequently worth separate
          consideration and often separate purchase. A concentration shift isn&apos;t a simple amplification; houses
          typically adjust the formula itself when moving between concentration tiers. The sillage, dry-down, and
          overall character can shift dramatically. Some fragrances are genuinely superior in their stronger
          concentrations. Others lose something — a lightness, a citrus vibrancy, an airiness — when made denser.
          Skin-testing both versions side by side is always the right call.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-10">
          The industry veteran&apos;s honest take? Flanker fatigue is real. When a house releases a new variant of the
          same franchise every single year — sometimes multiple variants in a single year — it dilutes the brand and
          numbs the consumer. The houses know this. They do it anyway, because the short-term revenue logic is
          overwhelming. The answer, as a collector, is simply discernment. You don&apos;t owe any house or any
          franchise your attention. If the flanker tree is looking tired, step back and explore something entirely
          different. There are thousands of extraordinary fragrances made by smaller houses, independent perfumers,
          and niche maisons that never need to extend a franchise because every release starts from scratch.
        </p>

        {/* CLOSING */}
        <PartHeader
          part="In Closing"
          title={
            <>
              The Long Game of{" "}
              <em className="italic text-amber-400/80">Loving Fragrance</em>
            </>
          }
        />

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The common thread in reformulations, discontinuations, and the flanker economy is that the fragrance
          industry is, first and foremost, an industry. It is full of genuine artistry — extraordinary perfumers doing
          extraordinary work within real constraints — but it operates under the same commercial pressures as any
          other luxury goods market. Understanding those pressures doesn&apos;t diminish your love of fragrance. If
          anything, it deepens your appreciation for the bottles that survive the system with their integrity intact.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          Know your formulas. Smell critically. Buy backups of what you love before someone changes it. Explore the
          secondary market without fear. Evaluate flankers on their merits and not their names. And when a fragrance
          house discontinues something that mattered to you — tell them, loudly, clearly, and repeatedly. You are the
          market they forgot to put in the spreadsheet.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-12">
          The best fragrance in the world is the one currently making you stop in the middle of your day just to
          inhale a little more deeply. Protect your access to it accordingly.
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
