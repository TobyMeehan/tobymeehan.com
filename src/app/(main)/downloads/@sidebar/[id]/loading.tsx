import { AuthorListSkeleton } from "@/components/downloads/AuthorList";
import { DownloadButtonSkeleton } from "@/components/downloads/DownloadButton";

export default function LoadingDownloadsSidebar() {
    return (
        <>
            <DownloadButtonSkeleton />

            <hr className="my-5 border-dark-700" />

            <div className="w-full h-5 mb-1 rounded bg-dark-700 animate-pulse"></div>
            <div className="flex">
                <div className="w-1/3 h-5 mb-1 mr-2 rounded bg-dark-700 animate-pulse"></div>
                <div className="grow h-5 mb-1 rounded bg-dark-700 animate-pulse"></div>
            </div>
            <div className="w-2/3 h-5 mb-1 rounded bg-dark-700 animate-pulse"></div>

            <hr className="my-5 border-dark-700" />

            <AuthorListSkeleton />

            <hr className="border-dark-700 my-5" />
        </>
    )
}
