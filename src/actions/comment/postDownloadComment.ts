"use server"

import { auth } from "@/auth";
import { postBackend } from "@/data/fetch";
import { Comment } from "@/models/Comment";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PostCommentState } from "./PostCommentState";

const PostCommentValidator = z.object({
    content: z.string()
        .min(1, "Required")
        .max(400, "Too long!")
})

export async function postDownloadComment(downloadId: string, state: PostCommentState, formData: FormData): Promise<PostCommentState> {
    const session = await auth()

    if (!session) {
        return {
            result: { status: "failed", message: "Authentication failed." }
        }
    }

    const validationResult = PostCommentValidator.safeParse({
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

        const response = await postBackend<Comment>(`/downloads/${downloadId}/comments`, session, request)

        switch (response.status) {
            case 201:
                revalidatePath(`/downloads/[id]`)

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
                console.error(`Post comment request faulted: ${response.status}`)

                return {
                    result: { status: "failed", message: "Something went wrong..." }
                }
        }

    } catch (error) {

        console.error(error)

        return {
            result: { status: "failed", message: "Failed to post comment." }
        }

    }
}
