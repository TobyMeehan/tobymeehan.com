"use server"

import { auth } from "@/auth"
import { patchBackend } from "@/data/fetch"
import { DownloadFile } from "@/models/File"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export interface EditFileState {
    result?: { status: "success", file: DownloadFile } | { status: "failed", message?: string }
    errors?: {
        filename?: string[]
    }
}

const EditFileValidator = z.object({
    filename: z.string()
})

export async function editFile(downloadId: string, fileId: string, state: EditFileState, formData: FormData): Promise<EditFileState> {
    const session = await auth()

    if (!session) {
        return {
            result: { status: "failed", message: "Authentication failed." }
        }
    }

    const validationResult = EditFileValidator.safeParse({
        filename: formData.get("filename")
    })

    if (!validationResult.success) {
        return {
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = validationResult.data

    try {

        const response = await patchBackend<DownloadFile>(`/downloads/${downloadId}/files/${fileId}`, session, request)

        switch (response.status) {
            case 200:
                revalidatePath(`/downloads/${downloadId}/files`)

                return {
                    result: { status: "success", file: response.data }
                }

            case 400:
                return {
                    result: { status: "failed" },
                    errors: {
                        filename: response.errors.filter(x => x.name === "filename").map(x => x.reason)
                    }
                }

            default:
                console.error(`Edit file request faulted: ${response.status}`)

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
                message: "Failed to edit file."
            }
        }

    }
}
