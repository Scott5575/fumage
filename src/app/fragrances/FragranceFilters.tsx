"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

const FAMILIES = [
  "FRESH", "AROMATIC", "WOODY", "ORIENTAL",
  "GOURMAND", "LEATHER", "CITRUS", "CHYPRE",
];

const PRICE_TIERS = [
  { value: "BUDGET", label: "Budget · <$30" },
  { value: "ACCESSIBLE", label: "Accessible · $30–$80" },
  { value: "MID", label: "Mid · $80–$200" },
  { value: "PREMIUM", label: "Premium · $200–$400" },
  { value: "ULTRA", label: "Ultra · $400+" },
];

const OCCASIONS = ["CASUAL", "BUSINESS", "DATE", "SPECIAL", "NIGHT_OUT"];
const SEASONS = ["SPRING", "SUMMER", "FALL", "WINTER"];

function toLabel(raw: string) {
  return raw.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

function FilterSection({
  title,
  param,
  options,
  labelMap,
}: {
  title: string;
  param: string;
  options: string[];
  labelMap?: Record<string, string>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get(param) ?? "";

  const toggle = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (active === value) {
        params.delete(param);
      } else {
        params.set(param, value);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [active, param, pathname, router, searchParams]
  );

  return (
    <div className="mb-6">
      <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-3">
        {title}
      </p>
      <div className="flex flex-col gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={`text-left text-xs px-2 py-1 rounded transition-colors ${
              active === opt
                ? "bg-amber-500/20 text-amber-400"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            {labelMap?.[opt] ?? toLabel(opt)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function FragranceFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasFilters = Array.from(searchParams.keys()).some((k) =>
    ["family", "price", "occasion", "season"].includes(k)
  );

  const clearAll = () => {
    router.push(pathname);
  };

  return (
    <aside className="w-48 shrink-0">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-stone-300">
          Filter
        </p>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-[10px] uppercase tracking-[0.15em] text-amber-500/60 hover:text-amber-400 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <FilterSection title="Family" param="family" options={FAMILIES} />
      <FilterSection
        title="Price"
        param="price"
        options={PRICE_TIERS.map((t) => t.value)}
        labelMap={Object.fromEntries(PRICE_TIERS.map((t) => [t.value, t.label]))}
      />
      <FilterSection title="Occasion" param="occasion" options={OCCASIONS} />
      <FilterSection title="Season" param="season" options={SEASONS} />
    </aside>
  );
}
