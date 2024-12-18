import { auth } from "@/auth";
import { fetchAuthorsByDownload } from "@/data/authors";
import { ReactNode, Suspense } from "react";

export interface AuthorizeViewProps {
    downloadId: string
    children: ReactNode
    fallback?: ReactNode
    notAuthorized?: ReactNode
}

export default function AuthorizeView({fallback, ...props}: AuthorizeViewProps) {
    return (
        <Suspense fallback={fallback}>
            <AuthorizeViewAsync {...props} />
        </Suspense>
    )
}

async function AuthorizeViewAsync({downloadId, children, notAuthorized}: AuthorizeViewProps) {
    const session = await auth()

    if (!session) {
        return <>{notAuthorized}</>
    }

    const result = await fetchAuthorsByDownload(downloadId, session)

    if (result.status !== "success") {
        return <>{notAuthorized}</>
    }

    if (!result.authors.find(x => x.id === session.user?.id)) {
        return <>{notAuthorized}</>
    }

    return <>{children}</>
}
