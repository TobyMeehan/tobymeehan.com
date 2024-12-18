"use server"

import { auth } from "@/auth"
import { postBackend } from "@/data/fetch"

export type SignPartResult =
    | { status: "success", url: string }
    | { status: "failed", message?: string }

export async function signPart(downloadId:string, fileId: string, uploadId: string, partNumber: number):Promise<SignPartResult> {
    const session = await auth()

    if (!session) {
        return {
            status: "failed",
            message: "Authentication failed."
        }
    }

    const request = {partNumber}

    try {

        const response = await postBackend<{url: string}>(`/downloads/${downloadId}/files/${fileId}/uploads/${uploadId}/parts`, session, request)

        switch (response.status) {
            case 200:
                return {
                    status: "success",
                    url: response.data.url
                }

            default:
                return {
                    status: "failed",
                    message: "Something went wrong..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            status: "failed",
            message: "Failed to sign upload part."
        }

    }
}
