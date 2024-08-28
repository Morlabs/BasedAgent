


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
        const BR = Math.log(1 + githubDetails.public_repos) * Math.log(1 + githubDetails.followers) * (1 + (yearsActive / 10));

        // Calculate Activity Factor (AF)
        const AF = 1 + (recentContributions / 100);

        // Calculate Contribution Factor (CF)
        const totalContributions = githubDetails.total_contribution;
        const CF = 1 + Math.log(1 + totalContributions);

        // Calculate Diversity Factor (DF)
        const uniqueLanguages = githubDetails.top_languages.length
        const DF = 1 + (uniqueLanguages / 10);


        // Calculate Contribution Impact Factor (CIF)
        let CIF = 1
        try {
            CIF = contributions.reduce((acc, { numberOfCommitsByUser, numberOfStars }) => {
                if (numberOfStars === undefined) {
                    numberOfStars = 0;
                }
                return acc + Math.log(1 + numberOfStars) * numberOfCommitsByUser;
            }, 0);
        } catch (error) {
            console.error('Error calculating CIF:', error.message);
            CIF = 1;
        }

        // Calculate Language Weights and Bonus
        const languageWeights = await calculateLanguageWeights(user);
        const LB = languageWeights.reduce((acc, { LW }) => acc + LW, 0);

        // Calculate Global Weight (GW)
        const GW = (BR * AF * CF * DF * CIF) + LB;

        // Calculate Final Weight (W)
        const W = GW + LB;

        return { totalWeight: W, languageWeights };
    } catch (error) {
        console.error('Error calculating developer weight:', error.stack);
        throw error;
    }
}

export async function calculateLanguageWeights(user) {
    const languages = user?.githubDetails.top_languages;
    const contributions = user?.githubDetails.extra?.contributions;

    const langRepos = languages.map(language => {
        let repos = contributions.filter(contribution => contribution.topLanguages.includes(language));
        // if number of stars is not available, set it to 0
        repos = repos.map(repo => {
            if (repo.numberOfStars === undefined) {
                repo.numberOfStars = 0;
            }
            return repo;
        });

        const repoCount = repos.length;
        const totalStars = repos.reduce((acc, { numberOfStars }) => acc + numberOfStars, 0);
        const LR = Math.log(1 + repoCount) * Math.log(1 + totalStars);
        return { language, LW: LR, LR };
    });

    const LR = langRepos.reduce((acc, { LR }) => acc + LR, 0);

    const LAF = 1 + (LR / 50);

    const langReposWithContributions = langRepos.filter(({ LR }) => LR > 0);
    const totalLangContributions = langReposWithContributions.reduce((acc, { LR }) => acc + LR, 0);

    const LCF = 1 + Math.log(1 + totalLangContributions);

    const LCIF = langReposWithContributions.reduce((acc, { LR }) => acc + LR, 0);

    // language popularity
    const LP = 1;

    const LW = (LR * LAF * LCF * LCIF) * LP;
    return langRepos.map(({ language, LW }) => ({ language, LW }));
}
