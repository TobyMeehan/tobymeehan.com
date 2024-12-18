import Uppy, { BasePlugin, Body, Meta } from "@uppy/core";
import { PluginOpts } from "@uppy/core/lib/BasePlugin";
import AwsS3 from '@uppy/aws-s3';
import { createFile } from "@/actions/file/createFile";
import { createUpload } from "@/actions/file/createUpload";
import { listParts } from "@/actions/file/listUploadParts";
import { signPart } from "@/actions/file/signUploadPart";
import { abortUpload } from "@/actions/file/abortUpload";
import { completeUpload } from "@/actions/file/completeUpload";
import { completeFile } from "@/actions/file/completeFile";

export type BackendPluginOptions = PluginOpts & {
    downloadId: string
}

export default class Backend<M extends Meta, B extends Body> extends BasePlugin<BackendPluginOptions, M, B> {
    constructor(uppy: Uppy<M, B>, opts: BackendPluginOptions) {
        super(uppy, opts)

        this.id = opts.id ?? "Backend"
        this.type = "awesome"
    }

    completeUpload = async (files: string[]) => {
        for (let fileId of files) {
            const file = this.uppy.getFile(fileId)

            await completeFile(this.opts.downloadId, file.meta["x-id"] as string)
        }
    }

    install() {
        this.configureAws()
        this.uppy.addPostProcessor(this.completeUpload)
    }

    uninstall(): void {
        const s3 = this.uppy.getPlugin("s3")

        s3 && this.uppy.removePlugin(s3)

        this.uppy.removePostProcessor(this.completeUpload)
    }

    configureAws() {
        const downloadId = this.opts.downloadId

        this.uppy.use(AwsS3, {
            id: "s3",
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
    }
}
