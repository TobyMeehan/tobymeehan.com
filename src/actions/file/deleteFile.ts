"use server"

import { auth } from "@/auth"
import { deleteBackend } from "@/data/fetch"
import { revalidatePath } from "next/cache"

export interface DeleteFileState {
    result?: { status: "success" } | { status: "failed", message?: string }
}

export async function deleteFile(downloadId: string, fileId: string, state: DeleteFileState, formData: FormData): Promise<DeleteFileState> {
    const session = await auth()

    if (!session) {
        return {
            result: { status: "failed", message: "Authentication failed." }
        }
    }

    try {

        const response = await deleteBackend(`/downloads/${downloadId}/files/${fileId}`, session)

        switch (response.status) {
            case 204:
                revalidatePath(`/downloads/${downloadId}/files`)

                return {
                    result: { status: "success" }
                }

            default:
                console.error(`Delete file request faulted: ${response.status}`)

                return {
                    result: { status: "failed", message: "Something went wrong..." }
                }
        }

    } catch (error) {

        console.error(error)

        return {
            result: { status: "failed", message: "Failed to delete file." }
        }

    }
}
