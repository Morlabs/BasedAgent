// imports
import NextAuth from "next-auth"

// importing providers
import GithubProvider from "next-auth/providers/github"
import { getTopLanguages, getTotalContributions, getUserDetails, getExtra } from '@/helpers/github'

const handler = NextAuth({
	providers: [
		GithubProvider({
			clientId: 'Ov23liqqaWOhYy8noV6M',
			clientSecret: 'ed6f1966154128388ba57a1ac1ad80b0e4a8f21a',
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
