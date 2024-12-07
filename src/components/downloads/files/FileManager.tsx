"use client"

import { useState } from "react"
import FileTable from "./FileTable"
import InputFiles from "./InputFiles"
import Uppy from "@uppy/core"
import AwsS3 from '@uppy/aws-s3';
import { createFile } from "@/actions/file/createFile"
import { createUpload } from "@/actions/file/createUpload"
import { listParts } from "@/actions/file/listUploadParts"
import { signPart } from "@/actions/file/signUploadPart"
import { abortUpload } from "@/actions/file/abortUpload"
import { completeUpload } from "@/actions/file/completeUpload"
import UploadTable from "./UploadTable"

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
        .use(AwsS3, {
            endpoint: null!,

            async getUploadParameters(file, { }) {
                console.log(`Creating file ${file.name} with ID ${file.id}`)

                const result = await createFile(downloadId, file.id, { filename: file.name!, contentType: file.type, size: file.size! })

                if (result.result.status !== "success") {
                    throw new Error(result.result.message)
                }

                file.meta["x-id"] = result.result.file.id
                file.meta["x-filename"] = result.result.file.filename
                file.meta["x-created-at"] = result.result.file.createdAt

                return {
                    method: "PUT",
                    url: result.result.file.uploadUrl,
                    headers: {
                        'content-type': file.type
                    }
                }
            },

            async createMultipartUpload(file) {
                const fileResponse = await createFile(downloadId, file.id, { filename: file.name!, contentType: file.type, size: file.size! })

                if (fileResponse.result.status !== "success") {
                    throw new Error(fileResponse.result.message)
                }

                file.meta["x-id"] = fileResponse.result.file.id
                file.meta["x-filename"] = fileResponse.result.file.filename
                file.meta["x-created-at"] = fileResponse.result.file.createdAt

                const uploadResponse = await createUpload(downloadId, fileResponse.result.file.id)

                if (uploadResponse.result.status !== "success") {
                    throw new Error(uploadResponse.result.message)
                }

                return {
                    uploadId: uploadResponse.result.uploadId,
                    key: `${downloadId}/${fileResponse.result.file.id}`
                }
            },

            async listParts(file, { uploadId, key }) {
                const [, fileId] = key.split('/')

                const result = await listParts(downloadId, fileId, uploadId)

                if (result.status !== "success") {
                    throw new Error(result.message)
                }

                return result.parts.map(part => {
                    return {
                        PartNumber: part.partNumber,
                        Size: part.size,
                        ETag: part.eTag
                    }
                })
            },

            async signPart(file, { uploadId, key, partNumber, signal }) {
                const [, fileId] = key.split('/')

                const response = await signPart(downloadId, fileId, uploadId, partNumber)

                if (response.status != "success") {
                    throw new Error(response.message)
                }

                return {
                    url: response.url
                }
            },

            async abortMultipartUpload(file, { uploadId, key }) {
                const [, fileId] = key.split('/')

                await abortUpload(downloadId, fileId, uploadId)
            },

            async completeMultipartUpload(file, { uploadId, key, parts }) {
                const [, fileId] = key.split('/')

                const result = await completeUpload(downloadId, fileId, uploadId, parts.map(part => {
                    return {
                        partNumber: part.PartNumber!,
                        size: part.Size!,
                        eTag: part.ETag!
                    }
                }))

                if (result.result.status !== "success") {
                    throw new Error
                }

                return {}
            },

        })
    )

    return uppy
}
