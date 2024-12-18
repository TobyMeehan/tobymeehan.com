"use server"

import { auth } from "@/auth"
import { fetchUserById } from "@/data/users"
import { User } from "@/models/User"
import { z } from "zod"

export interface SearchUserResult {
    result?: { status: "success", user: User } | { status: "notfound" } | { status: "failed", message?: string }
    errors?: {
        query?: string[]
    }
}

const SearchUserValidator = z.object({
    query: z.string()
})

export async function searchUser(query: string): Promise<SearchUserResult> {
    const session = await auth()

    if (!session) {
        return { result: { status: "failed", message: "Authentication failed." } }
    }

    const validationResult = SearchUserValidator.safeParse({
        query
    })

    if (!validationResult.success) {
        return {
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    let username = validationResult.data.query

    if (!username.startsWith("@")) {
        username = "@" + username
    }

    try {

        const response = await fetchUserById(username)

        switch (response.status) {
            case "success":
                return {
                    result: { status: "success", user: response.user }
                }
            case "notfound":
                return {
                    result: { status: "notfound" }
                }
            default:
                return {
                    result: { status: "failed", message: "Something went wrong..." }
                }
        }
    } catch (error) {

        console.error(error)

        return {
            result: {
                status: "failed",
                message: "Uh oh! Search failed..."
            }
        }

    }
}
