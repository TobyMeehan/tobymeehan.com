import { ReactNode } from "react";

export interface TableRowProps {
    children: ReactNode
}

export default function TableRow({ children }: TableRowProps) {
    return (
        <tr className="transition hover:bg-dark-950">
            {children}
        </tr>
    )
}
