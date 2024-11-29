"use server"

import { auth } from "@/auth"
import { deleteBackend } from "@/data/fetch"
import { revalidatePath } from "next/cache"

export interface DeleteCommentState {
    result?: { status: "success" } | { status: "failed", message?: string }
}

export async function deleteComment(id: string, state: DeleteCommentState, formData: FormData): Promise<DeleteCommentState> {
    const session = await auth()

    if (!session) {
        return {
            result: { status: "failed", message: "Authentication failed." }
        }
    }

    try {

        const response = await deleteBackend(`/comments/${id}`, session)

        switch (response.status) {
            case 204:

                revalidatePath(`/downloads/`)

                return {
                    result: { status: "success" }
                }

            default:
                return {
                    result: {
                        status: "failed",
                        message: "Something went wrong..."
                    }
                }
        }

    } catch (error) {

        console.error(error)

        return {
            result: {
                status: "failed",
                message: "Failed to delete comment."
            }
        }

    }
}
