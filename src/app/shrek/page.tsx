import { Metadata } from "next";
import Shrek from "./Shrek";
import { env } from "next-runtime-env";

export const metadata: Metadata = {
    title: "Shrek",
    description: "Shrek"
}

export default function Page() {
    const image = env("SHREK_IMAGE")
    const audio = env("SHREK_AUDIO")

    return (
        <body>
            <Shrek imageUrl={image} audioUrl={audio} />
        </body>
    )
}
