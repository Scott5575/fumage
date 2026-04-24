"use client";

import { useState } from "react";

type Register = "beginner" | "collector";

export default function DualRegisterToggle({
  beginnerNote,
  collectorNote,
}: {
  beginnerNote: string | null;
  collectorNote: string | null;
}) {
  const [mode, setMode] = useState<Register>("beginner");

  if (!beginnerNote && !collectorNote) return null;

  const text = mode === "beginner" ? beginnerNote : collectorNote;

  return (
    <div>
      <div className="flex items-center gap-1 mb-3">
        {(["beginner", "collector"] as Register[]).map((r) => (
          <button
            key={r}
            onClick={() => setMode(r)}
            className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded transition-colors ${
              mode === r
                ? "bg-amber-500/15 text-amber-400"
                : "text-stone-600 hover:text-stone-400"
            }`}
          >
            {r === "beginner" ? "Beginner" : "Collector"}
          </button>
        ))}
      </div>
      {text && (
        <p className="text-stone-300 text-sm leading-relaxed">{text}</p>
      )}
    </div>
  );
}
