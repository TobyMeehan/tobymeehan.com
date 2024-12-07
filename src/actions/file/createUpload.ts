"use server"

import { auth } from "@/auth"
import { postBackend } from "@/data/fetch"

export interface CreateUploadResult {
    result: { status: "success", uploadId: string } | { status: "failed", message?: string }
}

export async function createUpload(downloadId: string, fileId: string): Promise<CreateUploadResult> {
    const session = await auth()

    if (!session) {
        return {
            result: { status: "failed", message: "Authentication failed." }
        }
    }

    try {

        const response = await postBackend<{ id: string }>(`/downloads/${downloadId}/files/${fileId}/uploads`, session, {})

        switch (response.status) {
            case 201:
                return {
                    result: {
                        status: "success",
                        uploadId: response.data.id
                    }
                }

            default:
                console.error(`Create upload request faulted: ${response.status}`)

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
                message: "Failed to create upload."
            }
        }

    }
}
