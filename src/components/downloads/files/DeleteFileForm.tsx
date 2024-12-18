import { deleteFile } from "@/actions/file/deleteFile"
import { DownloadFile } from "@/models/File"
import { ReactNode } from "react"
import { useFormState } from "react-dom"

export interface DeleteFileFormProps {
    downloadId: string,
    file: DownloadFile
    submit: ReactNode
    onDeleted?: () => void
}

export default function DeleteFileForm({ downloadId, file, submit, onDeleted }: DeleteFileFormProps) {
    const [state, formAction] = useFormState(deleteFile.bind(null, downloadId, file.id), {})

    if (state.result?.status === "success" && onDeleted) {
        onDeleted()
    }

    return (
        <form action={formAction}>
            <div className="px-5">
                <p className="mb-3">
                    Are you sure you want to delete{" "}
                    <span className="font-bold">{file.filename}</span>
                    ? Once it&apos;s gone, it&apos;s gone!
                </p>
                {state.result?.status === "failed" &&
                    <div className="mb-3 text-negative">
                        {state.result.message}
                    </div>
                }
            </div>

            {submit}
        </form>
    )
}
