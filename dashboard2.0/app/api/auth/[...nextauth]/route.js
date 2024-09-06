// imports
import NextAuth from "next-auth"

// importing providers
import GithubProvider from "next-auth/providers/github"
import { getTopLanguages, getTotalContributions, getUserDetails, getExtra } from '@/helpers/github'
import { calculateDeveloperWeight } from '@/actions/calculateDeveloperWeight.api';
import { validateReferralSignIn } from "@/actions/validateReferralSignIn.api";
import { getGithubData, upsertGithubData } from "@/actions/getGithubData.api";

let referralDeveloperId = null;

const handler = (req, res) => NextAuth(req, res, {
	providers: [
		GithubProvider({
			clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
		})
	],
	callbacks: {

		async session({ session, token, user }) {


			// get referralDeveloperId from cookies for purpose of referral tracking
			const cookies = req.headers.get('cookie');
			referralDeveloperId = cookies
				.split('; ')
				.find(cookie => cookie.startsWith('referralDeveloperId='))
				?.split('=')[1];

			const referralPlatformSource = cookies
				.split('; ')
				.find(cookie => cookie.startsWith('referralPlatformSource='))
				?.split('=')[1];


			console.log('referralDeveloperId:', referralDeveloperId);
			console.log('referralPlatformSource:', referralPlatformSource);


			// Safely add user details to the session object
			try {
				if (token) {
					session.user.id = token.sub ?? null;
					session.user.accessToken = token?.accessToken ?? null;
					const githubApiData = await getGithubData(session.user.id);

					// fetch from database if it exists and updated timestamp is not older than 24 hours
					if (githubApiData && (new Date() - new Date(githubApiData.updatedAt)) < 86400000) {
						console.log('Fetching github data from the database ====>');
						session.user.githubDetails = githubApiData.githubDetails;
						session.user.githubDetails.top_languages = githubApiData.topLanguages;
						session.user.githubDetails.total_contribution = githubApiData.totalContribution;
						session.user.githubDetails.extra = githubApiData.extra;
					}
					else {
						console.log('Fetching github data for the first time  ====>');
						session.user.githubDetails = await getUserDetails(token?.accessToken);
						session.user.githubDetails.top_languages = await getTopLanguages(token?.accessToken, session.user.githubDetails.login);
						session.user.githubDetails.total_contribution = await getTotalContributions(token?.accessToken, session.user.githubDetails.login);
						session.user.githubDetails.extra = await getExtra(token?.accessToken, session.user.githubDetails.login);
						await upsertGithubData(session.user.id, session.user.githubDetails, session.user.githubDetails.top_languages, session.user.githubDetails.total_contribution, session.user.githubDetails.extra);
					}
				}
			} catch (error) {
				console.log('Error in github data fetching:', error.message);
			}



			// Safely add user details to the session object
			// session.user.id = token.sub ?? null;
			// session.user.accessToken = token?.accessToken ?? null;
			// session.user.githubDetails = await getUserDetails(token?.accessToken);
			// session.user.githubDetails.top_languages = await getTopLanguages(token?.accessToken, session.user.githubDetails.login);
			// session.user.githubDetails.total_contribution = await getTotalContributions(token?.accessToken, session.user.githubDetails.login);
			// session.user.githubDetails.extra = await getExtra(token?.accessToken, session.user.githubDetails.login);

			try {
				session.user.weight = await calculateDeveloperWeight(session.user);
				// session.user.weight = {};
			} catch (error) {
				console.log('Error in calculateDeveloperWeight:', error.message);
				// return Response.json({ error: error.message }, { status: 500 });
			}

			try {
				let isReferral = await validateReferralSignIn(session.user.email, referralDeveloperId, referralPlatformSource);
				// console.log('isReferral:', isReferral);
			} catch (error) {
				console.log('Error in validateReferralSignIn:', error.message);
				// return Response.json({ error: error.message }, { status: 500 });
			}

			return session;
		},
		async jwt({ token, user, account, profile }) {
			// Persist the OAuth access token and the user id to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
			}
			if (user) {
				token.sub = user.id;
			}

			return token;
		},
	}
});

export { handler as GET, handler as POST };
