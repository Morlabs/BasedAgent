import { db } from "@/lib/db/connect";
import { eq, sql } from "drizzle-orm";
import { developerInvites } from "@/lib/db/schema";
import { v4 as uuidv4 } from 'uuid'

export async function validateReferralSignIn({ email }) {

    // find the referral by email from developerInvites table
    // if email exists, if status is pending , then set status to active else leave unchanged
    // if email does not exist, return without error
    const referral = await db
        .select('*')
        .from(developerInvites)
        .where(eq('email', email))
        .limit(1);

    if (referral.length === 0) {
        return false;
    }

    if (referral[0].status === 'pending') {
        await db.update(developerInvites)
            .set({ status: 'active' })
            .where(eq('email', email));
        return true;
    }

    return false;

}