import Spinner from "@/components/Spinner";

export default function LoadingSettings() {
    return (
        <div className="text-center">
            <Spinner className="mr-2" />
            Loading...
        </div>
    )
}