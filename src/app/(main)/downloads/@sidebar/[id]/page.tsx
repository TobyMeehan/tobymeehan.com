import AuthorList from "@/components/downloads/AuthorList";
import ManageOptions from "@/components/downloads/ManageOptions";
import { fetchDownloadById } from "@/data/downloads";

export default async function DownloadSidebar({ params }: { params: { id: string } }) {
    const result = await fetchDownloadById(params.id)

    if (result.status === "success") {
        return (
            <>
                {result.download.summary}

                <hr className="border-dark-700 my-3" />

                <AuthorList downloadId={params.id} />

                <hr className="border-dark-700 my-3" />

                <ManageOptions download={result.download} />
            </>
        )
    }
}