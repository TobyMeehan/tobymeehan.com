import NextAuth from "next-auth";
import { type JWT } from "next-auth/jwt";
import { env } from "next-runtime-env";
import { postBackend } from "./data/fetch";

declare module "next-auth" {
    interface Session {
        apiToken: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        apiToken: string,
        expiresIn: number
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

        async profile(profile) {

            console.log(profile)



            return { ...profile }
        },
    }],

    callbacks: {

        async jwt({ token, account }) {

            if (account) {

                const response = await postBackend<{ token: string, expiresIn: number }>(`/token`, undefined, {
                    accessToken: account.access_token
                })

                if (response.status === 200) {
                    token.apiToken = response.data.token
                }
            }

            return token

        },

        async session({ session, token }) {

            session.apiToken = token.apiToken

            return session
        },

    }
})
