import { auth } from "@/auth";
import CommentSection from "@/components/downloads/comments/CommentSection";
import DescriptionView from "@/components/downloads/DescriptionView";
import { fetchDownloadById } from "@/data/downloads";

export default async function DownloadPage({ params: { id } }: { params: { id: string } }) {
    const session = await auth()

    const result = await fetchDownloadById(id, session ?? undefined)

    switch (result.status) {
        case "success":
            return (
                <>
                    <h1 className="text-3xl font-light">{result.download.title}</h1>

                    <div className="my-6">
                        <DescriptionView download={result.download} />
                    </div>

                    <CommentSection download={result.download} />
                </>
            )
        case "forbidden":
            return (
                <>
                    <h1 className="text-2xl font-light">Private</h1>
                </>
            )
    }

}
