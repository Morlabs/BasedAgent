import { db } from "@/lib/db/connect";
import { eq } from "drizzle-orm";
import { developerInvites } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { email } = await request.json(); // Correctly extracting email from the request body
        console.log('validateReferralSignIn:', email);

        // Find the referral by email from developerInvites table
        const referral = await db.query.developerInvites.findFirst({
            where: eq(developerInvites.email, email)
        });
        console.log('Referral:', referral);

        // If email does not exist, return without error
        if (!referral) {
            return NextResponse.json({ message: 'No referral' });
        }

        // If status is pending, then set status to active, else leave unchanged
        if (referral.status === 'pending') {
            await db.update(developerInvites)
                .set({ status: 'active' })
                .where(eq(developerInvites.email, email));
            return NextResponse.json({ message: 'Referral sign in validated' });
        }
        else if (referral.status === 'active') {
            return NextResponse.json({ message: 'Referral already active' });
        }

        return NextResponse.json({ message: 'False referral' });
    } catch (error) {
        console.error('Error in validateReferralSignIn:', error.message);
        return NextResponse.json({ error: 'Error in validateReferralSignIn' }, { status: 500 });
    }
}
