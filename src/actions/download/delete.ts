"use server"

import { auth } from "@/auth"
import { deleteBackend } from "@/data/fetch"
import { redirect } from "next/navigation"
import { z } from "zod"

export interface DeleteDownloadState {
    result?: { status: "success" } | { status: "failed", message?: string }
    errors?: {
        name?: string[]
    }
}

export async function deleteDownload(downloadId: string, name: string, state: DeleteDownloadState, formData: FormData): Promise<DeleteDownloadState> {
    const session = await auth()

    if (!session) {
        return {
            result: { status: "failed", message: "Authentication failed." }
        }
    }

    const validator = z.object({
        name: z.literal(name)
    })

    const validationResult = validator.safeParse({
        name: formData.get("name")
    })

    if (!validationResult.success) {
        return {
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    let doRedirect = false

    try {

        const response = await deleteBackend(`/downloads/${downloadId}`, session)

        switch (response.status) {
            case 204:
                doRedirect = true
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
                message: "Failed to delete download."
            }
        }

    } finally {
        if (doRedirect) {
            redirect("/downloads")
        }
    }
}
