import { fetchUserById } from "@/data/users";
import { User } from "@/models/User";
import Image from "next/image";
import { Suspense } from "react";

export interface AvatarProps {
    userId: string
    className?: string
}

export default function Avatar({ className = "", ...props }: AvatarProps) {
    return (
        <Suspense fallback={<Skeleton className={className} />}>
            <AvatarAsync className={className} {...props} />
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
        <Image src={`https://thavyra.xyz/api/users/${result.user.id}/avatar.png`} alt={`${result.user.username} Avatar`}
            width={500} height={500} className={`rounded-full ${className}`} />
    )
}
