import {NextResponse} from 'next/server';

export async function GET(req) {
	console.log('Get Job Preference API Call');
	
	try {
		// Accessing the id query parameter from the request
		const id = req.nextUrl.searchParams.get('id');
		const url = new URL(req.url);
		const searchParams = url.searchParams;
		const userId = searchParams.get("id");
		console.log(`ID received: ${id}`);
		console.log(`ID received: ${userId}`);
		
		return NextResponse.json(
			{message: "User Password Changed Successfully", id},
			{status: 200}
		);
	} catch (error) {
		console.error('Error in changing password:', error.message);
		return NextResponse.json({error: error.message}, {status: 500});
	}
}
