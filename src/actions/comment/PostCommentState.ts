import { Comment } from "@/models/Comment"

export interface PostCommentState {
    result?: { status: "success", comment: Comment } | { status: "failed", message?: string }
    errors?: {
        content?: string[]
    }
}
