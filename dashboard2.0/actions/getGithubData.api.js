"use server"
import { db } from "@/lib/db/connect";
import { eq } from "drizzle-orm";
import { githubApiData } from "@/lib/db/schema";

export async function getGithubData(developerId) {
    try {
        return await db.query.githubApiData.findFirst({
            where: (githubApiData) => eq(githubApiData.id, developerId),
        });
    } catch (error) {
        console.error('Error fetching github data:', error);
        return null;
    }
}

export async function upsertGithubData(developerId, githubDetails, topLanguages, totalContribution, extra) {
    try {
        const existingData = await getGithubData(developerId);
        // console.log('Existing Data:', existingData);

        if (existingData) {
            console.log('Updating existing github data for Developer ID:', developerId);
            const result = await db.update(githubApiData)
                .set({
                    githubDetails: githubDetails,
                    topLanguages: topLanguages,
                    totalContribution: totalContribution,
                    extra: extra,
                    updatedAt: new Date()
                })
                .where(eq(githubApiData.id, developerId));
            // console.log('Update Result:', result);
            return result;
        } else {
            console.log('Inserting new github data for Developer ID:', developerId);
            const result = await db.insert(githubApiData)
                .values({
                    id: developerId,
                    githubDetails: githubDetails,
                    topLanguages: topLanguages,
                    totalContribution: totalContribution,
                    extra: extra,
                });
            // console.log('Insert Result:', result);
            return result;
        }
    } catch (error) {
        console.error('Error upserting github data:', error);
        return null;
    }
}
