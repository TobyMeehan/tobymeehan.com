import { User } from "@/models/User";

export async function fetchUserById(userId: string): Promise<{
    status: "success",
    user: User
} | {
    status: "notfound"
} | {
    status: "failed"
}> {
    try {
        const response = await fetch(`https://thavyra.xyz/api/users/${userId}`)

        if (response.status === 404) {
            return { status: "notfound" }
        }

        if (!response.ok) {
            return { status: "failed" }
        }

        const user = await response.json() as User

        return {
            status: "success",
            user
        }
    } catch (error) {
        return { status: "failed" }
    }
}