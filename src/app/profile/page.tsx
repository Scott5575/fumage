import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getWardrobe } from "@/lib/collections";
import { type CollectionStatus } from "@/types/ugc";
import { WardrobeGrid } from "@/components/collection/WardrobeGrid";

const STATUS_TABS: { value: CollectionStatus | "ALL"; label: string }[] = [
  { value: "ALL",          label: "All"         },
  { value: "OWNED",        label: "Owned"       },
  { value: "WISHLISTED",   label: "Wishlist"    },
  { value: "TRIED",        label: "Tried"       },
  { value: "BLIND_BOUGHT", label: "Blind Bought"},
  { value: "DECANTED",     label: "Decanted"    },
];

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "pinned_recent", label: "Pinned" },
  { value: "name",          label: "Name"   },
  { value: "rating",        label: "Rating" },
  { value: "date_added",    label: "Recent" },
];

const VALID_SORTS = new Set(SORT_OPTIONS.map((s) => s.value));

type Props = {
  searchParams: Promise<{ status?: string; sort?: string }>;
};

export const metadata: Metadata = {
  title: "Your Wardrobe — Fumage",
  description: "Manage your fragrance collection, personal ratings, and reviews.",
};

export default async function ProfilePage({ searchParams }: Props) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in?message=Sign+in+to+view+your+wardrobe");
  }

  const { status, sort } = await searchParams;
  const activeStatus = status && status !== "ALL" ? status : undefined;
  const activeSort = sort && VALID_SORTS.has(sort) ? sort : "pinned_recent";

  const buildUrl = (s: string, st: string | undefined) => {
    const params = new URLSearchParams();
    if (st) params.set("status", st);
    if (s !== "pinned_recent") params.set("sort", s);
    const qs = params.toString();
    return `/profile${qs ? `?${qs}` : ""}`;
  };

  const { entries, total, stats } = await getWardrobe(user.id, {
    status: activeStatus,
    sort: activeSort as "pinned_recent" | "name" | "rating" | "date_added",
    pageSize: 48,
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500 mb-2">
          Your Wardrobe
        </p>
        <h1 className="text-2xl font-light text-stone-200">
          {user.name ?? user.email.split("@")[0]}
        </h1>
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
          const href = buildUrl(
            activeSort,
            tab.value === "ALL" ? undefined : tab.value
          );
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

      {/* Sort row */}
      <div className="flex items-center gap-1 mb-8">
        <span className="text-[10px] uppercase tracking-[0.15em] text-stone-600 mr-2">
          Sort
        </span>
        {SORT_OPTIONS.map((opt) => {
          const isActive = activeSort === opt.value;
          return (
            <Link
              key={opt.value}
              href={buildUrl(opt.value, activeStatus)}
              className={[
                "text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded transition-colors",
                isActive
                  ? "bg-amber-900/20 text-amber-400 border border-amber-700/40"
                  : "text-stone-500 hover:text-stone-300 border border-transparent",
              ].join(" ")}
            >
              {opt.label}
            </Link>
          );
        })}
      </div>

      {/* Entry grid */}
      <WardrobeGrid initialEntries={entries} />
    </main>
  );
}
