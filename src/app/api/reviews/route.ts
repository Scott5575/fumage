/**
 * src/app/api/reviews/route.ts
 *
 * GET  /api/reviews?fragranceId=X&page=0&pageSize=12&sort=helpful
 * POST /api/reviews   { fragranceId, body, rating, ... }
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { listReviews, createReview } from "@/lib/reviews";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const fragranceId = searchParams.get("fragranceId");

  if (!fragranceId) {
    return NextResponse.json(
      { ok: false, error: "fragranceId is required", code: "MISSING_PARAM" },
      { status: 400 }
    );
  }

  const page     = Math.max(0, parseInt(searchParams.get("page") ?? "0", 10));
  const pageSize = Math.min(48, Math.max(1, parseInt(searchParams.get("pageSize") ?? "12", 10)));
  const sort     = (searchParams.get("sort") ?? "helpful") as "helpful" | "recent" | "rating_high" | "rating_low";

  // Optional: include current user's votes if authenticated
  const currentUser = await getCurrentUser();

  const result = await listReviews(fragranceId, {
    page,
    pageSize,
    sort,
    currentUserId: currentUser?.id,
  });

  return NextResponse.json({ ok: true, data: result });
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON", code: "BAD_REQUEST" },
      { status: 400 }
    );
  }

  // Validate required fields
  const { fragranceId, body: reviewBody, rating } = body as Record<string, unknown>;

  if (!fragranceId || typeof fragranceId !== "string") {
    return NextResponse.json(
      { ok: false, error: "fragranceId is required", code: "MISSING_FIELD" },
      { status: 400 }
    );
  }
  if (!reviewBody || typeof reviewBody !== "string" || reviewBody.trim().length < 10) {
    return NextResponse.json(
      { ok: false, error: "Review body must be at least 10 characters", code: "INVALID_FIELD" },
      { status: 400 }
    );
  }
  if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json(
      { ok: false, error: "Rating must be between 1 and 5", code: "INVALID_FIELD" },
      { status: 400 }
    );
  }

  try {
    const review = await createReview(auth.user.id, {
      fragranceId,
      body: (reviewBody as string).trim(),
      rating: rating as number,
      title: typeof (body as any).title === "string" ? (body as any).title : undefined,
      longevityRating:  (body as any).longevityRating  ?? undefined,
      projectionRating: (body as any).projectionRating ?? undefined,
      valueRating:      (body as any).valueRating      ?? undefined,
      seasons:    (body as any).seasons   ?? [],
      occasions:  (body as any).occasions ?? [],
      bottleOwned:  (body as any).bottleOwned  ?? false,
      bottleSize:   (body as any).bottleSize   ?? undefined,
      purchaseYear: (body as any).purchaseYear ?? undefined,
    });

    return NextResponse.json({ ok: true, data: review }, { status: 201 });
  } catch (err: any) {
    const code = err.code ?? "INTERNAL_ERROR";
    const status = code === "DUPLICATE_REVIEW" ? 409
      : code === "NOT_FOUND" ? 404
      : 500;
    return NextResponse.json({ ok: false, error: err.message, code }, { status });
  }
}
