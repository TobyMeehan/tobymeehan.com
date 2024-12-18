import NavLink, { NavLinkProps } from "@/components/NavLink";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface HeaderNavLinkProps extends NavLinkProps {
    icon?: IconProp
}

export default function HeaderNavLink({ children, icon, ...props }: HeaderNavLinkProps) {
    return (
        <NavLink className="group border-b-2" inactiveClassName="border-transparent" activeClassName="border-bright" {...props}>
            <div className="mb-2 py-1 px-4 rounded transition group-hover:bg-dark-700 group-hover:text-bright text-nowrap">
                {icon &&
                    <FontAwesomeIcon icon={icon} className="mr-2" />
                }
                {children}
            </div>
        </NavLink>
    )
}
