"use server"

import { auth } from "@/auth"
import { getBackend } from "@/data/fetch"
import { Part } from "@/models/Upload"

export type ListPartsResult =
    | { status: "success", parts: Part[] }
    | { status: "failed", message?: string }

export async function listParts(downloadId: string, fileId: string, uploadId: string): Promise<ListPartsResult> {
    const session = await auth()

    if (!session) {
        return {
            status: "failed", message: "Authentication failed."
        }
    }

    try {

        const response = await getBackend<Part[]>(`/downloads/${downloadId}/files/${fileId}/uploads/${uploadId}/parts`, session)

        switch (response.status) {
            case 200:
                return {
                    status: "success",
                    parts: response.data
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
            message: "Failed to retrieve upload parts."
        }

    }
}
