import {NextResponse} from 'next/server';
import {profile} from "@/lib/db/schema";
import {db} from "@/lib/db/connect";
import {eq} from "drizzle-orm";

export async function GET(req) {
	console.log('Get Job Preference API Call');
	
	try {
		// Accessing the id query parameter from the request
		const id = req.nextUrl.searchParams.get('id');
		
		if (id) {
			
			const profiles = await db.select().from(profile).where(eq(profile.id, Number(id)));
			return NextResponse.json({message: "Profile Fetched SuccessFully", profiles}, {status: 200});
		} else {
			
			return NextResponse.json({message: "id not given"}, {status: 404});
		}
		
		
	} catch (error) {
		console.error('Error in changing password:', error.message);
		return NextResponse.json({error: error.message}, {status: 500});
	}
}


export async function PATCH(req) {
	try {
		const id = req.nextUrl.searchParams.get('id');
		const body = await req.json();
		
		if (id) {
			const profiles = await db.select().from(profile).where(eq(profile.id, Number(id)));
			if (profiles.length > 0) {
				
				await db
					.update(profile)
					.set({
						firstName: body.first_name,
						lastName: body.last_name,
						genderIdentity: body.gender_identity,
						dateOfBirth: body.date_of_birth,
						currentLocation: body.current_location,
						primaryEmail: body.primary_email,
						linkedinUrl: body.linkedin_url,
						portfolioWebsite: body.portfolio_website,
						twitterHandle: body.twitter_handle,
						profileDiscoverability: body.profile_discoverability,
					})
					.where(eq(profile.id, Number(id)));
				
				// Fetch the updated profile data manually
				const updatedProfile = await db.select().from(profile).where(eq(profile.id, Number(id)));
				
				return NextResponse.json(
					{message: "Profile Updated Successfully", updatedProfile},
					{status: 200}
				);
			} else {
				console.log('No profile found for ID:', id);
				return NextResponse.json(
					{message: "Profile not found"},
					{status: 404}
				);
			}
			
		} else {
			console.log('ID not provided in the request');
			return NextResponse.json({message: "ID not given"}, {status: 400});
		}
		
	} catch (error) {
		console.error('Error in updating profile:', error.message);
		return NextResponse.json({error: error.message}, {status: 500});
	}
}
