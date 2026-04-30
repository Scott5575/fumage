import type { Metadata } from "next";
import { CLONE_BRANDS } from "@/data/clone-brands";
import CloneSearch from "./CloneSearch";

export const metadata: Metadata = {
  title: "Clone Finder — Fumage",
  description:
    "Search 500 clone and inspired-by fragrances across 50 budget houses. Find the best dupe for any designer or niche fragrance.",
};

export default function ClonesPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500 mb-2">
          Clone Finder
        </p>
        <h1 className="text-2xl font-light text-stone-200">Budget Clones &amp; Dupes</h1>
      </div>
      <p className="text-stone-500 text-sm font-light max-w-xl leading-relaxed mb-10">
        500 clone and inspired-by fragrances across 50 dedicated budget houses — searchable by target,
        brand, or note.{" "}
        <span className="text-stone-600">
          {CLONE_BRANDS.length} fragrances · 50 houses
        </span>
      </p>
      <CloneSearch data={CLONE_BRANDS} />
    </main>
  );
}
