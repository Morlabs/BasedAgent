"use server";

import { db } from "@/lib/db/connect";
import { integrations } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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
		const existingData = await getIntegration(developerId);
		if (existingData) {
			// Update existing record
			const {
				github_oauth,
				github_personal_access_token,
				gitlab_oauth,
				gitlab_self_hosted_oauth,
				bitbucket_oauth,
				stackoverflow_oauth,
			} = formData;
			
			return await db.update(integrations)
				.set({
					github_oauth,
					github_personal_access_token,
					gitlab_oauth,
					gitlab_self_hosted_oauth,
					bitbucket_oauth,
					stackoverflow_oauth,
				})
				.where(eq(integrations.developerId, developerId));
		} else {
			// Insert new record
			const {
				github_oauth,
				github_personal_access_token,
				gitlab_oauth,
				gitlab_self_hosted_oauth,
				bitbucket_oauth,
				stackoverflow_oauth,
			} = formData;
			
			return await db.insert(integrations).values({
				developerId,
				github_oauth,
				github_personal_access_token,
				gitlab_oauth,
				gitlab_self_hosted_oauth,
				bitbucket_oauth,
				stackoverflow_oauth,
			});
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
