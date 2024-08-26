import {NextResponse} from 'next/server';
import {developerInvites} from "@/lib/db/schema";
import {db} from "@/lib/db/connect";
import {eq} from "drizzle-orm";

export async function POST(req) {
	try {
		
		const {developerID} = await req.json();
		
		const developerInvite = await db.select().from(developerInvites).where(eq(developerInvites.developerId, developerID));
		
		return NextResponse.json({developerInvite: developerInvite}, {status: 200});
		
	} catch (error) {
		console.error('Error in fetching referrals:', error.message);
		console.error('Stack trace:', error.stack); // Log the stack trace for more details
		return NextResponse.json({error: error.message}, {status: 500});
	}
}
