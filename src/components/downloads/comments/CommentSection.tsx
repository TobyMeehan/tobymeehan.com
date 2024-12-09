import { auth } from "@/auth";
import { Download } from "@/models/Download";
import PostCommentForm from "./PostCommentForm";
import { fetchCommentsByDownload } from "@/data/comments";
import CommentInfo from "./CommentInfo";
import { Suspense } from "react";

export default async function CommentSection({ download }: { download: Download }) {
    const session = await auth()

    return (
        <>
            <h3 className="text-2xl mb-3">Comments</h3>

            {session?.user?.id
                ? <PostCommentForm userId={session.user.id} download={download} />
                : <div>Login to comment</div>
            }

            <div className="mt-6 space-y-8">
                <Suspense>
                    <CommentList download={download} />
                </Suspense>
            </div>
        </>
    )

}

async function CommentList({ download }: { download: Download }) {
    const session = await auth()

    const result = await fetchCommentsByDownload(download.id, session)

    switch (result.status) {
        case "success":
            return (
                <>
                    {result.comments.length === 0 &&
                        <div className="text-center">No comments here...</div>
                    }
                    {result.comments.map(comment => {
                        return (
                            <CommentInfo key={comment.id} comment={comment} recursion={0} />
                        )
                    })}
                </>

            )
    }
}
