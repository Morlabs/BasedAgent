import { db } from "@/lib/db/connect";
import { eq } from "drizzle-orm";
import { developerInvites, developers } from "@/lib/db/schema";
import { calculateDeveloperWeight } from "@/actions/calculateDeveloperWeight.api";

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
            const developer = await db.query.developers.findFirst({
                where: eq(developers.email, email)
            });

            let totalWeight = developer.weight.totalWeight;

            if (!totalWeight) {
                // calculate the total weight of the developer
                totalWeight = 0;
            }

            // set earnings to 10% of totalWeight in developerInvites table
            await db.update(developerInvites)
                .set({ earnings: totalWeight * 0.1, status: 'active' })
                .where(eq(developerInvites.email, email));

            console.log("totalWeight", totalWeight);
            return true
        }
        else if (referral.status === 'active') {
            //    find the developer by email from developers table
            const developer = await db.query.developers.findFirst({
                where: eq(developers.email, email)
            });

            let totalWeight = developer.weight.totalWeight || 0;



            // set earnings to 10% of totalWeight in developerInvites table
            await db.update(developerInvites)
                .set({ earnings: totalWeight * 0.1 })
                .where(eq(developerInvites.email, email));

            console.log("totalWeight", totalWeight);
            return true
        }

        return false
    } catch (error) {
        console.error('Error in validateReferralSignIn:', error.message);
        return false
    }


}