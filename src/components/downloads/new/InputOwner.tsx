import { auth, signIn } from "@/auth"
import InputOwnerDropdown from "./InputOwnerDropdown"
import Avatar from "@/components/users/Avatar"

export default async function InputOwner() {
    const session = await auth()

    if (!session) {
        return null
    }

    return (
        <form action={async () => {
            "use server"
            await signIn("thavyra", {}, { prompt: "select_account" })
        }}>

            <label htmlFor="owner" className="block mb-1.5">Owner</label>

            <InputOwnerDropdown id="owner" currentUser={
                <div className="flex items-center">
                    <Avatar userId={session.user!.id!} className="size-6 mr-2" />
                    {session.user?.name}
                </div>
            } />
        </form>
    )
}
