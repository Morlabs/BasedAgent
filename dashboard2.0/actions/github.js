import axios from 'axios';

export async function getUserDetails(accessToken) {
	try {
		const response = await axios.get('https://api.github.com/user', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching user details:', error);
		return null;
	}
}




// Function to get top languages
export async function getTopLanguages(accessToken, username) {
	try {
		const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		
		const languages = {};
		const repoLanguages = await Promise.all(
			reposResponse.data.map(async (repo) => {
				const langResponse = await axios.get(repo.languages_url, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				return langResponse.data;
			})
		);
		
		// Calculate total language usage
		repoLanguages.forEach((repoLang) => {
			for (const lang in repoLang) {
				if (languages[lang]) {
					languages[lang] += repoLang[lang];
				} else {
					languages[lang] = repoLang[lang];
				}
			}
		});
		
		// Sort languages by usage
		const sortedLanguages = Object.entries(languages)
			.sort((a, b) => b[1] - a[1])
			.map(([lang, count]) => lang);
		
		return sortedLanguages.slice(0, 5); // Top 5 languages
	} catch (error) {
		console.error('Error fetching top languages:', error);
		return [];
	}
}

// Function to get total contributions
export async function getTotalContributions(accessToken, username) {
	const query = `
        query {
            user(login: "${username}") {
                contributionsCollection {
                    contributionCalendar {
                        totalContributions
                    }
                }
            }
        }
    `;
	
	try {
		const response = await axios.post(
			'https://api.github.com/graphql',
			{ query },
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		
		const totalContributions = response.data.data.user.contributionsCollection.contributionCalendar.totalContributions;
		return totalContributions;
	} catch (error) {
		console.error('Error fetching total contributions:', error);
		return 0;
	}
}