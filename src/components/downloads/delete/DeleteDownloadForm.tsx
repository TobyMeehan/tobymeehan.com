import { deleteDownload } from "@/actions/download/delete";
import InputText from "@/components/forms/InputText";
import { Download } from "@/models/Download";
import { ReactNode } from "react";
import { useFormState } from "react-dom";

export interface DeleteDownloadFormProps {
    download: Download
    submit: ReactNode
}

export default function DeleteDownloadForm({ download, submit }: DeleteDownloadFormProps) {
    const [state, formAction] = useFormState(deleteDownload.bind(null, download.id, download.title), {})

    return (
        <form action={formAction}>
            <div className="px-5">
                <section className="mb-3">
                    <div className="text-sm mb-2">
                        This cannot be undone! Enter the name of your download to confirm you want to delete it.
                    </div>
                    <label htmlFor="deleteName" className="block mb-1.5">Title</label>
                    <InputText id="deleteName" name="name" autoFocus required placeholder={download.title}
                        valid={state.errors?.name?.length ?? 0 > 0 ? false : undefined} />
                    <span className="text-sm text-negative">
                        {state.result?.status === "failed" && state.result.message
                            ? state.result.message
                            : state.errors?.name?.at(0)
                        }
                    </span>
                </section>
            </div>

            {submit}
        </form>
    )
}