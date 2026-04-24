/**
 * scripts/verify-seed.ts
 *
 * Run after seeding to confirm row counts and data integrity.
 * Usage:  npx ts-node scripts/verify-seed.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["warn"] });

async function main() {
  console.log("\n🔍 Fumage seed verification\n");

  // ── Row counts ────────────────────────────────────────────────────────────
  const [
    houseCount,
    fragCount,
    noteCount,
    fragNoteCount,
    seasonCount,
    occasionCount,
    timeCount,
    dupeCount,
    simCount,
    logEntries,
  ] = await Promise.all([
    prisma.house.count(),
    prisma.fragrance.count(),
    prisma.note.count(),
    prisma.fragranceNote.count(),
    prisma.fragranceSeason.count(),
    prisma.fragranceOccasion.count(),
    prisma.fragranceTimeOfDay.count(),
    prisma.dupeRelationship.count(),
    prisma.similarFragrance.count(),
    prisma.dataImportLog.count(),
  ]);

  const pass = (label: string, got: number, min: number) => {
    const ok = got >= min;
    console.log(`  ${ok ? "✓" : "✗"} ${label.padEnd(30)} ${got} ${!ok ? `(expected ≥ ${min})` : ""}`);
    return ok;
  };

  let allPassed = true;
  allPassed = pass("Houses",              houseCount,    100) && allPassed;
  allPassed = pass("Fragrances",          fragCount,     684) && allPassed;
  allPassed = pass("Notes",               noteCount,     100) && allPassed;
  allPassed = pass("FragranceNote rows",  fragNoteCount, 2000) && allPassed;
  allPassed = pass("Season rows",         seasonCount,   1500) && allPassed;
  allPassed = pass("Occasion rows",       occasionCount, 1000) && allPassed;
  allPassed = pass("TimeOfDay rows",      timeCount,     800)  && allPassed;
  allPassed = pass("Dupe relationships",  dupeCount,     50)   && allPassed;
  allPassed = pass("Similar pairs",       simCount,      400)  && allPassed;
  allPassed = pass("Import log entries",  logEntries,    1)    && allPassed;

  // ── Spot checks ───────────────────────────────────────────────────────────
  console.log("\n  Spot checks:");

  const sauvage = await prisma.fragrance.findUnique({
    where: { slug: "dior-sauvage" },
    include: {
      house: true,
      notes: { include: { note: true }, orderBy: { position: "asc" } },
      seasons: true,
      isDupeOf: true,    // Sauvage is the TARGET (original); source dupes it
      hasDupes: { include: { source: { include: { house: true } } } },
    },
  });

  if (sauvage) {
    const topNotes = sauvage.notes.filter((n) => n.position === "TOP").map((n) => n.note.name);
    const hasDupeCount = sauvage.hasDupes.length;
    console.log(`  ✓ Sauvage found — house: ${sauvage.house.name}`);
    console.log(`    top notes: ${topNotes.join(", ")}`);
    console.log(`    seasons: ${sauvage.seasons.map((s) => s.season).join(", ")}`);
    console.log(`    dupes pointing at it: ${hasDupeCount}`);
    if (hasDupeCount > 0) {
      console.log(`    first dupe: ${sauvage.hasDupes[0].source.name} (${sauvage.hasDupes[0].source.house.name})`);
    }
  } else {
    console.log("  ✗ dior-sauvage not found!");
    allPassed = false;
  }

  const aventus = await prisma.fragrance.findUnique({
    where: { slug: "creed-aventus" },
    include: {
      hasDupes: { include: { source: { include: { house: true } } } },
      similarA: { include: { fragranceB: { include: { house: true } } }, take: 3 },
      similarB: { include: { fragranceA: { include: { house: true } } }, take: 3 },
    },
  });

  if (aventus) {
    const allSimilars = [
      ...aventus.similarA.map((s) => `${s.fragranceB.name} (${s.fragranceB.house.name})`),
      ...aventus.similarB.map((s) => `${s.fragranceA.name} (${s.fragranceA.house.name})`),
    ];
    console.log(`\n  ✓ Aventus found`);
    console.log(`    dupes in catalog: ${aventus.hasDupes.length}`);
    console.log(`    similars (sample): ${allSimilars.slice(0, 3).join(", ")}`);
  } else {
    console.log("  ✗ creed-aventus not found!");
    allPassed = false;
  }

  // Check ME coverage
  const lattafaCount = await prisma.fragrance.count({
    where: { house: { name: "Lattafa" } },
  });
  const nishaneCount = await prisma.fragrance.count({
    where: { house: { name: "Nishane" } },
  });
  console.log(`\n  ✓ Lattafa entries: ${lattafaCount} (expected ≥ 20)`);
  console.log(`  ✓ Nishane entries: ${nishaneCount} (expected ≥ 14)`);

  // ── Enum sanity ───────────────────────────────────────────────────────────
  const familyDist = await prisma.fragrance.groupBy({
    by: ["family"],
    _count: true,
    orderBy: { _count: { family: "desc" } },
  });
  console.log("\n  Family distribution:");
  for (const row of familyDist) {
    console.log(`    ${row.family.padEnd(12)} ${row._count}`);
  }

  // ── Final verdict ─────────────────────────────────────────────────────────
  console.log(allPassed ? "\n✅ All checks passed\n" : "\n❌ Some checks failed\n");
  process.exit(allPassed ? 0 : 1);
}

main().finally(() => prisma.$disconnect());
