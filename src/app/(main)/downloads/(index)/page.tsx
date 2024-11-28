import DownloadList from "@/components/downloads/DownloadList"
import { fetchPublicDownloads } from "@/data/downloads"

export default async function DownloadsPage() {
    const result = await fetchPublicDownloads()

    switch (result.status) {
        case "failed":
            return (
                <p>Failed to fetch downloads...</p>
            )
        case "success":
            return (
                <DownloadList downloads={result.downloads} />
            )
    }
}