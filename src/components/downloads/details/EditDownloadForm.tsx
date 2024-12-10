"use client"

import { editDownload } from "@/actions/download/edit";
import InputDropdown from "@/components/forms/InputDropdown";
import InputText from "@/components/forms/InputText";
import InputTextArea from "@/components/forms/InputTextArea";
import SubmitButton from "@/components/forms/SubmitButton";
import { Download } from "@/models/Download";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import { faEyeSlash, faGlobe, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormState } from "react-dom";

export default function EditDownloadForm({ download }: { download: Download }) {
    const [state, formAction] = useFormState(editDownload.bind(null, download.id), {})

    return (
        <form action={formAction}>
            <div className="mb-3 xl:w-2/3 2xl:w-1/2">
                <label htmlFor="title" className="block mb-1.5">Title</label>

                <InputText id="title" name="title" defaultValue={download.title} required maxLength={40}
                    valid={state.errors?.title?.length ?? 0 > 0 ? false : undefined} />

                <span className="text-sm text-negative">
                    {state.errors?.title?.at(0)}
                </span>
            </div>

            <div className="mb-3">
                <label htmlFor="summary" className="block mb-1.5">Summary</label>

                <InputTextArea id="summary" name="summary" defaultValue={download.summary} required maxLength={400}
                    valid={state.errors?.summary?.length ?? 0 > 0 ? false : undefined} />

                <span className="text-sm text-negative">
                    {state.errors?.summary?.at(0)}
                </span>
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="block mb-1.5">
                    Description
                    <FontAwesomeIcon icon={faMarkdown} title="Markdown supported!" className="ml-2" />
                </label>

                <InputTextArea rows={10} id="description" name="description" defaultValue={download.description} required maxLength={4000}
                    valid={state.errors?.description?.length ?? 0 > 0 ? false : undefined} />

                <span className="text-sm text-negative">
                    {state.errors?.description?.at(0)}
                </span>
            </div>

            <div className="mb-3 xl:w-2/3 2xl:w-1/2">
                <label htmlFor="visibility" className="block mb-1.5">Visibility</label>

                <InputDropdown id="visibility" name="visibility" defaultValue={download.visibility} options={[
                    {
                        value: "public", label: (
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faGlobe} className="size-5" />
                                Public
                            </div>
                        )
                    },
                    {
                        value: "unlisted", label: (
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faEyeSlash} className="size-5" />
                                Unlisted
                            </div>
                        )
                    },
                    {
                        value: "private", label: (
                            <div className="flex items-center gap-2">
                                <FontAwesomeIcon icon={faLock} className="size-5" />
                                Private
                            </div>
                        )
                    }
                ]} />

                <span className="text-sm text-negative">
                    {state.errors?.visibility?.at(0)}
                </span>
            </div>

            <div className="mb-3 xl:w-2/3 2xl:w-1/2">
                <label htmlFor="version" className="block mb-1.5">Current Version</label>

                <InputText id="version" name="version" defaultValue={download.version}
                    valid={state.errors?.version?.length ?? 0 > 0 ? false : undefined} />

                <span className="text-sm text-negative">
                    {state.errors?.version?.at(0)}
                </span>
            </div>

            <SubmitButton>Save</SubmitButton>
        </form>
    )
}
