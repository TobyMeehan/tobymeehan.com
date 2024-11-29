"use client"

import { postComment } from "@/actions/download/postComment"
import InputTextArea from "@/components/forms/InputTextArea"
import SubmitButton from "@/components/forms/SubmitButton"
import { Download } from "@/models/Download"
import Image from "next/image"
import { useRef } from "react"
import { useFormState } from "react-dom"

export default function PostCommentForm({ download, userId }: { download: Download, userId: string }) {
    const [state, formAction] = useFormState(postComment.bind(null, download.id), {})

    const form = useRef<HTMLFormElement>(null)

    if (state.result?.status === "success") {
        form.current?.reset()
    }

    return (
        <div className="flex">
            <Image src={`https://thavyra.xyz/api/users/${userId}/avatar.png`} alt="Your Avatar"
                width={500} height={500} className="size-14 rounded-full mr-3" />
            <div className="grow">
                <form action={formAction} ref={form}>
                    <div className="mb-2">
                        <InputTextArea id="post-comment-content" name="content" required maxLength={400}
                            placeholder="Post a comment"
                            valid={state.result?.status === "failed" ? false : undefined} />
                        <span className="text-sm text-negative">
                            {state.result?.status === "failed" && state.result.message}
                            {state.errors?.content?.at(0)}
                        </span>
                    </div>
                    <SubmitButton className="text-base">Comment</SubmitButton>
                </form>
            </div>
        </div>
    )
}
