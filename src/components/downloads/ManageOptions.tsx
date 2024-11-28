import { auth } from "@/auth";
import { fetchAuthorsByDownload } from "@/data/authors";
import { Download } from "@/models/Download";
import Link from "next/link";
import { Suspense } from "react";

export interface ManageOptionsProps {
    download: Download
}

export default function ManageOptions({ download }: ManageOptionsProps) {
    return (
        <Suspense>
            <ManageOptionsAsync download={download} />
        </Suspense>
    )
}

async function ManageOptionsAsync({ download }: ManageOptionsProps) {
    const session = await auth()

    const result = await fetchAuthorsByDownload(download.id, session)

    if (result.status !== "success") {
        return null
    }

console.log(session?.user?.id)

    if (!result.authors.find(x => x.id === session?.user?.id)) {
        return null
    }

    return (
        <div className="flex flex-col text-center gap-3 text-lg">
            <Link href={`/downloads/${download.id}/details`} className="transition text-link hover:text-link-hover">Edit</Link>
            <Link href={`/downloads/${download.id}/files`} className="transition text-link hover:text-link-hover">File Manager</Link>
            <Link href={`/downloads/${download.id}/authors`} className="transition text-link hover:text-link-hover">Authors</Link>
        </div>
    )
}
