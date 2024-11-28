import { auth } from "@/auth"
import { fetchAuthorsByDownload } from "@/data/authors"
import { fetchUserById } from "@/data/users"
import { Author } from "@/models/Author"
import Image from "next/image"
import { Suspense } from "react"

export interface AuthorListProps {
    downloadId: string
}

export default function AuthorList({ downloadId }: AuthorListProps) {
    return (
        <Suspense>
            <AuthorListAsync downloadId={downloadId} />
        </Suspense>
    )
}

async function AuthorListAsync({ downloadId }: AuthorListProps) {
    const session = await auth()

    const result = await fetchAuthorsByDownload(downloadId, session)

    if (result.status === "success") {
        return result.authors.map(author => {
            return (
                <div className="flex items-center">
                    <Suspense>
                        <AuthorListItem author={author} />
                    </Suspense>
                </div>
            )
        })
    }
}

async function AuthorListItem({ author }: { author: Author }) {
    const result = await fetchUserById(author.id)

    switch (result.status) {
        case "success":
            return (
                <>
                    <Image alt={`${result.user.username} Avatar`} src={`https://thavyra.xyz/api/users/${result.user.id}/avatar.png`}
                        width={500} height={500} className="mr-2 size-9 rounded-full" />
                    <span className="text-xl text-bright font-semibold">{result.user.username}</span>
                    {author.isOwner && <span className="ml-auto italic">Owner</span>}
                </>
            )
        default:
            return (
                <>
                    <div className="mr-2 size-9 rounded-full bg-dark-700"></div>
                    <span className="text-xl">Unknown User</span>
                </>
            )
    }
}
