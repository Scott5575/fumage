import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "More of Everything — Fumage Guide",
  description:
    "The intensified flanker — Elixir, Absolu, Extreme, Parfum Intense — is the defining commercial pattern of 2026. What's driving it, what it does to a composition, and when the louder version is actually worth it.",
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

// The May 2026 flankers that exemplify the pattern. `slug` links to the catalog.
const FLANKERS = [
  {
    name: "1 Million Night Elixir",
    house: "Paco Rabanne, 2026",
    slug: "rabanne-1-million-night-elixir",
    tag: "Elixir",
    desc: "Maple syrup and amber bolted onto the 1 Million signature. The sweetness is the whole pitch — louder, darker, limited-edition.",
  },
  {
    name: "Forever Wanted Absolu",
    house: "Azzaro, 2026",
    slug: "azzaro-forever-wanted-absolu",
    tag: "Absolu",
    desc: "The most concentrated Wanted yet: whiskey, incense, vanilla, and a claimed 24-hour life. Intensification as a performance promise.",
  },
  {
    name: "Polo 67 Eau de Parfum Extreme",
    house: "Ralph Lauren, 2026",
    slug: "ralph-lauren-polo-67-extreme",
    tag: "Extreme",
    desc: "Caramelised pineapple over leather and cedar. The rare intensification that adds a genuinely new accord instead of just turning up the base.",
  },
  {
    name: "Legend Elixir",
    house: "Montblanc, 2026",
    slug: "montblanc-legend-elixir",
    tag: "Elixir",
    desc: "Legend reframed as an amber-fougère, vanilla and benzoin doing the heavy lifting. Affordable, competent, and on-trend to the letter.",
  },
  {
    name: "Cool Elixir Safran Mineral",
    house: "Davidoff, 2026",
    slug: "davidoff-cool-elixir-safran-mineral",
    tag: "Elixir",
    desc: "A budget house following the same playbook — saffron and cedar over apple. Proof the pattern now reaches every price tier.",
  },
];

