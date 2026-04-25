import Link from "next/link";

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

function ScienceBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-stone-800 border-l-2 border-l-amber-700/60 rounded p-5 bg-stone-950/40 my-8">
      <p className="text-[9px] uppercase tracking-[0.25em] text-amber-600/80 mb-3">{label}</p>
      <div className="text-[11px] text-stone-500 font-light leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

const FAMILY_ACCENT: Record<string, string> = {
  woody:       "border-t-amber-700/60",
  fresh:       "border-t-sky-500/60",
  aromatic:    "border-t-emerald-600/60",
  spicy:       "border-t-orange-500/60",
  oud:         "border-t-stone-500/60",
  citrus:      "border-t-yellow-500/60",
  fougere:     "border-t-teal-500/60",
  lightcitrus: "border-t-lime-500/60",
  lightwoody:  "border-t-sky-400/40",
};

function ScentCard({
  family, familyKey, house, name, slug, desc, notes,
}: {
  family: string; familyKey: string; house: string; name: string; slug: string | null;
  desc: string; notes: string;
}) {
  return (
    <div className={`border border-stone-800 border-t-2 ${FAMILY_ACCENT[familyKey] ?? "border-t-stone-700/40"} rounded p-5 bg-stone-950/30`}>
      <p className="text-[9px] uppercase tracking-[0.2em] text-stone-600 mb-1">{family}</p>
      <p className="text-[10px] uppercase tracking-[0.12em] text-stone-500 mb-0.5">{house}</p>
      {slug ? (
        <Link href={`/fragrances/${slug}`} className="text-stone-200 font-light hover:text-amber-400 transition-colors block mb-3 leading-snug">
          {name}
        </Link>
      ) : (
        <p className="text-stone-200 font-light mb-3 leading-snug">{name}</p>
      )}
      <p className="text-[11px] text-stone-500 font-light leading-relaxed mb-3">{desc}</p>
      <p className="text-[9px] uppercase tracking-[0.15em] text-stone-700 mb-1">Key Notes</p>
      <p className="text-[10px] text-amber-600/60 font-light italic">{notes}</p>
    </div>
  );
}

const RICH_FRAGRANCES = [
  {
    family: "Woody / Mineral", familyKey: "woody",
    house: "Hermès", name: "Terre d'Hermès EDP", slug: "herm-s-terre-d-herm-s-edp",
    desc: "Considered by many enthusiasts the definitive masculine fragrance of the last two decades. Earthy, mineral, and deeply grounded — it projects quiet authority rather than overt aggression. The EDP has greater warmth and longevity than the original EDT.",
    notes: "Flint, vetiver, orange, grapefruit, cedar, benzoin",
  },
  {
    family: "Fresh / Marine", familyKey: "fresh",
    house: "Giorgio Armani", name: "Acqua di Giò Profumo", slug: "giorgio-armani-acqua-di-gi-profumo",
    desc: "The refined successor to one of the best-selling masculines in history. Marine freshness with a dark undercurrent — incense and patchouli depth give it unexpected gravity. Outstanding longevity.",
    notes: "Marine accord, bergamot, incense, geranium, patchouli",
  },
  {
    family: "Aromatic / Fougère", familyKey: "aromatic",
    house: "Dior", name: "Sauvage EDP", slug: "dior-sauvage-edp",
    desc: "The current generation's most commercially successful masculine for good reason. Lavender-ambroxan core reads simultaneously clean and deeply masculine, with a skin-fusing quality difficult to achieve. The EDP improves on the EDT with added vanilla and greater richness.",
    notes: "Bergamot, lavender, Sichuan pepper, ambroxan, vanilla",
  },
  {
    family: "Warm Spicy / Oriental", familyKey: "spicy",
    house: "Viktor & Rolf", name: "Spicebomb Extreme", slug: "viktor-rolf-spicebomb-extreme",
    desc: "A cold-weather powerhouse. Darker and warmer than the original — tobacco, vanilla, and vetiver beneath a bold spice accord. Projects assertively and is built for evening wear in autumn and winter. Consistently rated among the most complimented masculines.",
    notes: "Tobacco, cinnamon, vanilla, lava accord, vetiver",
  },
  {
    family: "Woody / Oud", familyKey: "oud",
    house: "Tom Ford Private Blend", name: "Oud Wood", slug: "tom-ford-oud-wood",
    desc: "The fragrance that introduced oud to a Western mainstream audience and remains one of the most wearable interpretations of the note. Smoky and woody without being heavy, with a rosy-spice complexity that rewards anyone who encounters it at close range.",
    notes: "Oud, rosewood, cardamom, sandalwood, vetiver, tonka bean",
  },
  {
    family: "Citrus / Woody", familyKey: "citrus",
    house: "Chanel", name: "Bleu de Chanel EDP", slug: "chanel-bleu-de-chanel-edp",
    desc: "Chanel's most successful masculine in decades. The EDP refines the original EDT into something more substantial — the citrus opening gives way to a clean, elegant woody-aromatic heart that feels polished without effort. Versatile enough for any context, any season.",
    notes: "Citrus, jasmine, labdanum, sandalwood, patchouli, vetiver",
  },
];

