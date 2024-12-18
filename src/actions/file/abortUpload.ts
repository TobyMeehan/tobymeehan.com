"use server"

import { auth } from "@/auth"
import { deleteBackend } from "@/data/fetch"

export async function abortUpload(downloadId: string, fileId: string, uploadId: string) {
    const session = await auth()

    if (!session) {
        return
    }

    try {

        await deleteBackend(`/downloads/${downloadId}/files/${fileId}/uploads/${uploadId}`, session)

    } catch (error) {
        console.error(error)
    }
}
