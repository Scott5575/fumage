import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Dupes Debate — Fumage Guide",
  description: "Are fragrance dupes worth buying? An honest breakdown of clones, inspirations, and where the line between homage and copy sits.",
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

function FragPill({ name, slug }: { name: string; slug: string | null }) {
  if (slug) {
    return (
      <Link
        href={`/fragrances/${slug}`}
        className="text-[10px] px-2 py-0.5 border border-stone-800 hover:border-amber-800/50 text-stone-500 hover:text-amber-400 rounded transition-colors"
      >
        {name}
      </Link>
    );
  }
  return (
    <span className="text-[10px] px-2 py-0.5 border border-stone-800 text-stone-600 rounded">
      {name}
    </span>
  );
}

const SIMILARITY_COLOR: Record<string, string> = {
  "Very close": "text-amber-400 border-amber-700/40 bg-amber-900/10",
  "Good":       "text-sky-400 border-sky-700/40 bg-sky-900/10",
  "Partial":    "text-stone-400 border-stone-700/40 bg-stone-900/10",
};

const COMPARISONS = [
  {
    original:   { name: "Creed Aventus",            slug: "creed-aventus",                    price: "~$350" },
    dupe:       { name: "Armaf Club de Nuit Intense Man", slug: "armaf-club-de-nuit-intense-man-edp", price: "~$35"  },
    similarity: "Very close",
    verdict:    "Opens nearly identically — smoky pineapple, birch. Drydown diverges. Still remarkable for the price. Worth owning as a beater.",
  },
  {
    original:   { name: "Tom Ford Black Orchid", slug: "tom-ford-black-orchid", price: "~$175" },
    dupe:       { name: "Zara Black Orchid",      slug: null,                    price: "~$25"  },
    similarity: "Good",
    verdict:    "Captures the dark, truffle-and-patchouli opening well. Longevity falls off significantly after three hours. Excellent for the price.",
  },
  {
    original:   { name: "Replica Jazz Club",  slug: "maison-margiela-replica-jazz-club", price: "~$155" },
    dupe:       { name: "Dua Jazz & Rhum",     slug: null,                                price: "~$50"  },
    similarity: "Good",
    verdict:    "Nails the tobacco and rum accord reasonably well. Vetiver base is softer. Worth it as a sampling tool; original preferable for regular wear.",
  },
  {
    original:   { name: "Le Labo Santal 33", slug: "le-labo-santal-33", price: "~$235" },
    dupe:       { name: "Various",            slug: null,                price: "$20–60" },
    similarity: "Partial",
    verdict:    "One of the most attempted and least successfully cloned fragrances. Most dupes get the shape but miss the texture. Save for the original.",
  },
  {
    original:   { name: "Dior Sauvage EDP",         slug: "dior-sauvage-edp", price: "~$120" },
    dupe:       { name: "Armaf Club de Nuit Blue",   slug: null,                price: "~$30"  },
    similarity: "Partial",
    verdict:    "Captures ambroxan freshness in the opening. The pepper-lavender heart diverges noticeably. Scratches the itch at lower cost.",
  },
  {
    original:   { name: "Thierry Mugler A*Men", slug: "thierry-mugler-a-men",        price: "~$90" },
    dupe:       { name: "Al-Rehab Silver",       slug: "al-rehab-al-rehab-silver",    price: "~$10" },
    similarity: "Very close",
    verdict:    "One of the most underrated budget dupes. The coffee-and-tar opening is surprisingly well captured. Longevity shorter but similarity in the first two hours is striking.",
  },
  {
    original:   { name: "Chanel Bleu de Chanel EDP", slug: "chanel-bleu-de-chanel-edp", price: "~$110" },
    dupe:       { name: "Various",                    slug: null,                         price: "~$35"  },
    similarity: "Partial",
    verdict:    "Bleu's balance resists close cloning. Most dupes land in the same family but feel noticeably flatter. If Bleu is your target, save for the original.",
  },
];

const CASES_FOR = [
  "Fragrance access shouldn't require disposable income. If a $35 bottle lets someone smell great, that's the point of fragrance, achieved.",
  "For the gym, travel, situations where you'll sweat it off — an expensive original is genuinely wasteful.",
  "Some dupes are excellent fragrances in their own right, not just imitations.",
  "A great way to test whether you actually love a fragrance family before committing to a $300 original.",
];

