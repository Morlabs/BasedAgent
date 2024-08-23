"use server";

import { profile } from "@/lib/db/schema";
import { db } from "@/lib/db/connect";
import { eq } from "drizzle-orm";
import { addDeveloper, getDeveloper } from "./developer.api";

// Function to get the profile data by ID
export async function getProfile(id) {
  try {
    const profiles = await db
      .select()
      .from(profile)
      .where(eq(profile.developerId, id));
    console.log("profiles", profiles);
    return profiles[0];
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

// Function to insert or update the profile data
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
    profile_discoverability,
  } = data;

  console.log("Upsert Profile Function Called");
  console.log("Received Data:", data);

  try {
    // Check if the profile exists
    console.log("Checking if profile exists for developerId:", id);
    const profiles = await db
      .select()
      .from(profile)
      .where(eq(profile.developerId, id));

    const existingProfile = profiles[0];

    console.log("Existing Profile:", existingProfile);

    if (existingProfile) {
      // Update the existing profile
      console.log("Updating existing profile for developerId:", id);
      await db
        .update(profile)
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

		console.log('current_location', current_location)

      const developer = await getDeveloper(id);

      await addDeveloper({
        id: id,
        name: first_name + " " + last_name,
        email: primary_email,
		githubDetails : {
			login: developer.githubUsername,
			githubUrl: developer.githubUrl,
			top_languages: developer.topLanguages,
			location: current_location,
			public_repos: developer.publicRepositories,
		},
        image: developer.imageUrl,
      });

      console.log("Profile updated successfully for developerId:", id);
    } else {
      // Insert a new profile
      console.log("Inserting new profile for developerId:", id);
      await db.insert(profile).values({
        developerId: id, // Assuming id is provided for new profiles as well
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

      console.log("Profile inserted successfully for developerId:", id);
    }
  } catch (error) {
    console.error("Error upserting profile for developerId:", id, error);
  }
}
