"use server";

import { contributions, developerInvites, developerLanguages, developers, integrations, jobPreferences, profile } from "@/lib/db/schema";
import { db } from "@/lib/db/connect";
import { eq, sql } from "drizzle-orm";
import { upsertProfile } from "./profile.api";
import { calculateDeveloperWeight } from "./calculateDeveloperWeight.api";

export async function addDeveloper(user) {
  try {
    // Ensure that top_languages is an array
    const topLanguagesArray = Array.isArray(user.githubDetails.top_languages)
      ? user.githubDetails.top_languages
      : [];

    // Convert the skills string back to an array
    const skillsArray = user.githubDetails.top_languages.join(", ").split(", ");

    console.log("Generated skills array:", skillsArray);

    const weight = await calculateDeveloperWeight(user);

    // 1. Check if the user exists in the database using their GitHub ID
    const existingUser = await db.query.developers.findFirst({
      where: (developer, { eq }) =>
        eq(developers.githubUsername, user.githubDetails.login),
    });

    const languagesData = {
      totalWeight: weight?.totalWeight,
      languageWeights: weight?.languageWeights,
    };

    console.log(
      "Existing user Name Details:",
      existingUser?.name,
      existingUser?.githubUsername
    );

    if (!existingUser) {
      
      // Case 1: User does not exist in the database, so add the user
      console.log("User not found, inserting new user");

      const developer = await db.insert(developers).values({
        id: user.id,
        name: user.name,
        email: user.email,
        githubUsername: user.githubDetails.login,
        githubUrl: user.githubDetails.html_url,
        imageUrl: user.image, // Storing the image URL
        topLanguages: topLanguagesArray, // Store as an array in topLanguages
        skills: skillsArray, // Store as an array in skills
        location: user?.githubDetails?.location,
        publicRepositories: user.githubDetails.public_repos,
        country: "",
        city: "",
        weight: weight
      });

      const result = await db.insert(developerLanguages).values({
        developerId: user.id,
        languages: languagesData, // Store languages as JSONB
      });

      console.log('languages added successfully')
      console.log(result);

      await upsertProfile({
        id: user.id,
        first_name: user?.name?.split(" ")[0] || "",
        last_name: user?.name?.split(" ")[1] || "",
        gender_identity: "",
        date_of_birth: null,
        current_location: user?.githubDetails?.location || "",
        primary_email: user?.email || "",
        linkedin_url: "",
        portfolio_website: "",
        twitter_handle: null,
        profile_discoverability: null,
        country: "",
        city: "",
      });

      console.log("Developer added successfully: ", developer);
      return true;
    }

    // 2. Check if the data has changed
    const dataChanged =
      existingUser.name !== user.name ||
      existingUser.email !== user.email ||
      existingUser.skills.join(", ") !== skillsArray.join(", ") || // Compare skills as strings
      existingUser.publicRepositories !== user.githubDetails.public_repos ||
      existingUser.imageUrl !== user.image ||
      existingUser?.location !== user?.githubDetails?.location ||
      existingUser?.city !== user?.city ||
      existingUser?.country !== user?.country ||
      existingUser?.weight !== weight;

    console.log("Data changed:", dataChanged);

    if (dataChanged) {
      // Case 2: User exists, but data has changed, so update the user
      console.log("User data has changed, updating user", user?.country, user?.city);
      await db
        .update(developers)
        .set({
          name: user.name,
          email: user.email,
          topLanguages: topLanguagesArray, // Update topLanguages array
          skills: skillsArray, // Update the skills array
          publicRepositories: user.githubDetails.public_repos,
          imageUrl: user.image,
          location: user?.githubDetails?.location,
          country: user?.country,
          city: user?.city,
          weight: weight,
          // Update the image URL if it has changed
        })
        .where(eq(developers.githubUsername, user.githubDetails.login))
        .execute();

        const result = await db.update(developerLanguages).set({
          developerId: user.id,
          languages: languagesData, // Store languages as JSONB
        });
        console.log('languages updated successfully')
        console.log(result)

      console.log("User updated successfully");
      return true;
    }

    // Case 3: User exists and data has not changed, do nothing
    console.log("User exists and no data changes detected, nothing to do");
    return true;
  } catch (error) {
    console.error("Error processing user:", error);
    return null;
  }
}

