import { Session } from "next-auth";
import { getBackend } from "./fetch";

export async function fetchFilesByDownload(downloadId: string, session?: Session | null): Promise<{
    status: "success",
    files: DownloadFile[]
} | {
    status: "failed"
}> {
    const response = await getBackend<DownloadFile[]>(`/downloads/${downloadId}/files`, session)

    switch (response.status) {
        case 200:
            return { status: "success", files: response.data }
        default:
            return { status: "failed" }
    }
}
