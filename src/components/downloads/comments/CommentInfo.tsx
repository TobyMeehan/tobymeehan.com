import { auth } from "@/auth";
import { fetchUserById } from "@/data/users";
import { Comment } from "@/models/Comment";
import { Suspense } from "react";
import CommentBody from "./CommentBody";
import ClientDateTime from "@/components/ClientDateTime";
import Avatar from "@/components/users/Avatar";
import { fetchReplies } from "@/data/comments";
import UserLink from "@/components/users/UserLink";

export interface CommentInfoProps {
    comment: Comment
    parent?: Comment
    recursion: number
}

export default async function CommentInfo({ parent, comment, recursion }: CommentInfoProps) {
    const session = await auth()

    const user = session?.user?.id ? { userId: session.user.id } : null

    return (
        <div className="flex my-8">
            <Avatar link userId={comment.userId} className="size-14 mr-3" />
            <div className="grow">
                <div className="mb-1">
                    <Suspense>
                        <CommentUsername comment={comment} />
                    </Suspense>
                    <span className="ml-2 italic">
                        <ClientDateTime dateTime={comment.createdAt} />
                        {comment.editedAt && <> (Edited)</>}
                    </span>
                </div>
                <CommentBody session={user} comment={comment} replyToId={parent?.id ?? comment.id} />
                <Suspense>
                    <Replies comment={comment} recursion={recursion} />
                </Suspense>
            </div>
        </div>
    )
}

async function CommentUsername({ comment }: { comment: Comment }) {
    const result = await fetchUserById(comment.userId)

    switch (result.status) {
        case "success":
            return (
                <UserLink user={result.user} className="text-xl text-bright font-semibold">{result.user.username}</UserLink>
            )
        default:
            return (
                <span className="text-xl">Unknown User</span>
            )
    }
}

async function Replies({ comment, recursion }: CommentInfoProps) {
    const session = await auth()

    const result = await fetchReplies(comment.id, session)

    if (result.status !== "success" || result.comments.length === 0) {
        return null
    }

    return result.comments.map(reply => {
        return (
            <CommentInfo key={reply.id} parent={comment} comment={reply} recursion={recursion + 1} />
        )
    })
}
