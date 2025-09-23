import NextAuth,{ NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

const authOptions: NextAuthOptions = {
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
            return true; // don't throw errors
        },
        async session({ session, token }) {
         return session
        },
    },

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
