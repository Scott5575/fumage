"use client";

import { useState } from "react";
import type { CollectionEntry, CollectionStatus } from "@/types/ugc";
import { COLLECTION_STATUS_LABELS, COLLECTION_STATUS_ICONS } from "@/types/ugc";
import { StarRating } from "./StarRating";

const STATUS_OPTIONS: CollectionStatus[] = [
  "OWNED", "WISHLISTED", "TRIED", "BLIND_BOUGHT", "DECANTED", "SOLD",
];

interface WardrobeEditModalProps {
  entry: CollectionEntry;
  onSave: (updated: CollectionEntry) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function WardrobeEditModal({
  entry,
  onSave,
  onDelete,
  onClose,
}: WardrobeEditModalProps) {
  const [status,     setStatus]     = useState<CollectionStatus>(entry.status);
  const [rating,     setRating]     = useState<number>(entry.personalRating ?? 0);
  const [note,       setNote]       = useState<string>(entry.personalNote ?? "");
  const [bottleSize, setBottleSize] = useState<string>(entry.bottleSize ?? "");
  const [pinned,     setPinned]     = useState<boolean>(entry.pinned);

  const [saving,        setSaving]        = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting,      setDeleting]      = useState(false);
  const [error,         setError]         = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/collections/${entry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          personalRating: rating > 0 ? rating : null,
          personalNote:   note.trim() || null,
          bottleSize:     bottleSize.trim() || null,
          pinned,
        }),
      });
      const json = await res.json();
      if (json.ok) {
        onSave(json.data);
        onClose();
      } else {
        setError(json.error ?? "Could not save changes");
      }
    } catch {
      setError("Network error — try again");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/collections/${entry.id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.ok) {
        onDelete(entry.id);
        onClose();
      } else {
        setError(json.error ?? "Could not remove entry");
      }
    } catch {
      setError("Network error — try again");
    } finally {
      setDeleting(false);
    }
  }

  const busy = saving || deleting;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="w-full max-w-sm bg-[#100d09] border border-stone-800 rounded-lg shadow-2xl shadow-black/60">

          {/* Header */}
          <div className="px-5 py-4 border-b border-stone-800/60">
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-0.5">
              {entry.fragrance.house.name}
            </p>
            <h2 className="text-stone-200 font-light text-sm leading-snug">
              {entry.fragrance.name}
            </h2>
          </div>

          {/* Form body */}
          <div className="px-5 py-4 space-y-4">

            {/* Status */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-stone-500 mb-1.5">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as CollectionStatus)}
                className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-700/60"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {COLLECTION_STATUS_ICONS[s]}{"  "}{COLLECTION_STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-stone-500 mb-1.5">
                Your rating
              </label>
              <div className="flex items-center gap-3">
                <StarRating value={rating} onChange={setRating} size="lg" />
                {rating > 0 && (
                  <button
                    type="button"
                    onClick={() => setRating(0)}
                    className="text-[10px] text-stone-600 hover:text-stone-400 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Personal note */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] text-stone-500 mb-1.5">
                Personal note
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Your thoughts…"
                className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-xs text-stone-200 placeholder-stone-700 resize-none focus:outline-none focus:border-amber-700/60"
              />
            </div>

            {/* Bottle size + pinned */}
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="block text-[10px] uppercase tracking-[0.15em] text-stone-500 mb-1.5">
                  Bottle size
                </label>
                <input
                  type="text"
                  value={bottleSize}
                  onChange={(e) => setBottleSize(e.target.value)}
                  placeholder="e.g. 100ml"
                  className="w-full bg-stone-950 border border-stone-700 rounded px-3 py-2 text-xs text-stone-200 placeholder-stone-700 focus:outline-none focus:border-amber-700/60"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer pb-2">
                <input
                  type="checkbox"
                  checked={pinned}
                  onChange={(e) => setPinned(e.target.checked)}
                  className="accent-amber-600"
                />
                <span className="text-[10px] uppercase tracking-[0.15em] text-stone-500">
                  Pinned
                </span>
              </label>
            </div>

            {error && (
              <p className="text-[10px] text-rose-400">{error}</p>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-stone-800/60 flex items-center justify-between">
            <button
              type="button"
              onClick={handleDelete}
              disabled={busy}
              className={[
                "text-[10px] uppercase tracking-[0.15em] transition-colors disabled:opacity-40",
                confirmDelete
                  ? "text-rose-400 hover:text-rose-300"
                  : "text-stone-600 hover:text-rose-400",
              ].join(" ")}
            >
              {deleting ? "Removing…" : confirmDelete ? "Confirm remove" : "Remove"}
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={busy}
                className="text-[10px] uppercase tracking-[0.15em] text-stone-500 hover:text-stone-300 transition-colors disabled:opacity-40"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={busy}
                className="text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 bg-amber-900/20 text-amber-400 border border-amber-700/40 rounded hover:bg-amber-900/30 transition-colors disabled:opacity-40"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