const LIGHT_FRAGRANCES = [
  {
    family: "Fresh Fougère", familyKey: "fougere",
    house: "Creed", name: "Green Irish Tweed", slug: "creed-green-irish-tweed",
    desc: "The benchmark of the fresh fougère genre. Immaculately clean without being bland — violet leaf and sandalwood give it quiet depth that rewards sustained wearing. Effortless in warmer months and genuinely timeless.",
    notes: "Lemon verbena, violet leaf, iris, sandalwood, ambergris",
  },
  {
    family: "Fresh Citrus / Aromatic", familyKey: "lightcitrus",
    house: "Dior", name: "Eau Sauvage", slug: "dior-eau-sauvage",
    desc: "The original fresh masculine, created in 1966 and still unsurpassed in its category. Hedione — used here at breakthrough concentrations — gives it a radiant, almost luminous quality. Crisp, clean, and quietly sophisticated.",
    notes: "Hedione, lemon, basil, bergamot, rosemary, vetiver, oakmoss",
  },
  {
    family: "Fresh Woody / Citrus", familyKey: "lightwoody",
    house: "Yves Saint Laurent", name: "L'Homme", slug: "yves-saint-laurent-l-homme-ysl",
    desc: "One of the most versatile masculines in existence — light enough for a morning meeting, polished enough for an evening out. Ginger-violet-vetiver accord reads clean and modern without feeling anonymous. Consistently among the most broadly complimented designer masculines.",
    notes: "Ginger, bergamot, violet, white pepper, vetiver, cedar",
  },
];

const TIPS = [
  {
    n: "01",
    title: "Apply to pulse points — and know which ones matter most",
    body: "The neck, chest, and inner wrists are the standards. For close-range encounters, the back of the neck and along the jaw line are equally compelling application points. Body heat at these sites volatilizes the fragrance and lifts it into the air around you.",
  },
  {
    n: "02",
    title: "Never rub — let the skin absorb",
    body: "Rubbing wrists together after spraying is the most common fragrance mistake. It crushes the top notes — the opening impression of the fragrance — and fractures the composition the perfumer designed. Spray, and let it settle.",
  },
  {
    n: "03",
    title: "Moisturize before application",
    body: "Dry skin cannot hold fragrance molecules. Applying an unscented moisturizer before spraying can extend a fragrance's longevity by several hours. This is one of the highest-impact, lowest-effort improvements most men can make immediately.",
  },
  {
    n: "04",
    title: "Restrain your application — reward proximity",
    body: "The most seductive fragrances are discovered, not announced. Two to three sprays are almost always sufficient. A fragrance that enters the room before you do works against you. The goal is to make someone lean in — not to give them no choice in the matter.",
  },
  {
    n: "05",
    title: "Build a small, intentional wardrobe",
    body: "A signature scent builds olfactory memory in the people around you — a powerful advantage. Two or three fragrances rotated by context demonstrates a self-awareness that is itself attractive. You don't need ten bottles. You need the right three.",
  },
  {
    n: "06",
    title: "Understand concentration — it changes the game",
    body: "Eau de Toilette (5–15%) is the everyday standard: moderate projection, refreshes well. Eau de Parfum (15–20%) projects more richly and lasts all day. Parfum Extrait (20%+) is intimate and long-lasting — a few small dabs, not sprays. Know what you're working with.",
  },
];

const SETTINGS = [
  {
    label: "Occasion", title: "Daytime / Professional",
    body: "Fresh, clean, and citrus-forward fragrances or light aromatics. The goal is presence without imposition — detectable to someone leaning in, not announced from across the office. Avoid heavy orientals and deep spice in enclosed spaces.",
  },
  {
    label: "Occasion", title: "Evening / Date",
    body: "This is where warm spice, oud, tobacco, amber, and dark woody fragrances operate at their peak. Depth, projection, and complexity are assets in intimate settings. The goal shifts from approachable to compelling.",
  },
  {
    label: "Season", title: "Summer / Warm Weather",
    body: "Heat amplifies projection dramatically. Citrus, marine, and light aromatic compositions hold their integrity best. Apply less than you think you need; you can always add, you cannot subtract.",
  },
  {
    label: "Season", title: "Autumn / Winter",
    body: "Cold air suppresses diffusion, making this the season to reach for richness: warm spice, tobacco, vanilla, oud, resin, and dense woods. You can apply more generously and the complexity will reward it.",
  },
  {
    label: "Context", title: "Casual / Outdoor",
    body: "Body heat from activity amplifies fragrance unpredictably. Fresh aromatics, clean musks, and light citrus-herbal compositions hold their character under exertion better than complex oriental bases.",
  },
  {
    label: "Context", title: "Intimate / Close Range",
    body: "Skin-fusing fragrances with high ambroxan, musk, and sandalwood content are perceived as most attractive at close proximity — they feel like a natural extension of the body rather than something applied to it.",
  },
];

