import Link, { LinkProps } from "next/link";
import { ButtonAppearance } from "./Button";
import { ReactNode } from "react";

export interface LinkButtonProps extends LinkProps {
    appearance?: ButtonAppearance
    children: ReactNode
}

export default function ButtonLink({ children, ...props }: LinkButtonProps) {
    return (
        <Link {...props}
            className="block transition py-1.5 px-3 text-lg rounded border border-dark-700 hover:border-light text-bright hover:shadow-lg active:bg-dark-750 disabled:opacity-75 disabled:cursor-not-allowed">
            {children}
        </Link>
    )
}
