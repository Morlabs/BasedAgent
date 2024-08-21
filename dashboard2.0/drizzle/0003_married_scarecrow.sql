CREATE TABLE IF NOT EXISTS "contributions" (
	"id" serial PRIMARY KEY NOT NULL,
	"developer_id" integer,
	"timestamp" timestamp NOT NULL,
	"contribution_count" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "developers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"skills" text[],
	"email" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"github_username" varchar(255),
	"github_url" varchar(255),
	"top_languages" text[],
	"public_repositories" integer,
	"confirm_password" varchar(255),
	"update_settings" boolean,
	"deactivate_account" boolean
);
--> statement-breakpoint
DROP TABLE "reviewers";--> statement-breakpoint
DROP TABLE "users";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "integrations" DROP CONSTRAINT "integrations_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "job_preferences" DROP CONSTRAINT "job_preferences_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "profile" DROP CONSTRAINT "profile_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "profile" ADD COLUMN "discord_handle" varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contributions" ADD CONSTRAINT "contributions_developer_id_developers_id_fk" FOREIGN KEY ("developer_id") REFERENCES "public"."developers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_user_id_developers_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."developers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_developers_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."developers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_preferences" ADD CONSTRAINT "job_preferences_user_id_developers_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."developers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_developers_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."developers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
