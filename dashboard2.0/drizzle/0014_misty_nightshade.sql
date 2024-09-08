CREATE TABLE IF NOT EXISTS "developer_languages" (
	"developer_id" integer PRIMARY KEY NOT NULL,
	"languages" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "github_api_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"github_details" jsonb,
	"top_languages" text[],
	"total_contribution" integer,
	"extra" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "developer_invites" ADD COLUMN "referral_token" varchar(255);