import {NextResponse} from 'next/server';
import {users, jobPreferences} from "@/lib/db/schema";
import {db} from "@/lib/db/connect";
import {eq} from "drizzle-orm";

export async function GET(req) {
	console.log('Get Job Preference API Call');
	
	try {
		// Accessing the id query parameter from the request
		const id = req.nextUrl.searchParams.get('id');
		
		if (id) {
			
			const job_prefrences = await db.select().from(jobPreferences);
			return NextResponse.json({message: "Job Prefrence Fetched SuccessFully", job_prefrences}, {status: 200});
		} else {
			
			return NextResponse.json({message: "id not given"}, {status: 404});
		}
		
		
	} catch (error) {
		console.error('Error in changing password:', error.message);
		return NextResponse.json({error: error.message}, {status: 500});
	}
}

export async function PATCH(req) {
	console.log('Patch Job Preference API Call');
	
	try {
		const id = req.nextUrl.searchParams.get('id');
		const body = await req.json();
		
		if (id) {
			const job_preferences = await db.select().from(jobPreferences).where(eq(jobPreferences.id, Number(id)));
			
			if (job_preferences.length > 0) {
				await db
					.update(jobPreferences)
					.set(body)
					.where(eq(jobPreferences.id, Number(id)))
					.returning();
				
				return NextResponse.json(
					{message: "Job Preference Updated Successfully", job_preferences},
					{status: 200}
				);
			} else {
				return NextResponse.json(
					{message: "Job Preference not found"},
					{status: 404}
				);
			}
			
		} else {
			return NextResponse.json({message: "ID not given"}, {status: 400});
		}
		
	} catch (error) {
		console.error('Error in updating job preference:', error.message);
		return NextResponse.json({error: error.message}, {status: 500});
	}
}


export async function POST(req) {
	console.log('Patch Job Preference API Call');
	
	try {
		const body = await req.json();
		
		
		const job_preferences = await db
			.insert(jobPreferences)
			.values(body)
			.returning();
		
		return NextResponse.json(
			{message: "Job Preference Updated Successfully", job_preferences},
			{status: 200}
		)
	} catch
		(error) {
		console.error('Error in updating job preference:', error.message);
		return NextResponse.json({error: error.message}, {status: 500});
	}
}