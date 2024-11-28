import { auth } from "@/auth";
import { fetchDownloadById } from "@/data/downloads";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: { id: string }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata):Promise<Metadata> {
    const result = await fetchDownloadById(params.id)

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

export default async function DownloadPage({ params }: Props) {
    const session = await auth()

    const result = await fetchDownloadById(params.id, session ?? undefined)

    switch (result.status) {
        case "success":
            return (
                <>
                    <h1 className="text-3xl font-light">{result.download.title}</h1>

                    <hr className="border-dark-700 my-5" />

                    {result.download.description}
                </>
            )
        case "forbidden":
            return (
                <>
                    <h1 className="text-3xl font-light">Private</h1>

                    <hr className="border-dark-700 my-5" />

                    <p>This download is private.</p>
                </>
            )
    }


}