"use client"

import { useState } from "react"
import FileTable from "./FileTable"
import InputFiles from "./InputFiles"
import Uppy from "@uppy/core"
import UploadTable from "./UploadTable"
import Backend from "@/uppy/backend"
import { DownloadFile } from "@/models/File"

export interface FileManagerProps {
    downloadId: string
    files: DownloadFile[]
}

export default function FileManager({ downloadId, files: currentFiles }: FileManagerProps) {
    const uppy = useUppy(downloadId)
    const [files, setFiles] = useState(currentFiles)

    uppy.on("complete", event => {
        event.successful?.forEach(file => {
            setFiles([{
                id: file.meta["x-id"] as string,
                filename: file.meta["x-filename"] as string,
                contentType: file.type,
                size: file.size ?? 0,
                createdAt: file.meta["x-created-at"] as string
            }, ...files])

            uppy.removeFile(file.id)
        })
    })

    const edited = (file: DownloadFile) => {
        setFiles(files.map(x => {
            if (x.id === file.id) {
                return file
            }

            return x
        }))
    }

    const deleted = (file: DownloadFile) => {
        setFiles(files.filter(x => x !== file))
    }

    return (
        <>
            <div className="mb-1.5">
                <InputFiles uppy={uppy} />
            </div>

            <div className="my-1.5">
                <UploadTable uppy={uppy} />
            </div>


            <div className="mt-1.5">
                <FileTable downloadId={downloadId} files={files} onFileEdited={edited} onFileDeleted={deleted} />
            </div>
        </>
    )
}

function useUppy(downloadId: string) {
    const [uppy] = useState(() => new Uppy({
        restrictions: {
            maxFileSize: 200 * 1024 * 1024
        },
        autoProceed: true
    })
        .use(Backend, { downloadId })
    )

    return uppy
}
