import { Meilisearch } from "meilisearch";

export const SEARCH_INDEX = "fragrances";

export function getSearchClient() {
  return new Meilisearch({
    host: process.env.MEILISEARCH_HOST!,
    apiKey: process.env.MEILISEARCH_API_KEY!,
  });
}

export interface FragranceDocument {
  id: string;
  slug: string;
  name: string;
  houseName: string;
  family: string;
  subfamily: string | null;
  year: number | null;
  priceTier: string;
  priceRange: string | null;
  popularityScore: number | null;
  notes: string[];
  sentiment: string | null;
  seasons: string[];
  occasions: string[];
}
