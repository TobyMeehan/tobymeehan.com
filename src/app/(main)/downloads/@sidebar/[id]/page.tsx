import { auth } from "@/auth";
import ClientDateTime from "@/components/ClientDateTime";
import AuthorList from "@/components/downloads/AuthorList";
import DownloadButton from "@/components/downloads/DownloadButton";
import { fetchDownloadById } from "@/data/downloads";

export default async function DownloadSidebar({ params }: { params: { id: string } }) {
    const session = await auth()

    const result = await fetchDownloadById(params.id, session)

    if (result.status === "success") {
        return (
            <>
                <DownloadButton download={result.download} />

                <hr className="my-5 border-dark-700" />

                {result.download.summary}

                <hr className="border-dark-700 my-5" />

                <div>
                    <AuthorList downloadId={params.id} />
                </div>

                <hr className="border-dark-700 my-5" />

                {result.download.version &&
                    <div className="text-center font-light">
                        v{result.download.version}
                    </div>
                }

                <div className="text-lg text-center font-semibold">
                    {result.download.updatedAt
                        ? <>Updated <ClientDateTime dateTime={result.download.updatedAt} /></>
                        : <>Created <ClientDateTime dateTime={result.download.createdAt} /></>
                    }
                </div>
            </>
        )
    }
}