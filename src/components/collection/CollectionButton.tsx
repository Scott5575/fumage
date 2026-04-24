/**
 * src/components/collections/CollectionButton.tsx
 *
 * The "add to collection" button on a fragrance card or detail page.
 * Shows a dropdown to choose status on first add, and a status badge
 * with a change menu on subsequent visits.
 *
 * Usage:
 *   <CollectionButton
 *     fragranceId={f.id}
 *     fragranceName={f.name}
 *     currentEntry={userEntry}   // from wardrobe API, null if not in collection
 *     onUpdate={(entry) => ...}  // called after add/update/remove
 *   />
 */

"use client";

import { useState, useRef, useEffect } from "react";
import type { CollectionEntry, CollectionStatus } from "@/types/ugc";

const STATUSES: { value: CollectionStatus; label: string; icon: string }[] = [
  { value: "OWNED",        label: "In my collection",  icon: "✦" },
  { value: "WISHLISTED",   label: "On my wishlist",     icon: "◇" },
  { value: "TRIED",        label: "I've tried it",      icon: "◎" },
  { value: "BLIND_BOUGHT", label: "Blind bought",       icon: "⬡" },
  { value: "DECANTED",     label: "I have a decant",    icon: "⬤" },
];

interface CollectionButtonProps {
  fragranceId: string;
  fragranceName: string;
  currentEntry: CollectionEntry | null;
  onUpdate: (entry: CollectionEntry | null) => void;
  compact?: boolean;   // icon-only mode for cards
}

export function CollectionButton({
  fragranceId,
  currentEntry,
  onUpdate,
  compact = false,
}: CollectionButtonProps) {
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast,   setToast]   = useState<string | null>(null);
  const menuRef               = useRef<HTMLDivElement>(null);
  const toastTimer            = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(message: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  async function handleSelect(status: CollectionStatus) {
    setLoading(true);
    setOpen(false);

    try {
      if (!currentEntry) {
        const res = await fetch("/api/collections", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fragranceId, status }),
        });
        const json = await res.json();
        if (json.ok) onUpdate(json.data);
        else showToast(json.error ?? "Could not add to wardrobe");
      } else if (currentEntry.status !== status) {
        const res = await fetch(`/api/collections/${currentEntry.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        const json = await res.json();
        if (json.ok) onUpdate(json.data);
        else showToast(json.error ?? "Could not update entry");
      }
    } catch {
      showToast("Network error — try again");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove() {
    if (!currentEntry) return;
    setLoading(true);
    setOpen(false);

    try {
      const res = await fetch(`/api/collections/${currentEntry.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.ok) onUpdate(null);
      else showToast(json.error ?? "Could not remove entry");
    } catch {
      showToast("Network error — try again");
    } finally {
      setLoading(false);
    }
  }

  const activeStatus = STATUSES.find((s) => s.value === currentEntry?.status);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={loading}
        aria-expanded={open}
        className={[
          "flex items-center gap-1.5 transition-colors disabled:opacity-40",
          compact
            ? "w-7 h-7 justify-center border border-amber-900/30 rounded hover:border-amber-700/50"
            : "px-3 py-1.5 text-xs border rounded uppercase tracking-wide",
          currentEntry
            ? "border-amber-700/50 text-amber-400 bg-amber-900/10 hover:bg-amber-900/20"
            : "border-amber-900/30 text-stone-500 hover:border-amber-800/50 hover:text-stone-300",
        ].join(" ")}
      >
        {loading ? (
          <span className="text-[10px]">…</span>
        ) : currentEntry ? (
          <>
            <span>{activeStatus?.icon ?? "✦"}</span>
            {!compact && <span>{activeStatus?.label ?? currentEntry.status}</span>}
          </>
        ) : (
          <>
            <span>+</span>
            {!compact && <span>Add to wardrobe</span>}
          </>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[180px]
                        bg-[#100d09] border border-amber-900/20 rounded-lg
                        shadow-xl shadow-black/50 overflow-hidden">
          <div className="px-3 py-2 border-b border-amber-900/10">
            <p className="text-[10px] uppercase tracking-[0.15em] text-amber-500/40">
              Add to wardrobe
            </p>
          </div>

          {STATUSES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => handleSelect(s.value)}
              className={[
                "w-full flex items-center gap-3 px-3 py-2.5 text-xs text-left transition-colors",
                currentEntry?.status === s.value
                  ? "text-amber-400 bg-amber-900/10"
                  : "text-stone-400 hover:text-stone-200 hover:bg-amber-900/10",
              ].join(" ")}
            >
              <span className="text-amber-600/60 w-4">{s.icon}</span>
              <span>{s.label}</span>
              {currentEntry?.status === s.value && (
                <span className="ml-auto text-amber-500/50 text-[10px]">✓</span>
              )}
            </button>
          ))}

          {currentEntry && (
            <>
              <div className="h-px bg-amber-900/10 mx-3" />
              <button
                type="button"
                onClick={handleRemove}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs
                           text-stone-600 hover:text-rose-400 transition-colors"
              >
                <span className="w-4 text-center">✕</span>
                <span>Remove from wardrobe</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Error toast */}
      {toast && (
        <div className="absolute left-0 top-full mt-1 z-50 whitespace-nowrap
                        bg-[#100d09] border border-rose-900/40 rounded
                        px-3 py-1.5 text-[10px] text-rose-400 shadow-lg shadow-black/40">
          {toast}
        </div>
      )}
    </div>
  );
}
