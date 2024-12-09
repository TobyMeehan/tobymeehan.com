import HeaderNav from "@/components/downloads/header/HeaderNav";
import HeaderNavLink from "@/components/downloads/header/HeaderNavLink";
import { faBook, faFolder, faFolderOpen, faHome, faPencilSquare, faSliders, faUsersGear } from "@fortawesome/free-solid-svg-icons";

export default function DownloadHeaderLayout({ params: { id } }: { params: { id: string } }) {
    return (
        <div className="px-56">
            <HeaderNav>
                <HeaderNavLink href={`/downloads/${id}`} icon={faBook}>
                    About
                </HeaderNavLink>
                <HeaderNavLink href={`/downloads/${id}/details`} icon={faSliders}>
                    Settings
                </HeaderNavLink>
                <HeaderNavLink href={`/downloads/${id}/files`} icon={faFolderOpen}>
                    Files
                </HeaderNavLink>
                <HeaderNavLink href={`/downloads/${id}/authors`} icon={faUsersGear}>
                    Authors
                </HeaderNavLink>
            </HeaderNav>
        </div>
    )
}