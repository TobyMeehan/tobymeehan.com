import { Download } from "@/models/Download";
import Link from "next/link";
import AuthorSummary from "./AuthorSummary";
import ClientDateTime from "../ClientDateTime";

export default function DownloadLink({ download }: { download: Download }) {
    return (
        <Link href={`/downloads/${download.id}`} className="flex flex-col group rounded border border-dark-700 hover:shadow-lg overflow-hidden">
            <div className="grow p-5 transition group-hover:bg-gray-700">
                <h4 className="text-lg font-bold text-center">{download.title}</h4>
                <div>
                    {download.summary}
                </div>
            </div>

            <div className="p-5 transition group-hover:bg-gray-700 text-sm text-right">
                <ClientDateTime dateTime={download.updatedAt ?? download.createdAt} />
            </div>

            <footer className="px-5 py-3 border-t border-dark-700 bg-dark-900">
                <AuthorSummary download={download} />
            </footer>
        </Link>
    )
}
