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

export interface CommentBodyProps {
    session: { userId: string } | null
    comment: Comment
}

export default function CommentBody({ session, comment }: CommentBodyProps) {
    const [editMode, setEditMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)

    const [editState, editFormAction] = useFormState(editComment.bind(null, comment.id), { currentContent: comment.content })
    const [deleteState, deleteFormAction] = useFormState(deleteComment.bind(null, comment.id), {})

    if (editMode && editState.result?.status === "success") {
        setEditMode(false)
    }

    return editMode
        ? <>
            <form action={editFormAction}>
                <div className="mb-1">
                    <InputTextArea id={`${comment.id}-content`} name="content" required maxLength={400} defaultValue={editState.currentContent}
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
                    <LinkButton className="inline text-sm" onClick={() => setEditMode(false)}>
                        Cancel
                    </LinkButton>
                </div>
            </form>
        </>
        : <>
            {editState.currentContent}
            {session &&
                <div className="space-x-3 mt-2">
                    {deleteMode
                        ? <>
                            <span>Delete this comment?</span>
                            <form action={deleteFormAction} className="inline">
                                <SubmitButton appearance="negative" className="inline text-xs">
                                    Delete
                                </SubmitButton>
                            </form>
                        </>
                        : <>
                            <Button className="text-xs inline">
                                Reply
                            </Button>
                            {session.userId === comment.userId &&
                                <>
                                    <LinkButton className="inline" onClick={() => setEditMode(true)}>
                                        Edit
                                    </LinkButton>
                                    <LinkButton className="inline" onClick={() => setDeleteMode(true)}>
                                        Delete
                                    </LinkButton>
                                </>
                            }
                        </>
                    }
                </div>
            }
        </>
}