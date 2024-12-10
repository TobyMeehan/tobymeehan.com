import { Download } from "@/models/Download";
import DownloadLink from "./DownloadLink";

export default function DownloadList({ downloads }: { downloads: Download[] }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {downloads.map(download => {
                return (
                    <DownloadLink key={download.id} download={download} />
                )
            })}
        </div>
    )
}
