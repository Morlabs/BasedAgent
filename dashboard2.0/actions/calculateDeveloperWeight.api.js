"use server"
import { languageRankings } from '@/data/languageRankings';

export async function calculateDeveloperWeight(user) {
    try {
        if (!user) {
            throw new Error("User not found");
        }
        const githubDetails = user?.githubDetails;
        const { recentContributions, contributions } = githubDetails?.extra;


        // Calculate Base Rating (BR)
        const createdAt = new Date(githubDetails?.created_at);
        const yearsActive = (new Date() - createdAt) / (365 * 24 * 60 * 60 * 1000);
        const BR = Math.log(1 + githubDetails?.public_repos) * Math.log(1 + githubDetails?.followers) * (1 + (yearsActive / 10));

        // Calculate Activity Factor (AF)
        const AF = 1 + (recentContributions / 100);

        // Calculate Contribution Factor (CF)
        const totalContributions = githubDetails.total_contribution;
        const CF = 1 + Math.log(1 + totalContributions);

        // Calculate Diversity Factor (DF)
        const uniqueLanguages = githubDetails?.top_languages?.length
        const DF = 1 + (uniqueLanguages / 10);


        // Calculate Contribution Impact Factor (CIF)
        let CIF = 1
        try {
            CIF = contributions?.reduce((acc, { numberOfCommitsByUser, numberOfStars }) => {
                if (numberOfStars === undefined) {
                    numberOfStars = 0;
                }
                return acc + Math.log(1 + numberOfStars) * numberOfCommitsByUser;
            }, 0);
        } catch (error) {
            console.error('Error calculating CIF:', error?.message);
            CIF = 1;
        }

        // Calculate Language Weights and Bonus
        const languageWeights = await calculateLanguageWeights(user);
        const LB = languageWeights?.reduce((acc, { weight }) => acc + weight, 0);


        // Calculate Global Weight (GW)
        const GW = (BR * AF * CF * DF * CIF) + LB;

        // Calculate Final Weight (W)
        const W = GW + LB;

        return { totalWeight: W, languageWeights };
    } catch (error) {
        console.error('Error calculating developer weight:', error.message);
        throw error;
    }
}

export async function calculateLanguageWeights(user) {
    const languages = user?.githubDetails?.top_languages;
    const contributions = user?.githubDetails?.extra?.contributions

    const weights = languages?.map(language => {
        let repos = contributions?.filter(contribution => contribution?.topLanguages?.includes(language));
        // if number of stars is not available, set it to 0
        repos = repos?.map(repo => {
            if (repo.numberOfStars === undefined) {
                repo.numberOfStars = 0;
            }
            return repo;
        });

        const repoCount = repos?.length;
        const totalStars = repos?.reduce((acc, { numberOfStars }) => acc + numberOfStars, 0);
        const numberOfRecentLanguageContributions = repos?.reduce((acc, { commits }) => {
            return acc + commits?.filter(commit => {
                const oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();
                return commit.date > oneYearAgo;
            })?.length;
        }, 0);

        const totalLanguageContributions = repos?.reduce((acc, { commits }) => {
            return acc + commits?.length;
        }, 0);


        // language specific rating LR
        const LR = Math.log(1 + repoCount) * Math.log(1 + totalStars);

        // language activity factor LAF
        const LAF = 1 + (numberOfRecentLanguageContributions / 50);

        //  Language-specific Contribution Factor (LCF) 
        const LCF = 1 + Math.log(1 + totalLanguageContributions);

        // Language-specific Contribution Impact Factor (LCIF)
        const LCIF = repos?.reduce((acc, { numberOfCommitsByUser, numberOfStars }) => {
            if (numberOfStars === undefined) {
                numberOfStars = 0;
            }
            return acc + Math.log(1 + numberOfStars) * numberOfCommitsByUser;
        }, 0);

        // Language Popularity (LP) 
        const languageRank = (languageRankings.find(lang => lang.language === language)?.rank) || 1;
        const LP = 1 + (1 / languageRank);

        // language specific weight LW
        const LW = (LR * LAF * LCF * LCIF) * LP;

        return { language, weight: LW };
    });

    return weights;
}
