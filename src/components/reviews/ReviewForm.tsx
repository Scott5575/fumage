/**
 * src/components/reviews/ReviewForm.tsx
 *
 * Full review composition form. Used both for creating and editing.
 * Calls POST /api/reviews or PATCH /api/reviews/:id.
 */

"use client";

import { useState } from "react";
import { StarRating } from "@/components/collection/StarRating";
import { PerformanceRater } from "@/components/collection/PerformanceRater";
import type {
  Review,
  Season,
  Occasion,
  SEASON_LABELS,
  OCCASION_LABELS,
} from "@/types/ugc";

const SEASONS: Season[] = ["SPRING", "SUMMER", "FALL", "WINTER"];
const SEASONS_LABELS: Record<Season, string> = {
  SPRING: "Spring", SUMMER: "Summer", FALL: "Fall", WINTER: "Winter",
};

const OCCASIONS: Occasion[] = ["CASUAL", "BUSINESS", "DATE", "SPECIAL", "NIGHT_OUT"];
const OCCASIONS_LABELS: Record<Occasion, string> = {
  CASUAL: "Casual", BUSINESS: "Business", DATE: "Date",
  SPECIAL: "Special", NIGHT_OUT: "Night Out",
};

interface ReviewFormProps {
  fragranceId: string;
  fragranceName: string;
  houseName: string;
  existingReview?: Review;         // populated when editing
  onSuccess: (review: Review) => void;
  onCancel?: () => void;
}

