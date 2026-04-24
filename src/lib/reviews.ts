/**
 * src/lib/repositories/reviews.ts
 * All database logic for reviews. API routes are thin — they validate input
 * and call into here. Nothing in this file knows about HTTP.
 */

import { prisma } from "@/lib/prisma";
import type {
  CreateReviewInput,
  UpdateReviewInput,
  ReviewsResponse,
  ReviewStats,
  Season,
  Occasion,
} from "@/types/ugc";
import { Prisma } from "@prisma/client";

// ── Include shape (reused across queries) ─────────────────────────────────────

const reviewInclude = {
  user: {
    select: { id: true, username: true, displayName: true, avatarUrl: true },
  },
  votes: {
    select: { userId: true, helpful: true },
  },
} satisfies Prisma.ReviewInclude;

// ── Transform DB row → API shape ──────────────────────────────────────────────

function toReview(row: Prisma.ReviewGetPayload<{ include: typeof reviewInclude }>, currentUserId?: string) {
  const userVoteRow = currentUserId
    ? row.votes.find((v) => v.userId === currentUserId)
    : undefined;

  return {
    id: row.id,
    fragranceId: row.fragranceId,
    user: {
      id: row.user.id,
      username: row.user.username,
      displayName: row.user.displayName,
      avatarUrl: row.user.avatarUrl,
    },
    title: row.title,
    body: row.body,
    rating: row.rating,
    longevityRating: row.longevityRating,
    projectionRating: row.projectionRating,
    valueRating: row.valueRating,
    seasons: row.seasons as Season[],
    occasions: row.occasions as Occasion[],
    bottleOwned: row.bottleOwned,
    bottleSize: row.bottleSize,
    purchaseYear: row.purchaseYear,
    helpfulCount: row.helpfulCount,
    notHelpfulCount: row.notHelpfulCount,
    userVote: userVoteRow
      ? userVoteRow.helpful
        ? ("helpful" as const)
        : ("not_helpful" as const)
      : null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

// ── Aggregate stats helper ────────────────────────────────────────────────────

async function getReviewStats(fragranceId: string): Promise<ReviewStats> {
  const [agg, distribution] = await Promise.all([
    prisma.review.aggregate({
      where: { fragranceId, published: true },
      _avg: {
        rating: true,
        longevityRating: true,
        projectionRating: true,
        valueRating: true,
      },
      _count: { id: true },
    }),
    prisma.review.groupBy({
      by: ["rating"],
      where: { fragranceId, published: true },
      _count: true,
    }),
  ]);

  // Build 1–5 distribution map
  const dist: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 };
  for (const row of distribution) {
    const key = String(Math.round(row.rating));
    dist[key] = (dist[key] ?? 0) + (row as any)._count;
  }

  return {
    avgRating: agg._avg.rating,
    avgLongevity: agg._avg.longevityRating,
    avgProjection: agg._avg.projectionRating,
    avgValue: agg._avg.valueRating,
    total: agg._count.id,
    distribution: dist,
  };
}

// ── Recompute cached aggregates on fragrance row ──────────────────────────────

async function refreshFragranceRating(fragranceId: string) {
  const agg = await prisma.review.aggregate({
    where: { fragranceId, published: true },
    _avg: { rating: true },
    _count: { id: true },
  });

  await prisma.fragrance.update({
    where: { id: fragranceId },
    data: {
      avgUserRating: agg._avg.rating ?? null,
      reviewCount: agg._count.id,
    },
  });
}

// ── Exported repository functions ─────────────────────────────────────────────

export async function listReviews(
  fragranceId: string,
  {
    page = 0,
    pageSize = 12,
    sort = "helpful",
    currentUserId,
  }: {
    page?: number;
    pageSize?: number;
    sort?: "helpful" | "recent" | "rating_high" | "rating_low";
    currentUserId?: string;
  } = {}
): Promise<ReviewsResponse> {
  const orderBy: Prisma.ReviewOrderByWithRelationInput =
    sort === "helpful"      ? { helpfulCount: "desc" }
    : sort === "recent"     ? { createdAt: "desc" }
    : sort === "rating_high"? { rating: "desc" }
    :                         { rating: "asc" };

  const [rows, stats] = await Promise.all([
    prisma.review.findMany({
      where: { fragranceId, published: true },
      include: reviewInclude,
      orderBy,
      take: pageSize,
      skip: page * pageSize,
    }),
    getReviewStats(fragranceId),
  ]);

  return {
    reviews: rows.map((r) => toReview(r, currentUserId)),
    total: stats.total,
    page,
    pageSize,
    hasMore: page * pageSize + rows.length < stats.total,
    stats,
  };
}

export async function getReviewById(id: string, currentUserId?: string) {
  const row = await prisma.review.findUnique({
    where: { id },
    include: reviewInclude,
  });
  if (!row) return null;
  return toReview(row, currentUserId);
}

export async function createReview(userId: string, input: CreateReviewInput) {
  // Guard: one review per user per fragrance (enforced in schema too)
  const existing = await prisma.review.findUnique({
    where: { userId_fragranceId: { userId, fragranceId: input.fragranceId } },
    select: { id: true },
  });
  if (existing) {
    throw Object.assign(new Error("You've already reviewed this fragrance"), {
      code: "DUPLICATE_REVIEW",
    });
  }

  // Validate fragrance exists
  const fragrance = await prisma.fragrance.findUnique({
    where: { id: input.fragranceId },
    select: { id: true },
  });
  if (!fragrance) {
    throw Object.assign(new Error("Fragrance not found"), { code: "NOT_FOUND" });
  }

  const row = await prisma.review.create({
    data: {
      userId,
      fragranceId: input.fragranceId,
      title: input.title ?? null,
      body: input.body,
      rating: Math.min(5, Math.max(1, input.rating)),
      longevityRating: input.longevityRating ?? null,
      projectionRating: input.projectionRating ?? null,
      valueRating: input.valueRating ?? null,
      seasons: (input.seasons ?? []) as any,
      occasions: (input.occasions ?? []) as any,
      bottleOwned: input.bottleOwned ?? false,
      bottleSize: input.bottleSize ?? null,
      purchaseYear: input.purchaseYear ?? null,
    },
    include: reviewInclude,
  });

  // Refresh cached aggregate on fragrance
  await refreshFragranceRating(input.fragranceId);

  return toReview(row, userId);
}

export async function updateReview(
  userId: string,
  input: UpdateReviewInput
) {
  const existing = await prisma.review.findUnique({
    where: { id: input.id },
    select: { id: true, userId: true, fragranceId: true },
  });

  if (!existing) {
    throw Object.assign(new Error("Review not found"), { code: "NOT_FOUND" });
  }
  if (existing.userId !== userId) {
    throw Object.assign(new Error("Not your review"), { code: "FORBIDDEN" });
  }

  const row = await prisma.review.update({
    where: { id: input.id },
    data: {
      ...(input.title !== undefined     && { title: input.title }),
      ...(input.body                    && { body: input.body }),
      ...(input.rating !== undefined    && { rating: Math.min(5, Math.max(1, input.rating)) }),
      ...(input.longevityRating  !== undefined && { longevityRating: input.longevityRating }),
      ...(input.projectionRating !== undefined && { projectionRating: input.projectionRating }),
      ...(input.valueRating      !== undefined && { valueRating: input.valueRating }),
      ...(input.seasons    && { seasons: input.seasons as any }),
      ...(input.occasions  && { occasions: input.occasions as any }),
      ...(input.bottleOwned  !== undefined && { bottleOwned: input.bottleOwned }),
      ...(input.bottleSize   !== undefined && { bottleSize: input.bottleSize }),
      ...(input.purchaseYear !== undefined && { purchaseYear: input.purchaseYear }),
    },
    include: reviewInclude,
  });

  await refreshFragranceRating(existing.fragranceId);
  return toReview(row, userId);
}

export async function deleteReview(userId: string, reviewId: string) {
  const existing = await prisma.review.findUnique({
    where: { id: reviewId },
    select: { id: true, userId: true, fragranceId: true },
  });

  if (!existing) {
    throw Object.assign(new Error("Review not found"), { code: "NOT_FOUND" });
  }
  if (existing.userId !== userId) {
    throw Object.assign(new Error("Not your review"), { code: "FORBIDDEN" });
  }

  await prisma.review.delete({ where: { id: reviewId } });
  await refreshFragranceRating(existing.fragranceId);
}

export async function voteReview(
  userId: string,
  reviewId: string,
  helpful: boolean
): Promise<{ helpfulCount: number; notHelpfulCount: number; userVote: "helpful" | "not_helpful" | null }> {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    select: { id: true, userId: true },
  });
  if (!review) {
    throw Object.assign(new Error("Review not found"), { code: "NOT_FOUND" });
  }
  // Users can't vote on their own reviews
  if (review.userId === userId) {
    throw Object.assign(new Error("Cannot vote on your own review"), {
      code: "SELF_VOTE",
    });
  }

  // Upsert the vote
  const existingVote = await prisma.reviewVote.findUnique({
    where: { userId_reviewId: { userId, reviewId } },
  });

  let userVote: "helpful" | "not_helpful" | null;

  if (existingVote && existingVote.helpful === helpful) {
    // Toggle off: clicking the same vote again removes it
    await prisma.reviewVote.delete({
      where: { userId_reviewId: { userId, reviewId } },
    });
    userVote = null;
  } else {
    await prisma.reviewVote.upsert({
      where: { userId_reviewId: { userId, reviewId } },
      create: { userId, reviewId, helpful },
      update: { helpful },
    });
    userVote = helpful ? "helpful" : "not_helpful";
  }

  // Recount from source of truth
  const [helpfulCount, notHelpfulCount] = await Promise.all([
    prisma.reviewVote.count({ where: { reviewId, helpful: true } }),
    prisma.reviewVote.count({ where: { reviewId, helpful: false } }),
  ]);

  // Write back to denormalised counts
  await prisma.review.update({
    where: { id: reviewId },
    data: { helpfulCount, notHelpfulCount },
  });

  return { helpfulCount, notHelpfulCount, userVote };
}
