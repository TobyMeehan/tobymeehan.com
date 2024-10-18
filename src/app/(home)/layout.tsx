import LavaCanvas from "@/components/LavaCanvas";

import "@/app/globals.css"

export default function HomeLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col bg-dark-850 text-light">

            <LavaCanvas />

            <div className="container flex flex-col xl:max-w-7xl sm:mx-auto z-10">
                
                {children}

            </div>

        </div>
    )
}