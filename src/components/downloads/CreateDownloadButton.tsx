import { auth, signIn } from "@/auth";
import ButtonLink from "../ButtonLink";
import SubmitButton from "../forms/SubmitButton";
import Button from "../Button";

export default async function CreateDownloadButton() {
    const session = await auth()

    if (!session) {
        return (
            <form action={async () => {
                "use server"
                await signIn("thavyra")
            }}>
                <Button type="submit">Login</Button>
            </form>
        )
    }

    return (
        <ButtonLink href="/downloads/new">New Download</ButtonLink>
    )
}