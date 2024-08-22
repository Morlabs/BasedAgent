DROP TABLE "account";--> statement-breakpoint
ALTER TABLE "developers" ADD COLUMN "deleted_at" timestamp DEFAULT now();