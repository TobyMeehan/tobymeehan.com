import { auth } from "@/auth"
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
                </>
            )
    }
}
