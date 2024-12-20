import { auth } from "@/auth";
import { fetchFilesByDownload } from "@/data/files";
import { Download } from "@/models/Download";
import FileModalButton from "./FileModalButton";
import { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

export interface DownloadButtonProps {
    download: Download
}

export default function DownloadButton(props: DownloadButtonProps) {
    return (
        <Suspense fallback={<DownloadButtonSkeleton />}>
            <DownloadButtonAsync {...props} />
        </Suspense>
    )
}

export function DownloadButtonSkeleton() {
    return (
        <Button disabled className="w-full">
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Download
        </Button>
    )
}

async function DownloadButtonAsync({ download }: DownloadButtonProps) {
    const session = await auth()

    const result = await fetchFilesByDownload(download.id, session)

    if (result.status !== "success") {
        return null
    }

    return (
        <FileModalButton download={download} files={result.files} className="w-full">
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Download
        </FileModalButton>
    )
}
