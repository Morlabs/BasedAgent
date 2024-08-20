import {integer, serial, varchar, boolean, text, timestamp, pgTable, PgArray} from 'drizzle-orm/pg-core';
import {relations} from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', {length: 100}).notNull().unique(),
  email: varchar('email', {length: 255}).notNull().unique(),
  password: varchar('password', {length: 255}).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const jobPreferences = pgTable('job_preferences', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  desiredPositions: (text('desired_positions')).array(),
  targetIndustry: (text('target_industry')).array(),
  openToRemoteWork: boolean('open_to_remote_work'),
  employmentType: varchar('employment_type', {length: 50}),
  compensationExpectations: varchar('compensation_expectations', {length: 50}),
  techStackDislikes: (text('tech_stack_dislikes')).array(),
  idealCompanyScale: varchar('ideal_company_scale', {length: 50}),
});

export const integrations = pgTable('integrations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  githubOauth: boolean('github_oauth'),
  githubPersonalAccessToken: varchar('github_personal_access_token', {length: 255}),
  gitlabOauth: boolean('gitlab_oauth'),
  gitlabOauthAccessToken: varchar('gitlab_oauth_access_token', {length: 255}),
  gitlabSelfHostedOauth: boolean('gitlab_self_hosted_oauth'),
  gitlabSelfHostedOauthAccessToken: varchar('gitlab_self_hosted_oauth_access_token', {length: 255}),
  bitbucketOauth: boolean('bitbucket_oauth'),
  bitbucketOauthAccessToken: varchar('bitbucket_oauth_access_token', {length: 255}),
  stackoverflowOauth: boolean('stackoverflow_oauth'),
  stackoverflowOauthAccessToken: varchar('stackoverflow_oauth_access_token', {length: 255}),
});

export const profile = pgTable('profile', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  firstName: varchar('first_name', {length: 100}).notNull(),
  lastName: varchar('last_name', {length: 100}).notNull(),
  genderIdentity: varchar('gender_identity', {length: 50}),
  dateOfBirth: varchar('date_of_birth', {length: 50}),
  currentLocation: varchar('current_location', {length: 255}),
  primaryEmail: varchar('primary_email', {length: 255}),
  linkedinUrl: varchar('linkedin_url', {length: 255}),
  portfolioWebsite: varchar('portfolio_website', {length: 255}),
  twitterHandle: varchar('twitter_handle', {length: 255}),
  profileDiscoverability: boolean('profile_discoverability'),
});

export const account = pgTable('account', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  currentPassword: varchar('current_password', {length: 255}),
  newPassword: varchar('new_password', {length: 255}),
  confirmPassword: varchar('confirm_password', {length: 255}),
  updateSettings: boolean('update_settings'),
  deactivateAccount: boolean('deactivate_account'),
});

export const reviewers = pgTable('reviewers', {
  id: serial('id').primaryKey(),
  name: varchar('name', {length: 255}),
  github: varchar('github', {length: 255}),
  skills: varchar('skills', {length: 255}),
  availability: varchar('availability', {length: 50}),
  email: varchar('email', {length: 255}),
  discordHandle: varchar('discord_handle', {length: 255}),
  createdAt: timestamp('created_at').defaultNow(),
  githubUsername: varchar('github_username', {length: 255}),
  githubUrl: varchar('github_url', {length: 255}),
  topLanguages: (text('top_languages')).array(),
  totalContributions: integer('total_contributions'),
  publicRepositories: integer('public_repositories'),
});
