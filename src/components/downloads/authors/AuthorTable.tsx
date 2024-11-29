import { auth } from "@/auth"
import { fetchAuthorsByDownload } from "@/data/authors"
import { DateTime } from "luxon"
import { Suspense } from "react"
import UserInfo from "./UserInfo"
import AuthorActionsForm from "./AuthorActionsForm"

export interface AuthorTableProps {
    downloadId: string
}

export default function AuthorTable({ downloadId }: AuthorTableProps) {
    return (
        <table className="w-full table-auto bg-dark-900 rounded-lg overflow-hidden shadow-lg border-dark-700">
            <thead className="border-b border-dark-700">
                <tr>
                    <td className="p-5 font-bold">User</td>
                    <td className="p-5 font-bold">Added</td>
                    <td className="p-5 font-bold">Role</td>
                    <td className="p-5 font-bold">Actions</td>
                </tr>
            </thead>
            <tbody>
                <Suspense>
                    <AuthorTableAsync downloadId={downloadId} />
                </Suspense>
            </tbody>
        </table>
    )
}

async function AuthorTableAsync({ downloadId }: AuthorTableProps) {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchAuthorsByDownload(downloadId, session)

    if (result.status !== "success") {
        return (
            <tr>
                <td className="p-4 text-center">Could not load authors...</td>
            </tr>
        )
    }

    return result.authors.map(author => {
        return (
            <tr className="transition hover:bg-dark-950">
                <td className="p-3">
                    <UserInfo author={author} />
                </td>
                <td className="p-3">
                    {DateTime.fromISO(author.createdAt).toRelative()}
                </td>
                <td className="p-3">{author.isOwner ? <>Owner</> : <>Author</>}</td>
                <td className="p-1.5">
                    <AuthorActionsForm downloadId={downloadId} author={author} />
                </td>
            </tr>
        )
    })
}