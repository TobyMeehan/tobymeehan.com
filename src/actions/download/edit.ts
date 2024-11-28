"use server"

import { auth } from "@/auth"
import { putBackend } from "@/data/fetch"
import { z } from "zod"

export interface EditDownloadState {
    result?: { status: "success" } | { status: "failed", message?: string },
    errors?: {
        title?: string[]
        summary?: string[]
        description?: string[]
        visibility?: string[]
        version?: string[]
    }
}

const EditDownloadValidator = z.object({
    title: z.string()
        .min(1, "Required")
        .max(40, "Too long!"),
    summary: z.string()
        .min(1, "Required")
        .max(400, "Too long!"),
    description: z.string()
        .min(1, "Required")
        .max(4000, "Too long!"),
    visibility: z.enum(["public", "unlisted", "private"]),
    version: z.string()
        .optional()
})

export async function editDownload(id: string, state: EditDownloadState, formData: FormData): Promise<EditDownloadState> {
    const session = await auth()

    if (!session) {
        return {
            result: {
                status: "failed",
                message: "Authentication failed."
            }
        }
    }

    const validationResult = EditDownloadValidator.safeParse({
        title: formData.get("title"),
        summary: formData.get("summary"),
        description: formData.get("description"),
        visibility: formData.get("visibility"),
        version: formData.get("version")
    })

    if (!validationResult.success) {
        return {
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = validationResult.data

    try {

        const response = await putBackend(`/downloads/${id}`, session, request)

        switch (response.status) {
            case 200:
                return {
                    result: { status: "success" }
                }

            case 400:
                return {
                    result: { status: "failed" },
                    errors: {
                        title: response.errors.filter(x => x.name === "name").map(x => x.reason),
                        summary: response.errors.filter(x => x.name === "summary").map(x => x.reason),
                        description: response.errors.filter(x => x.name === "description").map(x => x.reason),
                        visibility: response.errors.filter(x => x.name === "visibility").map(x => x.reason),
                        version: response.errors.filter(x => x.name === "version").map(x => x.reason)
                    }
                }

            default:
                console.error(`Edit download request faulted: ${response.status}`)

                return {
                    result: { status: "failed", message: "Something went wrong..." }
                }
        }

    } catch (error) {

        console.error(error)

        return {
            result: { status: "failed", message: "Failed to edit download." }
        }

    }
}
