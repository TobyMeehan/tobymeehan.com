import { fetchDownloadById } from "@/data/downloads"
import { Metadata, ResolvingMetadata } from "next"
import { ReactNode } from "react"

export async function generateMetadata({ params: { id } }: { params: { id: string } }, parent: ResolvingMetadata): Promise<Metadata> {
    const result = await fetchDownloadById(id)

    if (result.status !== "success") {
        const parentMetadata = await parent

        return {
            title: parentMetadata.title
        }
    }

    const download = result.download

    return {
        title: `${download.title} · tobymeehan.com`,
        description: download.summary,
    }
}

export default function DownloadLayout({ children }: { children: ReactNode }) {
    return children
}
