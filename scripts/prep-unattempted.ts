/**
 * scripts/prep-unattempted.ts
 *
 * Produce the work-list of fragrances that the firecrawl backfill never got a fair
 * search on (credits ran out at #160). = current missing-image set MINUS the ones the
 * log already recorded as "not found" (genuine matcher-misses we won't re-try).
 *
 * Output: scripts/unattempted.json  → [{ slug, name, house, year }]
 * Run with .env/.env.local loaded:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/prep-unattempted.ts
 */
import * as fs from "fs";
import { PrismaClient } from "@prisma/client";

const LOG = "/tmp/fumage-image-backfill.log";
const OUT = "scripts/unattempted.json";

const prisma = new PrismaClient();

async function main() {
  // normalized key so the em-dash, spaces and "(year)" suffix in the log line don't
  // defeat the comparison
  const norm = (s: string) =>
    s.replace(/\(\d{4}\)/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");

  // keys the log already searched and rejected
  const attemptedMiss = new Set<string>();
  if (fs.existsSync(LOG)) {
    for (const line of fs.readFileSync(LOG, "utf8").split("\n")) {
      const m = line.match(/^\s*\[\d+\/\d+\]\s+(.+?):\s+not found/);
      if (m) attemptedMiss.add(norm(m[1]));
    }
  }
  console.log(`log: ${attemptedMiss.size} already searched-and-missed (will skip)`);

  const missing = await prisma.fragrance.findMany({
    where: { imageUrl: null },
    select: { slug: true, name: true, year: true, house: { select: { name: true } } },
    orderBy: { popularityScore: "desc" },
  });

  const work = missing
    .map((f) => ({
      slug: f.slug,
      name: f.name,
      house: f.house.name,
      year: f.year,
    }))
    .filter((f) => !attemptedMiss.has(norm(`${f.house} ${f.name}`)));

  fs.writeFileSync(OUT, JSON.stringify(work, null, 2) + "\n");
  console.log(
    `missing=${missing.length}  unattempted(work)=${work.length}  → ${OUT}`
  );
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
