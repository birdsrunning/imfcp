CREATE TABLE "client_questions" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"category" text NOT NULL,
	"message" text NOT NULL,
	"reply" text,
	"replied" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"replied_at" timestamp
);
