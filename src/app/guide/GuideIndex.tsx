"use client";

import Link from "next/link";
import { useState } from "react";

type Category = "all" | "psychology" | "family" | "guide" | "dispatch";

const GUIDES: {
  href: string;
  tag: string;
  title: string;
  subtitle: string;
  read: string;
  category: Category;
}[] = [
  {
    href:     "/guide/dispatch-2026-05",
    tag:      "The Dispatch · New Releases",
    title:    "New Releases: May 2026",
    subtitle: "The seven men's fragrance launches worth knowing from May 2026 — from Acqua di Parma's hand-pressed bergamot to Azzaro's 24-hour amber and a D.S. & Durga cologne that smells like a wool blazer.",
    read:     "5 min read",
    category: "dispatch",
  },
  {
    href:     "/guide/the-intensification",
    tag:      "Culture · Trends",
    title:    "More of Everything",
    subtitle: "Elixir, Absolu, Extreme, Parfum Intense — five of the seven biggest men's launches of May 2026 were intensified flankers, not new fragrances. What's driving it, and when the louder version is actually worth buying.",
    read:     "13 min read",
    category: "guide",
  },
  {
    href:     "/guide/pheromones",
    tag:      "Psychology · Science",
    title:    "The Invisible Weapon",
    subtitle: "Pheromones in men's fragrances — the history, the hard science, and the hype. What the research actually says about scent, attraction, and why animalic ingredients work.",
    read:     "14 min read",
    category: "psychology",
  },
  {
    href:     "/guide/invisible-allure",
    tag:      "Psychology · Attraction",
    title:    "The Invisible Allure",
    subtitle: "How fragrance works beneath consciousness — shaping how others perceive you, projecting confidence before a word is spoken, and making you unforgettable long after you've left the room.",
    read:     "15 min read",
    category: "psychology",
  },
  {
    href:     "/guide/invisible-armour",
    tag:      "Psychology · Recommendations",
    title:    "The Invisible Armour",
    subtitle: "How the right cologne doesn't just change how others perceive you — it changes how you feel about yourself.",
    read:     "8 min read",
    category: "psychology",
  },
  {
    href:     "/guide/brain-on-cologne",
    tag:      "Psychology · Education",
    title:    "Your Brain on Cologne",
    subtitle: "The only sense with a direct line to your emotions and memory. Here's what's actually happening when a scent stops you in your tracks.",
    read:     "12 min read",
    category: "psychology",
  },
  {
    href:     "/guide/aquatic-marine",
    tag:      "Family Deep Dive · Aquatic",
    title:    "Better Than Its Reputation",
    subtitle: "Written off as dated by fragrance snobs, beloved by everyone else, and secretly the source of some of the most genuinely enjoyable warm-weather fragrances ever made.",
    read:     "9 min read",
    category: "family",
  },
  {
    href:     "/guide/leather-tobacco",
    tag:      "Family Deep Dive · Leather",
    title:    "Fragrances With Opinions",
    subtitle: "Not for everyone, on purpose. The leather and tobacco family is where fragrance stops trying to be liked and starts trying to be remembered.",
    read:     "9 min read",
    category: "family",
  },
  {
    href:     "/guide/fougere",
    tag:      "Family Deep Dive · Fougère",
    title:    "The Original Blueprint",
    subtitle: "The structural DNA of men's cologne since 1882. If you've ever smelled a classic masculine fragrance and couldn't place why — it was probably a fougère.",
    read:     "9 min read",
    category: "family",
  },
  {
    href:     "/guide/oriental-amber",
    tag:      "Family Deep Dive · Oriental",
    title:    "Rich, Warm, Unapologetic",
    subtitle: "The most divisive family in men's fragrance is also the most memorable. Worn correctly, orientals are devastating. Worn incorrectly, they clear rooms.",
    read:     "9 min read",
    category: "family",
  },
  {
    href:     "/guide/woody-aromatic",
    tag:      "Family Deep Dive · Woody",
    title:    "The Backbone of Men's Fragrance",
    subtitle: "The widest and most versatile family in men's perfumery. Warm, grounding, and almost universally flattering — but woody covers more ground than most people realise.",
    read:     "9 min read",
    category: "family",
  },
  {
    href:     "/guide/fresh-citrus",
    tag:      "Family Deep Dive · Fresh",
    title:    "The Misunderstood Family",
    subtitle: "The most approachable family is also the most underestimated. Here's what separates the great fresh fragrances from the forgettable.",
    read:     "10 min read",
    category: "family",
  },
  {
    href:     "/guide/citrus-woody-accord",
    tag:      "Family Deep Dive · Subfamily",
    title:    "The Dry Sun & The Dark Timber",
    subtitle: "Mastering the citrus-woody accord — the chemistry of bridging two opposites, the historical lineage, and the bottles that prove it works.",
    read:     "10 min read",
    category: "family",
  },
  {
    href:     "/guide/gourmand",
    tag:      "Family Deep Dive · Gourmand",
    title:    "Pleasure Is the Point",
    subtitle: "Written off as sugary indulgence by people who haven't encountered the right ones. The gourmand family is the most immediately gratifying in perfumery — and technically the most demanding to execute well.",
    read:     "10 min read",
    category: "family",
  },
  {
    href:     "/guide/chypre",
    tag:      "Family Deep Dive · Chypre",
    title:    "The Aristocrat",
    subtitle: "The most historically significant family in perfumery — and the one most transformed by regulation. One lichen, one rulebook, and a century of consequence.",
    read:     "11 min read",
    category: "family",
  },
  {
    href:     "/guide/skin-scents",
    tag:      "Education · Technique",
    title:    "The Second Skin",
    subtitle: "The fragrance category that makes people lean in — what skin scents are, the science of why they work, and how to wear one well.",
    read:     "13 min read",
    category: "guide",
  },
  {
    href:     "/guide/classic-notes-reimagined",
    tag:      "Education · Notes",
    title:    "The Classics, Reimagined",
    subtitle: "Vetiver, leather, fougère, tobacco — the pillars of masculine perfumery aren't going anywhere. But they've shed their skins. Note by note, what's changed and what to wear.",
    read:     "16 min read",
    category: "guide",
  },
  {
    href:     "/guide/presence-over-performance",
    tag:      "Culture · Trends",
    title:    "Presence Over Performance",
    subtitle: "The era of scent as territory is over. What the market has moved toward instead — and why presence is the harder thing to pull off.",
    read:     "12 min read",
    category: "guide",
  },
  {
    href:     "/guide/synthetic-notes",
    tag:      "Chemistry · Education",
    title:    "The Invisible Architecture",
    subtitle: "From Iso E Super to Ambroxan — the lab-made molecules that build every great fragrance you own, and why the synthetic stigma is exactly backwards.",
    read:     "14 min read",
    category: "guide",
  },
  {
    href:     "/guide/niche-fragrance",
    tag:      "Niche · Education",
    title:    "Down the Rabbit Hole",
    subtitle: "What niche means, why it costs that much, the houses worth knowing, and how to go deep without going broke.",
    read:     "14 min read",
    category: "guide",
  },
  {
    href:     "/guide/niche-fragrance-houses",
    tag:      "Niche · Houses",
    title:    "Beyond the Counter",
    subtitle: "Eleven essential niche houses for the masculine fragrance collector — from accessible gateway entries to the rarefied apex of the category.",
    read:     "16 min read",
    category: "guide",
  },
  {
    href:     "/guide/smart-shelf",
    tag:      "Buying Guide · Value",
    title:    "The Smart Shelf",
    subtitle: "Gulf heritage houses, the clone economy, and a four-tier wardrobe strategy. Seven value houses worth knowing — and when to reach for them instead of the expensive bottle.",
    read:     "15 min read",
    category: "guide",
  },
  {
    href:     "/guide/regional-traditions",
    tag:      "Education · Regional",
    title:    "Where a Fragrance Comes From Changes Everything",
    subtitle: "Eight great traditions — French, Italian, Mediterranean, English, Oriental, Arabian, American, Japanese — with 48 examples, four budget tiers, and two starter wardrobes.",
    read:     "22 min read",
    category: "guide",
  },
  {
    href:     "/guide/fragrance-clones",
    tag:      "Buying Guide · Clones",
    title:    "Scent Without the Sticker Shock",
    subtitle: "The complete clone buyer's guide — thirteen houses profiled, twenty popular pairings, and a five-step evaluation method for judging any accord without owning the original.",
    read:     "18 min read",
    category: "guide",
  },
  {
    href:     "/guide/reformulations",
    tag:      "Industry · Culture",
    title:    "Why They Change What You Love",
    subtitle: "On reformulations, discontinued legends, and the flanker flood — a clear-eyed guide to navigating what fragrance houses do when they think no one is paying attention.",
    read:     "14 min read",
    category: "guide",
  },
  {
    href:     "/guide/fragrance-aging",
    tag:      "Myth-Busting · Science",
    title:    "The Resting Bottle",
    subtitle: "Forums swear that letting a bottle sit for months 'wakes it up.' Here's what maceration actually is, what really happens to your fragrance on the shelf, and how to store it so it lasts.",
    read:     "11 min read",
    category: "guide",
  },
  {
    href:     "/guide/dupes-debate",
    tag:      "Buying Guide · Opinion",
    title:    "The Dupes Debate",
    subtitle: "Fragrance dupes are everywhere, heavily marketed, and hotly debated. Here's an honest look at what they actually are, when they make sense, and when they don't.",
    read:     "12 min read",
    category: "guide",
  },
  {
    href:     "/guide/edt-edp-parfum",
    tag:      "Buying Guide · Education",
    title:    "EDT, EDP, Parfum: What the Letters Actually Mean",
    subtitle: "Every fragrance bottle has a concentration label. Most people ignore it. Here's why that's a mistake.",
    read:     "11 min read",
    category: "guide",
  },
  {
    href:     "/guide/fragrance-wardrobe",
    tag:      "Wardrobe Building · Practical",
    title:    "The Fragrance Wardrobe",
    subtitle: "Why one bottle isn't enough and forty is too many. The five slots that cover everything, seasonal rotation, and collector traps.",
    read:     "13 min read",
    category: "guide",
  },
  {
    href:     "/guide/diy-cologne",
    tag:      "The Craft · DIY & Bespoke",
    title:    "So You Want to Make Your Own Cologne",
    subtitle: "The cost of entry, the five reasons your first attempt probably won't be wearable, and the bespoke services that give you a singular result without the chemistry homework.",
    read:     "12 min read",
    category: "guide",
  },
  {
    href:     "/guide/layering",
    tag:      "The Craft · Technique",
    title:    "The Invisible Third",
    subtitle: "Layering two fragrances doesn't give you two — it gives you a third that belongs to neither bottle. The theory, the method, six proven combinations, and the advanced techniques that go further.",
    read:     "16 min read",
    category: "guide",
  },
];

const FILTERS: { value: Category; label: string }[] = [
  { value: "all",        label: "All"               },
  { value: "psychology", label: "Psychology"         },
  { value: "family",     label: "Family Deep Dives"  },
  { value: "guide",      label: "Buying Guides"      },
  { value: "dispatch",   label: "New Releases"      },
];

export default function GuideIndex() {
  const [active, setActive] = useState<Category>("all");

  const visible = active === "all" ? GUIDES : GUIDES.filter((g) => g.category === active);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500 mb-2">
          The Art of Fragrance
        </p>
        <h1 className="text-2xl font-light text-stone-200">Guide</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 flex-wrap mb-8 border-b border-stone-800/50 pb-4">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className={[
              "text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded transition-colors",
              active === value
                ? "bg-amber-900/20 text-amber-400 border border-amber-700/40"
                : "text-stone-500 hover:text-stone-300 border border-transparent",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
        <span className="ml-auto text-[10px] text-stone-700">
          {visible.length} article{visible.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl">
        {visible.map(({ href, tag, title, subtitle, read }) => (
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
