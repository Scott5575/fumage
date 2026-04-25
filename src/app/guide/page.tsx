import Link from "next/link";

const GUIDES = [
  {
    href:     "/guide/woody-aromatic",
    tag:      "Family Deep Dive · Woody",
    title:    "The Backbone of Men's Fragrance",
    subtitle: "The widest and most versatile family in men's perfumery. Warm, grounding, and almost universally flattering — but woody covers more ground than most people realise.",
    read:     "9 min read",
  },
  {
    href:     "/guide/fresh-citrus",
    tag:      "Family Deep Dive · Fresh",
    title:    "The Misunderstood Family",
    subtitle: "The most approachable family is also the most underestimated. Here's what separates the great fresh fragrances from the forgettable.",
    read:     "10 min read",
  },
  {
    href:     "/guide/dupes-debate",
    tag:      "Buying Guide · Opinion",
    title:    "The Dupes Debate",
    subtitle: "Fragrance dupes are everywhere, heavily marketed, and hotly debated. Here's an honest look at what they actually are, when they make sense, and when they don't.",
    read:     "12 min read",
  },
  {
    href:     "/guide/niche-fragrance",
    tag:      "Niche · Education",
    title:    "Down the Rabbit Hole",
    subtitle: "What niche means, why it costs that much, the houses worth knowing, and how to go deep without going broke.",
    read:     "14 min read",
  },
  {
    href:     "/guide/invisible-armour",
    tag:      "Psychology · Recommendations",
    title:    "The Invisible Armour",
    subtitle: "How the right cologne doesn't just change how others perceive you — it changes how you feel about yourself.",
    read:     "8 min read",
  },
  {
    href:     "/guide/brain-on-cologne",
    tag:      "Psychology · Education",
    title:    "Your Brain on Cologne",
    subtitle: "The only sense with a direct line to your emotions and memory. Here's what's actually happening when a scent stops you in your tracks.",
    read:     "12 min read",
  },
  {
    href:     "/guide/edt-edp-parfum",
    tag:      "Buying Guide · Education",
    title:    "EDT, EDP, Parfum: What the Letters Actually Mean",
    subtitle: "Every fragrance bottle has a concentration label. Most people ignore it. Here's why that's a mistake.",
    read:     "11 min read",
  },
  {
    href:     "/guide/fragrance-wardrobe",
    tag:      "Wardrobe Building · Practical",
    title:    "The Fragrance Wardrobe",
    subtitle: "Why one bottle isn't enough and forty is too many. The five slots that cover everything, seasonal rotation, and collector traps.",
    read:     "13 min read",
  },
];

export default function GuidePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500 mb-2">
          The Art of Fragrance
        </p>
        <h1 className="text-2xl font-light text-stone-200">Guide</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl">
        {GUIDES.map(({ href, tag, title, subtitle, read }) => (
          <Link
            key={href}
            href={href}
            className="group border border-stone-800 hover:border-stone-600 rounded p-5 transition-colors bg-stone-950/40"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-600 mb-3">{tag}</p>
            <h2 className="font-serif text-lg font-light text-stone-200 group-hover:text-amber-400 transition-colors leading-snug mb-2">
              {title}
            </h2>
            <p className="text-[11px] text-stone-500 font-light leading-relaxed mb-4">
              {subtitle}
            </p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-700">{read}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
