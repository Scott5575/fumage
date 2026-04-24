-- CreateEnum
CREATE TYPE "FragranceCategory" AS ENUM ('DESIGNER', 'NICHE', 'ULTRA_LUXURY', 'ARTISAN');

-- CreateEnum
CREATE TYPE "ScentFamily" AS ENUM ('FRESH', 'AROMATIC', 'WOODY', 'ORIENTAL', 'GOURMAND', 'LEATHER', 'CITRUS', 'CHYPRE');

-- CreateEnum
CREATE TYPE "NotePosition" AS ENUM ('TOP', 'MIDDLE', 'BASE', 'ACCORD');

-- CreateEnum
CREATE TYPE "PriceTier" AS ENUM ('BUDGET', 'ACCESSIBLE', 'MID', 'PREMIUM', 'ULTRA');

-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('WIDELY_AVAILABLE', 'LIMITED', 'DISCONTINUED', 'SEASONAL');

-- CreateEnum
CREATE TYPE "ComplimentFactor" AS ENUM ('LOW', 'MODERATE', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "TrendDirection" AS ENUM ('RISING', 'STABLE', 'DECLINING');

-- CreateEnum
CREATE TYPE "HypeRating" AS ENUM ('UNDERRATED', 'ACCURATELY_RATED', 'SLIGHTLY_OVERHYPED', 'OVERHYPED');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('SPRING', 'SUMMER', 'FALL', 'WINTER');

-- CreateEnum
CREATE TYPE "Occasion" AS ENUM ('CASUAL', 'BUSINESS', 'DATE', 'SPECIAL', 'NIGHT_OUT');

-- CreateEnum
CREATE TYPE "TimeOfDay" AS ENUM ('DAY', 'NIGHT', 'ALL_DAY');

-- CreateEnum
CREATE TYPE "DupeSimilarity" AS ENUM ('CLOSE', 'STRONG', 'INSPIRED', 'ADJACENT');

-- CreateEnum
CREATE TYPE "CollectionStatus" AS ENUM ('OWNED', 'WISHLISTED', 'TRIED', 'BLIND_BOUGHT', 'DECANTED', 'SOLD');

-- CreateEnum
CREATE TYPE "HouseTier" AS ENUM ('DESIGNER', 'NICHE', 'BUDGET_NICHE', 'ARTISAN', 'CELEBRITY');

-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tier" "HouseTier" NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "foundedYear" INTEGER,
    "website" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fragrance" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "houseId" TEXT NOT NULL,
    "year" INTEGER,
    "category" "FragranceCategory" NOT NULL,
    "family" "ScentFamily" NOT NULL,
    "subfamily" TEXT,
    "priceTier" "PriceTier" NOT NULL,
    "priceRange" TEXT,
    "longevity" INTEGER,
    "projection" INTEGER,
    "sillage" INTEGER,
    "availability" "Availability" NOT NULL DEFAULT 'WIDELY_AVAILABLE',
    "communityRating" DOUBLE PRECISION,
    "popularityScore" INTEGER,
    "sentiment" TEXT,
    "uniqueChars" TEXT,
    "massAppeal" BOOLEAN,
    "complimentFactor" "ComplimentFactor",
    "trend" "TrendDirection",
    "hypeRating" "HypeRating",
    "beginnerNote" TEXT,
    "collectorNote" TEXT,
    "avgUserRating" DOUBLE PRECISION,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "dataSource" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fragrance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "noteType" TEXT,
    "origin" TEXT,
    "description" TEXT,
    "didYouKnow" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FragranceNote" (
    "id" TEXT NOT NULL,
    "fragranceId" TEXT NOT NULL,
    "noteId" TEXT NOT NULL,
    "position" "NotePosition" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FragranceNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FragranceSeason" (
    "fragranceId" TEXT NOT NULL,
    "season" "Season" NOT NULL,

    CONSTRAINT "FragranceSeason_pkey" PRIMARY KEY ("fragranceId","season")
);

-- CreateTable
CREATE TABLE "FragranceOccasion" (
    "fragranceId" TEXT NOT NULL,
    "occasion" "Occasion" NOT NULL,

    CONSTRAINT "FragranceOccasion_pkey" PRIMARY KEY ("fragranceId","occasion")
);

