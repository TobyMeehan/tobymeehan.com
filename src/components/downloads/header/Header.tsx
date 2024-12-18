import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import headerIcon from "./header-icon.png"
import AuthStatus from "./AuthStatus";

export default async function Header() {
    return (
        <div className="flex items-center mx-8">
            <Link href={`/`} className="my-2">
                <Image src={headerIcon} alt="tobymeehan.com"
                    className="size-9 rounded-full" />
            </Link>

            <div className="text-xl ml-3 mr-1">
                /
            </div>

            <Link href={`/downloads`} className="font-bold text-bright p-2 rounded-md transition hover:bg-dark-700 active:opacity-75">
                Downloads
            </Link>

            <AuthStatus />
        </div>
    )
}