/**
 * Pulls all fragrances from Postgres via Prisma and pushes them to Meilisearch.
 * Run with: npm run search:reindex
 */

import { Meilisearch } from "meilisearch";
import { PrismaClient } from "@prisma/client";
import type { FragranceDocument } from "../src/lib/search";

const prisma = new PrismaClient();

async function main() {
  const host = process.env.MEILISEARCH_HOST;
  const apiKey = process.env.MEILISEARCH_API_KEY;

  if (!host || !apiKey) {
    console.error("MEILISEARCH_HOST and MEILISEARCH_API_KEY must be set in .env");
    process.exit(1);
  }

  const client = new Meilisearch({ host, apiKey });
  const index = client.index<FragranceDocument>(SEARCH_INDEX);

  // Configure index before indexing documents
  console.log("Configuring index settings…");
  const settingsTask = await index.updateSettings({
    searchableAttributes: [
      "name",
      "houseName",
      "notes",
      "family",
      "subfamily",
      "sentiment",
    ],
    filterableAttributes: ["family", "priceTier", "seasons", "occasions"],
    sortableAttributes: ["popularityScore"],
    rankingRules: [
      "words",
      "typo",
      "proximity",
      "attribute",
      "sort",
      "exactness",
    ],
  });
  await client.tasks.waitForTask(settingsTask.taskUid);

  // Fetch all fragrances with their relations
  console.log("Fetching fragrances from database…");
  const fragrances = await prisma.fragrance.findMany({
    include: {
      house: { select: { name: true } },
      notes: { include: { note: { select: { name: true } } } },
      seasons: true,
      occasions: true,
    },
  });

  const documents: FragranceDocument[] = fragrances.map((f) => ({
    id: f.id,
    slug: f.slug,
    name: f.name,
    houseName: f.house.name,
    family: f.family as string,
    subfamily: f.subfamily,
    year: f.year,
    priceTier: f.priceTier as string,
    priceRange: f.priceRange,
    popularityScore: f.popularityScore,
    notes: f.notes.map((fn) => fn.note.name),
    sentiment: f.sentiment,
    seasons: f.seasons.map((s) => s.season as string),
    occasions: f.occasions.map((o) => o.occasion as string),
  }));

  console.log(`Indexing ${documents.length} documents…`);
  const task = await index.addDocuments(documents, { primaryKey: "id" });
  console.log(`Task enqueued (uid: ${task.taskUid}). Waiting for completion…`);
  await client.tasks.waitForTask(task.taskUid);
  console.log("Done.");

  await prisma.$disconnect();
}

const SEARCH_INDEX = "fragrances";

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
