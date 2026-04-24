/**
 * src/components/reviews/ReviewList.tsx
 *
 * Full review section for a fragrance detail page.
 * Includes: rating summary, sort controls, paginated cards, write-review CTA.
 *
 * Usage:
 *   <ReviewList fragranceId={f.id} fragranceName={f.name} houseName={f.house.name} currentUserId={user?.id} />
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import { StarRating } from "@/components/collection/StarRating";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import type { Review, ReviewsResponse } from "@/types/ugc";

type Sort = "helpful" | "recent" | "rating_high" | "rating_low";

const SORT_OPTIONS: { value: Sort; label: string }[] = [
  { value: "helpful",     label: "Most helpful" },
  { value: "recent",      label: "Most recent"  },
  { value: "rating_high", label: "Highest rated" },
  { value: "rating_low",  label: "Lowest rated"  },
];

interface ReviewListProps {
  fragranceId: string;
  fragranceName: string;
  houseName: string;
  currentUserId?: string;
}

export function ReviewList({
  fragranceId,
  fragranceName,
  houseName,
  currentUserId,
}: ReviewListProps) {
  const [data,    setData]    = useState<ReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [sort,    setSort]    = useState<Sort>("helpful");
  const [page,    setPage]    = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/reviews?fragranceId=${fragranceId}&sort=${sort}&page=${page}&pageSize=8`
      );
      const json = await res.json();
      if (json.ok) {
        setData((prev) =>
          page === 0
            ? json.data
            : { ...json.data, reviews: [...(prev?.reviews ?? []), ...json.data.reviews] }
        );
      }
    } finally {
      setLoading(false);
    }
  }, [fragranceId, sort, page]);

  useEffect(() => {
    setPage(0);
  }, [sort]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  function handleReviewSuccess(review: Review) {
    setShowForm(false);
    setEditingReview(null);
    setSort("recent");  // re-fetch will trigger
    setPage(0);
  }

  function handleEdit(review: Review) {
    setEditingReview(review);
    setShowForm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(reviewId: string) {
    setData((prev) =>
      prev
        ? {
            ...prev,
            reviews: prev.reviews.filter((r) => r.id !== reviewId),
            total: prev.total - 1,
            stats: { ...prev.stats, total: prev.stats.total - 1 },
          }
        : prev
    );
  }

  const userHasReviewed = data?.reviews.some((r) => r.user.id === currentUserId);
  const stats = data?.stats;

  return (
    <section className="space-y-8">
      {/* Section header */}
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-amber-500/60">
            Community Reviews
          </h2>
          {stats && (
            <div className="flex items-center gap-3 mt-1">
              <StarRating value={stats.avgRating ?? 0} size="sm" showValue />
              <span className="text-stone-500 text-xs">
                {stats.total} {stats.total === 1 ? "review" : "reviews"}
              </span>
            </div>
          )}
        </div>

        {/* Write review button */}
        {currentUserId && !userHasReviewed && !showForm && !editingReview && (
          <button
            onClick={() => setShowForm(true)}
            className="text-xs uppercase tracking-[0.15em] text-amber-500/70
                       border border-amber-800/30 rounded px-4 py-1.5
                       hover:border-amber-700/60 hover:text-amber-400 transition-colors"
          >
            Write a review
          </button>
        )}
      </div>

      {/* Rating distribution bar */}
      {stats && stats.total > 0 && (
        <div className="space-y-1.5">
          {["5", "4", "3", "2", "1"].map((star) => {
            const count = stats.distribution[star] ?? 0;
            const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-[10px] text-amber-500/50 w-3">{star}</span>
                <span className="text-amber-400/40 text-[10px]">★</span>
                <div className="flex-1 h-px bg-amber-900/20 relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-amber-700/50 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[10px] text-stone-600 w-4 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit form */}
      {editingReview && (
        <ReviewForm
          fragranceId={fragranceId}
          fragranceName={fragranceName}
          houseName={houseName}
          existingReview={editingReview}
          onSuccess={handleReviewSuccess}
          onCancel={() => setEditingReview(null)}
        />
      )}

      {/* Write form */}
      {showForm && (
        <ReviewForm
          fragranceId={fragranceId}
          fragranceName={fragranceName}
          houseName={houseName}
          onSuccess={handleReviewSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Sort controls */}
      {data && data.reviews.length > 0 && !showForm && !editingReview && (
        <div className="flex items-center gap-1 flex-wrap">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className={[
                "text-[10px] uppercase tracking-wide px-3 py-1 rounded border transition-colors",
                sort === opt.value
                  ? "border-amber-700/50 text-amber-400 bg-amber-900/10"
                  : "border-transparent text-stone-600 hover:text-stone-400",
              ].join(" ")}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Review cards */}
      <div className="space-y-3">
        {data?.reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            currentUserId={currentUserId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

        {loading && (
          <div className="text-center py-8">
            <span className="text-amber-500/30 text-sm">Loading…</span>
          </div>
        )}

        {!loading && data?.total === 0 && !showForm && (
          <div className="text-center py-12 border border-dashed border-amber-900/20 rounded-lg">
            <p className="text-stone-500 text-sm">No reviews yet.</p>
            {currentUserId && (
              <button
                onClick={() => setShowForm(true)}
                className="mt-3 text-xs text-amber-600/70 hover:text-amber-500 transition-colors"
              >
                Be the first to write one →
              </button>
            )}
            {!currentUserId && (
              <p className="mt-2 text-xs text-stone-600">
                Sign in to leave the first review.
              </p>
            )}
          </div>
        )}

        {/* Load more */}
        {data?.hasMore && !loading && (
          <button
            onClick={() => setPage((p) => p + 1)}
            className="w-full text-xs uppercase tracking-[0.15em] text-stone-600
                       hover:text-stone-400 py-4 border border-dashed border-amber-900/15
                       rounded transition-colors"
          >
            Load more reviews
          </button>
        )}
      </div>
    </section>
  );
}