export default function TheIntensificationPage() {
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
          More of Everything:<br />
          <em className="italic text-amber-400">The Rise of the Intensified Flanker</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          Five of the seven biggest men&apos;s launches of May 2026 were not new fragrances at all. They were Elixirs, an Absolu, and an Extreme — concentrated reissues of bottles you already know. The intensified flanker has quietly become the default shape of a release.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          A market read for the discerning buyer · 13 min read
        </p>
      </div>

      {/* Intro */}
      <div className="mb-12">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          There is a particular sentence that now appears on the side of nearly every men&apos;s release worth noticing, and it is never the name of the fragrance. It is the suffix. <em>Elixir.</em> <em>Absolu.</em> <em>Extreme.</em> <em>Parfum Intense.</em> A single word, set in slightly heavier type beneath a name you have smelled on a hundred wrists already, promising that this time the thing you liked will be more so — deeper, longer, darker, harder to ignore.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          This is not the flanker as the industry has always practised it. It is a narrower, more disciplined manoeuvre — the concentration escalation, the same composition pushed up a register and sent back out under a heavier name. It has become the single most reliable commercial pattern in the men&apos;s category, and May 2026 made the case almost too neatly to ignore.
        </p>
      </div>

      {/* The Pattern */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Pattern</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          The default shape of <em className="italic text-amber-400/80">a release</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Take a single month and read it as a ledger. Of the seven men&apos;s fragrances that mattered most in May 2026, five carried an intensification suffix and traced directly back to an existing line. Paco Rabanne shipped a <em>1 Million Night Elixir</em>. Azzaro shipped a <em>Forever Wanted Absolu</em>. Ralph Lauren shipped a <em>Polo 67 Eau de Parfum Extreme</em>. Montblanc shipped a <em>Legend Elixir</em>. Davidoff, at the budget end, shipped a <em>Cool Elixir Safran Mineral</em>. Not one of the five is a new fragrance. Each is a louder argument for a fragrance that already exists.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The remaining two launches — an artisanal bergamot cologne from Acqua di Parma and a conceptual wool-and-tea oddity from D.S. &amp; Durga — were the genuine originals of the month, and both were comparatively quiet, comparatively niche. The mass-market centre of gravity belonged entirely to the concentrated reissue. That is the pattern, and it is no longer an anomaly worth remarking on. It is the baseline against which everything else is now the exception.
          </p>
        </div>

        <PullQuote>
          A flanker is a hypothesis about what you already liked. An Elixir is the same hypothesis, said louder.
        </PullQuote>
      </section>

      {/* The Engine */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Engine</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          Why it is <em className="italic text-amber-400/80">happening now</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The intensified flanker is, before anything else, a margin instrument. A new fragrance is expensive and uncertain: a brief, a perfumer&apos;s fee, a name that must be focus-grouped and trademarked and advertised into existence against terrible odds. A concentration escalation skips nearly all of it. The accord is proven. The bottle mould often already exists. The name does the marketing for free, because it is borrowed from a fragrance whose recognition has already been paid for. The house reformulates upward, raises the price, and sells the same idea twice. Considered purely as arithmetic, it is the most efficient release a brand can make.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            But arithmetic alone would not explain the <em>shape</em> the intensification takes. Look at what these five reach for: maple syrup and benzoin, whiskey and incense, vanilla and amber, saffron over cedar. The escalation almost always runs toward the warm, sweet, ambery register, because that is where the current mass palate sits. The amber-gourmand wave that has dominated the category for half a decade gave houses a base they know sells, and intensification is the cheapest way to pour more of it into a familiar bottle. &ldquo;The same scent, darker&rdquo; is not a neutral instruction. It is almost always a sweeter, heavier, more obviously crowd-pleasing instruction.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            There is a tension worth naming here, because it sits beneath the whole pattern. The most critically admired direction in men&apos;s fragrance has, for several years, run the opposite way — toward restraint, toward the skin scent and the close-worn drydown, toward what we have elsewhere called <Link href="/guide/presence-over-performance" className="text-amber-400/80 hover:text-amber-300 underline underline-offset-2 decoration-amber-700/40 transition-colors">presence over performance</Link>. The intensified flanker is the commercial mainstream answering that critical consensus with a flat no. Presence is what the connoisseur wants; <em>more</em> is what the counter sells. These launches are not chasing the tastemaker. They are chasing the man who already owns the original and can be persuaded he is missing the bigger version.
          </p>
        </div>
      </section>

      {/* The Recipe */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Recipe</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          What intensification <em className="italic text-amber-400/80">does to a formula</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Strip the marketing away and an intensification is a redistribution of weight within a composition. The base is amplified and the top is compressed. Fixatives that hold a scent to skin — ambroxan, benzoin, labdanum — are dialled up, which is what produces the headline longevity figures: Azzaro&apos;s <em>Forever Wanted Absolu</em> claims a twenty-four-hour life, and that number is not a lie so much as a description of how much fixative the formula now carries. At the same time the volatile citrus opening, the part that evaporates fastest and costs the most attention to balance, is thinned. You lose the bright, fleeting overture and gain a longer, denser, warmer middle and end.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            This is why the word &ldquo;Elixir&rdquo; on a men&apos;s bottle so often translates, in practice, to <em>more base, less topnote</em>. The sweet-amber accord — vanilla, maple, tonka, benzoin — is pushed to the front of the experience, because that is the material that reads as &ldquo;intense&rdquo; to a casual nose and survives longest on skin. Montblanc&apos;s <em>Legend Elixir</em> is the textbook case: the original Legend&apos;s crisp fougère freshness is reframed around a vanilla-and-benzoin base until it is, structurally, a different and warmer fragrance wearing the same name. Nothing about this is dishonest. It is simply what the suffix purchases.
          </p>
        </div>

        <Callout label="The Suffix Decoder">
          None of these words has a regulated meaning, and that is the first thing to understand. <em>Elixir</em> is pure marketing — it signals &ldquo;richer and sweeter&rdquo; and nothing more; it is not a concentration tier and tells you nothing about oil load. <em>Absolu</em> borrows the language of perfumery&apos;s most concentrated naturals to imply density and depth, again with no formal definition. <em>Extreme</em> (sometimes <em>Extrême</em>) usually signals an amplified, often spicier or darker reading of the parent. Only <em>Parfum Intense</em> points toward an actual concentration claim — a higher oil percentage than the eau de parfum it flanks — though even that is loosely enforced. Read every one of them as a promise of character, never as a guarantee of strength.
        </Callout>

        <PullQuote>
          The bottle gets darker, the price goes up, and the formula does the least work that the marketing will allow.
        </PullQuote>
      </section>

      {/* The Exceptions */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Exceptions</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          When the louder version <em className="italic text-amber-400/80">adds something</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Not every intensification is a recoloured bottle. The line worth drawing is between the escalation that merely turns up the base and the one that introduces a genuinely new accord — a material or idea that was not in the original at all. The former gives you the fragrance you owned, sweeter and longer; the latter gives you something you could not have predicted from the parent.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Of the five, Ralph Lauren&apos;s <em>Polo 67 Eau de Parfum Extreme</em> is the clearest case of the second kind. It does not simply deepen Polo 67; it folds in a caramelised-pineapple top and a leather-cedar base that change the fragrance&apos;s argument rather than its volume. The other four sit further toward the recoloured-bottle end: the <em>1 Million Night Elixir</em> is the 1 Million signature plus maple and amber, the <em>Legend Elixir</em> is Legend made warmer, the <em>Cool Elixir Safran Mineral</em> is the Cool line with a saffron accord stitched on at a budget price. Pleasant, mostly competent, occasionally very good value — but the pitch is amplification, not invention. The grid below sorts them by what they are actually doing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FLANKERS.map(({ name, house, slug, tag, desc }) => (
            <Link
              key={slug}
              href={`/fragrances/${slug}`}
              className="group border border-stone-800 hover:border-stone-600 rounded p-4 bg-stone-950/30 transition-colors"
            >
              <p className="text-stone-200 group-hover:text-amber-400 transition-colors font-light text-sm mb-0.5">{name}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-amber-500/60 mb-2">{tag}</p>
              <p className="text-[11px] text-amber-700/70 font-light mb-2">{house}</p>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* The Verdict */}
      <section className="mb-16">
        <SectionLabel>The Verdict</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          How to buy <em className="italic text-amber-400/80">intelligently</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The discipline an intensified flanker demands is small and almost always skipped. Sample it on skin, on the same day, against the fragrance it claims to improve. Half the time you will find that the original was the better-balanced object and that the Elixir merely traded its brightness for a sweetness you did not need. The other half you will find a real upgrade — and only the side-by-side will tell you which you are holding.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Judge the base, not the bottle. The darker glass, the heavier cap, the word in italic type are all working on you before the fragrance has had a chance to. What matters is whether the drydown earns the upcharge — whether the added fixative and amber have given you depth or merely persistence. Treat limited editions with particular suspicion: scarcity is a price lever, not a quality signal, and a &ldquo;Night&rdquo; or &ldquo;Absolu&rdquo; edition that exists chiefly to be hard to find is asking you to pay for the difficulty rather than the juice.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            The rule reduces to one line: buy the intensification only when the accord is genuinely new, and pass when it is only louder. This is the narrow case within the broader flanker economy — the concentration escalation specifically, the suffix as a business model. For the full landscape of why houses reissue, reformulate, and flood their shelves with variants in the first place, the wider context lives in our piece on <Link href="/guide/reformulations" className="text-amber-400/80 hover:text-amber-300 underline underline-offset-2 decoration-amber-700/40 transition-colors">why they change what you love</Link>. Read this one as the close reading of a single move; read that one as the whole game.
          </p>
        </div>

        <PullQuote>
          More is not an improvement. It is a direction — and the only honest reason to follow it is that the fragrance arrives somewhere the original never went.
        </PullQuote>
      </section>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
