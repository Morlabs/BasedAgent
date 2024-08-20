import {NextResponse} from 'next/server';
import {account} from "@/lib/db/schema";
import {db} from "@/lib/db/connect";
import {eq} from "drizzle-orm";

export async function PATCH(req) {
	try {
		console.log('PATCH request received');
		const id = req.nextUrl.searchParams.get('id');
		console.log('ID from request:', id);
		
		const body = await req.json();
		console.log('Request body:', body);
		
		if (!id) {
			console.log('ID not provided in the request');
			return NextResponse.json({message: "ID not given"}, {status: 400});
		}
		
		const accounts = await db.select().from(account).where(eq(account.id, Number(id)));
		console.log('Accounts fetched from the database:', accounts);
		
		if (accounts.length === 0) {
			console.log('No account found for ID:', id);
			return NextResponse.json({message: "Account not found"}, {status: 404});
		}
		
		const selectedAccount = accounts[0];
		console.log('Selected account:', selectedAccount);
		
		// Check if the current password matches
		if (body.current_password !== selectedAccount.currentPassword) {
			console.log('Current password does not match');
			return NextResponse.json({message: "Current password is incorrect"}, {status: 400});
		}
		
		console.log('Current password matches, proceeding to update password');
		
		// Update the password
		await db
			.update(account)
			.set({
				currentPassword: body.new_password,
			})
			.where(eq(account.id, Number(id)));
		
		console.log('Password updated successfully');
		
		return NextResponse.json(
			{message: "Password updated successfully"},
			{status: 200}
		);
		
	} catch (error) {
		console.error('Error in updating password:', error.message);
		return NextResponse.json({error: error.message}, {status: 500});
	}
}
