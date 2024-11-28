import { auth } from "@/auth";
import SidebarNavLink from "@/components/downloads/details/SidebarNavLink";
import { fetchDownloadById } from "@/data/downloads";

export default async function EditSidebarLayout({ params }: { params: { id: string } }) {
    const session = await auth()

    const result = await fetchDownloadById(params.id, session)

    return (
        <>
            {result.status === "success" && 
                <>
                    <h1 className="text-3xl text-center">{result.download.title}</h1>
                    <hr className="border-dark-700 my-5" />
                </>
            }

            <nav className="grid grid-flow-col sm:flex sm:flex-col gap-3 overflow-x-scroll sm:overflow-x-auto min-w-0">
                <SidebarNavLink href={`/downloads/${params.id}/details`} match="all">
                    Details
                </SidebarNavLink>
                <SidebarNavLink href={`/downloads/${params.id}/files`} match="all">
                    File Manager
                </SidebarNavLink>
                <SidebarNavLink href={`/downloads/${params.id}/authors`} match="all">
                    Manage Authors
                </SidebarNavLink>
            </nav>
        </>
    )
}
