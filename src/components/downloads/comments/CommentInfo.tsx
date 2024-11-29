import { auth } from "@/auth";
import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton";
import { fetchUserById } from "@/data/users";
import { Comment } from "@/models/Comment";
import { DateTime } from "luxon";
import Image from "next/image";
import { Suspense } from "react";
import CommentBody from "./CommentBody";

export interface CommentInfoProps {
    comment: Comment
    recursion: number
}

export default async function CommentInfo({ comment, recursion }: CommentInfoProps) {
    const session = await auth()

    const user = session?.user?.id ? { userId: session.user.id } : null

    return (
        <div className="flex">
            <Image src={`https://thavyra.xyz/api/users/${comment.userId}/avatar.png`} alt="Your Avatar"
                width={500} height={500} className="size-14 rounded-full mr-3" />
            <div className="grow">
                <div className="mb-1">
                    <Suspense>
                        <CommentUsername comment={comment} />
                    </Suspense>
                    <span className="ml-2 italic">
                        {DateTime.fromISO(comment.createdAt).toRelative({ unit: ['months', 'weeks', 'days', 'hours', 'minutes', 'seconds'] })}
                        {comment.editedAt && <> (Edited)</>}
                    </span>
                </div>
                <CommentBody session={user} comment={comment} />
            </div>
        </div>
    )
}

async function CommentUsername({ comment }: { comment: Comment }) {
    const result = await fetchUserById(comment.userId)

    switch (result.status) {
        case "success":
            return (
                <span className="text-xl text-bright font-semibold">{result.user.username}</span>
            )
        default:
            return (
                <span className="text-xl">Unknown User</span>
            )
    }
}
