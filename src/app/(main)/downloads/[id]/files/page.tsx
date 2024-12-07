import { auth } from "@/auth";
import FileManager from "@/components/downloads/files/FileManager";
import { fetchFilesByDownload } from "@/data/files";
import { redirect } from "next/navigation";

export default async function FilesPage({ params: { id } }: { params: { id: string } }) {
    const session = await auth()

    if (!session) {
        redirect("/downloads")
    }

    const result = await fetchFilesByDownload(id, session)

    if (result.status !== "success") {
        return (
            <div className="text-negative">Failed to fetch files.</div>
        )
    }

    return (
        <>
            <FileManager downloadId={id} files={result.files} />
        </>
    )
}