export function ReviewForm({
  fragranceId,
  fragranceName,
  houseName,
  existingReview,
  onSuccess,
  onCancel,
}: ReviewFormProps) {
  const isEditing = !!existingReview;

  const [rating,          setRating]          = useState(existingReview?.rating ?? 0);
  const [title,           setTitle]           = useState(existingReview?.title ?? "");
  const [body,            setBody]            = useState(existingReview?.body ?? "");
  const [longevity,       setLongevity]       = useState<number | null>(existingReview?.longevityRating ?? null);
  const [projection,      setProjection]      = useState<number | null>(existingReview?.projectionRating ?? null);
  const [valueRating,     setValueRating]     = useState<number | null>(existingReview?.valueRating ?? null);
  const [seasons,         setSeasons]         = useState<Season[]>((existingReview?.seasons as Season[]) ?? []);
  const [occasions,       setOccasions]       = useState<Occasion[]>((existingReview?.occasions as Occasion[]) ?? []);
  const [bottleOwned,     setBottleOwned]     = useState(existingReview?.bottleOwned ?? false);
  const [bottleSize,      setBottleSize]      = useState(existingReview?.bottleSize ?? "");
  const [purchaseYear,    setPurchaseYear]    = useState(existingReview?.purchaseYear?.toString() ?? "");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState<string | null>(null);

  function toggleSeason(s: Season) {
    setSeasons((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }
  function toggleOccasion(o: Occasion) {
    setOccasions((prev) => prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]);
  }

  function handlePerf(field: "longevity" | "projection" | "value", v: number) {
    if (field === "longevity")  setLongevity(v);
    if (field === "projection") setProjection(v);
    if (field === "value")      setValueRating(v);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (rating === 0) { setError("Please select a star rating"); return; }
    if (body.trim().length < 10) { setError("Review must be at least 10 characters"); return; }

    setSubmitting(true);

    const payload = {
      ...(!isEditing && { fragranceId }),
      title: title.trim() || undefined,
      body: body.trim(),
      rating,
      longevityRating:  longevity  ?? undefined,
      projectionRating: projection ?? undefined,
      valueRating:      valueRating ?? undefined,
      seasons,
      occasions,
      bottleOwned,
      bottleSize: bottleSize.trim() || undefined,
      purchaseYear: purchaseYear ? parseInt(purchaseYear, 10) : undefined,
    };

    const url    = isEditing ? `/api/reviews/${existingReview!.id}` : "/api/reviews";
    const method = isEditing ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.ok) {
        setError(json.error ?? "Something went wrong");
        return;
      }
      onSuccess(json.data);
    } catch {
      setError("Network error — please try again");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#120e0a] border border-amber-900/20 rounded-lg p-6 space-y-6"
    >
      {/* Header */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500/50 mb-0.5">
          {isEditing ? "Edit review" : "Write a review"}
        </p>
        <p className="text-stone-200 font-serif-display italic">
          {fragranceName}{" "}
          <span className="text-amber-700/60 not-italic text-sm">— {houseName}</span>
        </p>
      </div>

      {/* Star rating (required) */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.15em] text-amber-500/50 mb-2">
          Overall rating <span className="text-rose-500">*</span>
        </label>
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>

      {/* Title (optional) */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.15em] text-amber-500/50 mb-2">
          Headline <span className="text-amber-500/30">(optional)</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={120}
          placeholder="e.g. The best thing I've smelled in years"
          className="w-full bg-transparent border border-amber-900/30 rounded px-3 py-2
                     text-stone-200 text-sm placeholder:text-stone-700 outline-none
                     focus:border-amber-700/60 transition-colors"
        />
      </div>

      {/* Body (required) */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.15em] text-amber-500/50 mb-2">
          Review <span className="text-rose-500">*</span>
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          minLength={10}
          placeholder="Share your experience — how it opens, evolves, performs, and when you reach for it…"
          className="w-full bg-transparent border border-amber-900/30 rounded px-3 py-2
                     text-stone-200 text-sm placeholder:text-stone-700 outline-none
                     focus:border-amber-700/60 transition-colors resize-none"
        />
        <p className="text-right text-[10px] text-amber-900/50 mt-1">
          {body.length} chars
        </p>
      </div>

      {/* Performance ratings */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.15em] text-amber-500/50 mb-3">
          Performance <span className="text-amber-500/30">(your experience)</span>
        </label>
        <PerformanceRater
          longevity={longevity}
          projection={projection}
          value={valueRating}
          onChange={handlePerf}
        />
      </div>

      {/* Seasons */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.15em] text-amber-500/50 mb-2">
          Best seasons
        </label>
        <div className="flex flex-wrap gap-2">
          {SEASONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleSeason(s)}
              className={[
                "px-3 py-1 text-xs rounded border transition-colors",
                seasons.includes(s)
                  ? "border-amber-500/60 text-amber-400 bg-amber-500/10"
                  : "border-amber-900/30 text-stone-500 hover:border-amber-900/60",
              ].join(" ")}
            >
              {SEASONS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Occasions */}
      <div>
        <label className="block text-[10px] uppercase tracking-[0.15em] text-amber-500/50 mb-2">
          Occasions
        </label>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => toggleOccasion(o)}
              className={[
                "px-3 py-1 text-xs rounded border transition-colors",
                occasions.includes(o)
                  ? "border-amber-500/60 text-amber-400 bg-amber-500/10"
                  : "border-amber-900/30 text-stone-500 hover:border-amber-900/60",
              ].join(" ")}
            >
              {OCCASIONS_LABELS[o]}
            </button>
          ))}
        </div>
      </div>

      {/* Ownership context */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.15em] text-amber-500/50 mb-2">
            Own it?
          </label>
          <button
            type="button"
            onClick={() => setBottleOwned((v) => !v)}
            className={[
              "flex items-center gap-2 text-xs border rounded px-3 py-1.5 transition-colors",
              bottleOwned
                ? "border-amber-500/60 text-amber-400 bg-amber-500/10"
                : "border-amber-900/30 text-stone-500",
            ].join(" ")}
          >
            <span>{bottleOwned ? "✦" : "◇"}</span>
            <span>{bottleOwned ? "Full bottle" : "Sampled / decant"}</span>
          </button>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-[0.15em] text-amber-500/50 mb-2">
            Bottle size
          </label>
          <input
            type="text"
            value={bottleSize}
            onChange={(e) => setBottleSize(e.target.value)}
            placeholder="e.g. 100ml EDP"
            className="w-full bg-transparent border border-amber-900/30 rounded px-3 py-1.5
                       text-stone-200 text-xs placeholder:text-stone-700 outline-none
                       focus:border-amber-700/60 transition-colors"
          />
        </div>
      </div>

      {/* Purchase year */}
      <div className="max-w-[140px]">
        <label className="block text-[10px] uppercase tracking-[0.15em] text-amber-500/50 mb-2">
          Year purchased
        </label>
        <input
          type="number"
          value={purchaseYear}
          onChange={(e) => setPurchaseYear(e.target.value)}
          min={1990}
          max={new Date().getFullYear()}
          placeholder={String(new Date().getFullYear())}
          className="w-full bg-transparent border border-amber-900/30 rounded px-3 py-1.5
                     text-stone-200 text-xs placeholder:text-stone-700 outline-none
                     focus:border-amber-700/60 transition-colors"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-rose-400/80 text-xs border border-rose-900/30 rounded px-3 py-2 bg-rose-950/20">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-stone-500 hover:text-stone-300 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2 bg-amber-700/20 border border-amber-700/40 text-amber-400
                     text-xs uppercase tracking-[0.15em] rounded hover:bg-amber-700/30
                     transition-colors disabled:opacity-40 disabled:pointer-events-none"
        >
          {submitting ? "Saving…" : isEditing ? "Update review" : "Publish review"}
        </button>
      </div>
    </form>
  );
}
