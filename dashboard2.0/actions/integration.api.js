"use server";

import {db} from "@/lib/db/connect";
import {integrations} from "@/lib/db/schema";
import {eq} from "drizzle-orm";

// Function to get integration data by developer ID
export async function getIntegration(developerId) {
	try {
		return await db.query.integrations.findFirst({
			where: (integration) => eq(integration.developerId, developerId),
		});
	} catch (error) {
		console.error('Error fetching integration:', error);
		return null;
	}
}

// Function to upsert integration data
export async function upsertIntegration(developerId, formData) {
	try {
		console.log('Developer ID:', developerId);
		console.log('Form Data:', formData);
		
		const {
			github_oauth,
			github_personal_access_token,
			gitlab_oauth,
			gitlab_self_hosted_oauth,
			bitbucket_oauth,
			stackoverflow_oauth,
			gitlab_oauth_access_token,
			gitlab_self_hosted_oauth_access_token,
			bitbucket_oauth_access_token,
			stackoverflow_oauth_access_token,
		} = formData;
		
		const existingData = await getIntegration(developerId);
		console.log('Existing Data:', existingData);
		
		if (existingData) {
			console.log('Updating existing integration for Developer ID:', developerId);
			const result = await db.update(integrations)
				.set({
					githubOauth: github_oauth,
					githubPersonalAccessToken: github_personal_access_token,
					gitlabOauth: gitlab_oauth,
					gitlabOauthAccessToken: gitlab_oauth_access_token,
					gitlabSelfHostedOauth: gitlab_self_hosted_oauth,
					gitlabSelfHostedOauthAccessToken: gitlab_self_hosted_oauth_access_token,
					bitbucketOauth: bitbucket_oauth,
					bitbucketOauthAccessToken: bitbucket_oauth_access_token,
					stackoverflowOauth: stackoverflow_oauth,
					stackoverflowOauthAccessToken: stackoverflow_oauth_access_token,
				})
				.where(eq(integrations.developerId, developerId));
			console.log('Update Result:', result);
			return result;
		} else {
			console.log('Inserting new integration for Developer ID:', developerId);
			const result = await db.insert(integrations).values({
				developerId: developerId,
				githubOauth: github_oauth,
				githubPersonalAccessToken: github_personal_access_token,
				gitlabOauth: gitlab_oauth,
				gitlabOauthAccessToken: gitlab_oauth_access_token,
				gitlabSelfHostedOauth: gitlab_self_hosted_oauth,
				gitlabSelfHostedOauthAccessToken: gitlab_self_hosted_oauth_access_token,
				bitbucketOauth: bitbucket_oauth,
				bitbucketOauthAccessToken: bitbucket_oauth_access_token,
				stackoverflowOauth: stackoverflow_oauth,
				stackoverflowOauthAccessToken: stackoverflow_oauth_access_token,
			});
			console.log('Insert Result:', result);
			return result;
		}
	} catch (error) {
		console.error('Error upserting integration:', error);
		throw error;
	}
}


// Function to delete integration data by developer ID
export async function deleteIntegration(developerId) {
	try {
		return await db.delete(integrations)
			.where(eq(integrations.developerId, developerId));
	} catch (error) {
		console.error('Error deleting integration:', error);
		throw error;
	}
}
