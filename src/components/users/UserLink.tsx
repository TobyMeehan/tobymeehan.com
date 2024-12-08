import { User } from "@/models/User";
import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

export interface UserLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    user: User
}

export default function UserLink({user, href, ...props}: UserLinkProps) {

    return (
        <Link href={`https://thavyra.xyz/@${user.username}`} {...props} />
    )
}
