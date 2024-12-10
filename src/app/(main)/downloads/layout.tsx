import Header from "@/components/downloads/header/Header";
import { ReactNode } from "react";

export default function DownloadsLayout({ children, header, sidebar }: { children: ReactNode, header: ReactNode, sidebar: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-dark-850 text-light">
            <header className="border-b border-dark-700 bg-dark-850">
                <div className="xl:mx-10">
                    <Header />
                    {header}
                </div>
            </header>
            <div className="grow flex flex-col md:flex-row-reverse">
                <div className="w-full md:basis-5/12 lg:basis-4/12 2xl:basis-3/12 flex flex-col bg-dark-900 border-b sm:border-l sm:border-b-0 border-dark-700">
                    <div className="grow xl:mr-10 ">
                        <section className="p-8">
                            {sidebar}
                        </section>
                    </div>
                </div>
                <div className="grow md:basis-7/12 lg:basis-8/12 2xl:basis-9/12 flex flex-col bg-dark-800 overflow-y-scroll">
                    <div className="grow xl:ml-10 ">
                        <main className="p-8">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}