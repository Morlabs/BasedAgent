"use server";

import {jobPreferences} from "@/lib/db/schema";
import {db} from "@/lib/db/connect";
import {eq} from "drizzle-orm";

// Function to get the profile data by developer ID
export async function getJobPreferences(id) {
	try {
		return await db.query.jobPreferences.findFirst({
			where: (preferences, {eq}) => eq(preferences.developerId, id),
		});
	} catch (error) {
		console.error('Error fetching job preferences:', error);
		return null;
	}
}

// Function to insert or update job preferences data
export async function upsertJobPreferences(developerId, formData) {
	try {
		// Check if a job preference record exists for the given developerId
		const existingPreference = await db.query.jobPreferences.findFirst({
			where: (preferences, {eq}) => eq(preferences.developerId, developerId),
		});
		
		if (existingPreference) {
			// If a record exists, update it
			await db
				.update(jobPreferences)
				.set({
					desiredPositions: formData.desired_positions,
					targetIndustry: formData.target_industry,
					openToRemoteWork: formData.open_to_remote_work,
					employmentType: formData.employment_type,
					compensationExpectations: formData.compensation_expectations,
					techStackDislikes: formData.tech_stack_dislikes,
					idealCompanyScale: formData.ideal_company_scale,
				})
				.where(eq(jobPreferences.developerId, developerId));
			console.log('Job preferences updated successfully.');
		} else {
			// If no record exists, insert a new one
			await db
				.insert(jobPreferences)
				.values({
					developerId: developerId,
					desiredPositions: formData.desired_positions,
					targetIndustry: formData.target_industry,
					openToRemoteWork: formData.open_to_remote_work,
					employmentType: formData.employment_type,
					compensationExpectations: formData.compensation_expectations,
					techStackDislikes: formData.tech_stack_dislikes,
					idealCompanyScale: formData.ideal_company_scale,
				});
			console.log('Job preferences inserted successfully.');
		}
	} catch (error) {
		console.error('Error inserting/updating job preferences:', error);
	}
}
