import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { NotePosition } from "@prisma/client";

const FAMILY_DOT: Record<string, string> = {
  FRESH: "bg-sky-400", AROMATIC: "bg-emerald-400", WOODY: "bg-amber-700",
  ORIENTAL: "bg-orange-500", GOURMAND: "bg-rose-400", LEATHER: "bg-stone-500",
  CITRUS: "bg-yellow-400", CHYPRE: "bg-lime-600",
};

const FAMILY_LABELS: Record<string, string> = {
  FRESH: "Fresh", AROMATIC: "Aromatic", WOODY: "Woody", ORIENTAL: "Oriental",
  GOURMAND: "Gourmand", LEATHER: "Leather", CITRUS: "Citrus", CHYPRE: "Chypre",
};

const PRICE_LABELS: Record<string, string> = {
  BUDGET: "<$30", ACCESSIBLE: "$30–80", MID: "$80–200", PREMIUM: "$200–400", ULTRA: "$400+",
};

const POS_LABELS: Record<NotePosition, string> = {
  TOP: "Top notes", MIDDLE: "Heart notes", BASE: "Base notes", ACCORD: "Accords",
};

const VALID_POSITIONS = new Set<string>(["TOP", "MIDDLE", "BASE", "ACCORD"]);
const OVERVIEW_CAP = 24;
const PAGE_SIZE    = 48;

type Props = {
  params:       Promise<{ slug: string }>;
  searchParams: Promise<{ pos?: string; page?: string }>;
};

function FragranceCard({ f }: {
  f: { id: string; slug: string; name: string; family: string; priceTier: string; house: { name: string } };
}) {
  return (
    <Link
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
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${FAMILY_DOT[f.family] ?? "bg-stone-600"}`} />
          {FAMILY_LABELS[f.family] ?? f.family}
        </span>
        <span className="text-[10px] text-stone-600">
          {PRICE_LABELS[f.priceTier] ?? f.priceTier}
        </span>
      </div>
    </Link>
  );
}

export default async function NoteDetailPage({ params, searchParams }: Props) {
  const { slug }            = await params;
  const { pos, page: pageQ } = await searchParams;

  const activePos  = pos && VALID_POSITIONS.has(pos) ? (pos as NotePosition) : null;
  const currentPage = Math.max(1, parseInt(pageQ ?? "1", 10) || 1);

  const note = await prisma.note.findUnique({
    where: { slug },
    include: {
      fragrances: {
        include: {
          fragrance: {
            select: {
              id: true, slug: true, name: true, family: true,
              priceTier: true, popularityScore: true,
              house: { select: { name: true } },
            },
          },
        },
        orderBy: { fragrance: { popularityScore: "desc" } },
      },
    },
  });

  if (!note) notFound();

  const totalCount = note.fragrances.length;

  // ── Position drill-down ───────────────────────────────────────────────────
  if (activePos) {
    const posItems   = note.fragrances.filter((fn) => fn.position === activePos);
    const posTotal   = posItems.length;
    const totalPages = Math.ceil(posTotal / PAGE_SIZE);
    const page       = Math.min(currentPage, totalPages || 1);
    const items      = posItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const baseHref = `/notes/${slug}?pos=${activePos}`;

    return (
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href={`/notes/${slug}`}
            className="text-[10px] uppercase tracking-[0.2em] text-stone-600 hover:text-stone-400 transition-colors"
          >
            ← {note.name}
          </Link>
          <h1 className="text-3xl font-light text-stone-200 mt-4 mb-2">
            {note.name}
            <span className="text-stone-600 ml-3 text-xl font-light">
              {POS_LABELS[activePos]}
            </span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.15em] text-stone-600">
            {posTotal.toLocaleString()} fragrance{posTotal !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
          {items.map(({ fragrance: f }) => (
            <FragranceCard key={f.id} f={f} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-stone-800/50 pt-6">
            {page > 1 ? (
              <Link
                href={`${baseHref}&page=${page - 1}`}
                className="text-[10px] uppercase tracking-[0.2em] text-stone-500 hover:text-stone-300 transition-colors"
              >
                ← Previous
              </Link>
            ) : <span />}

            <p className="text-[10px] text-stone-600">
              Page {page} of {totalPages}
            </p>

            {page < totalPages ? (
              <Link
                href={`${baseHref}&page=${page + 1}`}
                className="text-[10px] uppercase tracking-[0.2em] text-stone-500 hover:text-stone-300 transition-colors"
              >
                Next →
              </Link>
            ) : <span />}
          </div>
        )}
      </main>
    );
  }

  // ── Overview (grouped by position, capped at OVERVIEW_CAP) ───────────────
  const grouped = (["TOP", "MIDDLE", "BASE", "ACCORD"] as NotePosition[])
    .map((p) => ({
      pos:   p,
      items: note.fragrances.filter((fn) => fn.position === p).slice(0, OVERVIEW_CAP),
      total: note.fragrances.filter((fn) => fn.position === p).length,
    }))
    .filter((g) => g.items.length > 0);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/notes"
          className="text-[10px] uppercase tracking-[0.2em] text-stone-600 hover:text-stone-400 transition-colors"
        >
          ← Notes
        </Link>
        <h1 className="text-3xl font-light text-stone-200 mt-4 mb-2">
          {note.name}
        </h1>
        <p className="text-[10px] uppercase tracking-[0.15em] text-stone-600">
          {totalCount.toLocaleString()} fragrance{totalCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Groups */}
      <div className="space-y-12">
        {grouped.map(({ pos: p, items, total }) => (
          <section key={p}>
            <div className="flex items-baseline justify-between mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500">
                {POS_LABELS[p]}
                <span className="text-stone-700 ml-2">({total})</span>
              </p>
              {total > OVERVIEW_CAP && (
                <Link
                  href={`/notes/${slug}?pos=${p}`}
                  className="text-[10px] uppercase tracking-[0.15em] text-stone-600 hover:text-amber-500 transition-colors"
                >
                  View all {total} →
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {items.map(({ fragrance: f }) => (
                <FragranceCard key={f.id} f={f} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
