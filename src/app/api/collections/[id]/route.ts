/**
 * src/app/api/collections/[id]/route.ts
 *
 * PATCH  /api/collections/:id   Update a collection entry
 * DELETE /api/collections/:id   Remove a collection entry
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { updateCollectionEntry, removeFromCollection } from "@/lib/collections";

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

  const VALID_STATUSES = ["OWNED", "WISHLISTED", "TRIED", "BLIND_BOUGHT", "DECANTED", "SOLD"];
  const input = body as Record<string, unknown>;

  if (input.status !== undefined && !VALID_STATUSES.includes(input.status as string)) {
    return NextResponse.json(
      { ok: false, error: "Invalid status", code: "INVALID_FIELD" },
      { status: 400 }
    );
  }

  try {
    const updated = await updateCollectionEntry(auth.user.id, {
      id,
      ...(input.status          !== undefined && { status:          input.status as any }),
      ...(input.personalRating  !== undefined && { personalRating:  input.personalRating as number }),
      ...(input.personalNote    !== undefined && { personalNote:    input.personalNote as string }),
      ...(input.bottleSize      !== undefined && { bottleSize:      input.bottleSize as string }),
      ...(input.pinned          !== undefined && { pinned:          input.pinned as boolean }),
      ...(input.purchaseDate    !== undefined && { purchaseDate:    input.purchaseDate as string }),
      ...(input.purchasePrice   !== undefined && { purchasePrice:   input.purchasePrice as number }),
      ...(input.purchaseCurrency !== undefined && { purchaseCurrency: input.purchaseCurrency as string }),
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
    await removeFromCollection(auth.user.id, id);
    return NextResponse.json({ ok: true, data: { deleted: true } });
  } catch (err: any) {
    const code = err.code ?? "INTERNAL_ERROR";
    const status = code === "NOT_FOUND" ? 404 : code === "FORBIDDEN" ? 403 : 500;
    return NextResponse.json({ ok: false, error: err.message, code }, { status });
  }
}
