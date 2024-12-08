import { auth } from "@/auth"
import { fetchAuthorsByDownload } from "@/data/authors"
import { fetchUserById } from "@/data/users"
import { Author } from "@/models/Author"
import { Suspense } from "react"
import UserLink from "../users/UserLink"
import Avatar from "../users/Avatar"

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
                <div key={author.id} className="my-3">
                    <Suspense fallback={<AuthorSkeleton />}>
                        <AuthorListItem author={author} />
                    </Suspense>
                </div>
            )
        })
    }
}

function AuthorSkeleton() {
    return (
        <div className="flex items-center p-2">
            <div className="size-7 bg-dark-700 animate-pulse rounded-full mr-2"></div>
            <div className="h-5 grow bg-dark-700 animate-pulse rounded"></div>
        </div>
    )
}

async function AuthorListItem({ author }: { author: Author }) {
    const result = await fetchUserById(author.id)

    switch (result.status) {
        case "success":
            return (
                <UserLink user={result.user}
                    className="flex items-center p-2 rounded transition bg-opacity-20 hover:bg-dark-700 hover:shadow-md active:bg-dark-750">
                    <Avatar userId={result.user.id} className="size-9 mr-2" />
                    <span className="text-xl text-bright font-semibold">{result.user.username}</span>
                    {author.isOwner && <span className="ml-auto italic">Owner</span>}
                </UserLink>
            )
        default:
            return (
                <div className="flex items-center p-2">
                    <div className="size-7 rounded-full mr-2 bg-dark-700"></div>
                    <div>
                        Unknown User
                    </div>
                </div>
            )
    }
}
