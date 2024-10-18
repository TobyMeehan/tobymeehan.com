import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

export default function SiteButton({ href }: { href: Url }) {
    return (<Link href={href}
    className="flex justify-center items-center w-full sm:w-auto py-1.5 px-3 rounded sm:text-lg 
    transition border border-gray-600 dark:border-dark-700 hover:bg-gray-600 hover:text-bright dark:text-bright dark:hover:border-light dark:hover:bg-transparent">
        <FontAwesomeIcon className="mr-2" icon={faArrowUpRightFromSquare} /> Visit Site
    </Link>)
}