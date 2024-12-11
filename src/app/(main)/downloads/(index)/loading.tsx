import Spinner from "@/components/Spinner";

export default function LoadingDownloadsPage() {
    return (
        <div className="text-center">
            <Spinner className="mr-2" />
            Loading downloads...
        </div>
    )
}