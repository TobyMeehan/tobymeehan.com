import { auth, signIn, signOut } from "@/auth";
import IconButton from "@/components/IconButton";
import Avatar from "@/components/users/Avatar";
import { faRightFromBracket, faRightToBracket, faUserCircle, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function AuthStatus() {
    const session = await auth()

    if (!session) {
        return (
            <>
                <form action={async () => {
                    "use server"
                    await signIn("thavyra")
                }} className="ml-auto">
                    <IconButton type="submit" icon={faRightToBracket} title="Log In" />
                </form>
                <FontAwesomeIcon icon={faUserCircle} title="Not signed in." className="size-7 ml-2" />
            </>
        )
    }

    return (
        <>
            <div className="ml-auto"></div>
            <div className="text-bright">
                Hi {session.user?.name}!
            </div>
            <form className="ml-3" action={async () => {
                "use server"
                await signIn("thavyra", {}, { prompt: "select_account" })
            }}>
                <IconButton type="submit" icon={faUserGroup} title="Change Account" />
            </form>
            <form className="ml-1" action={async () => {
                "use server"
                await signOut()
            }}>
                <IconButton type="submit" icon={faRightFromBracket} title="Logout" />
            </form>
            <Avatar userId={session.user!.id!} className="size-7 ml-1" />
        </>

    )
}