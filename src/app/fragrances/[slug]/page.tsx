import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

const FAMILY_LABELS_META: Record<string, string> = {
  FRESH: "Fresh", AROMATIC: "Aromatic", WOODY: "Woody", ORIENTAL: "Oriental",
  GOURMAND: "Gourmand", LEATHER: "Leather", CITRUS: "Citrus", CHYPRE: "Chypre",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const f = await prisma.fragrance.findUnique({
    where: { slug },
    select: { name: true, family: true, house: { select: { name: true } } },
  });
  if (!f) return {};
  const family = FAMILY_LABELS_META[f.family] ?? f.family;
  return {
    title: `${f.name} by ${f.house.name} — Fumage`,
    description: `${f.name} by ${f.house.name}: a ${family} fragrance. Notes pyramid, reviews, dupes, and similar picks on Fumage.`,
  };
}
import { getCurrentUser } from "@/lib/auth";
import { NotePosition } from "@prisma/client";
import DualRegisterToggle from "@/components/fragrance/DualRegisterToggle";
import { ReviewList } from "@/components/reviews/ReviewList";
import type { CollectionEntry } from "@/types/ugc";

// ─── Label maps ────────────────────────────────────────────────────────────────

const FAMILY_LABELS: Record<string, string> = {
  FRESH: "Fresh", AROMATIC: "Aromatic", WOODY: "Woody", ORIENTAL: "Oriental",
  GOURMAND: "Gourmand", LEATHER: "Leather", CITRUS: "Citrus", CHYPRE: "Chypre",
};

const PRICE_LABELS: Record<string, string> = {
  BUDGET: "<$30", ACCESSIBLE: "$30–80", MID: "$80–200", PREMIUM: "$200–400", ULTRA: "$400+",
};

const CATEGORY_LABELS: Record<string, string> = {
  DESIGNER: "Designer", NICHE: "Niche", ULTRA_LUXURY: "Ultra Luxury", ARTISAN: "Artisan",
};

const AVAILABILITY_LABELS: Record<string, string> = {
  WIDELY_AVAILABLE: "Widely available", LIMITED: "Limited",
  DISCONTINUED: "Discontinued", SEASONAL: "Seasonal",
};

const SIMILARITY_LABELS: Record<string, string> = {
  CLOSE: "Close clone", STRONG: "Strong similarity",
  INSPIRED: "Inspired by", ADJACENT: "Adjacent vibe",
};

// ─── Performance bar ───────────────────────────────────────────────────────────

function PerfBar({ label, value }: { label: string; value: number | null }) {
  if (value == null) return null;
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] uppercase tracking-[0.15em] text-stone-500 w-20 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-stone-800 relative">
        <div
          className="absolute inset-y-0 left-0 bg-amber-700/60 h-[3px] top-[-1px] rounded-full"
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
      <span className="text-[10px] text-stone-600 w-4 text-right">{value}</span>
    </div>
  );
}

// ─── Tag pill ──────────────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return (
    <span className="text-[10px] uppercase tracking-[0.15em] px-2 py-1 border border-stone-800 rounded text-stone-500">
      {label}
    </span>
  );
}

