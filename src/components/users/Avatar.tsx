import { User } from "@/models/User";
import Image from "next/image";

export interface AvatarProps {
    user: User | { id: string, username: string }
    className?: string
}

export default function Avatar({ user, className = "" }: AvatarProps) {
    return (
        <Image src={`https://thavyra.xyz/api/users/${user.id}/avatar.png`} alt={`${user.username} Avatar`}
        width={500} height={500} className={`rounded-full ${className}`} />
    )
}
