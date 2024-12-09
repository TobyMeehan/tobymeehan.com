import { ReactNode } from "react"

export interface HeaderNavProps {
    children: ReactNode
}

export default function HeaderNav({ children }: HeaderNavProps) {
    return (
        <nav className="flex gap-3">
            {children}
        </nav>
    )
}