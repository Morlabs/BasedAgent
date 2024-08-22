import {integer, serial, varchar, boolean, text, timestamp, pgTable} from 'drizzle-orm/pg-core';
import {relations} from 'drizzle-orm';

export const developers = pgTable('developers', {
  id: serial('id').primaryKey(),
  name: varchar('name', {length: 255}),
  skills: (text('skills')).array(),
  email: varchar('email', {length: 255}),
  createdAt: timestamp('created_at').defaultNow(),
  githubUsername: varchar('github_username', {length: 255}),
  githubUrl: varchar('github_url', {length: 255}),
  imageUrl: varchar('image_url', {length: 255}),
  topLanguages: (text('top_languages')).array(),
  publicRepositories: integer('public_repositories'),
  deletedAt: timestamp('deleted_at').defaultNow(),
});


export const contributions = pgTable('contributions', {
  id: serial('id').primaryKey(),
  developerId: integer('developer_id').references(() => developers.id),
  timestamp: timestamp('timestamp').notNull(),
  contributionCount: integer('contribution_count').notNull(),
});


export const jobPreferences = pgTable('job_preferences', {
  id: serial('id').primaryKey(),
  developerId: integer('developer_id').references(() => developers.id),
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
  developerId: integer('developer_id').references(() => developers.id),
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
  developerId: integer('developer_id').references(() => developers.id),
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
  discordHandle: varchar('discord_handle', {length: 255}),
  
});


export const developersRelations = relations(developers, ({one, many}) => ({
  jobPreferences: one(jobPreferences, {
    fields: [developers.id],
    references: [jobPreferences.developerId],
  }),
  integrations: one(integrations, {
    fields: [developers.id],
    references: [integrations.developerId],
  }),
  profile: one(profile, {
    fields: [developers.id],
    references: [profile.developerId],
  }),
  contributions: many(contributions, {
    fields: [developers.id],
    references: [contributions.developerId],
  }),
}));

export const contributionsRelations = relations(contributions, ({one}) => ({
  developer: one(developers, {
    fields: [contributions.developerId],
    references: [developers.id],
  }),
}));

export const jobPreferencesRelations = relations(jobPreferences, ({one}) => ({
  developer: one(developers, {
    fields: [jobPreferences.developerId],
    references: [developers.id],
  }),
}));

export const integrationsRelations = relations(integrations, ({one}) => ({
  developer: one(developers, {
    fields: [integrations.developerId],
    references: [developers.id],
  }),
}));

export const profileRelations = relations(profile, ({one}) => ({
  developer: one(developers, {
    fields: [profile.developerId],
    references: [developers.id],
  }),
}));

