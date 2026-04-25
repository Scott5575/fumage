import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Invisible Weapon — Fumage Guide",
  description:
    "Pheromones in men's fragrances — the history, the hard science, and the hype. What the research actually says about scent and attraction.",
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

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.28em] text-amber-500/70 mt-10 mb-3 border-b border-stone-800 pb-2.5">
      {children}
    </p>
  );
}

function FragCard({
  name,
  house,
  slug,
  desc,
}: {
  name: string;
  house: string;
  slug: string | null;
  desc: string;
}) {
  return (
    <div className="border border-stone-800 bg-stone-900/30 rounded-sm p-4">
      <p className="font-serif text-base font-semibold text-stone-100 leading-snug mb-0.5">
        {slug ? (
          <Link href={`/fragrances/${slug}`} className="hover:text-amber-400 transition-colors">
            {name}
          </Link>
        ) : (
          name
        )}
      </p>
      <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/70 mb-3">{house}</p>
      <p className="font-serif text-sm font-light text-stone-400 leading-relaxed">{desc}</p>
    </div>
  );
}

type Verdict = "myth" | "fact" | "complex";

const MYTH_FACTS: {
  verdict: Verdict;
  claim: string;
  body: string;
}[] = [
  {
    verdict: "myth",
    claim: "\"Pheromone sprays will make you irresistible to women.\"",
    body: "No credible science supports the idea that any commercially available pheromone product reliably produces attraction in the way this marketing implies. Attraction is overwhelmingly contextual, social, and psychological.",
  },
  {
    verdict: "fact",
    claim: "Certain pheromone candidates (especially androstadienone) do produce measurable physiological and mood effects",
    body: "in controlled lab settings, particularly in women during fertile phases of their cycle. The effect is real; it's just subtle and not a shortcut to attraction.",
  },
  {
    verdict: "myth",
    claim: "\"The human VNO doesn't work, so pheromones can't work in humans.\"",
    body: "VNO function is one mechanism for pheromone detection — but not the only one. Regular olfactory receptors can and do respond to human steroid-based compounds. The pathway is different; the potential effect is not necessarily absent.",
  },
  {
    verdict: "fact",
    claim: "Animalic fragrance ingredients — musk, civet, castoreum — share structural similarities with endogenous human pheromone candidates.",
    body: "This isn't a coincidence. Both evolved in the context of mammalian sexual and social signaling. The power of animalic notes in perfumery has a basis that goes beyond aesthetics.",
  },
  {
    verdict: "complex",
    claim: "\"Natural musk is more effective than synthetic musk.\"",
    body: "Natural deer musk is no longer available for testing. Anecdotal reports from the pre-ban era described it as extraordinarily compelling on skin in a way no synthetic fully replicates. Whether that was pheromone activity or simply olfactory complexity is unknowable. What we know: macrocyclic musks like Habanolide perform closer to the natural than nitromusks or polycyclic musks in warmth and skin-affinity.",
  },
  {
    verdict: "myth",
    claim: "\"If I can't smell it, it isn't doing anything.\"",
    body: "This is precisely wrong for pheromones. The most interesting research suggests subthreshold — below the level of conscious smell perception — is actually where the effect operates. You're not supposed to notice it. That's the point.",
  },
  {
    verdict: "fact",
    claim: "A well-formulated fragrance with animalic depth, skin-affinity musks, and dry-down complexity likely produces more compelling real-world effect than an off-the-shelf \"pheromone spray.\"",
    body: "The mechanism is the whole fragrance, not a single isolated compound added at trace concentrations.",
  },
];

const VERDICT_STYLES: Record<Verdict, { label: string; color: string; bg: string }> = {
  myth:    { label: "Myth",    color: "text-red-400",     bg: "bg-red-900/20 border-red-800/30" },
  fact:    { label: "Fact",    color: "text-emerald-400", bg: "bg-emerald-900/20 border-emerald-800/30" },
  complex: { label: "Complex", color: "text-amber-400",   bg: "bg-amber-900/15 border-amber-800/25" },
};

