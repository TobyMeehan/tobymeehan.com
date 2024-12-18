import { auth } from "@/auth"
import { fetchAuthorsByDownload } from "@/data/authors"
import { Suspense } from "react"
import UserInfo from "./UserInfo"
import AuthorActionsForm from "./AuthorActionsForm"
import Table from "@/components/tables/Table"
import TableRow from "@/components/tables/TableRow"
import AuthorizeView from "../authorization/AuthorizeView"
import ClientDateTime from "@/components/ClientDateTime"
import Spinner from "@/components/Spinner"

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
            <Suspense fallback={<Loading />}>
                <AuthorTableAsync downloadId={downloadId} />
            </Suspense>
        </Table>
    )
}

function Loading() {
    return (
        <tr>
            <td className="p-5 text-center" colSpan={4}>
                <Spinner className="mr-2" />
                Loading authors...
            </td>
        </tr>
    )
}

async function AuthorTableAsync({ downloadId }: AuthorTableProps) {
    const session = await auth()

    const result = await fetchAuthorsByDownload(downloadId, session)

    if (result.status !== "success") {
        return (
            <tr>
                <td className="p-4 text-center" colSpan={4}>Could not load authors...</td>
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
                    <ClientDateTime dateTime={author.createdAt} />
                </td>
                <td className="py-3">{author.isOwner ? <>Owner</> : <>Author</>}</td>
                <td className="py-1.5">
                    <AuthorizeView downloadId={downloadId}>
                        <AuthorActionsForm downloadId={downloadId} author={author} />
                    </AuthorizeView>
                </td>
            </TableRow>
        )
    })
}