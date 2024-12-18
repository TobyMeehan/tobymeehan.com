"use client"

import { DateTime } from "luxon"
import { useEffect, useState } from "react"

export interface ClientDateTimeProps {
    dateTime: string | null
}

function useMounted() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return mounted
}

export default function ClientDateTime({ dateTime: dateTimeIso }: ClientDateTimeProps) {
    const mounted = useMounted()

    if (!mounted) {
        return null
    }

    if (!dateTimeIso) {
        return (
            <span title="Before records began...">
                a long time ago
            </span>
        )
    }

    const dateTime = DateTime.fromISO(dateTimeIso, { zone: "utc" }).toLocal()

    return (
        <span title={dateTime.toLocaleString({ day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })}>
            {dateTime.toRelative({ unit: ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'] })}
        </span>
    )
}
