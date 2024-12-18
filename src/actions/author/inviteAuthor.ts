"use server"

import { auth } from "@/auth"
import { postBackend } from "@/data/fetch"
import { Author } from "@/models/Author"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export interface InviteAuthorState {
    result?: { status: "success" } | { status: "failed", message?: string }
    errors?: {
        userId?: string[]
    }
}

const InviteAuthorValidator = z.object({
    userId: z.string()
        .uuid()
})

export async function inviteAuthor(downloadId: string, state: InviteAuthorState, formData: FormData): Promise<InviteAuthorState> {
    const session = await auth()

    if (!session) {
        return { result: { status: "failed", message: "Authentication failed." } }
    }

    const validationResult = InviteAuthorValidator.safeParse({
        userId: formData.get("userId")
    })

    if (!validationResult.success) {
        return {
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = validationResult.data

    try {

        const response = await postBackend<Author>(`/downloads/${downloadId}/authors`, session, request)

        switch (response.status) {
            case 201:
                revalidatePath(`/downloads/${downloadId}/authors`)

                return {
                    result: { status: "success" }
                }

            case 400:
                return {
                    result: { status: "failed" },
                    errors: {
                        userId: response.errors.filter(x => x.name === "userId").map(x => x.reason)
                    }
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
                message: "Failed to add author."
            }
        }

    }
}
