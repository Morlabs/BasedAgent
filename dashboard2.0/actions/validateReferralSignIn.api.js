import { db } from "@/lib/db/connect";
import { eq } from "drizzle-orm";
import { developerInvites, developers } from "@/lib/db/schema";

export async function validateReferralSignIn(email, referralDeveloperId = null, referralPlatformSource = null) {
    try {


        // handle referral using social media
        if (referralDeveloperId) {
            const referral = await db.query.developerInvites.findFirst({
                where: eq(developerInvites.email, email),
            });

            // to prevent duplicate referrals for the same email through social media
            if (referral) {
                console.log('Referral already exists:', referral);
            }
            else {
                // if developer already exists, return false
                const existingDeveloper = await db.query.developers.findFirst({
                    where: eq(developers.email, email),
                });

                if (existingDeveloper) {
                    console.log('Developer already exists');
                    return false;
                }
                // insert referral for the email through social media
                await db.insert(developerInvites)
                    .values({
                        developerId: referralDeveloperId,
                        email: email,
                        status: 'pending',
                        earnings: 0,
                        inviteDate: new Date(),
                        source: referralPlatformSource || 'X, Facebook, Linkedin',
                        githubAccess: 'Level 1',
                    })
            }

        }

        // handle referral using email invite and social media as source
        const referral = await db.query.developerInvites.findFirst({
            where: eq(developerInvites.email, email),
        });


        if (!referral) {
            return false;
        }


        const developer = await db.query.developers.findFirst({
            where: eq(developers.email, email),
        });

        if (!developer) {
            console.error('Developer not found for email:', email);
            return false;
        }

        const totalWeight = parseInt(JSON.parse(developer.weight).totalWeight || 0);
        const earned = Math.round(totalWeight * 0.1);

        if (referral.status === 'pending') {
            await updateReferralStatus(email, 'active', earned);
            console.log("Referral activated. Total weight:", totalWeight);
            return true;
        }

        if (referral.status === 'active') {
            await updateReferralEarnings(email, earned);
            console.log("Earnings updated for active referral. Total weight:", totalWeight);
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error in validateReferralSignIn:', error.message);
        return false;
    }
}

async function updateReferralStatus(email, status, earnings) {
    await db.update(developerInvites)
        .set({ status, earnings })
        .where(eq(developerInvites.email, email));
}

async function updateReferralEarnings(email, earnings) {
    await db.update(developerInvites)
        .set({ earnings })
        .where(eq(developerInvites.email, email));
}