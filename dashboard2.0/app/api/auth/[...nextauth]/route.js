// imports
import NextAuth from "next-auth"

// importing providers
import GithubProvider from "next-auth/providers/github"


const handler = NextAuth({
	providers: [
		GithubProvider({
			clientId: 'Ov23liaL5npr1OPp9IMg',
			clientSecret: 'b01d39801c73d61f4b3a5dd6bdbed596f4bd9d38',
		})
	]
})

export {handler as GET, handler as POST}