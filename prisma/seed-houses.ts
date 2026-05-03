/**
 * prisma/seed-houses.ts
 * Fumage — The Gentleman's Atlas
 *
 * Upserts all 534 houses from prisma/data/houses_v10.json.
 * Safe to re-run: uses upsert on slug. Never touches fragrances or user data.
 *
 * Run:
 *   npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed-houses.ts
 */

import { PrismaClient, HouseTier } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

interface RawHouse {
  name: string;
  slug: string;
  tier: string;
  country: string | null;
  foundedYear: number | null;
  website: string | null;
  description: string | null;
}

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, "data", "houses_v10.json");
  const raw: RawHouse[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const tierMap: Record<string, HouseTier> = {
    DESIGNER:   HouseTier.DESIGNER,
    NICHE:      HouseTier.NICHE,
    ARTISAN:    HouseTier.ARTISAN,
    ULTRA_LUXURY: HouseTier.ULTRA_LUXURY,
    BUDGET_NICHE: HouseTier.BUDGET_NICHE,
    CELEBRITY:  HouseTier.CELEBRITY,
  };

  let inserted = 0;
  let updated = 0;
  let skipped = 0;

  for (const h of raw) {
    const tier = tierMap[h.tier] ?? HouseTier.NICHE;

    const existing = await prisma.house.findUnique({ where: { slug: h.slug } });

    if (existing) {
      // Update enrichment fields only — never overwrite tier set by the fragrance seeder
      await prisma.house.update({
        where: { slug: h.slug },
        data: {
          country:     h.country     ?? existing.country,
          foundedYear: h.foundedYear ?? existing.foundedYear,
          website:     h.website     ?? existing.website,
          description: h.description ?? existing.description,
        },
      });
      updated++;
    } else {
      // Check for name collision (different slug, same name)
      const byName = await prisma.house.findUnique({ where: { name: h.name } });
      if (byName) {
        console.warn(`  SKIP name collision: "${h.name}" (existing slug: ${byName.slug})`);
        skipped++;
        continue;
      }

      await prisma.house.create({
        data: {
          slug:        h.slug,
          name:        h.name,
          tier,
          country:     h.country,
          foundedYear: h.foundedYear,
          website:     h.website,
          description: h.description,
        },
      });
      inserted++;
    }
  }

  console.log(`Done — inserted: ${inserted}  updated: ${updated}  skipped: ${skipped}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
