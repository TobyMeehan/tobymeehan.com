import "@/app/globals.css"
import { PublicEnvScript } from "next-runtime-env";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
    const isDarkMode = (cookies().get("darkMode")?.value ?? "on") === "on"

    return (
        <>
            <head>
                <PublicEnvScript />
            </head>
            <body className={`antialiased ${isDarkMode ? "dark" : "light"}`}>
                {children}
            </body>
        </>
    )
}