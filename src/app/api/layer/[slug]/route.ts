import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const frag = await prisma.fragrance.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      house: { select: { name: true } },
      family: true,
      subfamily: true,
      longevity: true,
      projection: true,
      sillage: true,
      notes: {
        select: {
          position: true,
          note: { select: { name: true } },
        },
        orderBy: { order: "asc" },
      },
      seasons: { select: { season: true } },
      occasions: { select: { occasion: true } },
    },
  });

  if (!frag) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const notes: Record<string, string[]> = { TOP: [], MIDDLE: [], BASE: [], ACCORD: [] };
  for (const fn of frag.notes) {
    notes[fn.position]?.push(fn.note.name);
  }

  return NextResponse.json({
    id: frag.id,
    slug: frag.slug,
    name: frag.name,
    houseName: frag.house.name,
    family: frag.family,
    subfamily: frag.subfamily,
    longevity: frag.longevity,
    projection: frag.projection,
    sillage: frag.sillage,
    notes,
    seasons: frag.seasons.map((s) => s.season),
    occasions: frag.occasions.map((o) => o.occasion),
  });
}
