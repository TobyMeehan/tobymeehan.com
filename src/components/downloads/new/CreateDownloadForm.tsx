"use client"

import { createDownload } from "@/actions/download/create"
import InputRadio from "@/components/forms/InputRadio"
import InputText from "@/components/forms/InputText"
import InputTextArea from "@/components/forms/InputTextArea"
import SubmitButton from "@/components/forms/SubmitButton"
import { faEyeSlash, faGlobe, faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { redirect } from "next/navigation"
import { useFormState } from "react-dom"

export default function CreateDownloadForm() {
    const [state, formAction] = useFormState(createDownload, {})

    if (state.result?.status === "success") {
        redirect(`/downloads/${state.result.id}`)
    }

    return (
        <form action={formAction}>
            <div className="text-negative">
                {state.message}
            </div>

            <div className="mb-3">
                <label htmlFor="title" className="block mb-1.5">Title</label>

                <InputText id="title" name="title" required maxLength={40}
                    valid={state.errors?.title?.length ?? 0 > 0 ? false : undefined} />

                <span className="text-sm text-negative">
                    {state.errors?.title?.at(0)}
                </span>
            </div>

            <div className="mb-3">
                <label htmlFor="summary" className="block mb-1.5">Summary</label>

                <InputText id="summary" name="summary" required maxLength={400}
                    valid={state.errors?.summary?.length ?? 0 > 0 ? false : undefined} />

                <span className="text-sm text-negative">
                    {state.errors?.title?.at(0)}
                </span>
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="block mb-1.5">
                    Description
                    <div className="text-sm italic">Markdown supported!</div>
                </label>

                <InputTextArea rows={10} id="description" name="description" required maxLength={4000}
                    valid={state.errors?.description?.length ?? 0 > 0 ? false : undefined} />

                <span className="text-sm text-negative">
                    {state.errors?.title?.at(0)}
                </span>
            </div>

            <div className="mb-3">
                <label>Visibility</label>

                <div className="my-2 flex items-center gap-2">
                    <InputRadio id="public" name="visibility" value="public" defaultChecked />
                    <FontAwesomeIcon icon={faGlobe} className="size-5" />
                    <label htmlFor="public" className="grow hover:cursor-pointer">
                        Public
                        <p className="text-sm">Your download will be visibile to anyone on the internet.</p>
                    </label>
                </div>

                <div className="my-2 flex items-center gap-2">
                    <InputRadio id="unlisted" name="visibility" value="unlisted" />
                    <FontAwesomeIcon icon={faEyeSlash} className="size-5" />
                    <label htmlFor="unlisted" className="grow hover:cursor-pointer">
                        Unlisted
                        <p className="text-sm">Anyone with the link can see this download but it won't be shown on the front page.</p>
                    </label>
                </div>

                <div className="my-2 flex items-center gap-2">
                    <InputRadio id="private" name="visibility" value="private" />
                    <FontAwesomeIcon icon={faLock} className="size-5" />
                    <label htmlFor="private" className="grow hover:cursor-pointer">
                        Private
                        <p className="text-sm">Only authors can see this download.</p>
                    </label>
                </div>
            </div>

            <SubmitButton>Continue</SubmitButton>
        </form>
    )
}