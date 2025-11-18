import { PrismaClient } from '@/generated/prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async session({ session, user }) {
			if (session.user) {
				session.user.id = user.id
			}
			return session
		},
	},
	pages: {
		signIn: '/auth/signin',
	},
	session: {
		strategy: 'database',
		maxAge: 30 * 24 * 60 * 60, // 30일
	},
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
