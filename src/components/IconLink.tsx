import { IconProp } from "@fortawesome/fontawesome-svg-core"
import IconButton from "./IconButton"

export interface IconLinkProps {
    href: string
    icon: IconProp
}

export default function IconLink({icon, href}: IconLinkProps) {
    return (
        <a href={href}>
            <IconButton icon={icon} />
        </a>
    )
}
