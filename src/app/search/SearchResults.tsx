"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const FAMILY_LABELS: Record<string, string> = {
  FRESH: "Fresh", AROMATIC: "Aromatic", WOODY: "Woody", ORIENTAL: "Oriental",
  GOURMAND: "Gourmand", LEATHER: "Leather", CITRUS: "Citrus", CHYPRE: "Chypre",
};

const FAMILY_DOT: Record<string, string> = {
  FRESH: "bg-sky-400", AROMATIC: "bg-emerald-400", WOODY: "bg-amber-700",
  ORIENTAL: "bg-orange-500", GOURMAND: "bg-rose-400", LEATHER: "bg-stone-500",
  CITRUS: "bg-yellow-400", CHYPRE: "bg-lime-600",
};

const PRICE_LABELS: Record<string, string> = {
  BUDGET: "<$30", ACCESSIBLE: "$30–80", MID: "$80–200", PREMIUM: "$200–400", ULTRA: "$400+",
};

interface SearchHit {
  id: string;
  slug: string;
  name: string;
  houseName: string;
  family: string;
  priceTier: string;
  popularityScore: number | null;
}

export default function SearchResults({ initialQuery }: { initialQuery: string }) {
  const [query,   setQuery]   = useState(initialQuery);
  const [hits,    setHits]    = useState<SearchHit[]>([]);
  const [total,   setTotal]   = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setHits([]);
      setTotal(null);
      return;
    }
    setLoading(true);
    try {
      const res  = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=24`);
      const data = await res.json();
      setHits(data.hits ?? []);
      setTotal(data.estimatedTotalHits ?? 0);
    } catch {
      // silent — search route unavailable
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    runSearch(initialQuery);
  }, [initialQuery, runSearch]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  function handleChange(value: string) {
    setQuery(value);
    const url = value.trim() ? `/search?q=${encodeURIComponent(value)}` : "/search";
    window.history.replaceState(null, "", url);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => runSearch(value), 280);
  }

  return (
    <div>
      {/* Search input */}
      <div className="mb-10">
        <input
          type="search"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search fragrances, houses, notes…"
          autoFocus
          className="w-full bg-transparent border-b border-stone-700 focus:border-amber-500/50
                     text-stone-200 text-2xl font-light outline-none transition-colors
                     placeholder:text-stone-700 pb-3"
        />
        <div className="h-5 mt-2">
          {query.trim() && total !== null && (
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-600">
              {loading
                ? "Searching…"
                : `${total.toLocaleString()} result${total !== 1 ? "s" : ""}`}
            </p>
          )}
          {loading && !total && (
            <p className="text-[10px] uppercase tracking-[0.15em] text-stone-700">Searching…</p>
          )}
        </div>
      </div>

      {/* Results grid */}
      {hits.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {hits.map((hit) => (
            <Link
              key={hit.id}
              href={`/fragrances/${hit.slug}`}
              className="group border border-stone-800 hover:border-stone-600 rounded p-4 transition-colors bg-stone-950/40"
            >
              <p className="text-[10px] uppercase tracking-[0.15em] text-stone-500 mb-1 truncate">
                {hit.houseName}
              </p>
              <p className="text-stone-200 text-sm font-light leading-snug mb-3 line-clamp-2">
                {hit.name}
              </p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[10px] text-stone-500">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      FAMILY_DOT[hit.family] ?? "bg-stone-600"
                    }`}
                  />
                  {FAMILY_LABELS[hit.family] ?? hit.family}
                </span>
                <span className="text-[10px] text-stone-600">
                  {PRICE_LABELS[hit.priceTier] ?? hit.priceTier}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty / idle states */}
      {!loading && query.trim() && hits.length === 0 && total !== null && (
        <p className="text-stone-600 text-sm">
          No results for &ldquo;{query}&rdquo;.
        </p>
      )}
      {!query.trim() && (
        <p className="text-stone-700 text-sm">
          Type to search fragrances, houses, or notes.
        </p>
      )}
    </div>
  );
}
