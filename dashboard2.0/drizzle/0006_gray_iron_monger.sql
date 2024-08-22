ALTER TABLE "account" RENAME COLUMN "user_id" TO "developer_id";--> statement-breakpoint
ALTER TABLE "integrations" RENAME COLUMN "user_id" TO "developer_id";--> statement-breakpoint
ALTER TABLE "job_preferences" RENAME COLUMN "user_id" TO "developer_id";--> statement-breakpoint
ALTER TABLE "profile" RENAME COLUMN "user_id" TO "developer_id";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_user_id_developers_id_fk";
--> statement-breakpoint
ALTER TABLE "integrations" DROP CONSTRAINT "integrations_user_id_developers_id_fk";
--> statement-breakpoint
ALTER TABLE "job_preferences" DROP CONSTRAINT "job_preferences_user_id_developers_id_fk";
--> statement-breakpoint
ALTER TABLE "profile" DROP CONSTRAINT "profile_user_id_developers_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_developer_id_developers_id_fk" FOREIGN KEY ("developer_id") REFERENCES "public"."developers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "integrations" ADD CONSTRAINT "integrations_developer_id_developers_id_fk" FOREIGN KEY ("developer_id") REFERENCES "public"."developers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_preferences" ADD CONSTRAINT "job_preferences_developer_id_developers_id_fk" FOREIGN KEY ("developer_id") REFERENCES "public"."developers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_developer_id_developers_id_fk" FOREIGN KEY ("developer_id") REFERENCES "public"."developers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
