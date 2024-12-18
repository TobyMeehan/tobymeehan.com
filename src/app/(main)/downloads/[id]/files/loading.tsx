import Spinner from "@/components/Spinner";

export default function LoadingFiles() {
    return (
        <div className="text-center">
            <Spinner className="mr-2" />
            Loading...
        </div>
    )
}