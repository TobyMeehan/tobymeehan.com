import "@/app/globals.css"
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
    const isDarkMode = (cookies().get("darkMode")?.value ?? "on") === "on"

    return (
        <body className={`antialiased ${isDarkMode ? "dark" : "light"}`}>
            {children}
        </body>
    )
}