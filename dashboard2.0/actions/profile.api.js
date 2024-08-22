"use server";

import {profile} from "@/lib/db/schema";
import {db} from "@/lib/db/connect";
import {eq} from "drizzle-orm";

// Function to get the profile data by ID
export async function getProfile(id) {
	try {
		return await db.query.profile.findFirst({
			where: (profiles, {eq}) => {
				eq(profiles.id, id);
			},
		});
	} catch (error) {
		console.error('Error fetching profile:', error);
		return null;
	}
}

// Function to insert or update the profile data
export async function upsertProfile(data) {
	const {
		id,
		first_name,
		last_name,
		gender_identity,
		date_of_birth,
		current_location,
		primary_email,
		linkedin_url,
		portfolio_website,
		twitter_handle,
		profile_discoverability
	} = data;
	
	try {
		// Check if the profile exists
		const existingProfile = await db.query.profile.findFirst({
			where: (profiles, {eq}) => {
				eq(profiles.developerId, id);
			},
		});
		
		if (existingProfile) {
			// Update the existing profile
			await db.update(profile)
				.set({
					firstName: first_name,
					lastName: last_name,
					genderIdentity: gender_identity,
					dateOfBirth: date_of_birth,
					currentLocation: current_location,
					primaryEmail: primary_email,
					linkedinUrl: linkedin_url,
					portfolioWebsite: portfolio_website,
					twitterHandle: twitter_handle,
					profileDiscoverability: profile_discoverability,
				})
				.where(eq(profile.id, id))
				.returning();
			
			console.log('Profile updated successfully.');
		} else {
			// Insert a new profile
			await db.insert(profile).values({
				developerId: id,  // Assuming id is provided for new profiles as well
				firstName: first_name,
				lastName: last_name,
				genderIdentity: gender_identity,
				dateOfBirth: date_of_birth,
				currentLocation: current_location,
				primaryEmail: primary_email,
				linkedinUrl: linkedin_url,
				portfolioWebsite: portfolio_website,
				twitterHandle: twitter_handle,
				profileDiscoverability: profile_discoverability,
			});
			
			console.log('Profile inserted successfully.');
		}
	} catch (error) {
		console.error('Error upserting profile:', error);
	}
}
