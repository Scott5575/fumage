/**
 * src/app/api/reviews/[id]/route.ts
 *
 * PATCH  /api/reviews/:id   (update — owner only)
 * DELETE /api/reviews/:id   (delete — owner only)
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { updateReview, deleteReview } from "@/lib/reviews";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

  const input = body as Record<string, unknown>;

  // Validate any provided rating
  if (input.rating !== undefined) {
    const r = Number(input.rating);
    if (isNaN(r) || r < 1 || r > 5) {
      return NextResponse.json(
        { ok: false, error: "Rating must be between 1 and 5", code: "INVALID_FIELD" },
        { status: 400 }
      );
    }
  }

  try {
    const updated = await updateReview(auth.user.id, {
      id,
      ...(input.title           !== undefined && { title:           input.title as string }),
      ...(input.body            !== undefined && { body:            input.body as string }),
      ...(input.rating          !== undefined && { rating:          Number(input.rating) }),
      ...(input.longevityRating !== undefined && { longevityRating: input.longevityRating as number }),
      ...(input.projectionRating !== undefined && { projectionRating: input.projectionRating as number }),
      ...(input.valueRating     !== undefined && { valueRating:     input.valueRating as number }),
      ...(input.seasons         !== undefined && { seasons:         input.seasons as any }),
      ...(input.occasions       !== undefined && { occasions:       input.occasions as any }),
      ...(input.bottleOwned     !== undefined && { bottleOwned:     input.bottleOwned as boolean }),
      ...(input.bottleSize      !== undefined && { bottleSize:      input.bottleSize as string }),
      ...(input.purchaseYear    !== undefined && { purchaseYear:    input.purchaseYear as number }),
    });

    return NextResponse.json({ ok: true, data: updated });
  } catch (err: any) {
    const code = err.code ?? "INTERNAL_ERROR";
    const status = code === "NOT_FOUND" ? 404 : code === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ ok: false, error: err.message, code }, { status });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  try {
    await deleteReview(auth.user.id, id);
    return NextResponse.json({ ok: true, data: { deleted: true } });
  } catch (err: any) {
    const code = err.code ?? "INTERNAL_ERROR";
    const status = code === "NOT_FOUND" ? 404 : code === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ ok: false, error: err.message, code }, { status });
  }
}
