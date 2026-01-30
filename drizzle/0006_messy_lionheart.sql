CREATE TABLE "rate_limits" (
	"key" text PRIMARY KEY NOT NULL,
	"count" text NOT NULL,
	"expires_at" timestamp NOT NULL
);
