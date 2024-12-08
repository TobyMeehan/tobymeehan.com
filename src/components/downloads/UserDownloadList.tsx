import { auth } from "@/auth";
import { fetchAuthorsByDownload } from "@/data/authors";
import { fetchUserDownloads } from "@/data/downloads";
import { Download } from "@/models/Download";
import { Session } from "next-auth";
import Avatar from "../users/Avatar";
import { Suspense } from "react";
import Link from "next/link";

export default  function UserDownloadList() {
    return (
        <Suspense>
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

    return result.downloads.map(download => {
        return (
            <div className="flex items-center my-2">
                <Suspense>
                    <UserDownloadListItemImage session={session} download={download} />
                </Suspense>
                <Link href={`/downloads/${download.id}`} className="transition text-link hover:text-link-hover hover:underline">
                    {download.title}
                </Link>
            </div>
        )
    })
}

async function UserDownloadListItemImage({session, download}: {session: Session, download: Download}) {
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
