import { auth } from "@/auth";
import { fetchFilesByDownload } from "@/data/files";
import { Download } from "@/models/Download";
import FileModalButton from "./FileModalButton";
import { Suspense } from "react";

export interface DownloadButtonProps {
    download: Download
}

export default function DownloadButton(props: DownloadButtonProps) {
    return (
        <Suspense>
            <DownloadButtonAsync {...props} />
        </Suspense>
    )
}

async function DownloadButtonAsync({ download }: DownloadButtonProps) {
    const session = await auth()

    const result = await fetchFilesByDownload(download.id, session)

    if (result.status !== "success") {
        return null
    }

    return (
        <FileModalButton download={download} files={result.files} />
    )
}
