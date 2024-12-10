import { fetchUserById } from "@/data/users";
import { User } from "@/models/User";
import Image from "next/image";
import { Suspense } from "react";

export interface AvatarProps {
    userId: string
    alt?: string
    className?: string
}

export default function Avatar({ userId, alt, className = "" }: AvatarProps) {
    if (alt) {
        return (
            <AvatarImage userId={userId} alt={alt} className={className} />
        )
    }

    return (
        <Suspense fallback={<Skeleton className={className} />}>
            <AvatarAsync className={className} userId={userId} />
        </Suspense>
    )
}

function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`rounded-full bg-dark-700 animate-pulse ${className}`}></div>
    )
}

async function AvatarAsync({ userId, className }: AvatarProps) {
    const result = await fetchUserById(userId)

    if (result.status !== "success") {
        return (
            <div className={`rounded-full bg-dark-700 ${className}`}></div>
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
