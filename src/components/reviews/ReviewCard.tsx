/**
 * src/components/reviews/ReviewCard.tsx
 *
 * Single review display. Handles helpful/not-helpful voting with optimistic UI.
 * Shows edit/delete controls when currentUserId matches author.
 */

"use client";

import { useState } from "react";
import { StarRating } from "@/components/collection/StarRating";
import { PerformanceRater } from "@/components/collection/PerformanceRater";
import type { Review } from "@/types/ugc";

const SEASON_LABELS: Record<string, string> = {
  SPRING: "Spring", SUMMER: "Summer", FALL: "Fall", WINTER: "Winter",
};
const OCCASION_LABELS: Record<string, string> = {
  CASUAL: "Casual", BUSINESS: "Business", DATE: "Date",
  SPECIAL: "Special", NIGHT_OUT: "Night Out",
};

interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
}

export function ReviewCard({
  review,
  currentUserId,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  const isAuthor = currentUserId === review.user.id;

  // Optimistic vote state
  const [vote, setVote]           = useState(review.userVote);
  const [helpful, setHelpful]     = useState(review.helpfulCount);
  const [notHelpful, setNotHelpful] = useState(review.notHelpfulCount);
  const [voting, setVoting]       = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting]           = useState(false);

  const hasPerf = review.longevityRating || review.projectionRating || review.valueRating;
  const hasTags = review.seasons.length > 0 || review.occasions.length > 0;

  async function handleVote(helpful: boolean) {
    if (isAuthor || voting) return;
    setVoting(true);

    // Optimistic update
    const prev = vote;
    const prevH = helpful, prevNH = notHelpful;

    if (vote === (helpful ? "helpful" : "not_helpful")) {
      // Toggle off
      setVote(null);
      setHelpful((h) => helpful ? h - 1 : h);
      setNotHelpful((nh) => !helpful ? nh - 1 : nh);
    } else {
      // New vote (or flip)
      if (vote === "helpful") setHelpful((h) => h - 1);
      if (vote === "not_helpful") setNotHelpful((nh) => nh - 1);
      setVote(helpful ? "helpful" : "not_helpful");
      if (helpful) setHelpful((h) => h + 1);
      else         setNotHelpful((nh) => nh + 1);
    }

    try {
      const res = await fetch(`/api/reviews/${review.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ helpful }),
      });
      const json = await res.json();
      if (json.ok) {
        setVote(json.data.userVote);
        setHelpful(json.data.helpfulCount);
        setNotHelpful(json.data.notHelpfulCount);
      } else {
        // Revert
        setVote(prev);
        setHelpful(prevH as any);
        setNotHelpful(prevNH as any);
      }
    } catch {
      setVote(prev);
    } finally {
      setVoting(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/reviews/${review.id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.ok) onDelete?.(review.id);
    } catch {
      /* silent */
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  return (
    <article className="border border-amber-900/15 rounded-lg p-5 space-y-4 bg-[#0f0c08]/60">
      {/* Author + rating */}
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar placeholder */}
          <div className="w-8 h-8 rounded-full bg-amber-900/30 border border-amber-800/20
                          flex items-center justify-center text-amber-500/60 text-xs shrink-0">
            {review.user.displayName?.[0]?.toUpperCase()
              ?? review.user.username[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-stone-200 text-sm font-medium truncate">
              {review.user.displayName ?? review.user.username}
            </p>
            <p className="text-stone-600 text-xs">
              {new Date(review.createdAt).toLocaleDateString("en-US", {
                year: "numeric", month: "short", day: "numeric",
              })}
              {review.bottleOwned && (
                <span className="ml-2 text-amber-700/60">✦ owns bottle</span>
              )}
            </p>
          </div>
        </div>

        <StarRating value={review.rating} size="sm" showValue />
      </header>

      {/* Title */}
      {review.title && (
        <p className="text-stone-100 font-medium text-sm leading-snug">
          {review.title}
        </p>
      )}

      {/* Body */}
      <p className="text-stone-400 text-sm leading-relaxed whitespace-pre-line">
        {review.body}
      </p>

      {/* Performance bars */}
      {hasPerf && (
        <PerformanceRater
          longevity={review.longevityRating}
          projection={review.projectionRating}
          value={review.valueRating}
        />
      )}

      {/* Tags */}
      {hasTags && (
        <div className="flex flex-wrap gap-1.5">
          {review.seasons.map((s) => (
            <span key={s}
              className="px-2 py-0.5 text-[10px] border border-amber-900/30
                         text-amber-700/60 rounded uppercase tracking-wide">
              {SEASON_LABELS[s] ?? s}
            </span>
          ))}
          {review.occasions.map((o) => (
            <span key={o}
              className="px-2 py-0.5 text-[10px] border border-stone-800
                         text-stone-500 rounded uppercase tracking-wide">
              {OCCASION_LABELS[o] ?? o}
            </span>
          ))}
        </div>
      )}

      {/* Footer — vote + author actions */}
      <footer className="flex items-center justify-between gap-4 pt-1 border-t border-amber-900/10">
        {/* Helpful vote */}
        {!isAuthor && (
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-stone-600 uppercase tracking-wide">Helpful?</span>
            <button
              type="button"
              onClick={() => handleVote(true)}
              disabled={voting}
              className={[
                "flex items-center gap-1 text-xs transition-colors",
                vote === "helpful"
                  ? "text-amber-400"
                  : "text-stone-600 hover:text-stone-400",
              ].join(" ")}
            >
              ↑ {helpful}
            </button>
            <button
              type="button"
              onClick={() => handleVote(false)}
              disabled={voting}
              className={[
                "flex items-center gap-1 text-xs transition-colors",
                vote === "not_helpful"
                  ? "text-rose-400/70"
                  : "text-stone-700 hover:text-stone-500",
              ].join(" ")}
            >
              ↓ {notHelpful}
            </button>
          </div>
        )}

        {/* Author controls */}
        {isAuthor && !confirmDelete && (
          <div className="flex items-center gap-4 ml-auto">
            <button
              type="button"
              onClick={() => onEdit?.(review)}
              className="text-[10px] uppercase tracking-wide text-stone-600
                         hover:text-amber-500/70 transition-colors"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="text-[10px] uppercase tracking-wide text-stone-700
                         hover:text-rose-500/70 transition-colors"
            >
              Delete
            </button>
          </div>
        )}

        {isAuthor && confirmDelete && (
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-xs text-stone-500">Remove this review?</span>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              {deleting ? "Deleting…" : "Yes, delete"}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs text-stone-600 hover:text-stone-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </footer>
    </article>
  );
}
