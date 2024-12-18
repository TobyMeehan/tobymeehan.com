import { fetchAuthorsByDownload } from "@/data/authors";
import { Download } from "@/models/Download";
import Image from "next/image";
import { Suspense } from "react";
import UserLink from "../users/UserLink";
import Avatar from "../users/Avatar";

export default function AuthorSummary({ download }: { download: Download }) {
    return (
        <Suspense>
            <AuthorSummaryAsync download={download} />
        </Suspense>
    )
}

async function AuthorSummaryAsync({ download }: { download: Download }) {
    const result = await fetchAuthorsByDownload(download.id)

    switch (result.status) {
        case "success":
            return (
                <div className="flex gap-2">
                    {result.authors.map(author => {
                        return (
                            <Avatar key={author.id} userId={author.id} className="size-7" />
                        )
                    })}
                </div>
            )
    }
}