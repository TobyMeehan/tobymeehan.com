import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Layout({
    children,
    lead,
    projects,
    tools
}: Readonly<{
    children: React.ReactNode;
    lead: React.ReactNode;
    projects: React.ReactNode;
    tools: React.ReactNode;
}>) {
    return (
        <>
            <div className="p-8 md:my-52 md:max-w-xl rounded-2xl bg-dark-850 bg-opacity-50">
                {lead}
            </div>

            <div className="px-8 pt-8 sm:rounded-t bg-dark-800 text-sm sm:text-base">

                <main className="flex-grow">
                    {children}

                    {projects}

                    <hr className="border-none my-5" />
                    
                    {tools}
                </main>

                <footer>
                    <hr className="border-dark-700 mt-5" />

                    <div className="my-5 flex flex-col md:flex-row justify-center items-center">

                        <div>
                            &copy; {new Date().getFullYear()} Toby Meehan
                        </div>

                        <div className="hidden md:block h-6 border-r border-dark-700 mx-3"></div>

                        <div>
                            <FontAwesomeIcon icon={faGithub} />
                            <Link className="ml-2 transition text-link hover:text-link-hover hover:underline" href="https://github.com/TobyMeehan/tobymeehan.com">View Page Source</Link>
                        </div>

                    </div>
                </footer>

            </div>
        </>
    )
}