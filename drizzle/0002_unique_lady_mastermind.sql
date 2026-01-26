CREATE TYPE "public"."access_tier" AS ENUM('free', 'premium');--> statement-breakpoint
ALTER TABLE "images" ADD COLUMN "access_tier" "access_tier" DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE "images" DROP COLUMN "is_premium";