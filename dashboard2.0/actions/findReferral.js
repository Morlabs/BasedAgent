"use server"
import { db } from "@/lib/db/connect";
import { sql, eq } from "drizzle-orm";
import { developerInvites, developers } from "@/lib/db/schema";

export async function findReferral(developerId) {
    // const referral = await db.query.developerInvites.findFirst({
    //     where: eq(developerInvites.referralToken, referralToken)
    // });

    // if (!referral) {
    //     return;
    // }

    const developer = await db.query.developers.findFirst({
        where: eq(developers.id, developerId)
    });

    return {
        developer
    }
}