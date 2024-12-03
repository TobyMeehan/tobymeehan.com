import Header from "@/components/downloads/Header";
import { ReactNode } from "react";

export default function DownloadsLayout({ children, sidebar }: { children: ReactNode, sidebar: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-dark-850 text-light">
            <div className="border-b border-dark-700 bg-dark-850">
                <Header />
            </div>
            <div className="grow flex flex-col sm:flex-row-reverse">
                <div className="w-full sm:max-w-64 md:max-w-xs lg:max-w-md 2xl:max-w-2xl flex flex-col bg-dark-900 border-b sm:border-l sm:border-b-0 border-dark-700">
                    <div className="grow xl:pr-48">
                        <section className="p-8">
                            {sidebar}
                        </section>
                    </div>
                </div>
                <div className="grow flex flex-col bg-dark-800 overflow-y-scroll">
                    <div className="grow xl:pl-48">
                        <main className="p-8">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}