const CASES_AGAINST = [
  "A ninety percent similarity is not the original. For a fragrance built on rare naturals, the missing ten percent is often the most interesting part.",
  "Longevity and projection on dupes frequently underperform significantly past the first hour.",
  "Buying only dupes keeps you in a permanent relationship with other people's creativity rather than developing your own taste.",
  "If you wear a well-known dupe around someone who owns the original, they will know.",
];

const WHEN = [
  {
    context:  "Gym, travel, outdoor events",
    guidance: "Dupe makes sense.",
    detail:   "You're going to sweat it off or leave it on a hotel pillow. No reason to sacrifice the original.",
    positive: true,
  },
  {
    context:  "Testing a family before buying the original",
    guidance: "Dupe is smart.",
    detail:   "A $35 dupe as research is legitimate. Just remember it tells you about the family, not the original.",
    positive: true,
  },
  {
    context:  "A fragrance you love but can't afford",
    guidance: "Dupe is reasonable.",
    detail:   "Nobody should smell bad because fragrance is expensive. Enjoy it, save toward the original if you want it.",
    positive: true,
  },
  {
    context:  "Your signature scent",
    guidance: "Save for the original.",
    detail:   "If this is the fragrance you want people to associate with you, the quality difference over years of wear matters.",
    positive: false,
  },
  {
    context:  "Occasions that matter",
    guidance: "Wear the original.",
    detail:   "Not for others — for yourself. The confidence of wearing the real thing is not nothing.",
    positive: false,
  },
  {
    context:  "Fragrances built on rare naturals",
    guidance: "Dupe will disappoint.",
    detail:   "The gap between synthetic and natural is widest here. A dupe of Amouage will smell adjacent, not equivalent.",
    positive: false,
  },
];

