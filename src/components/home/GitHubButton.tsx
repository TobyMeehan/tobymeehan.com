import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

export default function GitHubButton({href}: {href: Url}) {
    return (<Link href={href}
        className="flex justify-center items-center w-full sm:w-auto py-1.5 px-3 rounded sm:text-lg text-center 
        transition bg-gray-900 dark:bg-bright text-bright dark:text-dark-900 hover:bg-dark-700 dark:hover:bg-gray-400">
            <FontAwesomeIcon className="text-2xl mr-2" icon={faGithub} /> View on GitHub
        </Link>)
}