export default function InvisibleAllurePage() {
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
          The Psychology of Scent
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 leading-[1.08] mb-6">
          The Invisible Allure:<br />
          <em className="italic text-amber-400">Fragrance, Attraction, and the Science of Impression</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          How fragrance works beneath consciousness — shaping how others perceive you, projecting
          confidence before a single word is spoken, and making you unforgettable long after
          you&apos;ve left the room.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          Fragrance &amp; psychology · 15 min read
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          Most men treat fragrance as an afterthought — a final spray before heading out the door,
          chosen once and rarely reconsidered. That is a significant missed opportunity.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          Fragrance is, neurologically speaking, the most direct route to another person&apos;s emotional
          brain. No other element of your personal presentation operates this way. Long before we
          developed language, we navigated the world through smell — and that ancient pathway still
          runs, unchanged, beneath everything else.
        </p>
      </div>

      {/* Section 1: Why scent hits differently */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Mechanism</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Why scent hits <em className="italic text-amber-400/80">differently</em> than every other signal
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          Attraction is never purely visual. Research consistently shows that scent plays a
          foundational role in how desirable a man is perceived to be — and, critically, how
          desirable he feels himself to be. The mechanisms at work run deeper than most men realize.
        </p>

        <ScienceBox label="The Science">
          <p>
            The olfactory bulb has direct synaptic connections to the amygdala (emotional processing)
            and the hippocampus (memory formation) — structures that other sensory modalities must
            reach indirectly. This is why scent triggers emotion faster and more viscerally than any
            other sense, and why a particular fragrance can summon a vivid memory or emotional state
            in an instant.
          </p>
          <p>
            Research from the Monell Chemical Senses Center has shown that humans detect subtle
            genetic compatibility cues through body odor — specifically, differences in the Major
            Histocompatibility Complex (MHC), a set of immune-system genes. We are, without knowing
            it, sniffing for good genetic matches. Fragrance doesn&apos;t mask this signal — it works
            with it, projecting a more refined expression of your natural chemistry.
          </p>
        </ScienceBox>

        <h3 className="text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-3 mt-8">
          Your Natural Chemistry, Amplified
        </h3>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          A well-chosen fragrance enhances what is already biologically present in your skin&apos;s
          natural scent signature. Compounds like androstenone and androstenol — byproducts of
          testosterone metabolism — interact with fragrance molecules in ways that differ from man
          to man. This is why the same cologne can smell markedly different on two people, and why
          testing on your own skin is essential before committing to any fragrance.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          Think of a fragrance not as something you put on, but as something you collaborate with.
          The best masculine fragrances are designed with this chemistry in mind — built to fuse
          with the skin rather than sit on top of it.
        </p>

        <PullQuote>
          Scent is the only sense that bypasses rational thought entirely. By the time someone
          consciously registers your fragrance, their emotional brain has already formed an opinion
          about you.
        </PullQuote>

        <h3 className="text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-3">
          The Memory Anchor Effect
        </h3>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          Marcel Proust intuited what neuroscientists would later confirm: smell is the most powerful
          trigger of autobiographical memory. If you wear a consistent signature scent, you become
          encoded in the olfactory memory of the people around you. Your absence is felt before you
          walk through the door. Your presence lingers long after you&apos;ve left the room.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          Wearing a signature fragrance with consistency is, in the deepest neurological sense, one
          of the most effective forms of personal branding available to a man — and one of the
          least used.
        </p>
      </section>

      {/* Section 2: Confidence & self-signal */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Self-Signal</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Confidence, <em className="italic text-amber-400/80">presence</em>, and the self-signal effect
        </h2>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          Fragrance&apos;s influence on how others perceive you is not the whole story. It begins with
          how it changes you. Psychological research has consistently found that wearing a fragrance
          you associate with strength and appeal alters your own behavior, posture, and confidence
          — before you&apos;ve even interacted with another person.
        </p>

        <ScienceBox label="Key Study">
          <p>
            A landmark study published in the International Journal of Cosmetic Science found that
            men who wore a fragranced spray exhibited significantly higher self-confidence in social
            interactions — and that independent observers who could not smell the fragrance at all
            rated them as more attractive, based solely on body language. The fragrance changed not
            just the scent, but the man wearing it.
          </p>
        </ScienceBox>

        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          This is what researchers call the self-signal effect: when you apply a scent you associate
          with qualities you want to embody — composure, sophistication, masculinity, warmth — you
          begin to carry yourself accordingly. The fragrance becomes, in a very real sense, a
          psychological tool. It primes the behavior before the interaction begins.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          The ritual itself matters. The act of selecting and applying a fragrance with intention
          signals to yourself: I am prepared. I am deliberate. I give a damn about the impression I
          make. That posture is attractive independent of what you&apos;re wearing.
        </p>
      </section>

      {/* Section 3: How to maximize impact */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Technique</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          How to <em className="italic text-amber-400/80">maximize</em> fragrance impact
        </h2>

        <div className="space-y-0">
          {TIPS.map(({ n, title, body }) => (
            <div key={n} className="flex gap-5 py-6 border-b border-stone-800/60 last:border-0">
              <span className="font-serif text-3xl font-light text-stone-700 leading-none flex-shrink-0 w-8 text-right pt-0.5">
                {n}
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-stone-400 font-medium mb-2">{title}</p>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Fragrance recommendations */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Picks</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Masculine fragrances <em className="italic text-amber-400/80">worth knowing</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-10">
          Not the most advertised, but the most genuinely respected — spanning the full range of
          weight and intensity, because the right fragrance depends entirely on when and where
          you&apos;re wearing it.
        </p>

        <h3 className="text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-4">
          Rich &amp; Full-Bodied
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {RICH_FRAGRANCES.map((f) => (
            <ScentCard key={f.name} {...f} />
          ))}
        </div>

        <h3 className="text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-4">
          Light &amp; Fresh
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {LIGHT_FRAGRANCES.map((f) => (
            <ScentCard key={f.name} {...f} />
          ))}
        </div>

        <p className="text-[11px] text-stone-600 font-light leading-relaxed">
          A word on niche houses: while the fragrances above represent some of the best the designer
          world offers, the niche market — Le Labo, Maison Margiela Replica, Frédéric Malle, Byredo
          — contains compositions of exceptional originality, frequently with stronger performance
          per spray. Wearing niche also signals something: that you found your fragrance rather than
          being told to buy it. That kind of intentionality reads.
        </p>
      </section>

      {/* Section 5: Setting and context */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Context</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Setting, context, and <em className="italic text-amber-400/80">strategic</em> scent choice
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          No fragrance exists in a vacuum. The same fragrance that is magnetic in a dim bar on a
          winter evening can feel oppressive in a morning meeting. Understanding how environment
          modifies performance — and choosing accordingly — is the mark of a man who actually
          understands what he&apos;s doing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {SETTINGS.map(({ label, title, body }) => (
            <div key={title} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              <p className="text-[9px] uppercase tracking-[0.2em] text-amber-600/60 mb-1">{label}</p>
              <p className="text-stone-200 font-light text-sm mb-2">{title}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <h3 className="text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-3">
          The Skin Chemistry Factor
        </h3>
        <p className="text-sm text-stone-400 font-light leading-relaxed mb-4">
          The most underappreciated variable in fragrance is your own body chemistry. Skin pH, diet,
          hydration, and even stress hormones alter how a fragrance develops on you. A fragrance a
          friend swears by may smell entirely different — better or worse — on your skin. This is
          not a flaw; it is the mechanism.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          Always test on your own skin and allow a full dry-down before deciding. The top notes that
          greet you in the first moments are the least important part of the fragrance. The base
          notes — what remains after thirty minutes — are what people actually smell on you
          throughout the day. Judge on that.
        </p>

        <PullQuote>
          The most attractive fragrance a man can wear is the one that smells like the best version of him.
        </PullQuote>
      </section>

      {/* Closing */}
      <section className="mb-16">
        <SectionLabel>In Closing</SectionLabel>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Most men give fragrance less thought than they give their shoes, despite the fact that
            it operates on a more primal level than anything they wear. The investment required —
            in attention, not necessarily money — is modest. The return is significant: a more
            confident presence, a more memorable impression, and a level of intentionality that
            most men around you will not have.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            A great fragrance does not shout. It rewards whoever leans in. That is exactly the kind
            of impression worth making.
          </p>
        </div>
      </section>

      {/* Close */}
      <div className="text-center pt-4 border-t border-stone-800/60">
        <p className="font-serif italic text-stone-600 text-sm mt-8">
          Fragrance is the one detail that lingers after everything else about you has been forgotten.
        </p>
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700 block mt-6">fin</span>
      </div>

    </main>
  );
}
