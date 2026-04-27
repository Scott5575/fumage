"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────────────────────

interface SearchHit {
  id: string;
  slug: string;
  name: string;
  houseName: string;
  family: string;
  priceTier: string;
}

interface LayerFrag {
  id: string;
  slug: string;
  name: string;
  houseName: string;
  family: string;
  subfamily: string | null;
  longevity: number | null;
  projection: number | null;
  sillage: number | null;
  notes: { TOP: string[]; MIDDLE: string[]; BASE: string[]; ACCORD: string[] };
  seasons: string[];
  occasions: string[];
}

type NoteEntry = { name: string; slotIndices: number[] };
type PyramidRow = { key: string; label: string; notes: NoteEntry[] };

// ── Constants ─────────────────────────────────────────────────────────────────

const SLOT_CONFIG = [
  {
    label: "Base",
    sublabel: "Apply first — longest lasting",
    dotClass: "bg-amber-500",
    textClass: "text-amber-400",
    borderClass: "border-amber-700/40",
    ringClass: "ring-amber-700/30",
  },
  {
    label: "Top",
    sublabel: "Apply second — first impression",
    dotClass: "bg-sky-400",
    textClass: "text-sky-400",
    borderClass: "border-sky-700/40",
    ringClass: "ring-sky-700/30",
  },
  {
    label: "Accent",
    sublabel: "Optional — third modifier",
    dotClass: "bg-rose-400",
    textClass: "text-rose-400",
    borderClass: "border-rose-700/40",
    ringClass: "ring-rose-700/30",
  },
] as const;

const FAMILY_LABELS: Record<string, string> = {
  FRESH: "Fresh",
  AROMATIC: "Aromatic",
  WOODY: "Woody",
  ORIENTAL: "Oriental",
  GOURMAND: "Gourmand",
  LEATHER: "Leather",
  CITRUS: "Citrus",
  CHYPRE: "Chypre",
};

const FAMILY_COLORS: Record<string, string> = {
  FRESH: "bg-sky-900/30 text-sky-400 border-sky-800/60",
  AROMATIC: "bg-emerald-900/30 text-emerald-400 border-emerald-800/60",
  WOODY: "bg-amber-900/30 text-amber-500 border-amber-800/60",
  ORIENTAL: "bg-orange-900/30 text-orange-400 border-orange-800/60",
  GOURMAND: "bg-rose-900/30 text-rose-400 border-rose-800/60",
  LEATHER: "bg-stone-800/60 text-stone-400 border-stone-700/60",
  CITRUS: "bg-yellow-900/30 text-yellow-400 border-yellow-800/60",
  CHYPRE: "bg-lime-900/30 text-lime-400 border-lime-800/60",
};

const SEASON_LABELS: Record<string, string> = {
  SPRING: "Spring", SUMMER: "Summer", FALL: "Fall", WINTER: "Winter",
};

const OCCASION_LABELS: Record<string, string> = {
  CASUAL: "Casual", BUSINESS: "Business", DATE: "Date night",
  SPECIAL: "Formal", NIGHT_OUT: "Nights out",
};