export default function PheromonesPage() {
  return (
    <main className="min-h-screen" style={{ background: "#0c0906" }}>
      <div className="max-w-2xl mx-auto px-6 py-16 pb-24">

        {/* HERO */}
        <SectionLabel>Psychology · Science</SectionLabel>
        <h1 className="font-serif text-4xl sm:text-5xl font-light leading-[1.08] text-stone-100 mb-5">
          The <em className="italic text-amber-400/80">Invisible</em> Weapon
        </h1>
        <p className="font-serif text-lg italic font-light text-stone-400 leading-relaxed mb-3 max-w-xl">
          Pheromones in men&apos;s fragrances — history, hard science, and hype.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-12">
          Science &nbsp;·&nbsp; History &nbsp;·&nbsp; Fragrance &nbsp;·&nbsp; 14 min read
        </p>

        {/* LEDE */}
        <div className="border-l-2 border-amber-500/40 pl-6 mb-12">
          <p className="font-serif text-xl italic font-light text-stone-300 leading-relaxed">
            You&apos;ve seen the marketing. Mysterious bottle. Chiseled jaw. A room that parts like the Red Sea the moment
            he walks in. &ldquo;Enhanced with pheromones.&rdquo; It sounds like science. It feels like seduction. But is
            any of it real — or is pheromone marketing the fragrance industry&apos;s most elegantly packaged placebo?
          </p>
        </div>

        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          The truth, as with most things worth knowing, lives somewhere between the promise and the cynicism. Pheromones
          are not fiction — they govern the reproductive and social behavior of nearly every animal on Earth. Whether they
          operate meaningfully in humans, and whether a fragrance can bottle that effect, is where things get genuinely
          complicated, deeply fascinating, and still hotly debated in the scientific literature.
        </p>

        <div className="border-t border-stone-800/60 my-10" />

        {/* WHAT IS A PHEROMONE */}
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-4">What exactly is a pheromone?</h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The word comes from the Greek <em>pherein</em> (to transfer) and <em>hormōn</em> (to excite). Coined by
          scientists Peter Karlson and Martin Lüscher in 1959, a pheromone is technically defined as a chemical substance
          produced and released by an animal that influences the physiology or behavior of other members of its species.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          They are, in essence, chemical messages — a language older than any spoken tongue. Moths find mates across miles
          of forest. Ants lay invisible highways of trail pheromones. A frightened honeybee releases an alarm signal that
          transforms an entire hive into a defensive weapon within seconds. In the insect world, pheromones are
          unambiguous, powerful, and extraordinarily precise.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          In mammals, it gets messier. The primary detection organ for pheromones in most animals is the{" "}
          <strong className="font-medium text-stone-200">vomeronasal organ</strong> (VNO) — a pair of sensory pits located
          at the base of the nasal septum. In mice, hamsters, and many other mammals, the VNO is a fully wired,
          high-functioning chemosensory system. In adult humans? It exists — you can find it anatomically — but its neural
          connections appear largely vestigial. Most neuroscientists believe the human VNO sends no meaningful signals to
          the brain after early fetal development.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-10">
          That doesn&apos;t mean humans have no pheromone activity. It means the story is more subtle, and the mechanism
          more complex.
        </p>

        <div className="border-t border-stone-800/60 my-10" />

        {/* HISTORY */}
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-4">A history written in musk</h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          Long before anyone had a word for pheromones, humans were obsessively harvesting the most potent animal
          secretions on Earth and wearing them as fragrance. The ancient obsession with animalic scent is, in retrospect,
          a kind of intuitive pheromone chase — a primitive understanding that certain raw, visceral smells were connected
          to desire, power, and animal magnetism.
        </p>

        <SubHead>Ancient origins</SubHead>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          In ancient Egypt, kyphi — one of the oldest documented perfume blends — contained labdanum, a resinous secretion
          from the rockrose shrub with a distinctly animalic, leathery quality. Egyptian priests and pharaohs used
          fragrance not merely for pleasure but to communicate status, invoke the divine, and assert dominance. The line
          between ritual power and sexual attraction was deliberately blurred.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          Ancient Rome took it further. Civet paste — harvested from the perineal glands of the civet cat — was traded
          across the Mediterranean at tremendous cost. Roman men of means would have preparations containing castoreum (a
          secretion from beaver castor sacs) and civet applied to their skin before public appearances. They may not have
          understood why these substances commanded attention, but they knew that they did.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          In the Arab perfumery tradition, musk from the Himalayan musk deer was the most precious ingredient in
          existence. The <em>pod</em> — a gland from the male deer&apos;s abdomen, produced to attract females during rut
          — was gram-for-gram worth more than gold. Persian and Mughal emperors wore pure musk paste as a mark of absolute
          authority. Entire trade routes were built around its distribution.
        </p>

        <SubHead>The age of chypre and fougère</SubHead>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          By the 19th century, European perfumery had formalized its obsession with animalic notes into specific fragrance
          families. The classic <em>chypre</em> — built on bergamot, oakmoss, and labdanum — created a rich, earthy,
          animal warmth that was considered the apex of masculine elegance. The <em>fougère</em> family, anchored by
          oakmoss and coumarin, carried its own musty, primal undertone beneath the lavender and bergamot facade.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          These weren&apos;t pheromone fragrances by design. They were simply perfumers following their noses toward
          ingredients that smelled powerfully <em>alive</em> — and finding that men (and the people around them) responded
          to that aliveness in instinctive, difficult-to-articulate ways.
        </p>

        <PullQuote>
          Before anyone understood receptor binding or olfactory neuroscience, perfumers were already doing what
          scientists would later theorize: building chemical signals designed to trigger something deep, primal, and
          impossible to fully explain.
        </PullQuote>

        {/* NEUROSCIENCE */}
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-4">
          The neuroscience: what actually happens in the brain
        </h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          When you smell something — anything — a cascade begins. Airborne molecules bind to olfactory receptor neurons in
          the nasal epithelium. Those neurons fire signals up the olfactory nerve directly into the olfactory bulb, which
          then communicates with the amygdala (the brain&apos;s emotional processing center), the hippocampus (memory),
          and the hypothalamus (which governs hormonal and autonomic responses). No other sense has this kind of direct,
          unfiltered line to the limbic system. Smell bypasses the thalamic relay that all other senses must pass through.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          This is why a specific cologne can transport you to a memory fifteen years old in an instant. It&apos;s not
          nostalgia — it&apos;s literal neuroanatomy.
        </p>

        <SubHead>The androstenone question</SubHead>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The most studied human &ldquo;pheromone candidate&rdquo; is{" "}
          <strong className="font-medium text-stone-200">androstenone</strong> — a steroid compound found in male sweat,
          saliva, and urine. It&apos;s produced through the breakdown of testosterone, and it smells, depending on your
          genetics, like either urine and sweat or vanilla and sandalwood. This is not a metaphor — roughly 35% of people
          literally cannot smell it (anosmia specific to androstenone), and those who can are sharply divided in how they
          perceive it. That split is real, heritable, and tied to specific olfactory receptor variants.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          A landmark 2007 paper by Wyart et al. found that{" "}
          <strong className="font-medium text-stone-200">androstadienone</strong> — a related compound in male sweat —
          improved mood, heightened focus, and increased physiological arousal in women when inhaled, with effects
          measurable even at concentrations below conscious detection.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          The key phrase there is &ldquo;below conscious detection.&rdquo; This is where modern pheromone science gets
          genuinely interesting: the effect, if real, may not operate through conscious perception of scent at all. It may
          operate through the regular olfactory system via subthreshold chemosensory input — signals too faint to register
          as a recognizable smell, but potent enough to nudge the brain&apos;s emotional chemistry.
        </p>

        <SubHead>The VNO debate</SubHead>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The vestigial nature of the adult human VNO doesn&apos;t necessarily close the door on human pheromone
          signaling. Research by Sobel et al. at the Weizmann Institute found that compounds such as androstadienone
          activated different regions of the hypothalamus in men and women respectively — a classically sex-differentiated
          response pattern consistent with pheromone activity. The brain was doing something. Exactly what, and what
          behavioral consequence it had, remains the subject of legitimate scientific debate.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-10">
          The scientific consensus, as of now, is this: human pheromones almost certainly exist in some form. Their
          effects, however, are probabilistic, context-dependent, subtle, and easily overridden by conscious perception
          and social context — nothing like the hard-wired, irresistible biological imperative seen in other mammals.
        </p>

        <div className="border-t border-stone-800/60 my-10" />

        {/* NATURAL ANIMALICS */}
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-4">
          Natural pheromone ingredients: the original animalics
        </h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          For most of perfumery&apos;s history, the closest thing to bottled pheromones came from animals directly. These
          substances share structural similarities with human steroid-based pheromone candidates, which may partly explain
          their historical power. Today, most are either banned, regulated, or replaced with synthetic alternatives.
        </p>

        <SubHead>Musk (Moschus moschiferus)</SubHead>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          Harvested from the gland of the male musk deer during the breeding season, natural musk was the king of all
          animalic notes. Chemically, it is built around macrocyclic lactones and muscone — large-ring molecules that
          create the distinctive warm, powdery, deeply sexual depth that synthetic musks still attempt to replicate. The
          musk deer is now a protected species, and genuine natural musk has been absent from commercial perfumery since
          the 1970s. Its structural relationship to androgens (male sex hormones) is not coincidental — both evolved in
          the context of sexual attraction and territory signaling.
        </p>

        <SubHead>Civet</SubHead>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          The raw paste from civet cat glands smells, at full strength, like excrement. Diluted, it transforms into
          something rich, warm, and animalic in a way that reads as deeply human — almost like skin-on-skin. Its primary
          active molecule, civetone, is another macrocyclic compound. For centuries it was the indispensable fixative in
          the finest European fragrances. Both Chanel No. 5 and Shalimar once contained real civet. It is now entirely
          replaced by synthetics due to animal welfare concerns and CITES regulations.
        </p>

        <SubHead>Castoreum</SubHead>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          A secretion from the castor sacs of North American and European beavers, castoreum has a leathery, smoky,
          slightly medicinal quality that sits at the intersection of tobacco, vanilla, and warm fur. It has been used in
          perfumery since antiquity and was a fixture in classic leather-accord fragrances. Certain niche houses still
          deploy trace amounts for authenticity in heritage leather fragrances.
        </p>

        <SubHead>Ambergris</SubHead>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-10">
          Perhaps the most mystical of all natural fragrance materials, ambergris is a waxy substance formed in the
          digestive tract of sperm whales and found floating in the ocean or washed ashore. Fresh ambergris smells
          unpleasant; aged ambergris develops a marine, animalic, incense-like warmth that is unlike anything else in
          nature. When worn on skin, ambergris behaves as a kind of olfactory amplifier — it extends and deepens the
          perception of other scents and adds a distinctly skin-like, almost pheromonal warmth. Genuine ambergris remains
          legal where it&apos;s found rather than harvested, and commands extraordinary prices in the niche market.
        </p>

        <div className="border-t border-stone-800/60 my-10" />

        {/* SYNTHETIC PHEROMONES */}
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-4">
          Synthetic pheromones: the lab-built version
        </h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-6">
          Modern chemistry allows perfumers and cosmetic scientists to synthesize compounds that either replicate
          naturally-occurring pheromone candidates or create new molecules designed to produce similar neurological
          effects. This is where the fragrance industry and the science of attraction collide — not always tidily.
        </p>

        <SubHead>Androstenone &amp; Androstenol</SubHead>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          These are the most commonly used synthetic pheromone additives in commercially marketed &ldquo;pheromone
          fragrances.&rdquo; Androstenone creates a dominant, aggressive, slightly threatening signal in studies with
          animals. Androstenol — produced fresh in male sweat and oxidizing into androstenone over time — is associated
          with a more approachable, sociable signal. Some manufacturers add them to fragrance at trace concentrations,
          claiming enhanced sexual attractiveness. The evidence is genuinely mixed, and concentration matters enormously
          — too much androstenone produces the opposite of the intended effect.
        </p>

        <SubHead>Androstadienone (AND)</SubHead>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          Of all the pheromone candidates, androstadienone has the most compelling scientific support. Found in male sweat
          and semen, it has demonstrable mood-elevating and arousal-enhancing effects in women at subthreshold
          concentrations in controlled studies. It does not trigger &ldquo;attraction&rdquo; in a direct sense — it
          appears to act more as an emotional primer, improving mood and attentiveness in ways that could, in the right
          social context, facilitate connection. Several modern fragrance houses have incorporated it, or its structural
          analogues, as subthreshold components.
        </p>

        <SubHead>Exaltolide &amp; Habanolide</SubHead>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          These are synthetic macrocyclic musks that structurally resemble the large-ring molecules found in natural musk
          and civet. Habanolide (Firmenich&apos;s trademarked macrocyclic musk) is one of the most widely used fragrance
          musks in modern perfumery and produces a clean, skin-like, almost imperceptible warmth. Their proximity to
          natural pheromone structures is one reason why well-formulated musk fragrances often feel inexplicably
          &ldquo;sexual&rdquo; even when they smell ostensibly clean and fresh.
        </p>

        <SubHead>Osmone 1 &amp; Georgywood</SubHead>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-10">
          Specialty aroma chemicals used in niche and prestige perfumery for their ability to mimic the ambiguous,
          intimate warmth of skin. Georgywood (Givaudan) in particular creates a woody, creamy, animalic quality that
          sits provocatively close to the smell of warm human skin. Its effect in a fragrance is less &ldquo;pheromone
          product&rdquo; and more &ldquo;disturbingly compelling personal scent&rdquo; — which, from a functional
          standpoint, may be all that matters.
        </p>

        <div className="border-t border-stone-800/60 my-10" />

        {/* MYTH VS FACT */}
        <SectionLabel>The Evidence</SectionLabel>
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-6">Myth vs. fact</h2>

        <div className="border border-stone-800 rounded-sm overflow-hidden mb-10">
          <div className="border-b border-stone-800 px-4 py-2.5 bg-stone-900/40">
            <p className="text-[9px] uppercase tracking-[0.2em] text-amber-500/60">
              Cutting through the marketing
            </p>
          </div>
          {MYTH_FACTS.map((item, i, arr) => {
            const style = VERDICT_STYLES[item.verdict];
            return (
              <div
                key={i}
                className={`flex gap-3 items-start px-4 py-4 ${
                  i < arr.length - 1 ? "border-b border-stone-800/60" : ""
                }`}
              >
                <span
                  className={`text-[9px] uppercase tracking-[0.1em] font-medium px-2 py-0.5 rounded-full border flex-shrink-0 mt-0.5 ${style.color} ${style.bg}`}
                >
                  {style.label}
                </span>
                <p className="font-serif text-sm font-light text-stone-400 leading-relaxed">
                  <strong className="font-medium text-stone-300">{item.claim}</strong>{" "}
                  {item.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* FRAGRANCES THAT LEAN INTO IT */}
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-3">Fragrances that lean into it</h2>
        <p className="font-serif text-sm italic font-light text-stone-500 mb-7">
          Forget the gimmicky pheromone spray market. These are built by serious perfumers who understood — intuitively
          or explicitly — that certain raw materials create a kind of olfactory gravity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <FragCard
            name="Kouros"
            house="Yves Saint Laurent · 1981"
            slug="yves-saint-laurent-kouros"
            desc="The atomic bomb of animalic masculinity. Civet, castoreum, and heavy musks beneath a honeyed, powdery aromatic structure. Polarizing by design. If any mainstream fragrance was ever built to function as a pheromone delivery vehicle, this is it."
          />
          <FragCard
            name="Antaeus"
            house="Chanel · 1981"
            slug="chanel-antaeus"
            desc="Oakmoss, civet, patchouli, and labdanum in a chypre of exceptional density and sexual gravity. Named after the mythological giant who drew power from the earth. This is a fragrance that feels primal in the best possible way."
          />
          <FragCard
            name="Musk Oud"
            house="Memo Paris · 2014"
            slug={null}
            desc="Oud and macrocyclic musks in a combination that produces an intensely animalic, skin-like depth. A modern fragrance that uses contemporary aroma chemistry to achieve the kind of raw magnetism that used to require actual animal secretions."
          />
          <FragCard
            name="Muscs Koublaï Khän"
            house="Serge Lutens · 1998"
            slug={null}
            desc="An explicit exercise in the erotic potential of skin-scent. A multilayered musk accord with animalic, cumin-laced depth that mimics the smell of actual human skin with almost uncomfortable intimacy."
          />
          <FragCard
            name="Cuir de Russie"
            house="Chanel · 1924 / 2011"
            slug={null}
            desc="One of perfumery's great leather chypres, originally containing actual birch tar and animalic musks. The Les Exclusifs reformulation preserves the essential character — a commanding, smoky, animalic gravity that hasn't aged a day."
          />
          <FragCard
            name="Sauvage Elixir"
            house="Dior · 2021"
            slug="dior-dior-sauvage-elixir"
            desc="The world's most widely-worn fragrance in its concentration upgrade — succeeding partly due to Ambroxan's extraordinary skin-like diffusiveness. Ambroxan is the synthetic equivalent of ambergris's key molecule: it amplifies everything around it and radiates warmth that reads as deeply personal."
          />
        </div>

        <p className="font-serif text-sm font-light text-stone-500 italic mb-10">
          Honorable mentions:{" "}
          <Link href="/fragrances/herm-s-terre-d-herm-s-edt" className="text-stone-400 hover:text-amber-400 transition-colors not-italic">
            Terre d&apos;Hermès
          </Link>{" "}
          (Jean-Claude Ellena&apos;s masterpiece of mineral-animalic tension),{" "}
          <Link href="/fragrances/knize-ten" className="text-stone-400 hover:text-amber-400 transition-colors not-italic">
            Knize Ten
          </Link>{" "}
          (a leather accord of devastating masculinity built in 1925),{" "}
          <Link href="/fragrances/lalique-lalique-encre-noire" className="text-stone-400 hover:text-amber-400 transition-colors not-italic">
            Encre Noire
          </Link>{" "}
          (vetiver pushed to its animalic extreme), and virtually anything by Nasomatto — a house that treats the boundary
          between fragrance and raw animal scent as a design challenge rather than a limit to be respected.
        </p>

        {/* THE VERDICT */}
        <div className="border-l-4 border-amber-500/50 bg-stone-900/40 rounded-sm p-6 mb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-3">The verdict</p>
          <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
            Are pheromone fragrances worth buying? The honest answer depends entirely on what you&apos;re buying. A $30
            &ldquo;pheromone spray&rdquo; with vague promises? No. The evidence does not support those claims, the
            concentrations are typically meaningless, and the fragrance is rarely worth wearing on its own terms.
          </p>
          <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
            A masterfully constructed fragrance built around animalic materials, macrocyclic musks, ambergris analogues,
            and androstadienone-adjacent steroid musks? That&apos;s a different proposition. You&apos;re not buying a
            chemical shortcut to attraction. You&apos;re buying into the long history of human beings using scent to
            signal vitality, warmth, and presence — a practice with more scientific grounding than most marketing would
            even dare to claim.
          </p>
          <p className="font-serif text-base font-light text-stone-200 leading-relaxed">
            The best &ldquo;pheromone fragrance&rdquo; was never sold as one. It was simply a great fragrance that
            understood, on some level, the animal language that perfumery has always been speaking.
          </p>
        </div>

        {/* BOTTOM LINE */}
        <h2 className="font-serif text-2xl font-light text-stone-100 mb-4">The bottom line</h2>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          Pheromones in humans are not a myth. They are a subtlety. The hard-wired, irresistible chemical attraction of
          the insect world does not have a direct equivalent in human biology — but a system of chemical signals that
          influence mood, emotional openness, and subconscious perception of other people? That appears to be real,
          measurable, and ongoing.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-4">
          What perfumery has done for thousands of years — and what the best perfumers continue to do today — is work in
          that language without always knowing its name. The animalic warmth of civet paste in a pharaoh&apos;s blend;
          the macrocyclic musks in a modern niche fragrance; the ambroxan radiating from someone&apos;s skin on a warm
          evening. These are not accidents. They are the art form pointing, instinctively, toward the science.
        </p>
        <p className="font-serif text-base font-light text-stone-300 leading-relaxed mb-12">
          Whether you&apos;re a skeptic or a believer, the invitation is the same: find a fragrance that smells
          powerfully, inexplicably <em>alive</em> on your skin. That aliveness has a history. It has a neuroscience. And
          it&apos;s been working on people a great deal longer than the word &ldquo;pheromone&rdquo; has existed.
        </p>

        <div className="border-t border-stone-800/60 pt-6">
          <p className="text-[11px] italic text-stone-600 leading-relaxed">
            Further reading: Wyart et al. (2007), <em>Journal of Neuroscience</em>, &ldquo;Smelling a Single Component of
            Male Sweat Alters Levels of Cortisol in Women.&rdquo; &nbsp;·&nbsp; Zhou &amp; Chen (2009),{" "}
            <em>Current Biology</em>, &ldquo;Biological sex and steroid odor perception.&rdquo; &nbsp;·&nbsp; Sobel et
            al. (2006), <em>Journal of Neuroscience</em>, &ldquo;Sniffing human sex-steroid derived compounds modulates
            mood, memory, and autonomic nervous system function in specific behavioral contexts.&rdquo;
          </p>
        </div>

      </div>
    </main>
  );
}
