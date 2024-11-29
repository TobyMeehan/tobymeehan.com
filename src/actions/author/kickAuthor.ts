"use server"

import { auth } from "@/auth"
import { deleteBackend } from "@/data/fetch"
import { revalidatePath } from "next/cache"

export interface KickAuthorState {
    result?: { status: "success" } | { status: "failed", message?: string }
}

export async function kickAuthor(downloadId: string, authorId: string, state: KickAuthorState, formData: FormData): Promise<KickAuthorState> {
    const session = await auth()

    if (!session) {
        return { result: { status: "failed", message: "Authentication failed." } }
    }

    try {

        const response = await deleteBackend(`/downloads/${downloadId}/authors/${authorId}`, session)

        switch (response.status) {
            case 204:
                revalidatePath(`/downloads/${downloadId}/authors`)

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
                message: "Failed to kick author."
            }
        }

    }
}