const PYRAMID_POSITIONS = [
  { key: "TOP", label: "Top Notes" },
  { key: "MIDDLE", label: "Heart Notes" },
  { key: "BASE", label: "Base Notes" },
  { key: "ACCORD", label: "Overall Character" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function buildPyramid(frags: (LayerFrag | null)[]): PyramidRow[] {
  const active = frags
    .map((f, i) => ({ frag: f, i }))
    .filter((x): x is { frag: LayerFrag; i: number } => x.frag !== null);

  return PYRAMID_POSITIONS.map(({ key, label }) => {
    const noteMap = new Map<string, Set<number>>();
    for (const { frag, i } of active) {
      const list = frag.notes[key as keyof typeof frag.notes] ?? [];
      for (const note of list) {
        if (!noteMap.has(note)) noteMap.set(note, new Set());
        noteMap.get(note)!.add(i);
      }
    }
    return {
      key,
      label,
      notes: Array.from(noteMap.entries()).map(([name, indices]) => ({
        name,
        slotIndices: Array.from(indices),
      })),
    };
  }).filter(row => row.notes.length > 0);
}

function calcPerformance(frags: (LayerFrag | null)[]) {
  const active = frags.filter((f): f is LayerFrag => f !== null);
  const avg = (key: "longevity" | "projection" | "sillage") => {
    const vals = active.filter(f => f[key] !== null).map(f => f[key] as number);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  };
  return {
    longevity: avg("longevity"),
    projection: avg("projection"),
    sillage: avg("sillage"),
  };
}

function buildBlendSummary(
  frags: (LayerFrag | null)[],
  pyramid: PyramidRow[]
): string {
  const active = frags.filter((f): f is LayerFrag => f !== null);
  if (active.length < 2) return "";

  const sharedNotes = pyramid.flatMap(r =>
    r.notes.filter(n => n.slotIndices.length > 1).map(n => n.name)
  );
  const families = [...new Set(active.map(f => f.family))];
  const familyStr = families
    .map(f => FAMILY_LABELS[f] ?? f)
    .join("–")
    .toLowerCase();

  const sharedSeasons = ["SPRING", "SUMMER", "FALL", "WINTER"].filter(s =>
    active.every(f => f.seasons.includes(s))
  );
  const sharedOccasions = ["CASUAL", "BUSINESS", "DATE", "SPECIAL", "NIGHT_OUT"].filter(o =>
    active.every(f => f.occasions.includes(o))
  );

  const perf = calcPerformance(frags);
  const parts: string[] = [];

  // Opening line
  let opening = `A ${familyStr} composition`;
  if (sharedNotes.length > 0) {
    const top3 = sharedNotes.slice(0, 3).join(", ");
    opening += ` with ${top3} as structural bridge${sharedNotes.length > 1 ? "s" : ""}`;
  }
  parts.push(opening + ".");

  // Performance
  const perfParts: string[] = [];
  if (perf.longevity !== null) {
    const d =
      perf.longevity >= 8 ? "excellent longevity" :
      perf.longevity >= 6 ? "solid longevity" : "moderate longevity";
    perfParts.push(`${d} (${perf.longevity.toFixed(1)}/10)`);
  }
  if (perf.projection !== null) {
    const d =
      perf.projection >= 8 ? "commanding projection" :
      perf.projection >= 6 ? "moderate projection" : "intimate projection";
    perfParts.push(d);
  }
  if (perfParts.length) {
    const s = perfParts[0];
    parts.push(
      s.charAt(0).toUpperCase() + s.slice(1) +
      (perfParts[1] ? `, ${perfParts[1]}` : "") + "."
    );
  }

  // Seasons
  if (sharedSeasons.length) {
    const warm = sharedSeasons.filter(s => ["SPRING", "SUMMER"].includes(s));
    const cool = sharedSeasons.filter(s => ["FALL", "WINTER"].includes(s));
    const note =
      warm.length && cool.length ? "year-round" :
      warm.length ? "warmer months" : "cooler months";
    parts.push(`Suits ${note}.`);
  }

  // Occasions
  if (sharedOccasions.length) {
    const occStr = sharedOccasions
      .slice(0, 3)
      .map(o => OCCASION_LABELS[o] ?? o.toLowerCase())
      .join(", ");
    parts.push(`Well-suited to ${occStr}.`);
  }

  // Coherence note
  if (sharedNotes.length >= 3) {
    parts.push(`${sharedNotes.length} shared notes across the pyramid — strong integration expected.`);
  } else if (sharedNotes.length > 0) {
    parts.push(
      `${sharedNotes.length} shared note${sharedNotes.length > 1 ? "s" : ""} — moderate coherence. Ratio management matters.`
    );
  } else {
    parts.push(
      "No shared notes — apply the base at 70% of normal volume, the second at 30%. Test the full drydown before deciding."
    );
  }

  return parts.join(" ");
}

// ── Sub-components ────────────────────────────────────────────────────────────

function NotePill({ name, slotIndices }: NoteEntry) {
  const isShared = slotIndices.length > 1;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] border ${
        isShared
          ? "border-stone-600 bg-stone-800 text-stone-200"
          : "border-stone-800 bg-stone-900/60 text-stone-400"
      }`}
    >
      {slotIndices.map(i => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${SLOT_CONFIG[i].dotClass}`}
        />
      ))}
      {name}
    </span>
  );
}

