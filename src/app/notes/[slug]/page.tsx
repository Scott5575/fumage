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

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NoteDetailPage({ params }: Props) {
  const { slug } = await params;

  const note = await prisma.note.findUnique({
    where: { slug },
    include: {
      fragrances: {
        include: {
          fragrance: {
            select: {
              id: true,
              slug: true,
              name: true,
              family: true,
              priceTier: true,
              popularityScore: true,
              house: { select: { name: true } },
            },
          },
        },
        orderBy: { fragrance: { popularityScore: "desc" } },
      },
    },
  });

  if (!note) notFound();

  // Group by position, cap each group at 24
  const grouped = (["TOP", "MIDDLE", "BASE", "ACCORD"] as NotePosition[])
    .map((pos) => ({
      pos,
      items: note.fragrances
        .filter((fn) => fn.position === pos)
        .slice(0, 24),
    }))
    .filter((g) => g.items.length > 0);

  const totalCount = note.fragrances.length;

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

      {/* Fragrance groups by position */}
      <div className="space-y-12">
        {grouped.map(({ pos, items }) => (
          <section key={pos}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-6">
              {POS_LABELS[pos]}
              <span className="text-stone-700 ml-2">
                ({note.fragrances.filter((fn) => fn.position === pos).length})
              </span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {items.map(({ fragrance: f }) => (
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
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full ${
                          FAMILY_DOT[f.family] ?? "bg-stone-600"
                        }`}
                      />
                      {FAMILY_LABELS[f.family] ?? f.family}
                    </span>
                    <span className="text-[10px] text-stone-600">
                      {PRICE_LABELS[f.priceTier] ?? f.priceTier}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
