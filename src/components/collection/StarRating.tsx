/**
 * src/components/reviews/StarRating.tsx
 *
 * Interactive 1–5 star rating with half-star display (read-only).
 * In input mode, full stars only.
 */

"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number;            // 0–5
  onChange?: (v: number) => void;  // if provided, interactive
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const SIZE = { sm: "text-sm", md: "text-base", lg: "text-xl" };
const GAP  = { sm: "gap-0.5", md: "gap-1", lg: "gap-1.5" };

export function StarRating({
  value,
  onChange,
  size = "md",
  showValue = false,
  className = "",
}: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const interactive = !!onChange;
  const display = hover || value;

  return (
    <span className={`inline-flex items-center ${GAP[size]} ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled  = display >= star;
        const partial = !filled && display >= star - 0.5 && !interactive;

        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(star)}
            onMouseEnter={() => interactive && setHover(star)}
            onMouseLeave={() => interactive && setHover(0)}
            className={[
              SIZE[size],
              "leading-none transition-colors duration-100",
              interactive ? "cursor-pointer" : "cursor-default pointer-events-none",
              filled   ? "text-amber-400"
              : partial? "text-amber-400/60"
              :          "text-amber-900/40",
              interactive && hover >= star ? "text-amber-300" : "",
            ].join(" ")}
            aria-label={interactive ? `Rate ${star} stars` : `${star} stars`}
          >
            {partial ? "½" : "★"}
          </button>
        );
      })}

      {showValue && (
        <span className="ml-1 text-amber-400/70 text-xs tabular-nums">
          {value > 0 ? value.toFixed(1) : "—"}
        </span>
      )}
    </span>
  );
}
