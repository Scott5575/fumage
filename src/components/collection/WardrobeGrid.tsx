"use client";

import { useState } from "react";
import Link from "next/link";
import type { CollectionEntry } from "@/types/ugc";
import { COLLECTION_STATUS_LABELS, COLLECTION_STATUS_ICONS } from "@/types/ugc";
import { WardrobeEditModal } from "./WardrobeEditModal";

const FAMILY_LABELS: Record<string, string> = {
  FRESH:    "Fresh",    AROMATIC: "Aromatic", WOODY:    "Woody",
  ORIENTAL: "Oriental", GOURMAND: "Gourmand", LEATHER:  "Leather",
  CITRUS:   "Citrus",   CHYPRE:   "Chypre",
};

const FAMILY_DOT: Record<string, string> = {
  FRESH:    "bg-sky-400",   AROMATIC: "bg-emerald-400", WOODY:    "bg-amber-700",
  ORIENTAL: "bg-orange-500",GOURMAND: "bg-rose-400",    LEATHER:  "bg-stone-500",
  CITRUS:   "bg-yellow-400",CHYPRE:   "bg-lime-600",
};

interface WardrobeGridProps {
  initialEntries: CollectionEntry[];
}

export function WardrobeGrid({ initialEntries }: WardrobeGridProps) {
  const [entries, setEntries] = useState<CollectionEntry[]>(initialEntries);
  const [editing, setEditing] = useState<CollectionEntry | null>(null);

  function handleSave(updated: CollectionEntry) {
    setEntries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  }

  function handleDelete(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-stone-600 text-sm mb-4">Nothing here yet.</p>
        <Link
          href="/fragrances"
          className="text-[10px] uppercase tracking-[0.2em] text-amber-500/70 hover:text-amber-400 transition-colors"
        >
          Browse the catalog →
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="group relative border border-stone-800 hover:border-stone-600 rounded p-4 transition-colors bg-stone-950/40"
          >
            {/* Edit button — visible on hover */}
            <button
              type="button"
              onClick={() => setEditing(entry)}
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity
                         text-[10px] uppercase tracking-[0.1em] text-stone-600 hover:text-stone-300
                         px-1.5 py-0.5 border border-stone-800 hover:border-stone-600 rounded"
              aria-label={`Edit ${entry.fragrance.name}`}
            >
              Edit
            </button>

            <Link href={`/fragrances/${entry.fragrance.slug}`} className="block">
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
          </div>
        ))}
      </div>

      {editing && (
        <WardrobeEditModal
          entry={editing}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}
