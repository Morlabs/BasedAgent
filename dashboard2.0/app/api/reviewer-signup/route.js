import {NextResponse} from 'next/server';
import {reviewers} from "@/lib/db/schema";
import {db} from "@/lib/db/connect";
import {eq} from "drizzle-orm";

export async function POST(req) {
	try {
		const body = await req.json();
		console.log('Request Body:', body);
		
		const {
			email,
			name,
			availability,
			discordHandle,
			github_username,
			github_url,
			top_languages,
			total_contributions,
			public_repositories
		} = body;
		
		if (!email) {
			console.log('No email provided');
			return NextResponse.json({message: "Email not provided"}, {status: 400});
		}
		
		// Fetch the reviewer by email
		const existingReviewer = await db.query.reviewers.findFirst({
			where: (reviewer, {eq}) => eq(reviewers.email, email),
		});
		console.log('Existing Reviewer:', existingReviewer);
		
		if (existingReviewer) {
			// Compare the incoming data with the existing record
			const isDataChanged = (
				existingReviewer.name !== name ||
				existingReviewer.availability !== availability ||
				existingReviewer.discordHandle !== discordHandle ||
				existingReviewer.githubUsername !== github_username ||
				existingReviewer.githubUrl !== github_url ||
				existingReviewer.topLanguages.join(',') !== top_languages.join(',') ||
				existingReviewer.totalContributions !== total_contributions ||
				existingReviewer.publicRepositories !== public_repositories
			);
			console.log('Is Data Changed:', isDataChanged);
			
			if (isDataChanged) {
				// Update the existing record
				console.log('Updating reviewer record');
				await db.update(reviewers)
					.set({
						name,
						availability,
						discordHandle,
						github:github_url,
						githubUsername: github_username,
						githubUrl: github_url,
						topLanguages: top_languages,
						totalContributions: total_contributions,
						publicRepositories: public_repositories
					})
					.where(eq(reviewers.email, email));
				
				return NextResponse.json({message: "Profile updated"}, {status: 200});
			} else {
				console.log('No changes detected');
				return NextResponse.json({message: "No changes detected"}, {status: 200});
			}
		} else {
			// Create a new record
			console.log('Adding new reviewer record');
			await db.insert(reviewers).values({
				name,
				availability,
				discordHandle,
				github:github_url,
				githubUsername: github_username,
				githubUrl: github_url,
				topLanguages: top_languages,
				totalContributions: total_contributions,
				publicRepositories: public_repositories,
				email
			});
			
			return NextResponse.json({message: "Reviewer added"}, {status: 201});
		}
	} catch (error) {
		console.error('Error in updating/creating profile:', error.message);
		return NextResponse.json({error: error.message}, {status: 500});
	}
}