function PerformanceBar({ label, value }: { label: string; value: number | null }) {
  if (value === null) return null;
  const pct = Math.round((value / 10) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-[9px] uppercase tracking-[0.2em] text-stone-500 w-20 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-px bg-stone-800 relative">
        <div
          className="absolute top-0 left-0 h-px bg-amber-600 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] font-light text-stone-400 w-6 text-right tabular-nums">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function LayeringTool() {
  const [slots, setSlots] = useState<(LayerFrag | null)[]>([null, null, null]);
  const [queries, setQueries] = useState(["", "", ""]);
  const [hits, setHits] = useState<SearchHit[][]>([[], [], []]);
  const [loading, setLoading] = useState([false, false, false]);
  const timers = useRef<(ReturnType<typeof setTimeout> | null)[]>([null, null, null]);

  const activeCount = slots.filter(Boolean).length;
  const activeFrags = slots.filter((f): f is LayerFrag => f !== null);

  const search = useCallback(async (q: string, idx: number) => {
    if (!q.trim()) {
      setHits(prev => { const n = [...prev]; n[idx] = []; return n; });
      return;
    }
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=8`);
      const data = await res.json();
      setHits(prev => { const n = [...prev]; n[idx] = data.hits ?? []; return n; });
    } catch { /* silent */ }
  }, []);

  function handleQuery(q: string, i: number) {
    setQueries(prev => { const n = [...prev]; n[i] = q; return n; });
    if (timers.current[i]) clearTimeout(timers.current[i]!);
    timers.current[i] = setTimeout(() => search(q, i), 280);
  }

  async function selectFrag(hit: SearchHit, i: number) {
    setLoading(prev => { const n = [...prev]; n[i] = true; return n; });
    setHits(prev => { const n = [...prev]; n[i] = []; return n; });
    setQueries(prev => { const n = [...prev]; n[i] = ""; return n; });
    try {
      const res = await fetch(`/api/layer/${hit.slug}`);
      if (res.ok) {
        const data: LayerFrag = await res.json();
        setSlots(prev => { const n = [...prev]; n[i] = data; return n; });
      }
    } catch { /* silent */ }
    setLoading(prev => { const n = [...prev]; n[i] = false; return n; });
  }

  function clearSlot(i: number) {
    setSlots(prev => { const n = [...prev]; n[i] = null; return n; });
    setQueries(prev => { const n = [...prev]; n[i] = ""; return n; });
    setHits(prev => { const n = [...prev]; n[i] = []; return n; });
  }

  const pyramid = buildPyramid(slots);
  const performance = calcPerformance(slots);
  const blendSummary = buildBlendSummary(slots, pyramid);
  const families = [...new Set(activeFrags.map(f => f.family))];
  const sharedNoteCount = pyramid.flatMap(r =>
    r.notes.filter(n => n.slotIndices.length > 1)
  ).length;

  return (
    <div>
      {/* ── Fragrance slots ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {SLOT_CONFIG.map((cfg, i) => (
          <div
            key={i}
            className={`border ${cfg.borderClass} bg-stone-900/30 p-4 relative min-h-[120px]`}
          >
            {/* Slot header */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dotClass}`} />
              <p className={`text-[9px] uppercase tracking-[0.3em] ${cfg.textClass}`}>
                {cfg.label}
              </p>
              <span className="text-stone-700 text-[9px]">·</span>
              <p className="text-[9px] text-stone-700">{cfg.sublabel}</p>
            </div>

            {slots[i] ? (
              /* ── Selected fragrance card ── */
              <div className="relative">
                <button
                  onClick={() => clearSlot(i)}
                  className="absolute -top-1 right-0 w-5 h-5 flex items-center justify-center text-stone-700 hover:text-stone-400 transition-colors text-xs"
                  aria-label="Remove fragrance"
                >
                  ✕
                </button>
                <Link
                  href={`/fragrances/${slots[i]!.slug}`}
                  className="group block pr-6"
                >
                  <p className="text-[9px] uppercase tracking-[0.12em] text-stone-600 mb-0.5">
                    {slots[i]!.houseName}
                  </p>
                  <p
                    className={`font-serif text-base font-light leading-snug mb-3 group-hover:underline decoration-stone-700 ${cfg.textClass}`}
                  >
                    {slots[i]!.name}
                  </p>
                </Link>
                <div className="flex flex-wrap gap-1">
                  <span
                    className={`text-[9px] px-1.5 py-0.5 border ${
                      FAMILY_COLORS[slots[i]!.family] ?? "border-stone-700 text-stone-500"
                    }`}
                  >
                    {FAMILY_LABELS[slots[i]!.family] ?? slots[i]!.family}
                  </span>
                  {slots[i]!.subfamily && (
                    <span className="text-[9px] px-1.5 py-0.5 border border-stone-800 text-stone-600">
                      {slots[i]!.subfamily}
                    </span>
                  )}
                </div>
              </div>
            ) : loading[i] ? (
              /* ── Loading ── */
              <div className="flex items-center gap-2 py-2">
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass} opacity-50 animate-pulse`} />
                <span className="text-[9px] uppercase tracking-[0.2em] text-stone-600">Loading…</span>
              </div>
            ) : (
              /* ── Search ── */
              <div className="relative">
                <input
                  type="text"
                  value={queries[i]}
                  onChange={e => handleQuery(e.target.value, i)}
                  placeholder="Search fragrances…"
                  className="w-full bg-transparent border-b border-stone-800 focus:border-stone-600
                             text-stone-300 text-sm font-light outline-none transition-colors
                             placeholder:text-stone-700 py-1.5"
                />
                {hits[i].length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-30 bg-[#0c0906] border border-stone-800 mt-px max-h-52 overflow-y-auto">
                    {hits[i].map(hit => (
                      <button
                        key={hit.slug}
                        onMouseDown={e => { e.preventDefault(); selectFrag(hit, i); }}
                        className="w-full text-left px-3 py-2.5 border-b border-stone-800/40 last:border-0 hover:bg-stone-900 transition-colors"
                      >
                        <p className="text-[9px] uppercase tracking-[0.1em] text-stone-600 mb-0.5">
                          {hit.houseName}
                        </p>
                        <p className="font-serif text-sm font-light text-stone-300 leading-snug">
                          {hit.name}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Blend result ── */}
      {activeCount >= 2 ? (
        <div>
          {/* Legend */}
          <div className="flex items-center gap-4 mb-6 flex-wrap border-t border-stone-800/60 pt-6">
            {slots.map((frag, i) =>
              frag ? (
                <div key={i} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${SLOT_CONFIG[i].dotClass}`} />
                  <span className="text-[10px] text-stone-500">{frag.name}</span>
                </div>
              ) : null
            )}
            {sharedNoteCount > 0 && (
              <div className="flex items-center gap-1.5 md:ml-auto">
                <span className="w-2.5 h-2.5 bg-stone-700 border border-stone-500" />
                <span className="text-[10px] text-stone-600">Shared note (structural bridge)</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* ── Notes pyramid ── */}
            <div className="lg:col-span-3 border border-stone-800 bg-stone-900/20 p-5">
              <p className="text-[9px] uppercase tracking-[0.3em] text-amber-500 mb-6">
                Combined Notes Pyramid
              </p>
              <div className="space-y-6">
                {pyramid.map(row => (
                  <div key={row.key}>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-stone-600 mb-2">
                      {row.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {row.notes.map(note => (
                        <NotePill key={note.name} name={note.name} slotIndices={note.slotIndices} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right column ── */}
            <div className="lg:col-span-2 space-y-4">
              {/* Performance */}
              {(performance.longevity !== null ||
                performance.projection !== null ||
                performance.sillage !== null) && (
                <div className="border border-stone-800 bg-stone-900/20 p-5">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-amber-500 mb-5">
                    Projected Performance
                  </p>
                  <div className="space-y-4">
                    <PerformanceBar label="Longevity" value={performance.longevity} />
                    <PerformanceBar label="Projection" value={performance.projection} />
                    <PerformanceBar label="Sillage" value={performance.sillage} />
                  </div>
                  <p className="text-[9px] text-stone-700 mt-4 italic leading-relaxed">
                    Average across selected fragrances. Actual result depends on ratio and application order.
                  </p>
                </div>
              )}

              {/* Family profile */}
              <div className="border border-stone-800 bg-stone-900/20 p-5">
                <p className="text-[9px] uppercase tracking-[0.3em] text-amber-500 mb-3">
                  Family Profile
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {families.map(f => (
                    <span
                      key={f}
                      className={`text-[9px] px-2 py-0.5 border ${
                        FAMILY_COLORS[f] ?? "border-stone-700 text-stone-500"
                      }`}
                    >
                      {FAMILY_LABELS[f] ?? f}
                    </span>
                  ))}
                </div>
                <p className="text-[9px] text-stone-700 italic leading-relaxed">
                  {families.length === 1
                    ? "Single family — reinforcing composition. Richer than either fragrance alone."
                    : families.length === 2
                    ? "Two families — complementary blend. Shared notes carry the structure."
                    : "Three families — complex blend. Apply the base fragrance at 60–70% of normal volume."}
                </p>
              </div>

              {/* Blend assessment */}
              <div
                className="border border-stone-800 bg-stone-900/20 p-5"
                style={{ borderTopColor: "#b45309", borderTopWidth: 2 }}
              >
                <p className="text-[9px] uppercase tracking-[0.3em] text-amber-500 mb-3">
                  Blend Assessment
                </p>
                <p className="font-serif text-sm font-light text-stone-300 leading-relaxed">
                  {blendSummary}
                </p>
              </div>
            </div>
          </div>

          {/* Guide CTA */}
          <div className="mt-8 border-t border-stone-800/40 pt-5 flex items-center justify-between flex-wrap gap-3">
            <p className="text-[9px] uppercase tracking-[0.15em] text-stone-700">
              New to layering?
            </p>
            <Link
              href="/guide/layering"
              className="text-[9px] uppercase tracking-[0.15em] text-amber-500/60 hover:text-amber-400 transition-colors"
            >
              Read The Invisible Third →
            </Link>
          </div>
        </div>
      ) : (
        /* ── Empty / partial state ── */
        <div className="border border-stone-800/40 border-dashed py-16 text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-stone-600 mb-2">
            {activeCount === 0
              ? "Select two fragrances to see the blend analysis"
              : "Select one more fragrance to see the blend analysis"}
          </p>
          {activeCount === 0 && (
            <p className="font-serif text-sm italic text-stone-700 mt-2 max-w-xs mx-auto leading-relaxed">
              Search any of the 685 fragrances in the catalog above
            </p>
          )}
        </div>
      )}
    </div>
  );
}
