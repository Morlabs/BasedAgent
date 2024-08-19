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
			
			const job_prefrences = await db.select().from(jobPreferences).where(eq(jobPreferences.id, id));
			return NextResponse.json(
				{message: "Job Prefrence Fetched SuccessFully", job_prefrences},
				{status: 200}
			);
		} else {
			
			return NextResponse.json(
				{message: "id not given"},
				{status: 404}
			);
		}
		
		
	} catch (error) {
		console.error('Error in changing password:', error.message);
		return NextResponse.json({error: error.message}, {status: 500});
	}
}
