/**
 * src/components/reviews/PerformanceRater.tsx
 *
 * Compact 1–10 slider set for longevity, projection, value ratings.
 * Renders in both read-only (ReviewCard) and interactive (ReviewForm) modes.
 */

"use client";

interface PerformanceRaterProps {
  longevity?: number | null;
  projection?: number | null;
  value?: number | null;
  onChange?: (field: "longevity" | "projection" | "value", v: number) => void;
  className?: string;
}

const ROWS = [
  { key: "longevity",  label: "Longevity"  },
  { key: "projection", label: "Projection" },
  { key: "value",      label: "Value"      },
] as const;

function Bar({
  label,
  val,
  onChange,
}: {
  label: string;
  val: number | null | undefined;
  onChange?: (v: number) => void;
}) {
  const pct = val ? (val / 10) * 100 : 0;
  const interactive = !!onChange;

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] uppercase tracking-[0.15em] text-amber-500/50 w-20 shrink-0">
        {label}
      </span>

      <div className="flex-1 relative">
        {interactive ? (
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={val ?? 5}
            onChange={(e) => onChange?.(Number(e.target.value))}
            className="w-full h-px appearance-none bg-amber-900/20 cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-3
                       [&::-webkit-slider-thumb]:h-3
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-amber-400
                       [&::-webkit-slider-thumb]:border-0
                       [&::-moz-range-thumb]:w-3
                       [&::-moz-range-thumb]:h-3
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-amber-400
                       [&::-moz-range-thumb]:border-0"
            aria-label={label}
          />
        ) : (
          <div className="h-px bg-amber-900/20 relative">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-700 to-amber-400 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}
      </div>

      <span className="text-amber-400/60 text-xs tabular-nums w-6 text-right">
        {val ?? "—"}
      </span>
    </div>
  );
}

export function PerformanceRater({
  longevity,
  projection,
  value,
  onChange,
  className = "",
}: PerformanceRaterProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {ROWS.map(({ key, label }) => (
        <Bar
          key={key}
          label={label}
          val={key === "longevity" ? longevity : key === "projection" ? projection : value}
          onChange={onChange ? (v) => onChange(key, v) : undefined}
        />
      ))}
    </div>
  );
}
