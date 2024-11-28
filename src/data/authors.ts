import { Session } from "next-auth";
import { getBackend } from "./fetch";
import { Author } from "@/models/Author";

export async function fetchAuthorsByDownload(downloadId: string, session?: Session | null): Promise<{
    status: "success",
    authors: Author[]
} | {
    status: "failed"
}> {
    const response = await getBackend<Author[]>(`/downloads/${downloadId}/authors`, session)

    switch (response.status) {
        case 200:
            return { status: "success", authors: response.data }
        default:
            return { status: "failed" }
    }
}