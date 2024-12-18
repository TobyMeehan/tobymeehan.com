import { editFile } from "@/actions/file/editFile"
import InputText from "@/components/forms/InputText"
import { DownloadFile } from "@/models/File"
import { ReactNode } from "react"
import { useFormState } from "react-dom"

export interface EditFileFormProps {
    downloadId: string
    file: DownloadFile
    submit: ReactNode
    onChange: (file: DownloadFile) => void
}

export default function EditFileForm({ downloadId, file, submit, onChange }: EditFileFormProps) {
    const [state, formAction] = useFormState(editFile.bind(null, downloadId, file.id), {})

    if (state.result?.status === "success") {
        onChange(state.result.file)
    }

    return (
        <form action={formAction}>
            <section className="px-5">
                <div className="mb-3">
                    <label htmlFor="filename" className="block mb-1.5">Name</label>
                    <InputText id="filename" name="filename" autoFocus required maxLength={80} defaultValue={file.filename}
                        valid={state.errors?.filename?.length ?? 0 > 0 ? false : undefined} />
                    <span className="text-sm text-negative">
                        {state.errors?.filename?.at(0)}
                    </span>
                </div>
            </section>

            {submit}
        </form>
    )
}
