"use client"

import { deleteComment } from "@/actions/comment/deleteComment"
import { editComment } from "@/actions/comment/editComment"
import Button from "@/components/Button"
import InputTextArea from "@/components/forms/InputTextArea"
import SubmitButton from "@/components/forms/SubmitButton"
import LinkButton from "@/components/LinkButton"
import { Comment } from "@/models/Comment"
import { useState } from "react"
import { useFormState } from "react-dom"
import PostCommentForm from "./PostCommentForm"
import { reply } from "@/actions/comment/reply"

export interface CommentBodyProps {
    session: { userId: string } | null
    comment: Comment
    replyToId: string
}

type Mode = "none" | "edit" | "delete" | "reply"

export default function CommentBody({ session, comment, replyToId }: CommentBodyProps) {
    const [mode, setMode] = useState<Mode>("none")

    const [editState, editFormAction] = useFormState(editComment.bind(null, comment.id), { currentContent: comment.content })
    const [deleteState, deleteFormAction] = useFormState(deleteComment.bind(null, comment.id), {})

    if (mode === "edit" && editState.result?.status === "success") {
        setMode("none")
    }

    if (mode === "delete" && deleteState.result?.status === "success") {
        setMode("none")
    }

    switch (mode) {
        case "edit":
            return (
                <form action={editFormAction}>
                    <div className="mb-1">
                        <InputTextArea id={`${comment.id}-content`} name="content" required maxLength={400} defaultValue={comment.content}
                            valid={editState.result?.status === "failed" ? false : undefined} />
                        <span className="text-sm text-negative">
                            {editState.result?.status === "failed" && editState.result.message}
                            {editState.errors?.content?.at(0)}
                        </span>
                    </div>
                    <div className="space-x-3">
                        <SubmitButton className="inline text-sm">
                            Save
                        </SubmitButton>
                        <LinkButton className="inline" onClick={() => setMode("none")}>
                            Cancel
                        </LinkButton>
                    </div>
                </form>
            )

        case "delete":
            return (
                <>
                    <div>
                        {editState.currentContent}
                    </div>
                    <div className="space-x-3 mt-2">
                        <span>Delete this comment?</span>
                        <form action={deleteFormAction} className="inline">
                            <SubmitButton appearance="negative" className="inline text-xs">
                                Delete
                            </SubmitButton>
                        </form>
                        <LinkButton className="inline" onClick={() => setMode("none")}>
                            Cancel
                        </LinkButton>
                    </div>
                </>
            )

        default:
            return (
                <>
                    <div>
                        {comment.content}
                    </div>
                    <div className="space-x-3 mt-2">
                        {session &&
                            <Button className="text-xs inline" onClick={() => setMode("reply")}>
                                Reply
                            </Button>
                        }
                        {session?.userId === comment.userId &&
                            <>
                                <LinkButton className="inline" onClick={() => setMode("edit")}>
                                    Edit
                                </LinkButton>
                                <LinkButton className="inline" onClick={() => setMode("delete")}>
                                    Delete
                                </LinkButton>
                            </>
                        }
                    </div>
                    {mode === "reply" && session &&
                        <div className="mt-4">
                            <PostCommentForm id={`reply-${replyToId}`} action={reply.bind(null, replyToId)}
                                userId={session.userId} placeholder="Reply" submit={"Reply"} 
                                onCancel={() => setMode("none")}
                                onSuccess={() => setMode("none")} />
                        </div>
                    }
                </>
            )
    }
}
