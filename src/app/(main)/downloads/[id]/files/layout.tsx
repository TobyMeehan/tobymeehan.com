import { ReactNode } from "react";

export default function FileManagerLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <h1 className="text-3xl font-light">Files</h1>
            <hr className="border-dark-700 my-5" />
            {children}
        </>
    )
}