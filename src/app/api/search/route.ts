import { getSearchClient, SEARCH_INDEX } from "@/lib/search";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 48);

  if (!q) {
    return NextResponse.json({ hits: [], estimatedTotalHits: 0, query: "" });
  }

  try {
    const client = getSearchClient();
    const index = client.index(SEARCH_INDEX);
    const results = await index.search(q, {
      limit,
      attributesToRetrieve: [
        "id",
        "slug",
        "name",
        "houseName",
        "family",
        "priceTier",
        "popularityScore",
      ],
    });
    return NextResponse.json(results);
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ error: "Search unavailable" }, { status: 503 });
  }
}
