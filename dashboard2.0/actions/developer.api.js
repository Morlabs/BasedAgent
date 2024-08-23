"use server";

import {developers} from "@/lib/db/schema";
import {db} from "@/lib/db/connect";
import {eq} from "drizzle-orm";

export async function addDeveloper(user) {
	try {
		// Ensure that top_languages is an array
		const topLanguagesArray = Array.isArray(user.githubDetails.top_languages) ? user.githubDetails.top_languages : [];
		
		// Convert the skills string back to an array
		const skillsArray = user.githubDetails.top_languages.join(', ').split(', ');
		
		console.log("Generated skills array:", skillsArray);
		
		// 1. Check if the user exists in the database using their GitHub ID
		const existingUser = await db.query.developers.findFirst({
			where: (developer, {eq}) => eq(developers.githubUsername, user.githubDetails.login)
		});
		
		console.log("Existing user:", existingUser);
		
		if (!existingUser) {
			// Case 1: User does not exist in the database, so add the user
			console.log("User not found, inserting new user");
			const developer = await db.insert(developers).values({
				id: user.id,
				name: user.name,
				email: user.email,
				githubUsername: user.githubDetails.login,
				githubUrl: user.githubDetails.html_url,
				imageUrl: user.image,  // Storing the image URL
				topLanguages: topLanguagesArray,  // Store as an array in topLanguages
				skills: skillsArray,  // Store as an array in skills
				location: user.githubDetails.location,
				publicRepositories: user.githubDetails.public_repos,
			});
			
			console.log("Developer added successfully: ", developer);
			return true;
		}
		
		// 2. Check if the data has changed
		const dataChanged = (existingUser.name !== user.name || existingUser.email !== user.email || existingUser.skills.join(', ') !== skillsArray.join(', ') ||  // Compare skills as strings
			existingUser.publicRepositories !== user.githubDetails.public_repos || existingUser.imageUrl !== user.image);
		
		console.log("Data changed:", dataChanged);
		
		if (dataChanged) {
			// Case 2: User exists, but data has changed, so update the user
			console.log("User data has changed, updating user");
			await db.update(developers)
				.set({
					name: user.name, email: user.email, topLanguages: topLanguagesArray,  // Update topLanguages array
					skills: skillsArray,  // Update the skills array
					publicRepositories: user.githubDetails.public_repos, imageUrl: user.image,  // Update the image URL if it has changed
				})
				.where(eq(developers.githubUsername, user.githubDetails.login))
				.execute();
			
			console.log("User updated successfully");
			return true;
		}
		
		// Case 3: User exists and data has not changed, do nothing
		console.log("User exists and no data changes detected, nothing to do");
		return true;
		
	} catch (error) {
		console.error('Error processing user:', error);
		return null;
	}
}


export async function getDeveloper(developerID) {
	console.log('id', developerID)
	try {
		const developer = await db.select().from(developers).where(eq(developers.id, Number(developerID)));
		console.log('developer:', developer)
		
		return developer[0]
		
	} catch (error) {
		console.error('Error processing user:', error);
		return null;
	}
}

export async function getAllDeveloper(page = 1, resultsPerPage = 10) {
	try {
		// Calculate the offset for pagination
		const offset = (page - 1) * resultsPerPage;

		// Query the database with limit and offset for pagination
		const developers = await db.query.developers.findMany({
			offset: offset,
			limit: resultsPerPage,
		});

		// Query to get the total count of developers using a separate count query
		const totalCount = await db.query.developers.findMany({
			select: { id: true },
		});

		// The total count is the length of the result from the count query
		const count = totalCount.length;

		return {
			developers,
			totalPages: Math.ceil(count / resultsPerPage),
			currentPage: page,
			totalCount: count,
		};
	} catch (error) {
		console.error('Error processing user:', error);
		return null;
	}
}

export async function deleteDeveloper(developerId) {
	try {
		await db.update(developers)
			.set({
				deletedAt: new Date(),  // Set the current timestamp
			})
			.where(eq(developers.id, developerId))
			.execute();
		return true
	} catch (error) {
		console.error('Error deleting integration:', error);
		throw error;
	}
}

export async function ChangeDeveloperPassword(passwordData, developerId) {
	try {
		// 1. Retrieve the current password from the database
		const developer = await db.query.developers.findFirst({
			where: (developer) => eq(developer.id, developerId),
			columns: ['password']  // Make sure 'password' is a field in your schema
		});
		
		if (!developer) {
			throw new Error('Developer not found');
		}
		
		// 2. Compare the provided current password with the stored password
		if (passwordData.current_password !== developer.password) {
			throw new Error('Current password is incorrect');
		}
		
		// 3. Update the developer's password in the database
		await db.update(developers)
			.set({
				password: passwordData.new_password,  // Store the new password as a plain string
			})
			.where(eq(developers.id, developerId))
			.execute();
		
		console.log('Password updated successfully');
		return true;
	} catch (error) {
		console.error('Error changing password:', error);
		throw error;
	}
}
