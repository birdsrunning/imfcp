CREATE TYPE "public"."payment_state" AS ENUM('INITIALIZED', 'SUCCESS', 'FAILED');--> statement-breakpoint
CREATE TABLE "payments" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"reference" text NOT NULL,
	"amount" text NOT NULL,
	"currency" text DEFAULT 'NGN' NOT NULL,
	"provider" text DEFAULT 'paystack' NOT NULL,
	"status" "payment_state" DEFAULT 'INITIALIZED' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "payments_reference_unique" UNIQUE("reference")
);
--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "payments_userId_idx" ON "payments" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "payments_reference_idx" ON "payments" USING btree ("reference");