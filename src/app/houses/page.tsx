import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { HouseTier } from "@prisma/client";

const TIER_ORDER: HouseTier[] = [
  "DESIGNER",
  "NICHE",
  "ULTRA_LUXURY",
  "ARTISAN",
  "BUDGET_NICHE",
];

const TIER_LABELS: Record<HouseTier, string> = {
  DESIGNER:     "Designer",
  NICHE:        "Niche",
  ULTRA_LUXURY: "Ultra Luxury",
  ARTISAN:      "Artisan",
  BUDGET_NICHE: "Budget / Accessible",
  CELEBRITY:    "Celebrity",
};

const TIER_DESCRIPTIONS: Partial<Record<HouseTier, string>> = {
  DESIGNER:     "Legacy and mass-market houses with wide distribution — Dior, Chanel, YSL, Hermès.",
  NICHE:        "Independent perfume houses focused on craft over mass appeal — Creed, Amouage, Le Labo.",
  ULTRA_LUXURY: "Ultra-premium houses where bottles run $400 and up — Clive Christian, Roja Parfums.",
  ARTISAN:      "Small-batch, experimental, or cult houses — Bogue, Slumberhouse, Zoologist.",
  BUDGET_NICHE: "Accessible niche: serious compositions at accessible prices — Lattafa, Armaf, Al Haramain.",
};

export default async function HousesPage() {
  const houses = await prisma.house.findMany({
    include: { _count: { select: { fragrances: true } } },
    orderBy: { name: "asc" },
  });

  const grouped = TIER_ORDER.reduce<
    Record<string, typeof houses>
  >((acc, tier) => {
    acc[tier] = houses.filter((h) => h.tier === tier);
    return acc;
  }, {} as Record<string, typeof houses>);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.2em] text-amber-500 mb-2">
          Directory
        </p>
        <h1 className="text-3xl font-light text-stone-200">Houses</h1>
        <p className="text-stone-500 text-sm mt-2">
          {houses.length} fragrance houses
        </p>
      </div>

      <div className="space-y-14">
        {TIER_ORDER.map((tier) => {
          const group = grouped[tier];
          if (!group || group.length === 0) return null;

          return (
            <section key={tier}>
              <div className="mb-5">
                <h2 className="text-[10px] uppercase tracking-[0.2em] text-amber-500/70 mb-1">
                  {TIER_LABELS[tier]}
                </h2>
                {TIER_DESCRIPTIONS[tier] && (
                  <p className="text-stone-600 text-xs max-w-xl">
                    {TIER_DESCRIPTIONS[tier]}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                {group.map((house) => (
                  <Link
                    key={house.id}
                    href={`/houses/${house.slug}`}
                    className="group border border-stone-800 hover:border-stone-600 rounded p-4 transition-colors"
                  >
                    <p className="text-sm text-stone-200 font-light leading-snug group-hover:text-stone-100 transition-colors">
                      {house.name}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      {house.country && (
                        <p className="text-[10px] text-stone-600">{house.country}</p>
                      )}
                      <p className="text-[10px] text-stone-700 ml-auto">
                        {house._count.fragrances}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
