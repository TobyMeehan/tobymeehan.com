import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import headerIcon from "./header-icon.png"

export default async function Header() {
    const session = await auth()

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

            {session
                ? <>
                    <Image src={`https://thavyra.xyz/api/users/${session.user?.id}/avatar.png`} alt="Avatar"
                        width={500} height={500} className="size-6 rounded-full ml-auto" />
                    <div className="text-bright ml-1.5">
                        Hi {session.user?.name}!
                    </div>
                    <form className="ml-2" action={async () => {
                        "use server"
                        await signOut()
                    }}>
                        <button type="submit">
                            Logout
                        </button>
                    </form>
                </>
                : <>
                    <form action={async () => {
                        "use server"
                        await signIn("thavyra")
                    }} className="ml-auto">
                        <button type="submit">
                            Log In
                        </button>
                    </form>
                </>
            }
        </div>
    )
}