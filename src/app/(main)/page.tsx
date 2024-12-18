import DarkModeButton from "@/components/DarkModeButton";
import LavaCanvas from "@/components/home/LavaCanvas";
import Lead from "@/components/home/Lead";
import Projects from "@/components/home/projects/Projects";
import Tools from "@/components/home/tools/Tools";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cookies } from "next/headers";
import Link from "next/link";

export default function Home() {
    const isDarkMode = (cookies().get("darkMode")?.value ?? "on") === "on"

    return (
        <div className="min-h-screen flex flex-col transition bg-neutral-300 text-gray-700 dark:bg-dark-850 dark:text-light">

            <LavaCanvas />

            <div className="container flex flex-col xl:max-w-7xl sm:mx-auto z-10">

                <Lead />

                <div className="px-8 pt-8 md:rounded-t md:shadow-xl transition bg-gray-400 dark:bg-dark-800 text-sm sm:text-base">

                    <main className="grow">

                        <Projects />

                        <hr className="border-none my-5" />

                        <Tools />

                    </main>

                    <footer>
                        <hr className="border-gray-500 dark:border-dark-700 mt-5" />

                        <div className="my-5 flex flex-col md:flex-row justify-center items-center">

                            <div className="md:mr-auto"></div>

                            <div>
                                &copy; {new Date().getFullYear()} Toby Meehan
                            </div>

                            <div className="hidden md:block h-6 border-r border-gray-500 dark:border-dark-700 mx-3"></div>

                            <div>
                                <FontAwesomeIcon icon={faGithub} />
                                <Link className="ml-2 transition text-link hover:text-link-hover hover:underline" href="https://github.com/TobyMeehan/tobymeehan.com">View Page Source</Link>
                            </div>

                            <div className="md:ml-auto">
                                <DarkModeButton isDarkMode={isDarkMode} />
                            </div>

                        </div>
                    </footer>

                </div>

            </div>

        </div>
    )
}
