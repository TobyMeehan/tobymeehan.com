import { auth } from "@/auth"
import { fetchAuthorsByDownload } from "@/data/authors"
import { DateTime } from "luxon"
import { Suspense } from "react"
import UserInfo from "./UserInfo"
import AuthorActionsForm from "./AuthorActionsForm"
import Table from "@/components/tables/Table"
import TableRow from "@/components/tables/TableRow"

export interface AuthorTableProps {
    downloadId: string
}

export default function AuthorTable({ downloadId }: AuthorTableProps) {
    return (
        <Table head={
            <>
                <th className="text-left p-5 font-bold">User</th>
                <th className="text-left py-5 font-bold">Added</th>
                <th className="text-left py-5 font-bold">Role</th>
                <th className="text-left py-5 font-bold">Actions</th>
            </>
        }>
            <Suspense>
                <AuthorTableAsync downloadId={downloadId} />
            </Suspense>
        </Table>
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
            <TableRow>
                <td className="p-3">
                    <UserInfo author={author} />
                </td>
                <td className="py-3">
                    {DateTime.fromISO(author.createdAt).toRelative()}
                </td>
                <td className="py-3">{author.isOwner ? <>Owner</> : <>Author</>}</td>
                <td className="py-1.5">
                    <AuthorActionsForm downloadId={downloadId} author={author} />
                </td>
            </TableRow>
        )
    })
}