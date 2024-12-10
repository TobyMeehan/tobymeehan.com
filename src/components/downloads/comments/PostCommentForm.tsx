"use client"

import { PostCommentState } from "@/actions/comment/PostCommentState"
import InputTextArea from "@/components/forms/InputTextArea"
import SubmitButton from "@/components/forms/SubmitButton"
import LinkButton from "@/components/LinkButton"
import Avatar from "@/components/users/Avatar"
import { ReactNode, useRef } from "react"
import { useFormState } from "react-dom"

export interface PostCommentFormProps {
    id?: string
    action: (state: PostCommentState, formData: FormData) => Promise<PostCommentState>
    userId: string
    placeholder?: string
    submit?: ReactNode
    onCancel?: () => void
    onSuccess?: () => void
}

export default function PostCommentForm({ id, action, userId, placeholder, submit, onCancel, onSuccess }: PostCommentFormProps) {
    const [state, formAction] = useFormState(action, {})

    const form = useRef<HTMLFormElement>(null)

    if (state.result?.status === "success") {
        form.current?.reset()

        onSuccess && onSuccess()
    }

    return (
        <div className="flex">
            <Avatar userId={userId} alt="Your Avatar" className="size-14 mr-3" />
            <div className="grow">
                <form action={formAction} ref={form}>
                    <div className="mb-2">
                        <InputTextArea id={id ?? "post-comment-content"} name="content" required maxLength={400}
                            placeholder={placeholder}
                            valid={state.result?.status === "failed" ? false : undefined} />
                        <span className="text-sm text-negative">
                            {state.result?.status === "failed" && state.result.message}
                            {state.errors?.content?.at(0)}
                        </span>
                    </div>
                    <div className="flex justify-end">
                        {onCancel &&
                            <LinkButton className="mr-3" onClick={onCancel}>
                                Cancel
                            </LinkButton>
                        }

                        <SubmitButton className="text-sm">
                            {submit}
                        </SubmitButton>
                    </div>
                </form>
            </div>
        </div>
    )
}
