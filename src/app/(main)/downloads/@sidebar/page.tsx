import { auth } from "@/auth";
import ButtonLink from "@/components/ButtonLink";
import UserDownloadList from "@/components/downloads/UserDownloadList";

export default async function IndexSidebar() {
    const session = await auth()

    return (
        <>
            {session
                ? <>
                    <div className="flex items-center mb-6">
                        <h5 className="text-lg">My Downloads</h5>
                        <ButtonLink className="ml-auto text-sm" href="/downloads/new">
                            New
                        </ButtonLink>
                    </div>
                    <UserDownloadList />
                </>
                : <>
                    Sign in to create downloads
                </>
            }
        </>
    )
}