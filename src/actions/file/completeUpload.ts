"use server"

import { auth } from "@/auth"
import { postBackend } from "@/data/fetch"
import { Part } from "@/models/Upload"
import { revalidatePath } from "next/cache"

export interface CompleteUploadResult {
    result: { status: "success" } | { status: "failed", message?: string }
}

export async function completeUpload(downloadId: string, fileId: string, uploadId: string, parts: Part[]): Promise<CompleteUploadResult> {
    const session = await auth()

    if (!session) {
        return {
            result: { status: "failed", message: "Authentication failed." }
        }
    }

    const request = {
        parts
    }

    try {

        const response = await postBackend(`/downloads/${downloadId}/files/${fileId}/uploads/${uploadId}/complete`, session, request)

        switch (response.status) {
            case 200:
                revalidatePath(`/downloads/${downloadId}/files`)

                return {
                    result: { status: "success" }
                }

            default:
                console.error(`Complete upload request faulted: ${response.status}`)

                return {
                    result: { status: "failed", message: "Something went wrong..." }
                }
        }

    } catch (error) {

        console.error(error)

        return {
            result: {
                status: "failed",
                message: "Failed to complete upload."
            }
        }

    }
}
