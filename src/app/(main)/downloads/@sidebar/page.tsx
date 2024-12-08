import ButtonLink from "@/components/ButtonLink";
import UserDownloadList from "@/components/downloads/UserDownloadList";

export default async function IndexSidebar() {
    return (
        <>
            <div className="flex items-center mb-6">
                <h5 className="text-lg">My Downloads</h5>
                <ButtonLink className="ml-auto text-sm" href="/downloads/new">
                    New
                </ButtonLink>
            </div>
            <UserDownloadList />
        </>
    )
}