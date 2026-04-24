/**
 * src/app/api/collections/route.ts
 *
 * GET  /api/collections?status=OWNED&page=0&sort=pinned_recent
 *      Returns the current user's wardrobe.
 *
 * POST /api/collections
 *      Adds a fragrance to the current user's collection.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getWardrobe, addToCollection } from "@/lib/collections";

const VALID_STATUSES = ["OWNED", "WISHLISTED", "TRIED", "BLIND_BOUGHT", "DECANTED", "SOLD"];

export async function GET(req: NextRequest) {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = req.nextUrl;
  const statusParam = searchParams.getAll("status");   // ?status=OWNED&status=TRIED
  const page     = Math.max(0, parseInt(searchParams.get("page") ?? "0", 10));
  const pageSize = Math.min(48, Math.max(1, parseInt(searchParams.get("pageSize") ?? "24", 10)));
  const sort     = (searchParams.get("sort") ?? "pinned_recent") as
    "pinned_recent" | "name" | "rating" | "date_added";

  const status = statusParam.filter((s) => VALID_STATUSES.includes(s));

  const result = await getWardrobe(auth.user.id, {
    status: status.length > 0 ? status : undefined,
    page,
    pageSize,
    sort,
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

  const { fragranceId, status } = body as Record<string, unknown>;

  if (!fragranceId || typeof fragranceId !== "string") {
    return NextResponse.json(
      { ok: false, error: "fragranceId is required", code: "MISSING_FIELD" },
      { status: 400 }
    );
  }
  if (!status || !VALID_STATUSES.includes(status as string)) {
    return NextResponse.json(
      { ok: false, error: `status must be one of: ${VALID_STATUSES.join(", ")}`, code: "INVALID_FIELD" },
      { status: 400 }
    );
  }

  const input = body as any;

  try {
    const entry = await addToCollection(auth.user.id, {
      fragranceId,
      status: status as any,
      personalRating:  input.personalRating  ?? undefined,
      personalNote:    input.personalNote    ?? undefined,
      purchasePrice:   input.purchasePrice   ?? undefined,
      purchaseCurrency:input.purchaseCurrency ?? undefined,
      purchaseDate:    input.purchaseDate    ?? undefined,
      bottleSize:      input.bottleSize      ?? undefined,
    });

    return NextResponse.json({ ok: true, data: entry }, { status: 201 });
  } catch (err: any) {
    const code = err.code ?? "INTERNAL_ERROR";
    const statusCode = code === "DUPLICATE_ENTRY" ? 409 : code === "NOT_FOUND" ? 404 : 500;
    return NextResponse.json({ ok: false, error: err.message, code }, { status: statusCode });
  }
}
