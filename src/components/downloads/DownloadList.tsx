import { Download } from "@/models/Download";
import DownloadLink from "./DownloadLink";

export default function DownloadList({ downloads }: { downloads: Download[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
            {downloads.map(download => {
                return (
                    <DownloadLink key={download.id} download={download} />
                )
            })}
        </div>
    )
}
