CREATE TABLE IF NOT EXISTS "account" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"current_password" varchar(255),
	"new_password" varchar(255),
	"confirm_password" varchar(255),
	"update_settings" boolean,
	"deactivate_account" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "integrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"github_oauth" boolean,
	"github_personal_access_token" varchar(255),
	"gitlab_oauth" boolean,
	"gitlab_oauth_access_token" varchar(255),
	"gitlab_self_hosted_oauth" boolean,
	"gitlab_self_hosted_oauth_access_token" varchar(255),
	"bitbucket_oauth" boolean,
	"bitbucket_oauth_access_token" varchar(255),
	"stackoverflow_oauth" boolean,
	"stackoverflow_oauth_access_token" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"desired_positions" text[],
	"target_industry" text[],
	"open_to_remote_work" boolean,
	"employment_type" varchar(50),
	"compensation_expectations" varchar(50),
	"tech_stack_dislikes" text[],
	"ideal_company_scale" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"gender_identity" varchar(50),
	"date_of_birth" varchar(50),
	"current_location" varchar(255),
	"primary_email" varchar(255),
	"linkedin_url" varchar(255),
	"portfolio_website" varchar(255),
	"twitter_handle" varchar(255),
	"profile_discoverability" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviewers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"github" varchar(255),
	"skills" varchar(255),
	"availability" varchar(50),
	"email" varchar(255),
	"discord_handle" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"github_username" varchar(255),
	"github_url" varchar(255),
	"top_languages" text[],
	"total_contributions" integer,
	"public_repositories" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "integrations" ADD CONSTRAINT "integrations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_preferences" ADD CONSTRAINT "job_preferences_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
