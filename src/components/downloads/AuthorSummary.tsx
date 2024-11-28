import { fetchAuthorsByDownload } from "@/data/authors";
import { Download } from "@/models/Download";
import Image from "next/image";
import { Suspense } from "react";

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
                <div className="flex">
                    {result.authors.map(author => {
                        return (
                            <Image key={author.id} src={`https://thavyra.xyz/api/users/${author.id}/avatar.png`} alt="Avatar"
                            width={500} height={500} className="size-7" />
                        )
                    })}
                </div>
            )
    }
}