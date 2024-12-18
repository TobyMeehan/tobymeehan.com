import { Comment } from "@/models/Comment";
import { Session } from "next-auth";
import { getBackend } from "./fetch";

export async function fetchCommentsByDownload(downloadId: string, session?: Session | null): Promise<{
    status: "success",
    comments: Comment[]
} | {
    status: "failed"
}> {
    const response = await getBackend<Comment[]>(`/downloads/${downloadId}/comments`, session)

    switch (response.status) {
        case 200:
            return {
                status: "success",
                comments: response.data
            }
        default:
            return {
                status: "failed"
            }
    }
}

export async function fetchReplies(commentId: string, session?: Session | null): Promise<{
    status: "success",
    comments: Comment[]
} | {
    status: "failed"
}> {
    const response = await getBackend<Comment[]>(`/comments/${commentId}/replies`, session)

    switch (response.status) {
        case 200:
            return {
                status: "success",
                comments: response.data
            }

        default:
            return {
                status: "failed"
            }
    }
}
