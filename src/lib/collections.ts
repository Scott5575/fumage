/**
 * src/lib/repositories/collections.ts
 * All database logic for user collections / wardrobe.
 */

import { prisma } from "@/lib/prisma";
import type {
  AddToCollectionInput,
  UpdateCollectionInput,
  WardrobeResponse,
  WardrobeStats,
  CollectionStatus,
} from "@/types/ugc";
import { Prisma } from "@prisma/client";

// ── Include shape ─────────────────────────────────────────────────────────────

const collectionInclude = {
  fragrance: {
    select: {
      id: true,
      slug: true,
      name: true,
      house: { select: { name: true } },
      year: true,
      priceTier: true,
      priceRange: true,
      communityRating: true,
      avgUserRating: true,
      reviewCount: true,
      popularityScore: true,
      family: true,
    },
  },
} satisfies Prisma.UserCollectionInclude;

// ── Transform ─────────────────────────────────────────────────────────────────

function toEntry(row: Prisma.UserCollectionGetPayload<{ include: typeof collectionInclude }>) {
  return {
    id: row.id,
    userId: row.userId,
    fragranceId: row.fragranceId,
    fragrance: row.fragrance,
    status: row.status as CollectionStatus,
    personalRating: row.personalRating ? Number(row.personalRating) : null,
    personalNote: row.personalNote,
    purchasePrice: row.purchasePrice ? Number(row.purchasePrice) : null,
    purchaseCurrency: row.purchaseCurrency ?? "USD",
    purchaseDate: row.purchaseDate?.toISOString() ?? null,
    bottleSize: row.bottleSize,
    pinned: row.pinned,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

// ── Stats ─────────────────────────────────────────────────────────────────────

async function getWardrobeStats(userId: string): Promise<WardrobeStats> {
  const counts = await prisma.userCollection.groupBy({
    by: ["status"],
    where: { userId },
    _count: true,
  });

  const map: Record<string, number> = {};
  for (const row of counts) {
    map[row.status] = (row as any)._count;
  }

  return {
    owned:       map["OWNED"]       ?? 0,
    wishlisted:  map["WISHLISTED"]  ?? 0,
    tried:       map["TRIED"]       ?? 0,
    blindBought: map["BLIND_BOUGHT"]?? 0,
    decanted:    map["DECANTED"]    ?? 0,
  };
}

// ── Exported functions ────────────────────────────────────────────────────────

export async function getWardrobe(
  userId: string,
  {
    status,
    page = 0,
    pageSize = 24,
    sort = "pinned_recent",
  }: {
    status?: string | string[];
    page?: number;
    pageSize?: number;
    sort?: "pinned_recent" | "name" | "rating" | "date_added";
  } = {}
): Promise<WardrobeResponse> {
  const where: Prisma.UserCollectionWhereInput = {
    userId,
    ...(status && {
      status: {
        in: (Array.isArray(status) ? status : [status]) as any,
      },
    }),
  };

  const orderBy: Prisma.UserCollectionOrderByWithRelationInput[] =
    sort === "name"
      ? [{ fragrance: { name: "asc" } }]
      : sort === "rating"
      ? [{ personalRating: { sort: "desc", nulls: "last" } }]
      : sort === "date_added"
      ? [{ createdAt: "desc" }]
      : [{ pinned: "desc" }, { updatedAt: "desc" }];

  const [rows, total, stats] = await Promise.all([
    prisma.userCollection.findMany({
      where,
      include: collectionInclude,
      orderBy,
      take: pageSize,
      skip: page * pageSize,
    }),
    prisma.userCollection.count({ where }),
    getWardrobeStats(userId),
  ]);

  return {
    entries: rows.map(toEntry),
    total,
    stats,
  };
}

export async function getCollectionEntry(userId: string, fragranceId: string) {
  const row = await prisma.userCollection.findUnique({
    where: { userId_fragranceId: { userId, fragranceId } },
    include: collectionInclude,
  });
  return row ? toEntry(row) : null;
}

export async function addToCollection(userId: string, input: AddToCollectionInput) {
  const existing = await prisma.userCollection.findUnique({
    where: { userId_fragranceId: { userId, fragranceId: input.fragranceId } },
    select: { id: true },
  });

  if (existing) {
    throw Object.assign(
      new Error("Already in your collection — use PATCH to update"),
      { code: "DUPLICATE_ENTRY" }
    );
  }

  const fragrance = await prisma.fragrance.findUnique({
    where: { id: input.fragranceId },
    select: { id: true },
  });
  if (!fragrance) {
    throw Object.assign(new Error("Fragrance not found"), { code: "NOT_FOUND" });
  }

  const row = await prisma.userCollection.create({
    data: {
      userId,
      fragranceId: input.fragranceId,
      status: input.status as any,
      personalRating: input.personalRating ?? null,
      personalNote: input.personalNote ?? null,
      purchasePrice: input.purchasePrice
        ? new (require("@prisma/client/runtime/library").Decimal)(input.purchasePrice)
        : null,
      purchaseCurrency: input.purchaseCurrency ?? "USD",
      purchaseDate: input.purchaseDate ? new Date(input.purchaseDate) : null,
      bottleSize: input.bottleSize ?? null,
    },
    include: collectionInclude,
  });

  return toEntry(row);
}

export async function updateCollectionEntry(
  userId: string,
  input: UpdateCollectionInput
) {
  const existing = await prisma.userCollection.findUnique({
    where: { id: input.id },
    select: { id: true, userId: true },
  });

  if (!existing) {
    throw Object.assign(new Error("Collection entry not found"), {
      code: "NOT_FOUND",
    });
  }
  if (existing.userId !== userId) {
    throw Object.assign(new Error("Not your collection"), { code: "FORBIDDEN" });
  }

  const row = await prisma.userCollection.update({
    where: { id: input.id },
    data: {
      ...(input.status        && { status: input.status as any }),
      ...(input.personalRating  !== undefined && { personalRating: input.personalRating }),
      ...(input.personalNote    !== undefined && { personalNote: input.personalNote }),
      ...(input.bottleSize      !== undefined && { bottleSize: input.bottleSize }),
      ...(input.pinned          !== undefined && { pinned: input.pinned }),
      ...(input.purchaseDate    !== undefined && {
        purchaseDate: input.purchaseDate ? new Date(input.purchaseDate) : null,
      }),
      ...(input.purchasePrice !== undefined && {
        purchasePrice: input.purchasePrice
          ? new (require("@prisma/client/runtime/library").Decimal)(input.purchasePrice)
          : null,
      }),
      ...(input.purchaseCurrency && { purchaseCurrency: input.purchaseCurrency }),
    },
    include: collectionInclude,
  });

  return toEntry(row);
}

export async function removeFromCollection(userId: string, entryId: string) {
  const existing = await prisma.userCollection.findUnique({
    where: { id: entryId },
    select: { id: true, userId: true },
  });

  if (!existing) {
    throw Object.assign(new Error("Collection entry not found"), {
      code: "NOT_FOUND",
    });
  }
  if (existing.userId !== userId) {
    throw Object.assign(new Error("Not your collection"), { code: "FORBIDDEN" });
  }

  await prisma.userCollection.delete({ where: { id: entryId } });
}
