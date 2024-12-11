import { auth } from "@/auth";
import ButtonLink from "@/components/ButtonLink";
import UserDownloadList from "@/components/downloads/UserDownloadList";

export default async function IndexSidebar() {
    const session = await auth()

    return (
        <>
            <div className="flex items-center mb-6">
                <h5 className="text-lg">Your Downloads</h5>

                {session &&
                    <ButtonLink className="ml-auto text-sm" href="/downloads/new">
                        New
                    </ButtonLink>
                }
            </div>
            {session
                ? <UserDownloadList />
                : <div className="text-center">Sign in to create downloads</div>
            }
        </>
    )
}