"use server"

import { auth } from "@/auth"
import { postBackend } from "@/data/fetch"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { PostCommentState } from "./postDownloadComment"
import { Comment } from "@/models/Comment"

const ReplyValidator = z.object({
    content: z.string()
        .min(1, "Required")
        .max(400, "Too long!")
})

export async function reply(commentId: string, state: PostCommentState, formData: FormData): Promise<PostCommentState> {
    const session = await auth()

    if (!session) {
        return {
            result: { status: "failed", message: "Authentication failed." }
        }
    }

    const validationResult = ReplyValidator.safeParse({
        content: formData.get("content")
    })

    if (!validationResult.success) {
        return {
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = validationResult.data

    try {

        const response = await postBackend<Comment>(`/comments/${commentId}/replies`, session, request)

        switch (response.status) {
            case 201:
                revalidatePath(`/downloads/[slug]`, "page")

                return {
                    result: {
                        status: "success",
                        comment: response.data
                    }
                }

            case 400:
                return {
                    result: { status: "failed" },
                    errors: {
                        content: response.errors.filter(x => x.name === "content").map(x => x.reason)
                    }
                }

            default:
                console.error(`Reply requets faulted: ${response.status}`)

                return {
                    result: { status: "failed", message: "Something went wrong..." }
                }
        }

    } catch (error) {

        console.error(error)

        return {
            result: { status: "failed", message: "Failed to reply." }
        }

    }
}
