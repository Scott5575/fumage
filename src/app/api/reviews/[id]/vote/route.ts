/**
 * src/app/api/reviews/[id]/vote/route.ts
 *
 * POST /api/reviews/:id/vote   { helpful: true | false }
 *
 * Toggles: clicking the same vote again removes it.
 * Users cannot vote on their own reviews.
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { voteReview } from "@/lib/reviews";

export async function POST(
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

  const { helpful } = body as { helpful?: unknown };

  if (typeof helpful !== "boolean") {
    return NextResponse.json(
      { ok: false, error: "'helpful' must be true or false", code: "INVALID_FIELD" },
      { status: 400 }
    );
  }

  try {
    const result = await voteReview(auth.user.id, id, helpful);
    return NextResponse.json({ ok: true, data: result });
  } catch (err: any) {
    const code = err.code ?? "INTERNAL_ERROR";
    const status = code === "NOT_FOUND" ? 404 : code === "SELF_VOTE" ? 422 : 500;
    return NextResponse.json({ ok: false, error: err.message, code }, { status });
  }
}
