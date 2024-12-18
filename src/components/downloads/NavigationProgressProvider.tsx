"use client"

import { AppProgressBar as NavigationProgress } from "next-nprogress-bar"
import { ReactNode } from "react"

export default function NavigationProgressProvider({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="absolute top-0 w-full">
                <NavigationProgress color="rgb(156 163 175)" options={{ showSpinner: false }} delay={300} />
            </div>
            {children}
        </>
    )
}