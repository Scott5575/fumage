import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getWardrobe } from "@/lib/collections";
import {
  COLLECTION_STATUS_LABELS,
  COLLECTION_STATUS_ICONS,
  type CollectionStatus,
} from "@/types/ugc";

const FAMILY_LABELS: Record<string, string> = {
  FRESH: "Fresh", AROMATIC: "Aromatic", WOODY: "Woody", ORIENTAL: "Oriental",
  GOURMAND: "Gourmand", LEATHER: "Leather", CITRUS: "Citrus", CHYPRE: "Chypre",
};

const FAMILY_DOT: Record<string, string> = {
  FRESH: "bg-sky-400", AROMATIC: "bg-emerald-400", WOODY: "bg-amber-700",
  ORIENTAL: "bg-orange-500", GOURMAND: "bg-rose-400", LEATHER: "bg-stone-500",
  CITRUS: "bg-yellow-400", CHYPRE: "bg-lime-600",
};

const STATUS_TABS: { value: CollectionStatus | "ALL"; label: string }[] = [
  { value: "ALL",          label: "All"         },
  { value: "OWNED",        label: "Owned"       },
  { value: "WISHLISTED",   label: "Wishlist"    },
  { value: "TRIED",        label: "Tried"       },
  { value: "BLIND_BOUGHT", label: "Blind Bought"},
  { value: "DECANTED",     label: "Decanted"    },
];

type Props = {
  searchParams: Promise<{ status?: string }>;
};

export default async function ProfilePage({ searchParams }: Props) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in?message=Sign+in+to+view+your+wardrobe");
  }

  const { status } = await searchParams;
  const activeStatus = status && status !== "ALL" ? status : undefined;

  const { entries, total, stats } = await getWardrobe(user.id, {
    status: activeStatus,
    pageSize: 48,
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500 mb-2">
          Your Wardrobe
        </p>
        <h1 className="text-2xl font-light text-stone-200">{user.email}</h1>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-10">
        {[
          { label: "Owned",       count: stats.owned       },
          { label: "Wishlisted",  count: stats.wishlisted  },
          { label: "Tried",       count: stats.tried       },
          { label: "Blind Bought",count: stats.blindBought },
          { label: "Decanted",    count: stats.decanted    },
        ].map(({ label, count }) => (
          <div
            key={label}
            className="border border-stone-800 rounded p-4 text-center bg-stone-950/40"
          >
            <p className="text-2xl font-light text-stone-200 mb-1">{count}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-600">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 flex-wrap mb-8 border-b border-stone-800/50 pb-4">
        {STATUS_TABS.map((tab) => {
          const isActive =
            tab.value === "ALL"
              ? !status || status === "ALL"
              : status === tab.value;
          const href =
            tab.value === "ALL" ? "/profile" : `/profile?status=${tab.value}`;
          return (
            <Link
              key={tab.value}
              href={href}
              className={[
                "text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded transition-colors",
                isActive
                  ? "bg-amber-900/20 text-amber-400 border border-amber-700/40"
                  : "text-stone-500 hover:text-stone-300 border border-transparent",
              ].join(" ")}
            >
              {tab.label}
            </Link>
          );
        })}
        <span className="ml-auto text-[10px] text-stone-600">
          {total.toLocaleString()} fragrance{total !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Entry grid */}
      {entries.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-stone-600 text-sm mb-4">Nothing here yet.</p>
          <Link
            href="/fragrances"
            className="text-[10px] uppercase tracking-[0.2em] text-amber-500/70 hover:text-amber-400 transition-colors"
          >
            Browse the catalog →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {entries.map((entry) => (
            <Link
              key={entry.id}
              href={`/fragrances/${entry.fragrance.slug}`}
              className="group border border-stone-800 hover:border-stone-600 rounded p-4 transition-colors bg-stone-950/40"
            >
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-amber-600/60 text-xs">
                  {COLLECTION_STATUS_ICONS[entry.status]}
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-amber-500/60">
                  {COLLECTION_STATUS_LABELS[entry.status]}
                </span>
                {entry.pinned && (
                  <span className="ml-auto text-[10px] text-stone-600">Pinned</span>
                )}
              </div>

              <p className="text-[10px] uppercase tracking-[0.15em] text-stone-500 mb-1 truncate">
                {entry.fragrance.house.name}
              </p>
              <p className="text-stone-200 text-sm font-light leading-snug mb-3 line-clamp-2">
                {entry.fragrance.name}
              </p>

              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full ${
                    FAMILY_DOT[entry.fragrance.family] ?? "bg-stone-600"
                  }`}
                />
                <span className="text-[10px] text-stone-500">
                  {FAMILY_LABELS[entry.fragrance.family] ?? entry.fragrance.family}
                </span>
              </div>

              {entry.personalRating != null && (
                <p className="text-[10px] text-amber-500/70 mt-2">
                  Your rating: {entry.personalRating.toFixed(1)}
                </p>
              )}
              {entry.personalNote && (
                <p className="text-[10px] text-stone-600 mt-1 line-clamp-2">
                  {entry.personalNote}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