-- CreateTable
CREATE TABLE "FragranceTimeOfDay" (
    "fragranceId" TEXT NOT NULL,
    "timeOfDay" "TimeOfDay" NOT NULL,

    CONSTRAINT "FragranceTimeOfDay_pkey" PRIMARY KEY ("fragranceId","timeOfDay")
);

-- CreateTable
CREATE TABLE "DupeRelationship" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "similarity" "DupeSimilarity" NOT NULL,
    "notes" TEXT,
    "priceNote" TEXT,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DupeRelationship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimilarFragrance" (
    "id" TEXT NOT NULL,
    "fragranceAId" TEXT NOT NULL,
    "fragranceBId" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "SimilarFragrance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "passwordHash" TEXT,
    "experienceLevel" TEXT,
    "preferredFamilies" "ScentFamily"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFollow" (
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFollow_pkey" PRIMARY KEY ("followerId","followingId")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fragranceId" TEXT NOT NULL,
    "title" TEXT,
    "body" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "longevityRating" INTEGER,
    "projectionRating" INTEGER,
    "valueRating" INTEGER,
    "seasons" "Season"[],
    "occasions" "Occasion"[],
    "bottleOwned" BOOLEAN NOT NULL DEFAULT false,
    "bottleSize" TEXT,
    "purchaseYear" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "helpfulCount" INTEGER NOT NULL DEFAULT 0,
    "notHelpfulCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewVote" (
    "userId" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "helpful" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReviewVote_pkey" PRIMARY KEY ("userId","reviewId")
);

-- CreateTable
CREATE TABLE "UserCollection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fragranceId" TEXT NOT NULL,
    "status" "CollectionStatus" NOT NULL,
    "personalRating" DOUBLE PRECISION,
    "personalNote" TEXT,
    "purchasePrice" DECIMAL(10,2),
    "purchaseCurrency" TEXT DEFAULT 'USD',
    "purchaseDate" TIMESTAMP(3),
    "bottleSize" TEXT,
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EditorialContent" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "body" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EditorialContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataImportLog" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "importedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DataImportLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "House_slug_key" ON "House"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "House_name_key" ON "House"("name");

-- CreateIndex
CREATE INDEX "House_tier_idx" ON "House"("tier");

-- CreateIndex
CREATE INDEX "House_slug_idx" ON "House"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Fragrance_slug_key" ON "Fragrance"("slug");

-- CreateIndex
CREATE INDEX "Fragrance_houseId_idx" ON "Fragrance"("houseId");

-- CreateIndex
CREATE INDEX "Fragrance_family_idx" ON "Fragrance"("family");

-- CreateIndex
CREATE INDEX "Fragrance_category_idx" ON "Fragrance"("category");

-- CreateIndex
CREATE INDEX "Fragrance_priceTier_idx" ON "Fragrance"("priceTier");

-- CreateIndex
CREATE INDEX "Fragrance_popularityScore_idx" ON "Fragrance"("popularityScore");

-- CreateIndex
CREATE INDEX "Fragrance_slug_idx" ON "Fragrance"("slug");

-- CreateIndex
CREATE INDEX "Fragrance_year_idx" ON "Fragrance"("year");

-- CreateIndex
CREATE UNIQUE INDEX "Note_name_key" ON "Note"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Note_slug_key" ON "Note"("slug");

-- CreateIndex
CREATE INDEX "Note_slug_idx" ON "Note"("slug");

-- CreateIndex
CREATE INDEX "FragranceNote_fragranceId_idx" ON "FragranceNote"("fragranceId");

-- CreateIndex
CREATE INDEX "FragranceNote_noteId_idx" ON "FragranceNote"("noteId");

-- CreateIndex
CREATE UNIQUE INDEX "FragranceNote_fragranceId_noteId_position_key" ON "FragranceNote"("fragranceId", "noteId", "position");

-- CreateIndex
CREATE INDEX "FragranceSeason_season_idx" ON "FragranceSeason"("season");

