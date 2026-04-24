import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  return {
    id: user.id,
    email: user.email!,
    name: user.user_metadata?.full_name ?? null,
    image: user.user_metadata?.avatar_url ?? null,
  };
}

export async function requireAuth(): Promise<
  { user: SessionUser } | NextResponse
> {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json(
      { ok: false, error: "Authentication required", code: "UNAUTHORIZED" },
      { status: 401 }
    );
  }
  return { user };
}

export async function requireOwnership(
  ownerId: string
): Promise<{ user: SessionUser } | NextResponse> {
  const auth = await requireAuth();
  if (auth instanceof NextResponse) return auth;

  if (auth.user.id !== ownerId) {
    return NextResponse.json(
      { ok: false, error: "You don't own this resource", code: "FORBIDDEN" },
      { status: 403 }
    );
  }
  return auth;
}
