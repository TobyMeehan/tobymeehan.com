"use server"

import { auth } from "@/auth"
import { postBackend } from "@/data/fetch"
import { Download } from "@/models/Download"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export interface CreateDownloadState {
    result?: { status: "success", id: string } | { status: "failed" }
    message?: string
    errors?: {
        title?: string[],
        summary?: string[],
        description?: string[],
        visibility?: string[]
    }
}

const CreateDownloadValidator = z.object({
    title: z.string()
        .min(1, "Required")
        .max(40, "Too long!"),
    summary: z.string()
        .min(1, "Required")
        .max(400, "Too long!"),
    description: z.string()
        .min(1, "Required")
        .max(4000, "Too long!"),
    visibility: z.enum(["public", "unlisted", "private"])
})

export async function createDownload(state: CreateDownloadState, formData: FormData): Promise<CreateDownloadState> {
    const session = await auth()

    if (!session) {
        return {
            result: { status: "failed" },
            message: "Authentication failed."
        }
    }

    console.log(session)

    const validationResult = CreateDownloadValidator.safeParse({
        title: formData.get("title"),
        summary: formData.get("summary"),
        description: formData.get("description"),
        visibility: formData.get("visibility")
    })

    if (!validationResult.success) {
        return {
            result: { status: "failed" },
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const request = validationResult.data

    try {

        const response = await postBackend<Download>("/downloads", session, request)

        switch (response.status) {
            case 201:
                revalidatePath("/downloads")

                return {
                    result: {
                        status: "success",
                        id: response.data.id
                    }
                }

            case 400:
                return {
                    result: { status: "failed" },
                    errors: {
                        title: response.errors.filter(x => x.name === "name").map(x => x.reason),
                        summary: response.errors.filter(x => x.name === "summary").map(x => x.reason),
                        description: response.errors.filter(x => x.name === "description").map(x => x.reason),
                        visibility: response.errors.filter(x => x.name === "visibility").map(x => x.reason)
                    }
                }

            default:
                console.error(`Create download request faulted: ${response.status}`)

                return {
                    result: { status: "failed" },
                    message: "Something went wrong..."
                }
        }

    } catch (error) {

        console.error(error)

        return {
            result: { status: "failed" },
            message: "Failed to create download."
        }

    }
}
