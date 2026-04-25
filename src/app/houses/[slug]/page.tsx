import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const TIER_LABELS_META: Record<string, string> = {
  DESIGNER: "Designer", NICHE: "Niche", ULTRA_LUXURY: "Ultra Luxury",
  ARTISAN: "Artisan", BUDGET_NICHE: "Budget / Accessible", CELEBRITY: "Celebrity",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const house = await prisma.house.findUnique({
    where: { slug },
    select: { name: true, tier: true, _count: { select: { fragrances: true } } },
  });
  if (!house) return {};
  const tier = TIER_LABELS_META[house.tier] ?? house.tier;
  return {
    title: `${house.name} — Fumage`,
    description: `${house.name}: ${tier} fragrance house. Explore ${house._count.fragrances} fragrances on Fumage.`,
  };
}

const FAMILY_LABELS: Record<string, string> = {
  FRESH: "Fresh", AROMATIC: "Aromatic", WOODY: "Woody", ORIENTAL: "Oriental",
  GOURMAND: "Gourmand", LEATHER: "Leather", CITRUS: "Citrus", CHYPRE: "Chypre",
};

const PRICE_LABELS: Record<string, string> = {
  BUDGET: "<$30", ACCESSIBLE: "$30–80", MID: "$80–200", PREMIUM: "$200–400", ULTRA: "$400+",
};

const TIER_LABELS: Record<string, string> = {
  DESIGNER: "Designer", NICHE: "Niche", ULTRA_LUXURY: "Ultra Luxury",
  ARTISAN: "Artisan", BUDGET_NICHE: "Budget / Accessible", CELEBRITY: "Celebrity",
};

function FamilyPip({ family }: { family: string }) {
  const colors: Record<string, string> = {
    FRESH: "bg-sky-400", AROMATIC: "bg-emerald-400", WOODY: "bg-amber-700",
    ORIENTAL: "bg-orange-500", GOURMAND: "bg-rose-400", LEATHER: "bg-stone-500",
    CITRUS: "bg-yellow-400", CHYPRE: "bg-lime-600",
  };
  return (
    <span className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${colors[family] ?? "bg-stone-600"}`} />
  );
}

export default async function HouseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const house = await prisma.house.findUnique({
    where: { slug },
    include: {
      fragrances: {
        orderBy: [{ popularityScore: "desc" }, { name: "asc" }],
        select: {
          id: true,
          slug: true,
          name: true,
          year: true,
          family: true,
          category: true,
          priceTier: true,
          communityRating: true,
          popularityScore: true,
          availability: true,
        },
      },
    },
  });

  if (!house) notFound();

  // Group fragrances by category for display
  const byCategory = house.fragrances.reduce<Record<string, typeof house.fragrances>>(
    (acc, f) => {
      const cat = f.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(f);
      return acc;
    },
    {}
  );

  const categoryOrder = ["DESIGNER", "NICHE", "ULTRA_LUXURY", "ARTISAN"];
  const categories = categoryOrder.filter((c) => byCategory[c]?.length);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-stone-600 mb-8">
        <Link href="/houses" className="hover:text-stone-400 transition-colors">
          Houses
        </Link>
        <span>›</span>
        <span className="text-stone-500">{house.name}</span>
      </nav>

      {/* House header */}
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-2">
          {TIER_LABELS[house.tier] ?? house.tier}
        </p>
        <h1 className="text-4xl font-light text-stone-100 mb-4">{house.name}</h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-stone-500 mb-4">
          {house.country && <span>{house.country}</span>}
          {house.city && <span>{house.city}</span>}
          {house.foundedYear && <span>Est. {house.foundedYear}</span>}
          <span>{house.fragrances.length} fragrance{house.fragrances.length !== 1 ? "s" : ""}</span>
          {house.website && (
            <a
              href={house.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500/60 hover:text-amber-400 transition-colors"
            >
              Website ↗
            </a>
          )}
        </div>

        {house.description && (
          <p className="text-stone-400 text-sm leading-relaxed max-w-2xl">
            {house.description}
          </p>
        )}
      </div>

      {/* Fragrance grid — single group if only one category, else by category */}
      {categories.length <= 1 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {house.fragrances.map((f) => (
            <FragranceCard key={f.id} f={f} />
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          {categories.map((cat) => (
            <section key={cat}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-4">
                {TIER_LABELS[cat] ?? cat}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {byCategory[cat].map((f) => (
                  <FragranceCard key={f.id} f={f} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}

function FragranceCard({
  f,
}: {
  f: {
    slug: string;
    name: string;
    year: number | null;
    family: string;
    priceTier: string;
    communityRating: number | null;
    availability: string;
  };
}) {
  return (
    <Link
      href={`/fragrances/${f.slug}`}
      className="group border border-stone-800 hover:border-stone-600 rounded p-4 transition-colors bg-stone-950/40"
    >
      {f.year && (
        <p className="text-[10px] text-stone-700 mb-1">{f.year}</p>
      )}
      <p className="text-stone-200 text-sm font-light leading-snug mb-3 line-clamp-2">
        {f.name}
      </p>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[10px] text-stone-500">
          <FamilyPip family={f.family} />
          {FAMILY_LABELS[f.family] ?? f.family}
        </span>
        <span className="text-[10px] text-stone-600">
          {PRICE_LABELS[f.priceTier] ?? f.priceTier}
        </span>
      </div>
      {f.communityRating != null && (
        <p className="text-[10px] text-amber-500/70 mt-2">
          {f.communityRating.toFixed(1)}
        </p>
      )}
      {f.availability === "DISCONTINUED" && (
        <p className="text-[10px] text-stone-700 mt-1 uppercase tracking-wide">
          Discontinued
        </p>
      )}
    </Link>
  );
}
