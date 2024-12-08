import { auth } from "@/auth";
import Avatar from "@/components/users/Avatar";
import UserLink from "@/components/users/UserLink";
import { fetchUserById } from "@/data/users";
import { Author } from "@/models/Author";
import { Suspense } from "react";

export interface UserInfoProps {
    author: Author
}

export default function UserInfo(props: UserInfoProps) {
    return (
        <Suspense fallback={<Skeleton />}>
            <UserInfoAsync {...props} />
        </Suspense>
    )
}

function Skeleton() {
    return (
        <div className="flex items-center p-2">
            <div className="size-7 bg-dark-700 animate-pulse rounded-full mr-2"></div>
            <div className="h-5 grow bg-dark-700 animate-pulse rounded"></div>
        </div>
    )
}

async function UserInfoAsync({ author }: UserInfoProps) {
    const session = await auth()

    if (!session) {
        return <UnknownUser />
    }

    const result = await fetchUserById(author.id)

    if (result.status !== "success") {
        return <UnknownUser />
    }

    return (
        <UserLink user={result.user}
            className="flex items-center w-auto p-2 rounded transition bg-opacity-20 hover:bg-dark-700 hover:shadow-md active:bg-dark-750">
            <Avatar user={result.user} className="size-7 mr-2" />
            <div className="text-bright font-semibold">
                {result.user.username}
            </div>
        </UserLink>
    )
}

function UnknownUser() {
    return (
        <div className="flex items-center p-2">
            <div className="size-7 rounded-full mr-2 bg-dark-700"></div>
            <div>
                Unknown User
            </div>
        </div>
    )
}
