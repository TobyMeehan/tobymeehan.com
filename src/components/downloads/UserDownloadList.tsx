import { auth } from "@/auth";
import { fetchAuthorsByDownload } from "@/data/authors";
import { fetchUserDownloads } from "@/data/downloads";
import { Download } from "@/models/Download";
import { Session } from "next-auth";
import Avatar from "../users/Avatar";
import { Suspense } from "react";
import Link from "next/link";
import Spinner from "../Spinner";

export default function UserDownloadList() {
    return (
        <Suspense fallback={
            <div className="text-center">
                <Spinner className="mr-2" />
                Loading your downloads...
            </div>
        }>
            <UserDownloadListAsync />
        </Suspense>
    )
}

async function UserDownloadListAsync() {
    const session = await auth()

    if (!session) {
        return null
    }

    const result = await fetchUserDownloads(session)

    if (result.status !== "success") {
        return null
    }

    if (result.downloads.length === 0) {
        return (
            <div className="text-center">
                Nothing to see here... yet!
            </div>
        )
    }

    return result.downloads.map(download => {
        return (
            <div key={download.id} className="flex items-center my-2">
                <Suspense fallback={<ImageSkeleton />}>
                    <UserDownloadListItemImage session={session} download={download} />
                </Suspense>
                <Link href={`/downloads/${download.id}`} className="transition text-link hover:text-link-hover hover:underline">
                    {download.title}
                </Link>
                <span className="text-sm ml-auto font-light">
                    {
                        download.visibility === "public" ? <>Public</>
                            : download.visibility === "unlisted" ? <>Unlisted</>
                                : <>Private</>
                    }
                </span>
            </div>
        )
    })
}

function ImageSkeleton() {
    return (
        <div className="rounded-full bg-dark-700 size-5 mr-2 animate-pulse"></div>
    )
}

async function UserDownloadListItemImage({ session, download }: { session: Session, download: Download }) {
    const result = await fetchAuthorsByDownload(download.id, session)

    if (result.status !== "success") {
        return (
            <div className="rounded-full bg-dark-700 size-5 mr-2"></div>
        )
    }

    const owner = result.authors.find(x => x.isOwner)

    if (!owner) {
        return (
            <div className="rounded-full bg-dark-700 size-5 mr-2"></div>
        )
    }

    return (
        <Avatar userId={owner.id} className="rounded-full size-5 mr-2" />
    )
}
