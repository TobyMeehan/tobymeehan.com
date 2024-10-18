import LavaCanvas from "@/components/LavaCanvas";

import "@/app/globals.css"
import { cookies } from "next/headers";

export default function HomeLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isDarkMode = (cookies().get("darkMode")?.value ?? "on") === "on"

    return (
        <div className={`${isDarkMode ? "dark ": ""}min-h-screen flex flex-col transition bg-neutral-300 text-gray-700 dark:bg-dark-850 dark:text-light`}>

            <LavaCanvas />

            <div className="container flex flex-col xl:max-w-7xl sm:mx-auto z-10">
                
                {children}

            </div>

        </div>
    )
}