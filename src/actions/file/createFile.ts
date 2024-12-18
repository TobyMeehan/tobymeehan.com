"use server"

import { auth } from "@/auth"
import { postBackend } from "@/data/fetch"
import { DownloadFile } from "@/models/File"

export interface CreateFileResult {
    result: { status: "success", file: DownloadFile & { uploadUrl: string } } | { status: "failed", message?: string }
}

export async function createFile(downloadId: string, idempotencyKey: string, file: { filename: string, contentType: string, size: number }): Promise<CreateFileResult> {
    const session = await auth()

    if (!session) {
        return { result: { status: "failed", message: "Authentication failed." } }
    }

    try {

        const response = await postBackend<DownloadFile & { uploadUrl: string }>(`/downloads/${downloadId}/files`, session, file, {
            headers: {
                "idempotency-key": idempotencyKey
            }
        })

        switch (response.status) {
            case 201:
                return {
                    result: {
                        status: "success",
                        file: response.data
                    }
                }

            default:
                console.log(response)

                return {
                    result: { status: "failed", message: "Something went wrong..." }
                }
        }

    } catch (error) {

        console.error(error)

        return {
            result: {
                status: "failed",
                message: "Failed to create file."
            }
        }

    }

}
