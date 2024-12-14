import NextAuth from "next-auth";
import { type JWT } from "next-auth/jwt";
import { env } from "next-runtime-env";
import { postBackend } from "./data/fetch";

declare module "next-auth" {
    interface Session {
        apiToken: string
        error?: "TokenExpired"
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        apiToken: string
        expiresAt: number
        error?: "TokenExpired"
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    basePath: "/auth",

    providers: [{
        id: "thavyra",
        name: "Thavyra",
        type: "oidc",

        issuer: env("AUTH_THAVYRA_ISSUER"),
        clientId: env("AUTH_THAVYRA_ID"),
        clientSecret: env("AUTH_THAVYRA_SECRET"),

        authorization: {
            params: {
                scope: "openid account.profile.read"
            }
        },
    }],

    callbacks: {

        async jwt({ token, account }) {

            if (account) {

                token.sub = account.providerAccountId

                const response = await postBackend<{ token: string, expiresIn: number }>(`/token`, undefined, {
                    accessToken: account.access_token
                })

                if (response.status === 200) {
                    token.apiToken = response.data.token
                    token.expiresAt = Date.now() + response.data.expiresIn * 1000
                }
            } else if (Date.now() < token.expiresAt) {
                return token
            } else {
                token.error = "TokenExpired"
            }

            return token

        },

        async session({ session, token }) {

            session.user.id = token.sub!
            session.apiToken = token.apiToken
            session.error = token.error

            return session
        },

    }
})
