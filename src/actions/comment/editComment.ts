"use server"

import { auth } from "@/auth"
import { putBackend } from "@/data/fetch"
import { Comment } from "@/models/Comment"
import { z } from "zod"

export interface EditCommentState {
    currentContent: string
    result?: { status: "success" } | { status: "failed", message?: string }
    errors?: {
        content?: string[]
    }
}

const EditCommentValidator = z.object({
    content: z.string()
        .min(1, "Required")
        .max(400, "Too long!")
})

export async function editComment(id: string, state: EditCommentState, formData: FormData): Promise<EditCommentState> {
    const session = await auth()

    if (!session) {
        return {
            currentContent: state.currentContent,
            result: { status: "failed", message: "Authentication failed." }
        }
    }

    const validationResult = EditCommentValidator.safeParse({
        content: formData.get("content")
    })

    if (!validationResult.success) {
        return {
            currentContent: state.currentContent,
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = validationResult.data

    try {

        const response = await putBackend<Comment>(`/comments/${id}`, session, request)

        switch (response.status) {
            case 200:
                return {
                    currentContent: response.data.content,
                    result: { status: "success" }
                }

            case 400:
                return {
                    currentContent: state.currentContent,
                    result: { status: "failed" },
                    errors: {
                        content: response.errors.filter(x => x.name === "content").map(x => x.reason)
                    }
                }

            default:
                console.error(`Edit comment request faulted: ${response.status}`)

                return {
                    currentContent: state.currentContent,
                    result: { status: "failed", message: "Something went wrong..." }
                }
        }

    } catch (error) {

        console.error(error)

        return {
            currentContent: state.currentContent,
            result: { status: "failed", message: "Failed to edit comment." }
        }

    }
}
