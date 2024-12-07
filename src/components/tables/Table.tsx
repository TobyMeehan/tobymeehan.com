import { ReactNode } from "react"

export interface TableProps {
    children: ReactNode
    head?: ReactNode
}

export default function Table({ head, children }: TableProps) {
    return (
        <table className="w-full table-auto bg-dark-900 rounded-lg overflow-hidden shadow-lg text-sm sm:text-base">
            {head &&
                <thead className="border-b border-dark-700">
                    <tr>
                        {head}
                    </tr>
                </thead>
            }
            <tbody>
                {children}
            </tbody>
        </table>
    )
}