export default function DupesDebatePage() {
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
          The Dupes Debate:<br />
          <em className="italic text-amber-400">Smart Hack, False Economy, or Something More Complicated?</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-4 max-w-md">
          Fragrance dupes are everywhere, heavily marketed, and hotly debated. Here&apos;s an honest
          look at what they actually are, when they make sense, and when they don&apos;t.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-700">
          Dupes, clones, inspired-by fragrances, and when the original is irreplaceable · 12 min read
        </p>
      </div>

      {/* Intro */}
      <div className="mb-14">
        <p className="font-serif text-lg text-stone-300 font-light leading-relaxed mb-5">
          On one side: the position that dupes are a perfectly rational consumer choice — that spending
          $400 on Aventus when Armaf Club de Nuit Intense smells ninety percent as good for $35 is
          simply bad math.
        </p>
        <p className="text-sm text-stone-400 font-light leading-relaxed">
          On the other: that the ten percent difference is the entire point, and wearing a dupe is the
          olfactory equivalent of a counterfeit watch. Both positions contain truth. Both are also used
          to avoid engaging with the actual nuance of the question.
        </p>
      </div>

      {/* Terminology */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Terminology</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          What we&apos;re actually <em className="italic text-amber-400/80">talking about</em>
        </h2>

        <div className="space-y-3">
          <div className="border border-stone-800 rounded p-5 bg-stone-950/30">
            <p className="text-stone-200 font-light text-sm mb-2">Inspired-by fragrances</p>
            <p className="text-[11px] text-stone-500 font-light leading-relaxed">
              Openly acknowledge their inspiration and build a cheaper alternative using similar accords.
              Armaf, Dua Fragrances, Al-Rehab, and Lattafa operate here. They&apos;re not pretending to be
              the original.
            </p>
          </div>
          <div className="border border-stone-800 rounded p-5 bg-stone-950/30">
            <p className="text-stone-200 font-light text-sm mb-2">Clone fragrances</p>
            <p className="text-[11px] text-stone-500 font-light leading-relaxed">
              Attempt a closer technical recreation of the original formula — sometimes forensically close.
              Quality varies widely.
            </p>
          </div>
          <div className="border border-rose-900/30 rounded p-5 bg-rose-950/10">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-stone-200 font-light text-sm">Counterfeit fragrances</p>
              <span className="text-[9px] uppercase tracking-[0.12em] border border-rose-800/40 text-rose-500/70 rounded px-2 py-0.5">
                Not what we&apos;re discussing
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-light leading-relaxed">
              Fraudulently sold as the genuine article — illegal, potentially dangerous. If you&apos;re
              buying &ldquo;Creed Aventus&rdquo; for $45 from an unverified seller, that is a counterfeit, not a
              dupe. The distinction matters.
            </p>
          </div>
        </div>
      </section>

      {/* Case for / against */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Argument</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-8">
          The case for <em className="italic text-amber-400/80">and against</em>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="border border-emerald-900/30 rounded p-5 bg-emerald-950/10">
            <p className="text-[10px] uppercase tracking-[0.15em] text-emerald-500/70 mb-4">The case for dupes</p>
            <div className="space-y-4">
              {CASES_FOR.map((point, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-emerald-500/60 text-sm font-light leading-none mt-0.5 flex-shrink-0">+</span>
                  <p className="text-[11px] text-stone-500 font-light leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-rose-900/30 rounded p-5 bg-rose-950/10">
            <p className="text-[10px] uppercase tracking-[0.15em] text-rose-500/70 mb-4">The case against</p>
            <div className="space-y-4">
              {CASES_AGAINST.map((point, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-rose-500/60 text-sm font-light leading-none mt-0.5 flex-shrink-0">−</span>
                  <p className="text-[11px] text-stone-500 font-light leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <PullQuote>
          A dupe gets you to the neighborhood. The original takes you inside the house.
        </PullQuote>
      </section>

      {/* Comparison table */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>Honestly Assessed</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          Specific dupes, <em className="italic text-amber-400/80">honestly assessed</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          Seven of the most widely discussed original-and-dupe pairings, evaluated without advocacy.
        </p>

        <div className="space-y-3">
          {COMPARISONS.map(({ original, dupe, similarity, verdict }) => (
            <div key={original.name} className="border border-stone-800 rounded p-5 bg-stone-950/30">
              {/* Pairing header */}
              <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                  <FragPill name={original.name} slug={original.slug} />
                  <span className="text-[10px] text-stone-700">{original.price}</span>
                  <span className="text-stone-700 text-xs">→</span>
                  <FragPill name={dupe.name} slug={dupe.slug} />
                  <span className="text-[10px] text-stone-700">{dupe.price}</span>
                </div>
                <span className={`shrink-0 text-[9px] uppercase tracking-[0.12em] border rounded px-2 py-0.5 ${SIMILARITY_COLOR[similarity] ?? "text-stone-400 border-stone-700/40"}`}>
                  {similarity}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-light leading-relaxed">{verdict}</p>
            </div>
          ))}
        </div>
      </section>

      {/* When it makes sense */}
      <section className="mb-16 pb-16 border-b border-stone-800/60">
        <SectionLabel>The Decision</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-3">
          When a dupe makes sense —{" "}
          <em className="italic text-amber-400/80">and when it doesn&apos;t</em>
        </h2>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          Context determines almost everything here.
        </p>

        <div className="space-y-0">
          {WHEN.map(({ context, guidance, detail, positive }) => (
            <div key={context} className="flex gap-4 py-5 border-b border-stone-800/60 last:border-0">
              <span className={`text-[10px] uppercase tracking-[0.12em] border rounded px-2 py-0.5 flex-shrink-0 h-fit ${
                positive
                  ? "text-emerald-400/70 border-emerald-900/30"
                  : "text-rose-400/70 border-rose-900/30"
              }`}>
                {positive ? "Dupe" : "Original"}
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-stone-600 mb-1">{context}</p>
                <p className="text-stone-300 font-light text-sm mb-1.5">{guidance}</p>
                <p className="text-[11px] text-stone-500 font-light leading-relaxed">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ethics */}
      <section className="mb-16">
        <SectionLabel>Worth Knowing</SectionLabel>
        <h2 className="font-serif text-3xl font-light text-stone-100 leading-tight mb-6">
          The <em className="italic text-amber-400/80">ethical question</em>
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            When a large budget house produces a close clone of a small niche perfumer&apos;s signature
            work, they&apos;re taking creative and commercial credit for someone else&apos;s ideas at scale.
            The small house did the creative work, took the risk, found the audience — and watches a
            much larger operation produce a near-identical fragrance for a fraction of the price.
          </p>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Fragrance formulas aren&apos;t patent-protected in most jurisdictions. Being aware of this is
            worth something, even if the consumer calculus remains complicated.
          </p>
        </div>

        <PullQuote>
          Own one great original you love completely. Build from there. Dupes fill gaps — they don&apos;t build foundations.
        </PullQuote>
      </section>

      {/* Close */}
      <div className="text-center pt-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>

    </main>
  );
}
