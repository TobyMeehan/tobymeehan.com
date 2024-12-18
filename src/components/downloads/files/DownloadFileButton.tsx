import IconLink from "@/components/IconLink"
import { DownloadFile } from "@/models/File"
import { faDownload } from "@fortawesome/free-solid-svg-icons"

export interface DownloadFileButtonProps {
    downloadId: string
    file: DownloadFile
}

export default function DownloadFileButton({ downloadId, file }: DownloadFileButtonProps) {
    return (
        <IconLink icon={faDownload} aria-label="Download" href={`/downloads/${downloadId}/file/${file.filename}`} />
    )
}
