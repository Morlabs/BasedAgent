// imports
import NextAuth from "next-auth"

// importing providers
import GithubProvider from "next-auth/providers/github"
import {getUserDetails} from '@/actions/github'

const handler = NextAuth({
	providers: [
		GithubProvider({
			clientId: 'Ov23liaL5npr1OPp9IMg',
			clientSecret: 'b01d39801c73d61f4b3a5dd6bdbed596f4bd9d38',
		})
	],
	callbacks: {
		async session({session, token, user}) {
			// Safely add user details to the session object
			session.user.id = token.sub ?? null;
			session.user.accessToken = token?.accessToken ?? null;
			session.user.githubDetails = await getUserDetails(token?.accessToken);
			return session;
		},
		async jwt({token, user, account, profile}) {
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

export {handler as GET, handler as POST};
