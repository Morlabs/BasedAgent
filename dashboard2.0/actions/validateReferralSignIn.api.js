import { db } from "@/lib/db/connect";
import { eq } from "drizzle-orm";
import { developerInvites } from "@/lib/db/schema";

export async function validateReferralSignIn(email) {
    try {

        // Find the referral by email from developerInvites table
        const referral = await db.query.developerInvites.findFirst({
            where: eq(developerInvites.email, email)
        });
        // console.log('Referral:', referral);

        // If email does not exist, return without error
        if (!referral) {
            return false
        }

        // If status is pending, then set status to active, else leave unchanged
        if (referral.status === 'pending') {
            await db.update(developerInvites)
                .set({ status: 'active' })
                .where(eq(developerInvites.email, email));
            return true
        }
        else if (referral.status === 'active') {
            return true
        }

        return false
    } catch (error) {
        console.error('Error in validateReferralSignIn:', error.message);
        return false
    }


}