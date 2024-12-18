import AuthorizeView from "@/components/downloads/authorization/AuthorizeView";
import HeaderNav from "@/components/downloads/header/HeaderNav";
import HeaderNavLink from "@/components/downloads/header/HeaderNavLink";
import { faBook, faFolderOpen, faGear, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function DownloadHeaderLayout({ params: { id } }: { params: { id: string } }) {
    return (
        <div className="mx-8">
            <HeaderNav>
                <HeaderNavLink href={`/downloads/${id}`} icon={faBook}>
                    About
                </HeaderNavLink>
                <AuthorizeView downloadId={id}>
                    <HeaderNavLink href={`/downloads/${id}/details`} icon={faGear}>
                        Settings
                    </HeaderNavLink>
                </AuthorizeView>
                <HeaderNavLink href={`/downloads/${id}/files`} icon={faFolderOpen}>
                    Files
                </HeaderNavLink>
                <HeaderNavLink href={`/downloads/${id}/authors`} icon={faUsers}>
                    Authors
                </HeaderNavLink>
            </HeaderNav>
        </div>
    )
}