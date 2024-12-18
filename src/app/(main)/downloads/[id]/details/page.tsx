import { auth } from "@/auth"
import DeleteDownloadButton from "@/components/downloads/delete/DeleteDownloadButton"
import EditDownloadForm from "@/components/downloads/details/EditDownloadForm"
import { fetchDownloadById } from "@/data/downloads"

export default async function EditDownloadPage({ params }: { params: { id: string } }) {
    const session = await auth()

    const result = await fetchDownloadById(params.id, session ?? undefined)

    switch (result.status) {
        case "success":
            return (
                <>
                    <EditDownloadForm download={result.download} />
                    <div className="flex justify-end mt-3">
                        <DeleteDownloadButton download={result.download} />
                    </div>
                </>
            )
    }
}
