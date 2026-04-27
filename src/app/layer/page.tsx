import type { Metadata } from "next";
import LayeringTool from "./LayeringTool";

export const metadata: Metadata = {
  title: "Fragrance Layering Tool — Fumage",
  description:
    "Select up to three fragrances and see how they layer — combined notes pyramid, projected performance, family profile, and blend assessment.",
};

export default function LayerPage() {
  return (
    <main className="min-h-screen" style={{ background: "#0c0906" }}>
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 mb-4">
          The Craft · Layering Tool
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-stone-100 leading-tight mb-3">
          Build the Blend
        </h1>
        <p className="font-serif text-base italic font-light text-stone-400 leading-relaxed mb-2 max-w-xl">
          Select two or three fragrances to see their combined notes pyramid, projected performance,
          and blend assessment — built from the catalog&apos;s structured data.
        </p>
        <p className="text-[9px] uppercase tracking-[0.2em] text-stone-700 mb-12">
          685 fragrances available &nbsp;·&nbsp; results are predictions, not guarantees — the drydown decides
        </p>

        <LayeringTool />
      </div>
    </main>
  );
}
