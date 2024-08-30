// imports
import NextAuth from "next-auth"

// importing providers
import GithubProvider from "next-auth/providers/github"
import { getTopLanguages, getTotalContributions, getUserDetails, getExtra } from '@/helpers/github'
import { calculateDeveloperWeight } from '@/actions/calculateDeveloperWeight.api';
import { validateReferralSignIn } from "@/actions/validateReferralSignIn.api";

const handler = NextAuth({
	providers: [
		GithubProvider({
			clientId: 'Ov23liqqaWOhYy8noV6M',
			clientSecret: '36c2c5f34ed4649a23d195135dd7ce7838c8100c',
		})
	],
	callbacks: {
		async session({ session, token, user }) {
			// Safely add user details to the session object
			session.user.id = token.sub ?? null;
			session.user.accessToken = token?.accessToken ?? null;
			session.user.githubDetails = await getUserDetails(token?.accessToken);
			session.user.githubDetails.top_languages = await getTopLanguages(token?.accessToken, session.user.githubDetails.login);
			session.user.githubDetails.total_contribution = await getTotalContributions(token?.accessToken, session.user.githubDetails.login);
			session.user.githubDetails.extra = await getExtra(token?.accessToken, session.user.githubDetails.login);

			try {
				session.user.weight = await calculateDeveloperWeight(session.user);
				// session.user.weight = {};
			} catch (error) {
				console.log('Error in calculateDeveloperWeight:', error.message);
				// return Response.json({ error: error.message }, { status: 500 });
			}

			try {
				let isReferral = await validateReferralSignIn(session.user.email);
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
		}
	}
});

export { handler as GET, handler as POST };
