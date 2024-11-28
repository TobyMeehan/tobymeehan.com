import CreateDownloadButton from "@/components/downloads/CreateDownloadButton";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Downloads · tobymeehan.com"
}

export default function DownloadsPageLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-light">Downloads</h1>
                <CreateDownloadButton />
            </div>

            <hr className="border-dark-700 my-5" />

            {children}
        </>
    )
}