-- CreateIndex
CREATE INDEX "FragranceOccasion_occasion_idx" ON "FragranceOccasion"("occasion");

-- CreateIndex
CREATE INDEX "FragranceTimeOfDay_timeOfDay_idx" ON "FragranceTimeOfDay"("timeOfDay");

-- CreateIndex
CREATE INDEX "DupeRelationship_sourceId_idx" ON "DupeRelationship"("sourceId");

-- CreateIndex
CREATE INDEX "DupeRelationship_targetId_idx" ON "DupeRelationship"("targetId");

-- CreateIndex
CREATE UNIQUE INDEX "DupeRelationship_sourceId_targetId_key" ON "DupeRelationship"("sourceId", "targetId");

-- CreateIndex
CREATE INDEX "SimilarFragrance_fragranceAId_idx" ON "SimilarFragrance"("fragranceAId");

-- CreateIndex
CREATE INDEX "SimilarFragrance_fragranceBId_idx" ON "SimilarFragrance"("fragranceBId");

-- CreateIndex
CREATE UNIQUE INDEX "SimilarFragrance_fragranceAId_fragranceBId_key" ON "SimilarFragrance"("fragranceAId", "fragranceBId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Review_fragranceId_idx" ON "Review"("fragranceId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE INDEX "Review_rating_idx" ON "Review"("rating");

-- CreateIndex
CREATE INDEX "Review_createdAt_idx" ON "Review"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_fragranceId_key" ON "Review"("userId", "fragranceId");

-- CreateIndex
CREATE INDEX "UserCollection_userId_idx" ON "UserCollection"("userId");

-- CreateIndex
CREATE INDEX "UserCollection_fragranceId_idx" ON "UserCollection"("fragranceId");

-- CreateIndex
CREATE INDEX "UserCollection_status_idx" ON "UserCollection"("status");

-- CreateIndex
CREATE UNIQUE INDEX "UserCollection_userId_fragranceId_key" ON "UserCollection"("userId", "fragranceId");

-- CreateIndex
CREATE UNIQUE INDEX "EditorialContent_slug_key" ON "EditorialContent"("slug");

-- CreateIndex
CREATE INDEX "EditorialContent_section_idx" ON "EditorialContent"("section");

-- CreateIndex
CREATE INDEX "EditorialContent_slug_idx" ON "EditorialContent"("slug");

-- AddForeignKey
ALTER TABLE "Fragrance" ADD CONSTRAINT "Fragrance_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FragranceNote" ADD CONSTRAINT "FragranceNote_fragranceId_fkey" FOREIGN KEY ("fragranceId") REFERENCES "Fragrance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FragranceNote" ADD CONSTRAINT "FragranceNote_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FragranceSeason" ADD CONSTRAINT "FragranceSeason_fragranceId_fkey" FOREIGN KEY ("fragranceId") REFERENCES "Fragrance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FragranceOccasion" ADD CONSTRAINT "FragranceOccasion_fragranceId_fkey" FOREIGN KEY ("fragranceId") REFERENCES "Fragrance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FragranceTimeOfDay" ADD CONSTRAINT "FragranceTimeOfDay_fragranceId_fkey" FOREIGN KEY ("fragranceId") REFERENCES "Fragrance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DupeRelationship" ADD CONSTRAINT "DupeRelationship_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Fragrance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DupeRelationship" ADD CONSTRAINT "DupeRelationship_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Fragrance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimilarFragrance" ADD CONSTRAINT "SimilarFragrance_fragranceAId_fkey" FOREIGN KEY ("fragranceAId") REFERENCES "Fragrance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimilarFragrance" ADD CONSTRAINT "SimilarFragrance_fragranceBId_fkey" FOREIGN KEY ("fragranceBId") REFERENCES "Fragrance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_fragranceId_fkey" FOREIGN KEY ("fragranceId") REFERENCES "Fragrance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewVote" ADD CONSTRAINT "ReviewVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewVote" ADD CONSTRAINT "ReviewVote_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollection" ADD CONSTRAINT "UserCollection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCollection" ADD CONSTRAINT "UserCollection_fragranceId_fkey" FOREIGN KEY ("fragranceId") REFERENCES "Fragrance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
