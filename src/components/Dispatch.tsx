import Link from "next/link";

export type DispatchRelease = {
  name: string;
  house: string;
  slug: string;       // catalog slug → /fragrances/[slug]
  notes: string;      // short note summary
  price: string;      // human-readable, e.g. "$155"
  verdict: string;    // one-line editorial take
};

export type DispatchProps = {
  monthLabel: string;   // e.g. "May 2026"
  deck: string;         // one-paragraph intro
  releases: DispatchRelease[];
};

export default function Dispatch({ monthLabel, deck, releases }: DispatchProps) {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/guide"
        className="text-[10px] uppercase tracking-[0.2em] text-stone-600 hover:text-stone-400 transition-colors block mb-12"
      >
        ← Guide
      </Link>

      <div className="mb-12 pb-12 border-b border-stone-800/60">
        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-6">
          The Dispatch
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-100 leading-[1.08] mb-6">
          New Releases:{" "}
          <em className="italic text-amber-400">{monthLabel}</em>
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed max-w-md">
          {deck}
        </p>
      </div>

      <div className="space-y-4">
        {releases.map((r) => (
          <Link
            key={r.slug}
            href={`/fragrances/${r.slug}`}
            className="group block border border-stone-800 hover:border-stone-600 rounded p-5 bg-stone-950/40 transition-colors"
          >
            <div className="flex items-baseline justify-between gap-4 mb-1">
              <h2 className="font-serif text-lg font-light text-stone-200 group-hover:text-amber-400 transition-colors">
                {r.name}
              </h2>
              <span className="text-[11px] text-amber-700/70 font-light whitespace-nowrap">{r.price}</span>
            </div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-stone-600 mb-3">{r.house}</p>
            <p className="text-[11px] text-amber-600/70 font-light mb-2">{r.notes}</p>
            <p className="text-[13px] text-stone-400 font-light leading-relaxed">{r.verdict}</p>
          </Link>
        ))}
      </div>

      <div className="text-center pt-16">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-700">fin</span>
      </div>
    </main>
  );
}
