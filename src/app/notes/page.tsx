import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function NotesPage() {
  const notes = await prisma.note.findMany({
    select: {
      name: true,
      slug: true,
      _count: { select: { fragrances: true } },
    },
    orderBy: { name: "asc" },
  });

  // Group by first letter
  const groups: Record<string, typeof notes> = {};
  for (const note of notes) {
    const letter = note.name[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(note);
  }
  const letters = Object.keys(groups).sort();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500 mb-2">
          Notes Library
        </p>
        <h1 className="text-2xl font-light text-stone-200">
          {notes.length} ingredients
        </h1>
      </div>

      {/* Letter index */}
      <div className="flex flex-wrap gap-1.5 mb-10">
        {letters.map((l) => (
          <a
            key={l}
            href={`#letter-${l}`}
            className="text-[10px] uppercase tracking-[0.15em] text-stone-600 hover:text-stone-300 transition-colors w-6 text-center"
          >
            {l}
          </a>
        ))}
      </div>

      {/* Grouped listings */}
      <div className="space-y-10">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <p className="text-[10px] uppercase tracking-[0.25em] text-stone-700 mb-4 border-b border-stone-800/50 pb-2">
              {letter}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {groups[letter].map((note) => (
                <Link
                  key={note.slug}
                  href={`/notes/${note.slug}`}
                  className="group flex items-baseline justify-between border border-stone-800/60 hover:border-stone-600 rounded px-3 py-2 transition-colors bg-stone-950/30"
                >
                  <span className="text-sm font-light text-stone-300 group-hover:text-stone-100 transition-colors">
                    {note.name}
                  </span>
                  <span className="text-[10px] text-stone-700 ml-2 shrink-0">
                    {note._count.fragrances}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
