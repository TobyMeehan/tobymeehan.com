import { auth } from "@/auth";
import AuthorizeView from "@/components/downloads/authorization/AuthorizeView";
import FileManager from "@/components/downloads/files/FileManager";
import FileTable from "@/components/downloads/files/FileTable";
import { fetchFilesByDownload } from "@/data/files";

export default async function FilesPage({ params: { id } }: { params: { id: string } }) {
    const session = await auth()

    const result = await fetchFilesByDownload(id, session)

    if (result.status !== "success") {
        return (
            <div className="text-negative">Failed to fetch files.</div>
        )
    }

    return (
        <>
            <AuthorizeView downloadId={id} notAuthorized={
                <FileTable downloadId={id} files={result.files} />
            }>
                <FileManager downloadId={id} files={result.files} />
            </AuthorizeView>
        </>
    )
}