function toLabel(raw: string) {
  return raw.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Notes pyramid ────────────────────────────────────────────────────────────

function NotesPyramid({
  notes,
}: {
  notes: { position: NotePosition; note: { name: string; slug: string }; order: number }[];
}) {
  const grouped = (["TOP", "MIDDLE", "BASE", "ACCORD"] as NotePosition[]).map(
    (pos) => ({
      pos,
      items: notes
        .filter((n) => n.position === pos)
        .sort((a, b) => a.order - b.order),
    })
  ).filter((g) => g.items.length > 0);

  if (grouped.length === 0) return null;

  const posLabels: Record<string, string> = {
    TOP: "Top", MIDDLE: "Heart", BASE: "Base", ACCORD: "Accords",
  };

  return (
    <div className="space-y-4">
      {grouped.map(({ pos, items }) => (
        <div key={pos}>
          <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-2">
            {posLabels[pos]}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {items.map((n) => (
              <Link
                key={n.note.name}
                href={`/notes/${n.note.slug}`}
                className="text-xs text-stone-300 hover:text-stone-100 px-2.5 py-1 bg-stone-900/60 hover:bg-stone-800/60 border border-stone-800/80 hover:border-stone-700 rounded-full transition-colors"
              >
                {n.note.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Fragrance card (for dupes / similar) ─────────────────────────────────────

function MiniCard({
  slug,
  name,
  houseName,
  meta,
}: {
  slug: string;
  name: string;
  houseName: string;
  meta?: string;
}) {
  return (
    <Link
      href={`/fragrances/${slug}`}
      className="block border border-stone-800 hover:border-stone-600 rounded p-3 transition-colors"
    >
      <p className="text-[10px] uppercase tracking-[0.15em] text-stone-600 mb-0.5">
        {houseName}
      </p>
      <p className="text-sm text-stone-200 font-light leading-snug">{name}</p>
      {meta && (
        <p className="text-[10px] text-amber-600/60 mt-1">{meta}</p>
      )}
    </Link>
  );
}

// ─── Collection button wrapper (manages local state) ──────────────────────────

import CollectionWrapper from "@/components/fragrance/CollectionWrapper";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function FragranceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const fragrance = await prisma.fragrance.findUnique({
    where: { slug },
    include: {
      house: true,
      notes: {
        include: { note: { select: { name: true, slug: true } } },
        orderBy: { order: "asc" },
      },
      seasons:    { select: { season: true } },
      occasions:  { select: { occasion: true } },
      timesOfDay: { select: { timeOfDay: true } },
      isDupeOf: {
        include: {
          target: { include: { house: { select: { name: true } } } },
        },
      },
      hasDupes: {
        include: {
          source: { include: { house: { select: { name: true } } } },
        },
        take: 6,
      },
      similarA: {
        include: {
          fragranceB: { include: { house: { select: { name: true } } } },
        },
        take: 8,
      },
      similarB: {
        include: {
          fragranceA: { include: { house: { select: { name: true } } } },
        },
        take: 8,
      },
    },
  });

  if (!fragrance) notFound();

  const user = await getCurrentUser();

  let initialEntry: CollectionEntry | null = null;
  if (user) {
    const entry = await prisma.userCollection.findFirst({
      where: { userId: user.id, fragranceId: fragrance.id },
    });
    if (entry) {
      initialEntry = {
        id: entry.id,
        userId: entry.userId,
        fragranceId: entry.fragranceId,
        fragrance: {
          id: fragrance.id,
          slug: fragrance.slug,
          name: fragrance.name,
          house: { name: fragrance.house.name },
          year: fragrance.year,
          priceTier: fragrance.priceTier,
          priceRange: fragrance.priceRange,
          communityRating: fragrance.communityRating,
          avgUserRating: fragrance.avgUserRating,
          reviewCount: fragrance.reviewCount,
          popularityScore: fragrance.popularityScore,
          family: fragrance.family,
        },
        status: entry.status as CollectionEntry["status"],
        personalRating: entry.personalRating ?? null,
        personalNote: entry.personalNote ?? null,
        purchasePrice: entry.purchasePrice != null ? entry.purchasePrice.toNumber() : null,
        purchaseCurrency: entry.purchaseCurrency ?? "USD",
        purchaseDate: entry.purchaseDate ? entry.purchaseDate.toISOString() : null,
        bottleSize: entry.bottleSize ?? null,
        pinned: entry.pinned,
        createdAt: entry.createdAt.toISOString(),
        updatedAt: entry.updatedAt.toISOString(),
      };
    }
  }

  // Merge similar from both sides
  const similar = [
    ...fragrance.similarA.map((s) => ({
      id: s.id,
      slug: s.fragranceB.slug,
      name: s.fragranceB.name,
      houseName: s.fragranceB.house.name,
    })),
    ...fragrance.similarB.map((s) => ({
      id: s.id,
      slug: s.fragranceA.slug,
      name: s.fragranceA.name,
      houseName: s.fragranceA.house.name,
    })),
  ].slice(0, 8);

  const hasPerf = fragrance.longevity || fragrance.projection || fragrance.sillage;
  const hasMarket =
    fragrance.massAppeal != null ||
    fragrance.complimentFactor ||
    fragrance.trend ||
    fragrance.hypeRating;

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-stone-600 mb-8">
        <Link href="/fragrances" className="hover:text-stone-400 transition-colors">
          Catalog
        </Link>
        <span>›</span>
        <Link
          href={`/houses/${fragrance.house.slug}`}
          className="hover:text-stone-400 transition-colors"
        >
          {fragrance.house.name}
        </Link>
        <span>›</span>
        <span className="text-stone-500">{fragrance.name}</span>
      </nav>

      {/* Hero */}
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-2">
          {fragrance.house.name}
        </p>
        <h1 className="text-4xl font-light text-stone-100 mb-4">{fragrance.name}</h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-stone-500">
          {fragrance.year && <span>{fragrance.year}</span>}
          <span>{FAMILY_LABELS[fragrance.family] ?? fragrance.family}</span>
          <span>{CATEGORY_LABELS[fragrance.category] ?? fragrance.category}</span>
          <span>{PRICE_LABELS[fragrance.priceTier] ?? fragrance.priceTier}</span>
          {fragrance.priceRange && <span>{fragrance.priceRange}</span>}
          <span>{AVAILABILITY_LABELS[fragrance.availability] ?? fragrance.availability}</span>
          {fragrance.communityRating && (
            <span className="text-amber-500/70">
              ★ {fragrance.communityRating.toFixed(1)}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      {user && (
        <div className="mb-8">
          <CollectionWrapper
            fragranceId={fragrance.id}
            fragranceName={fragrance.name}
            initialEntry={initialEntry}
          />
        </div>
      )}

      {/* Two-column body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ── Main column ── */}
        <div className="lg:col-span-2 space-y-10">

          {/* Sentiment */}
          {(fragrance.sentiment || fragrance.uniqueChars) && (
            <section>
              {fragrance.sentiment && (
                <p className="text-stone-300 text-sm leading-relaxed mb-3">
                  {fragrance.sentiment}
                </p>
              )}
              {fragrance.uniqueChars && (
                <p className="text-stone-500 text-sm leading-relaxed italic">
                  {fragrance.uniqueChars}
                </p>
              )}
            </section>
          )}

          {/* Dual-register notes */}
          {(fragrance.beginnerNote || fragrance.collectorNote) && (
            <section>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-4">
                Editorial notes
              </p>
              <DualRegisterToggle
                beginnerNote={fragrance.beginnerNote}
                collectorNote={fragrance.collectorNote}
              />
            </section>
          )}

          {/* Notes pyramid */}
          {fragrance.notes.length > 0 && (
            <section>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-4">
                Composition
              </p>
              <NotesPyramid notes={fragrance.notes} />
            </section>
          )}

          {/* Performance */}
          {hasPerf && (
            <section>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-4">
                Performance
              </p>
              <div className="space-y-3 max-w-xs">
                <PerfBar label="Longevity" value={fragrance.longevity} />
                <PerfBar label="Projection" value={fragrance.projection} />
                <PerfBar label="Sillage" value={fragrance.sillage} />
              </div>
            </section>
          )}

          {/* Context tags */}
          {(fragrance.seasons.length > 0 || fragrance.occasions.length > 0 || fragrance.timesOfDay.length > 0) && (
            <section>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-4">
                When to wear
              </p>
              <div className="flex flex-wrap gap-2">
                {fragrance.seasons.map((s) => (
                  <Tag key={s.season} label={toLabel(s.season)} />
                ))}
                {fragrance.occasions.map((o) => (
                  <Tag key={o.occasion} label={toLabel(o.occasion)} />
                ))}
                {fragrance.timesOfDay.map((t) => (
                  <Tag key={t.timeOfDay} label={toLabel(t.timeOfDay)} />
                ))}
              </div>
            </section>
          )}

          {/* Market signals */}
          {hasMarket && (
            <section>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-3">
                Market signals
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {fragrance.massAppeal != null && (
                  <span className="text-xs text-stone-500">
                    Mass appeal:{" "}
                    <span className="text-stone-300">
                      {fragrance.massAppeal ? "Yes" : "No"}
                    </span>
                  </span>
                )}
                {fragrance.complimentFactor && (
                  <span className="text-xs text-stone-500">
                    Compliments:{" "}
                    <span className="text-stone-300">
                      {toLabel(fragrance.complimentFactor)}
                    </span>
                  </span>
                )}
                {fragrance.trend && (
                  <span className="text-xs text-stone-500">
                    Trend:{" "}
                    <span className="text-stone-300">{toLabel(fragrance.trend)}</span>
                  </span>
                )}
                {fragrance.hypeRating && (
                  <span className="text-xs text-stone-500">
                    Hype:{" "}
                    <span className="text-stone-300">
                      {toLabel(fragrance.hypeRating)}
                    </span>
                  </span>
                )}
              </div>
            </section>
          )}

          {/* Reviews */}
          <section>
            <ReviewList
              fragranceId={fragrance.id}
              fragranceName={fragrance.name}
              houseName={fragrance.house.name}
              currentUserId={user?.id}
            />
          </section>
        </div>

        {/* ── Sidebar ── */}
        <aside className="space-y-8">
          {/* Bottle image */}
          {fragrance.imageUrl && (
            <section className="flex justify-center">
              <div className="relative w-48 h-64">
                <Image
                  src={fragrance.imageUrl}
                  alt={`${fragrance.name} by ${fragrance.house.name}`}
                  fill
                  sizes="192px"
                  className="object-contain"
                  priority
                />
              </div>
            </section>
          )}

          {/* This is a clone of... */}
          {fragrance.isDupeOf.length > 0 && (
            <section>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-3">
                Clone / inspired by
              </p>
              <div className="space-y-2">
                {fragrance.isDupeOf.map((rel) => (
                  <div key={rel.id}>
                    <MiniCard
                      slug={rel.target.slug}
                      name={rel.target.name}
                      houseName={rel.target.house.name}
                      meta={SIMILARITY_LABELS[rel.similarity] ?? rel.similarity}
                    />
                    {rel.notes && (
                      <p className="text-[10px] text-stone-600 mt-1 px-1">{rel.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Known dupes of this */}
          {fragrance.hasDupes.length > 0 && (
            <section>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-3">
                Known dupes
              </p>
              <div className="space-y-2">
                {fragrance.hasDupes.map((rel) => (
                  <div key={rel.id}>
                    <MiniCard
                      slug={rel.source.slug}
                      name={rel.source.name}
                      houseName={rel.source.house.name}
                      meta={`${SIMILARITY_LABELS[rel.similarity] ?? rel.similarity}${rel.priceNote ? ` · ${rel.priceNote}` : ""}`}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Similar fragrances */}
          {similar.length > 0 && (
            <section>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-3">
                You may also like
              </p>
              <div className="space-y-2">
                {similar.map((s) => (
                  <MiniCard
                    key={s.id}
                    slug={s.slug}
                    name={s.name}
                    houseName={s.houseName}
                  />
                ))}
              </div>
            </section>
          )}

          {/* House link */}
          <section className="pt-2 border-t border-stone-800/60">
            <Link
              href={`/houses/${fragrance.house.slug}`}
              className="flex items-center justify-between group"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-0.5">
                  House
                </p>
                <p className="text-sm text-stone-300 group-hover:text-stone-100 transition-colors">
                  {fragrance.house.name}
                </p>
                {fragrance.house.country && (
                  <p className="text-[10px] text-stone-600">{fragrance.house.country}</p>
                )}
              </div>
              <span className="text-stone-700 group-hover:text-stone-400 transition-colors text-lg">
                →
              </span>
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}