export async function getDeveloper(developerID) {
  console.log("id", developerID);
  try {
    const developer = await db
      .select()
      .from(developers)
      .where(eq(developers.id, Number(developerID)));
    // console.log("developer:", developer);

    return developer[0];
  } catch (error) {
    console.error("Error processing user:", error);
    return null;
  }
}

export async function getLanguages(developerId) {
  try {
    const result = await db.execute(sql`
      WITH language_rankings AS (
          SELECT
              jsonb_array_elements(languages->'languageWeights')->>'language' AS language,
              (jsonb_array_elements(languages->'languageWeights')->>'weight')::int AS weight,
              developer_id
          FROM developer_languages
      ),
      top_5_languages AS (
          SELECT language, weight
          FROM (
              SELECT
                  language,
                  weight,
                  ROW_NUMBER() OVER (PARTITION BY language ORDER BY weight DESC) AS rank
              FROM language_rankings
          ) AS ranked_languages
          WHERE rank <= 5
      )
      SELECT DISTINCT t5.language
      FROM developer_languages dl
      JOIN top_5_languages t5 ON jsonb_exists(dl.languages->'languageWeights', t5.language)
      WHERE dl.developer_id = ${developerId} AND t5.weight = ANY(ARRAY(
          SELECT (jsonb_array_elements(dl.languages->'languageWeights')->>'weight')::int
      ));
    `);

    return result.rows.map(row => row.language);
  } catch (err) {
    console.error("Error fetching languages:", err);
  }
}

export async function getAllDeveloper(page = 1, resultsPerPage = 10) {
  try {
    // Calculate the offset for pagination
    const offset = (page - 1) * resultsPerPage;

    // Query the database with limit and offset for pagination
    let developers = await db.query.developers.findMany({
      offset: offset,
      limit: resultsPerPage,
    });

    // Query to get the total count of developers using a separate count query
    const totalCount = await db.query.developers.findMany({
      select: { id: true },
    });

    developers = developers.map((ele) => {
      return {
        ...ele,
        weight: JSON.parse(ele.weight).totalWeight
      }
    })

    // The total count is the length of the result from the count query
    const count = totalCount.length;

    return {
      developers,
      totalPages: Math.ceil(count / resultsPerPage),
      currentPage: page,
      totalCount: count,
    };
  } catch (error) {
    console.error("Error processing user:", error);
    return null;
  }
}

export async function deleteDeveloper(developerId) {
  try {
    await db.delete(profile).where(eq(profile.developerId, developerId));
    await db.delete(contributions).where(eq(contributions.developerId, developerId));
    await db.delete(jobPreferences).where(eq(jobPreferences.developerId, developerId));
    await db.delete(integrations).where(eq(integrations.developerId, developerId));
    await db.delete(developerInvites).where(eq(developerInvites.developerId, developerId));
    await db
      .delete(developers)
      .where(eq(developers.id, developerId));

    return true;
  } catch (error) {
    console.error("Error deleting integration:", error);
    throw error;
  }
}

export async function ChangeDeveloperPassword(passwordData, developerId) {
  try {
    // 1. Retrieve the current password from the database
    const developer = await db.query.developers.findFirst({
      where: (developer) => eq(developer.id, developerId),
      columns: ["password"], // Make sure 'password' is a field in your schema
    });

    if (!developer) {
      throw new Error("Developer not found");
    }

    // 2. Compare the provided current password with the stored password
    if (passwordData.current_password !== developer.password) {
      throw new Error("Current password is incorrect");
    }

    // 3. Update the developer's password in the database
    await db
      .update(developers)
      .set({
        password: passwordData.new_password, // Store the new password as a plain string
      })
      .where(eq(developers.id, developerId))
      .execute();

    console.log("Password updated successfully");
    return true;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}
