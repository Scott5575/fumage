"use client";

import { useState, useMemo } from "react";
import type { CloneFrag } from "@/data/clone-brands";

const GENDER_FILTERS = ["All", "Masculine", "Unisex"] as const;
type GenderFilter = (typeof GENDER_FILTERS)[number];

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-amber-500/20 text-amber-300 rounded-sm">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function CloneSearch({ data }: { data: CloneFrag[] }) {
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState<GenderFilter>("All");
  const [brand, setBrand] = useState("All");

  const brands = useMemo(
    () => ["All", ...Array.from(new Set(data.map((d) => d.brand))).sort()],
    [data]
  );

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return data.filter((row) => {
      if (gender !== "All" && row.gender !== gender) return false;
      if (brand !== "All" && row.brand !== brand) return false;
      if (!q) return true;
      return (
        row.name.toLowerCase().includes(q) ||
        row.brand.toLowerCase().includes(q) ||
        row.inspiredBy.toLowerCase().includes(q) ||
        row.notes.toLowerCase().includes(q)
      );
    });
  }, [data, query, gender, brand]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Text search */}
        <div className="flex-1 min-w-[220px]">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fragrance, target, brand, notes…"
            className="w-full bg-transparent border-b border-stone-700 focus:border-amber-500/50
                       text-stone-200 text-sm font-light outline-none transition-colors
                       placeholder:text-stone-700 pb-2"
          />
        </div>

        {/* Gender pills */}
        <div className="flex items-end gap-1.5">
          {GENDER_FILTERS.map((g) => (
            <button
              key={g}
              onClick={() => setGender(g)}
              className={`text-[10px] uppercase tracking-[0.15em] border rounded px-2.5 py-1 transition-colors ${
                gender === g
                  ? "text-amber-400 border-amber-700/60 bg-amber-900/20"
                  : "text-stone-500 border-stone-800 hover:border-stone-600 hover:text-stone-300"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Brand dropdown */}
        <div className="flex items-end">
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="bg-stone-950 border border-stone-800 rounded text-stone-400 text-[10px]
                       uppercase tracking-[0.1em] px-2.5 py-1 outline-none
                       focus:border-stone-600 transition-colors cursor-pointer"
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b === "All" ? "All brands" : b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result count */}
      <p className="text-[10px] uppercase tracking-[0.15em] text-stone-600 mb-6">
        {results.length.toLocaleString()} result{results.length !== 1 ? "s" : ""}
      </p>

      {/* Cards */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {results.map((row, i) => (
            <div
              key={i}
              className="border border-stone-800 rounded p-4 bg-stone-950/40"
            >
              {/* Brand + gender */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <a
                  href={row.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] uppercase tracking-[0.12em] text-stone-500 hover:text-stone-300 transition-colors"
                >
                  {highlight(row.brand, query)}
                </a>
                <span
                  className={`shrink-0 text-[9px] uppercase tracking-[0.12em] border rounded px-2 py-0.5 ${
                    row.gender === "Masculine"
                      ? "text-sky-400 border-sky-700/40 bg-sky-900/10"
                      : "text-emerald-400 border-emerald-700/40 bg-emerald-900/10"
                  }`}
                >
                  {row.gender}
                </span>
              </div>

              {/* Fragrance name */}
              <p className="text-stone-200 text-sm font-light leading-snug mb-1">
                {highlight(row.name, query)}
              </p>

              {/* Inspired by */}
              <p className="text-[11px] text-amber-600/80 mb-3">
                ↳ {highlight(row.inspiredBy, query)}
              </p>

              {/* Notes */}
              {row.notes && (
                <p className="text-[10px] text-stone-600 leading-relaxed mb-2 line-clamp-2">
                  {highlight(row.notes, query)}
                </p>
              )}

              {/* Review signal */}
              {row.reviewSignal && (
                <p className="text-[10px] text-stone-700 leading-relaxed border-t border-stone-800/60 pt-2">
                  {row.reviewSignal}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-stone-600 text-sm">
          No clones match your filters.
        </p>
      )}
    </div>
  );
}
