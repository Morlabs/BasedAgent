import { contributions } from '@/lib/db/schema';
import axios from 'axios';
import fs from 'fs';

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

		// write response to json file
		// fs.writeFileSync('response.json', JSON.stringify(reposResponse.data, null, 4));
		// console.log('response written to file');


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

		// return sortedLanguages.slice(0, 5); // Top 5 languages
		return sortedLanguages;
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

async function getCommitCountLastYear(username, token) {
	const oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString();
	let totalCommits = 0;
	let page = 1;
	let hasMoreCommits = true;

	while (hasMoreCommits) {
		const commitsResponse = await axios.get(`https://api.github.com/search/commits?q=author:${username}+committer-date:>${oneYearAgo}&per_page=100&page=${page}`, {
			headers: {
				Authorization: `token ${token}`,
				Accept: 'application/vnd.github.cloak-preview'
			}
		});
		const commits = commitsResponse.data.items;

		// Add the number of commits on this page to the total count
		totalCommits += commits.length;

		// Check if there are more pages
		hasMoreCommits = commits.length === 100;  // GitHub API returns 100 results per page max
		page += 1;
	}

	return totalCommits;
}

export async function getCommitCounts(username, token) {
	// Step 1: Get Repositories Owned by the User
	const ownedReposResponse = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, {
		headers: { Authorization: `token ${token}` }
	});

	const ownedRepos = ownedReposResponse.data;

	// Step 2: Get Repositories Where the User Has Contributed but Is Not the Owner
	const commitsResponse = await axios.get(`https://api.github.com/search/commits?q=author:${username}&per_page=100`, {
		headers: {
			Authorization: `token ${token}`,
			Accept: 'application/vnd.github.cloak-preview'
		}
	});

	const contributedRepos = commitsResponse.data.items
		.map(commit => commit.repository)
		.filter(repo => repo.owner.login !== username);

	// Combine owned and contributed repositories
	const allRepos = [...ownedRepos, ...contributedRepos];

	// Step 3: Remove Duplicates by repository full_name (owner/repo)
	const uniqueRepos = Array.from(new Set(allRepos.map(repo => repo.full_name)))
		.map(full_name => allRepos.find(repo => repo.full_name === full_name));

	// Step 4: Get Commit Count and Star Count for Each Unique Repository
	const commitCounts = await Promise.all(uniqueRepos.map(async (repo) => {
		const commitsResponse = await axios.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`, {
			params: { author: username, per_page: 100 },
			headers: { Authorization: `token ${token}` }
		});

		// get top languages used in repo
		const langResponse = await axios.get(repo.languages_url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const languages = langResponse.data;
		const topLanguages = Object.entries(languages)
			.sort((a, b) => b[1] - a[1])
			.map(([lang, count]) => lang);

		const commitCount = commitsResponse.data.length;  // This only counts the first page

		return {
			repoName: repo.full_name,
			numberOfCommitsByUser: commitCount,
			numberOfStars: repo.stargazers_count,
			topLanguages: topLanguages,
		};
	}));

	return commitCounts;
}

export async function getExtra(accessToken, username) {

	try {
		const recentContributions = await getCommitCountLastYear(username, accessToken);
		const commitCounts = await getCommitCounts(username, accessToken);

		return { recentContributions: recentContributions, contributions: commitCounts };
	} catch (error) {
		console.error('Error fetching total contributions:', error);
		return 0;
	}
}