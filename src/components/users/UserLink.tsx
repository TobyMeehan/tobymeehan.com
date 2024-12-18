import { User } from "@/models/User";
import { env } from "next-runtime-env";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

export interface UserLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    user: User
}

export default function UserLink({user, href, ...props}: UserLinkProps) {

    return (
        <Link href={`${env("NEXT_PUBLIC_THAVYRA_URL")}/@${user.username}`} {...props} />
    )
}
