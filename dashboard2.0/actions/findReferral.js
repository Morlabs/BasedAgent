"use server"
import { db } from "@/lib/db/connect";
import { sql, eq } from "drizzle-orm";
import { developerInvites, developers } from "@/lib/db/schema";

export async function findReferral(referralToken) {
    const referral = await db.query.developerInvites.findFirst({
        where: eq(developerInvites.referralToken, referralToken)
    });

    const developer = await db.query.developers.findFirst({
        where: eq(developers.id, referral.developerId)
    });

    return {
        referral,
        developer
    }
}