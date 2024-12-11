import { fetchUserById } from "@/data/users";
import { User } from "@/models/User";
import Image from "next/image";
import { Suspense } from "react";
import UserLink from "./UserLink";

export interface AvatarProps {
    userId: string
    alt?: string
    className?: string
    link?: boolean
}

export default function Avatar({ userId, alt, className = "", link }: AvatarProps) {
    if (alt) {
        return (
            <AvatarImage userId={userId} alt={alt} className={className} />
        )
    }

    return (
        <Suspense fallback={<Skeleton className={className} />}>
            <AvatarAsync className={className} userId={userId} link={link} />
        </Suspense>
    )
}

function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`rounded-full bg-dark-700 animate-pulse ${className}`}></div>
    )
}

async function AvatarAsync({ userId, className, link }: AvatarProps) {
    const result = await fetchUserById(userId)

    if (result.status !== "success") {
        return (
            <div className={`rounded-full bg-dark-700 ${className}`}></div>
        )
    }

    if (!!link) {
        return (
            <UserLink user={result.user} className={className}>
                <AvatarImage userId={result.user.id} alt={`${result.user.username} Avatar`} />
            </UserLink>
        )
    }

    return (
        <AvatarImage userId={result.user.id} alt={`${result.user.username} Avatar`} className={className} />
    )
}

function AvatarImage({userId, alt, className}: {userId: string, alt: string, className?: string}) {
    return (
        <Image src={`https://thavyra.xyz/api/users/${userId}/avatar.png`} alt={alt}
            width={500} height={500} className={`rounded-full ${className}`} />
    )
}
