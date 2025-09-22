import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export interface JWTPayload {
    userId: string
    email: string
    iat: number
    exp: number
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || 'demo-google-client-id',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'demo-google-client-secret',
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60, // 1 hour (daha kısa süre)
        updateAge: 60 * 5, // 5 minutes
    },
    callbacks: {
        async signIn({ profile }) {
            console.log("Profile from Google:", profile);
            return true; // don't throw errors
        },
        async session({ session, token }) {
            console.log('Session Callback - Token:', token)
            console.log('Session Callback - Session:', session)

            return session
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
