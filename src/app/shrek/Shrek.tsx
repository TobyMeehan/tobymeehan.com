"use client"

import { useRef, useState } from "react"

export default function Shrek({ imageUrl, audioUrl }: { imageUrl?: string, audioUrl?: string }) {
    const [shrek, setShrek] = useState(false)
    const [showImage, setShowImage] = useState(false)

    const audio = useRef<HTMLAudioElement>(null)

    const toggleShrek = () => {

        if (shrek) {

            audio.current?.pause()
            audio.current?.load()

            setShrek(false)
            setShowImage(false)

        } else {

            audio.current?.play()
            setShrek(true)

            setTimeout(() => {
                setShowImage(true)
            }, 900)
        }
    }

    return (
        <>
            <button onClick={toggleShrek}>Shrek</button>

            <p>{shrek ? "Shrek:" : "Click for shrek"}</p>

            <div style={showImage ? undefined : { display: "none" }}>
                <img alt="Shrek" src={imageUrl} />
            </div>

            <div style={{ display: "none" }}>
                <audio ref={audio} src={audioUrl}></audio>
            </div>
        </>
    )
}