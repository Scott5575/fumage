import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const SIMILARITY_LABELS: Record<string, string> = {
  CLOSE:    "Close clone",
  STRONG:   "Strong similarity",
  INSPIRED: "Inspired by",
  ADJACENT: "Adjacent vibe",
};

const SIMILARITY_COLOR: Record<string, string> = {
  CLOSE:    "text-amber-400 border-amber-700/40 bg-amber-900/10",
  STRONG:   "text-sky-400 border-sky-700/40 bg-sky-900/10",
  INSPIRED: "text-emerald-400 border-emerald-700/40 bg-emerald-900/10",
  ADJACENT: "text-stone-400 border-stone-700/40 bg-stone-900/10",
};

const PRICE_LABELS: Record<string, string> = {
  BUDGET:     "<$30",
  ACCESSIBLE: "$30–80",
  MID:        "$80–200",
  PREMIUM:    "$200–400",
  ULTRA:      "$400+",
};

export const metadata: Metadata = {
  title: "Fragrance Dupes — Fumage",
  description: "Find affordable alternatives to popular designer fragrances. Clones, inspirations, and honest comparisons.",
};

export default async function DupesPage() {
  const originals = await prisma.fragrance.findMany({
    where: { hasDupes: { some: {} } },
    include: {
      house: { select: { name: true, slug: true } },
      hasDupes: {
        include: {
          source: {
            include: { house: { select: { name: true } } },
          },
        },
        orderBy: { similarity: "asc" },
      },
    },
    orderBy: { popularityScore: "desc" },
  });

  const totalDupes = originals.reduce((n, f) => n + f.hasDupes.length, 0);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500 mb-2">
          Alternatives
        </p>
        <h1 className="text-2xl font-light text-stone-200">Dupes &amp; Clones</h1>
      </div>
      <p className="text-stone-500 text-sm font-light max-w-xl leading-relaxed mb-10">
        Fragrances that closely reference or clone a more expensive original —
        curated so you can smell the DNA without the price tag.{" "}
        <span className="text-stone-600">
          {originals.length} originals · {totalDupes} alternatives
        </span>
      </p>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mb-10">
        {Object.entries(SIMILARITY_LABELS).map(([key, label]) => (
          <span
            key={key}
            className={`text-[10px] uppercase tracking-[0.15em] border rounded px-2.5 py-1 ${SIMILARITY_COLOR[key]}`}
          >
            {label}
          </span>
        ))}
      </div>

      {/* List */}
      <div className="space-y-10">
        {originals.map((original) => (
          <div key={original.id}>
            {/* Original fragrance header */}
            <div className="flex items-baseline gap-3 mb-4 pb-3 border-b border-stone-800/60">
              <Link
                href={`/fragrances/${original.slug}`}
                className="text-stone-200 font-light hover:text-amber-400 transition-colors"
              >
                {original.name}
              </Link>
              <span className="text-stone-600 text-xs">·</span>
              <Link
                href={`/houses/${original.house.slug ?? ""}`}
                className="text-[11px] text-stone-500 hover:text-stone-300 transition-colors"
              >
                {original.house.name}
              </Link>
              {original.priceTier && (
                <>
                  <span className="text-stone-700 text-xs">·</span>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-stone-600">
                    {PRICE_LABELS[original.priceTier] ?? original.priceTier}
                  </span>
                </>
              )}
            </div>

            {/* Dupe cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {original.hasDupes.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/fragrances/${rel.source.slug}`}
                  className="group border border-stone-800 hover:border-stone-600 rounded p-4 bg-stone-950/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-stone-500 mb-0.5">
                        {rel.source.house.name}
                      </p>
                      <p className="text-stone-200 text-sm font-light group-hover:text-amber-400 transition-colors leading-snug">
                        {rel.source.name}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-[9px] uppercase tracking-[0.12em] border rounded px-2 py-0.5 ${SIMILARITY_COLOR[rel.similarity]}`}
                    >
                      {SIMILARITY_LABELS[rel.similarity] ?? rel.similarity}
                    </span>
                  </div>

                  {rel.source.priceTier && (
                    <p className="text-[10px] text-stone-600 mb-2">
                      {PRICE_LABELS[rel.source.priceTier] ?? rel.source.priceTier}
                    </p>
                  )}

                  {(rel.notes || rel.priceNote) && (
                    <div className="border-t border-stone-800/60 pt-2 mt-2 space-y-1">
                      {rel.priceNote && (
                        <p className="text-[10px] text-amber-600/80">{rel.priceNote}</p>
                      )}
                      {rel.notes && (
                        <p className="text-[10px] text-stone-600 leading-relaxed">{rel.notes}</p>
                      )}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
