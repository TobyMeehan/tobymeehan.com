import CreateDownloadForm from "@/components/downloads/new/CreateDownloadForm";
import InputOwner from "@/components/downloads/new/InputOwner";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "New Download · tobymeehan.com"
}

export default function CreateDownloadPage() {
    return (
        <>
            <h1 className="text-3xl font-light">New Download</h1>

            <hr className="border-dark-700 my-5" />

            <div className="mb-3 xl:w-2/3 2xl:w-1/2">
                <InputOwner />
            </div>

            <CreateDownloadForm />
        </>
    )
}
