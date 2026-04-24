/**
 * src/types/ugc.ts
 * Shared TypeScript types for the Fumage UGC system.
 * These mirror the Prisma models but are safe to import in client components.
 */

// ── Enums (duplicated from Prisma for client-side use) ────────────────────────

export type CollectionStatus =
  | "OWNED"
  | "WISHLISTED"
  | "TRIED"
  | "BLIND_BOUGHT"
  | "DECANTED"
  | "SOLD";

export type Season = "SPRING" | "SUMMER" | "FALL" | "WINTER";
export type Occasion = "CASUAL" | "BUSINESS" | "DATE" | "SPECIAL" | "NIGHT_OUT";

// ── Fragrance (summary — used in cards) ──────────────────────────────────────

export interface FragranceSummary {
  id: string;
  slug: string;
  name: string;
  house: { name: string };
  year: number | null;
  priceTier: string;        // PriceTier enum: BUDGET | ACCESSIBLE | MID | PREMIUM | ULTRA
  priceRange: string | null;
  communityRating: number | null;
  avgUserRating: number | null;
  reviewCount: number;
  popularityScore: number | null;
  family: string;
}

// ── Reviews ───────────────────────────────────────────────────────────────────

export interface ReviewAuthor {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
}

export interface Review {
  id: string;
  fragranceId: string;
  fragrance?: FragranceSummary;
  user: ReviewAuthor;
  title: string | null;
  body: string;
  rating: number;              // 1.0–5.0
  longevityRating: number | null;  // 1–10
  projectionRating: number | null; // 1–10
  valueRating: number | null;      // 1–10
  seasons: Season[];
  occasions: Occasion[];
  bottleOwned: boolean;
  bottleSize: string | null;
  purchaseYear: number | null;
  helpfulCount: number;
  notHelpfulCount: number;
  userVote: "helpful" | "not_helpful" | null;  // current user's vote
  createdAt: string;   // ISO date string
  updatedAt: string;
}

export interface CreateReviewInput {
  fragranceId: string;
  title?: string;
  body: string;
  rating: number;
  longevityRating?: number;
  projectionRating?: number;
  valueRating?: number;
  seasons?: Season[];
  occasions?: Occasion[];
  bottleOwned?: boolean;
  bottleSize?: string;
  purchaseYear?: number;
}

export interface UpdateReviewInput extends Partial<CreateReviewInput> {
  id: string;
}

export interface ReviewsResponse {
  reviews: Review[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  stats: ReviewStats;
}

export interface ReviewStats {
  avgRating: number | null;
  avgLongevity: number | null;
  avgProjection: number | null;
  avgValue: number | null;
  total: number;
  distribution: Record<string, number>;  // "1"–"5" → count
}

// ── Collections / Wardrobe ────────────────────────────────────────────────────

export interface CollectionEntry {
  id: string;
  userId: string;
  fragranceId: string;
  fragrance: FragranceSummary;
  status: CollectionStatus;
  personalRating: number | null;
  personalNote: string | null;
  purchasePrice: number | null;
  purchaseCurrency: string;
  purchaseDate: string | null;
  bottleSize: string | null;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCollectionInput {
  fragranceId: string;
  status: CollectionStatus;
  personalRating?: number;
  personalNote?: string;
  purchasePrice?: number;
  purchaseCurrency?: string;
  purchaseDate?: string;
  bottleSize?: string;
}

export interface UpdateCollectionInput extends Partial<AddToCollectionInput> {
  id: string;
  pinned?: boolean;
}

export interface WardrobeResponse {
  entries: CollectionEntry[];
  total: number;
  stats: WardrobeStats;
}

export interface WardrobeStats {
  owned: number;
  wishlisted: number;
  tried: number;
  blindBought: number;
  decanted: number;
}

// ── API response envelope ─────────────────────────────────────────────────────

export interface ApiSuccess<T> {
  ok: true;
  data: T;
}

export interface ApiError {
  ok: false;
  error: string;
  code?: string;  // e.g. "DUPLICATE_REVIEW", "NOT_FOUND", "UNAUTHORIZED"
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ── UI helpers ────────────────────────────────────────────────────────────────

export const COLLECTION_STATUS_LABELS: Record<CollectionStatus, string> = {
  OWNED:       "In Collection",
  WISHLISTED:  "Wishlisted",
  TRIED:       "Tried",
  BLIND_BOUGHT:"Blind Bought",
  DECANTED:    "Decanted",
  SOLD:        "Sold",
};

export const COLLECTION_STATUS_ICONS: Record<CollectionStatus, string> = {
  OWNED:       "✦",
  WISHLISTED:  "◇",
  TRIED:       "◎",
  BLIND_BOUGHT:"⬡",
  DECANTED:    "⬤",
  SOLD:        "✕",
};

export const SEASON_LABELS: Record<Season, string> = {
  SPRING: "Spring",
  SUMMER: "Summer",
  FALL:   "Fall",
  WINTER: "Winter",
};

export const OCCASION_LABELS: Record<Occasion, string> = {
  CASUAL:    "Casual",
  BUSINESS:  "Business",
  DATE:      "Date",
  SPECIAL:   "Special",
  NIGHT_OUT: "Night Out",
};
