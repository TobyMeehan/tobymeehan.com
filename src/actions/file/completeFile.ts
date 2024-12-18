"use server"

import { auth } from "@/auth"
import { postBackend } from "@/data/fetch"
import { revalidatePath } from "next/cache"

export type CompleteFileResult =
    | { status: "success" }
    | { status: "failed", message?: string }

export async function completeFile(downloadId: string, fileId: string): Promise<CompleteFileResult> {
    const session = await auth()

    if (!session) {
        return { status: "failed", message: "Authentication failed." }
    }

    try {

        const response = await postBackend(`/downloads/${downloadId}/files/${fileId}/complete`, session, {})

        switch (response.status) {
            case 200:
                revalidatePath(`/downloads/[id]/files`)

                return { status: "success" }

            default:
                console.error(`Complete file request faulted: ${response.status}`)

                return { status: "failed", message: "Something went wrong..." }
        }

    } catch (error) {

        console.error(error)

        return {
            status: "failed",
            message: "Failed to complete file."
        }

    }
}
