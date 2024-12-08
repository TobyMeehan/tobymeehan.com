import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Downloads · tobymeehan.com"
}

export default function DownloadsPageLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <h1 className="text-3xl font-light">Downloads</h1>

            <hr className="border-dark-700 my-5" />

            {children}
        </>
    )
}