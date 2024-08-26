CREATE TABLE IF NOT EXISTS "developer_invites" (
	"id" serial PRIMARY KEY NOT NULL,
	"developer_id" integer,
	"email" varchar(255),
	"status" varchar(50),
	"earnings" integer DEFAULT 0,
	"invite_date" timestamp,
	"source" varchar(50),
	"github_access" varchar(255)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "developer_invites" ADD CONSTRAINT "developer_invites_developer_id_developers_id_fk" FOREIGN KEY ("developer_id") REFERENCES "public"."developers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
