import {NextResponse} from 'next/server';
import {integrations, jobPreferences} from "@/lib/db/schema";
import {db} from "@/lib/db/connect";
import {eq} from "drizzle-orm";

export async function GET(req) {
	console.log('Get integrations API Call');
	
	try {
		// Accessing the id query parameter from the request
		const id = req.nextUrl.searchParams.get('id');
		
		if (id) {
			
			const integration = await db.select().from(integrations).where(eq(integrations.id, Number(id)));
			return NextResponse.json({message: "Integrations Fetched SuccessFully", integration}, {status: 200});
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
		
		console.log('Received PATCH request with ID:', id);
		console.log('Request body:', body);
		
		if (id) {
			const integration = await db.select().from(integrations).where(eq(integrations.id, Number(id)));
			console.log('Fetched integration from DB:', integration);
			
			if (integration.length > 0) {
				console.log('Updating integration record with new data...');
				
				await db
					.update(integrations)
					.set({
						githubOauth: body.github_oauth,
						githubPersonalAccessToken: body.github_personal_access_token,
						gitlabOauth: body.gitlab_oauth,
						gitlabSelfHostedOauth: body.gitlab_self_hosted_oauth,
						bitbucketOauth: body.bitbucket_oauth,
						stackoverflowOauth: body.stackoverflow_oauth,
					})
					.where(eq(integrations.id, Number(id)));
				
				// Fetch the updated integration record manually
				const updatedIntegration = await db.select().from(integrations).where(eq(integrations.id, Number(id)));
				console.log('Updated integration record:', updatedIntegration);
				
				return NextResponse.json({message: "Integrations Updated Successfully", updatedIntegration}, {status: 200});
			} else {
				console.log('No integration found for ID:', id);
				return NextResponse.json({message: "Integration not found"}, {status: 404});
			}
		} else {
			console.log('ID not provided in the request');
			return NextResponse.json({message: "ID not given"}, {status: 400});
		}
	} catch (error) {
		console.error('Error in updating integrations:', error.message);
		return NextResponse.json({error: error.message}, {status: 500});
	}
}


export async function DELETE(req) {
	try {
		const id = req.nextUrl.searchParams.get('id');
		
		if (id) {
			// Fetch the integration to ensure it exists
			const integration = await db.select().from(integrations).where(eq(integrations.id, Number(id)));
			
			if (integration.length > 0) {
				// Update the record by nullifying the GitHub-related fields
				await db
					.update(integrations)
					.set({
						githubOauth: false, githubPersonalAccessToken: null,
					})
					.where(eq(integrations.id, Number(id)));
				
				// Fetch the updated integration record manually
				const updatedIntegration = await db.select().from(integrations).where(eq(integrations.id, Number(id)));
				console.log('Updated integration record:', updatedIntegration);
				
				return NextResponse.json({message: "Integrations Updated Successfully", updatedIntegration}, {status: 200});
			} else {
				console.log('No integration found for ID:', id);
				return NextResponse.json({message: "Integration not found"}, {status: 404});
			}
		} else {
			console.log('ID not provided in the request');
			return NextResponse.json({message: "ID not given"}, {status: 400});
		}
	} catch (error) {
		console.error('Error in updating integrations:', error.message);
		return NextResponse.json({error: error.message}, {status: 500});
	}
}
