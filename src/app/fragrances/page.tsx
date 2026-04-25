import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ScentFamily, PriceTier, Occasion, Season } from "@prisma/client";
import FragranceFilters from "./FragranceFilters";

type SearchParams = {
  family?: string;
  price?: string;
  occasion?: string;
  season?: string;
  page?: string;
};

const PAGE_SIZE = 48;

const FAMILY_LABELS: Record<string, string> = {
  FRESH: "Fresh", AROMATIC: "Aromatic", WOODY: "Woody", ORIENTAL: "Oriental",
  GOURMAND: "Gourmand", LEATHER: "Leather", CITRUS: "Citrus", CHYPRE: "Chypre",
};

const PRICE_LABELS: Record<string, string> = {
  BUDGET: "<$30", ACCESSIBLE: "$30–80", MID: "$80–200", PREMIUM: "$200–400", ULTRA: "$400+",
};

function FamilyPip({ family }: { family: string }) {
  const colors: Record<string, string> = {
    FRESH: "bg-sky-400", AROMATIC: "bg-emerald-400", WOODY: "bg-amber-700",
    ORIENTAL: "bg-orange-500", GOURMAND: "bg-rose-400", LEATHER: "bg-stone-500",
    CITRUS: "bg-yellow-400", CHYPRE: "bg-lime-600",
  };
  return (
    <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors[family] ?? "bg-stone-600"}`} />
  );
}

async function FragranceGrid({ searchParams }: { searchParams: SearchParams }) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));
  const skip = (page - 1) * PAGE_SIZE;

  const where: {
    family?: ScentFamily;
    priceTier?: PriceTier;
    occasions?: { some: { occasion: Occasion } };
    seasons?: { some: { season: Season } };
  } = {};

  if (searchParams.family && Object.values(ScentFamily).includes(searchParams.family as ScentFamily)) {
    where.family = searchParams.family as ScentFamily;
  }
  if (searchParams.price && Object.values(PriceTier).includes(searchParams.price as PriceTier)) {
    where.priceTier = searchParams.price as PriceTier;
  }
  if (searchParams.occasion && Object.values(Occasion).includes(searchParams.occasion as Occasion)) {
    where.occasions = { some: { occasion: searchParams.occasion as Occasion } };
  }
  if (searchParams.season && Object.values(Season).includes(searchParams.season as Season)) {
    where.seasons = { some: { season: searchParams.season as Season } };
  }

  const [fragrances, total] = await Promise.all([
    prisma.fragrance.findMany({
      where,
      include: { house: { select: { name: true, slug: true } } },
      orderBy: [{ popularityScore: "desc" }, { name: "asc" }],
      skip,
      take: PAGE_SIZE,
    }),
    prisma.fragrance.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const buildPageUrl = (p: number, params: SearchParams) => {
    const q = new URLSearchParams();
    if (params.family) q.set("family", params.family);
    if (params.price) q.set("price", params.price);
    if (params.occasion) q.set("occasion", params.occasion);
    if (params.season) q.set("season", params.season);
    if (p > 1) q.set("page", String(p));
    const qs = q.toString();
    return `/fragrances${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline justify-between mb-6">
        <p className="text-stone-500 text-xs">
          {total.toLocaleString()} fragrance{total !== 1 ? "s" : ""}
        </p>
        {totalPages > 1 && (
          <p className="text-stone-600 text-xs">
            Page {page} of {totalPages}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {fragrances.map((f) => (
          <Link
            key={f.id}
            href={`/fragrances/${f.slug}`}
            className="group border border-stone-800 hover:border-stone-600 rounded p-4 transition-colors bg-stone-950/40"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-500 mb-1 truncate">
              {f.house.name}
            </p>
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
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-4 mt-10">
          {page > 1 && (
            <Link
              href={buildPageUrl(page - 1, searchParams)}
              className="text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-stone-200 transition-colors"
            >
              ← Previous
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={buildPageUrl(page + 1, searchParams)}
              className="text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:text-stone-200 transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Fragrance Catalog — Fumage",
  description: "Browse 684 men's fragrances by scent family, price, occasion, and season.",
};

export default async function FragrancesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-2">
          Catalog
        </p>
        <h1 className="text-3xl font-light text-stone-200">Fragrances</h1>
      </div>

      <div className="flex gap-10">
        <Suspense>
          <FragranceFilters />
        </Suspense>

        <Suspense
          fallback={
            <div className="flex-1 text-stone-600 text-xs pt-2">Loading…</div>
          }
        >
          <FragranceGrid searchParams={params} />
        </Suspense>
      </div>
    </main>
  );
}
