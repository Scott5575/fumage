import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResults from "./SearchResults";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: "Search — Fumage",
  description: "Search across 684 fragrances, 158 houses, and 358 notes on Fumage.",
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500 mb-8">
        Search
      </p>
      <Suspense>
        <SearchResults initialQuery={q} />
      </Suspense>
    </main>
  );
}
