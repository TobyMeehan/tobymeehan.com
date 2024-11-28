import { Download } from "@/models/Download";
import { getBackend } from "./fetch";
import { Session } from "next-auth";

export async function fetchPublicDownloads(): Promise<{
    status: "success",
    downloads: Download[]
} | {
    status: "failed"
}> {
    const response = await getBackend<Download[]>("/downloads")

    switch (response.status) {
        case 200:
            return { status: "success", downloads: response.data }
        default:
            return { status: "failed" }
    }
}

export async function fetchDownloadById(id: string, session?: Session): Promise<{
    status: "success",
    download: Download
} | {
    status: "notfound"
} | {
    status: "forbidden"
} | {
    status: "failed"
}> {
    const response = await getBackend<Download>(`/downloads/${id}`, session)

    switch (response.status) {
        case 200:
            return { status: "success", download: response.data }
        case 403:
            return { status: "forbidden" }
        case 404:
            return { status: "notfound" }
        default:
            return { status: "failed" }
    }
}
