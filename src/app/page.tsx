import Link from "next/link";
import { prisma } from "@/lib/prisma";

const FAMILY_LABELS: Record<string, string> = {
  FRESH: "Fresh",
  AROMATIC: "Aromatic",
  WOODY: "Woody",
  ORIENTAL: "Oriental",
  GOURMAND: "Gourmand",
  LEATHER: "Leather",
  CITRUS: "Citrus",
  CHYPRE: "Chypre",
};

const FAMILY_DESCRIPTORS: Record<string, string> = {
  FRESH: "Aquatic · Green · Ozonic",
  AROMATIC: "Herbal · Fougère · Verdant",
  WOODY: "Cedarwood · Oud · Sandalwood",
  ORIENTAL: "Amber · Spice · Resinous",
  GOURMAND: "Vanilla · Tobacco · Sweet",
  LEATHER: "Suede · Smoke · Dark",
  CITRUS: "Bergamot · Lemon · Neroli",
  CHYPRE: "Oakmoss · Labdanum · Mossy",
};

const FAMILY_ACCENT: Record<string, string> = {
  FRESH: "border-sky-400/40 hover:border-sky-400/70",
  AROMATIC: "border-emerald-500/40 hover:border-emerald-500/70",
  WOODY: "border-amber-700/40 hover:border-amber-700/70",
  ORIENTAL: "border-orange-500/40 hover:border-orange-500/70",
  GOURMAND: "border-rose-400/40 hover:border-rose-400/70",
  LEATHER: "border-stone-500/40 hover:border-stone-500/70",
  CITRUS: "border-yellow-400/40 hover:border-yellow-400/70",
  CHYPRE: "border-lime-600/40 hover:border-lime-600/70",
};

const FAMILY_DOT: Record<string, string> = {
  FRESH: "bg-sky-400",
  AROMATIC: "bg-emerald-400",
  WOODY: "bg-amber-700",
  ORIENTAL: "bg-orange-500",
  GOURMAND: "bg-rose-400",
  LEATHER: "bg-stone-500",
  CITRUS: "bg-yellow-400",
  CHYPRE: "bg-lime-600",
};

const PRICE_LABELS: Record<string, string> = {
  BUDGET: "<$30",
  ACCESSIBLE: "$30–80",
  MID: "$80–200",
  PREMIUM: "$200–400",
  ULTRA: "$400+",
};

export default async function HomePage() {
  const featured = await prisma.fragrance.findMany({
    where: { popularityScore: { not: null } },
    include: { house: { select: { name: true } } },
    orderBy: { popularityScore: "desc" },
    take: 6,
  });

  const families = Object.keys(FAMILY_LABELS);

  return (
    <main>
      {/* Hero */}
      <section className="min-h-[72vh] flex flex-col items-center justify-center px-6 text-center border-b border-stone-800/50">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500 mb-6">
          The Gentleman&apos;s Atlas
        </p>
        <h1 className="text-7xl sm:text-9xl font-extralight text-stone-100 tracking-tight mb-6">
          Fumage
        </h1>
        <p className="text-stone-500 text-base font-light max-w-sm mb-10 leading-relaxed">
          684 fragrances. 158 houses.
          <br />
          One atlas for the discerning nose.
        </p>
        <Link
          href="/fragrances"
          className="inline-block border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-stone-950 text-[10px] uppercase tracking-[0.25em] px-10 py-3.5 transition-colors"
        >
          Explore the Catalog
        </Link>
      </section>

      {/* Featured fragrances */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500">
            Featured
          </p>
          <Link
            href="/fragrances"
            className="text-[10px] uppercase tracking-[0.15em] text-stone-600 hover:text-stone-400 transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {featured.map((f) => (
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
              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${FAMILY_DOT[f.family] ?? "bg-stone-600"}`}
                />
                <span className="text-[10px] text-stone-500">
                  {FAMILY_LABELS[f.family] ?? f.family}
                </span>
              </div>
              {f.priceTier && (
                <p className="text-[10px] text-stone-600 mt-1">
                  {PRICE_LABELS[f.priceTier] ?? f.priceTier}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Scent families */}
      <section className="px-6 py-16 max-w-7xl mx-auto border-t border-stone-800/50">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-8">
          Scent Families
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {families.map((key) => (
            <Link
              key={key}
              href={`/fragrances?family=${key}`}
              className={`group border rounded p-6 transition-colors bg-stone-950/40 ${FAMILY_ACCENT[key] ?? "border-stone-800 hover:border-stone-600"}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${FAMILY_DOT[key] ?? "bg-stone-600"}`}
                />
                <p className="text-stone-200 text-sm font-light">
                  {FAMILY_LABELS[key]}
                </p>
              </div>
              <p className="text-[10px] text-stone-600 tracking-wide">
                {FAMILY_DESCRIPTORS[key]}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
