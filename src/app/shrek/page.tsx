import { Metadata } from "next";
import Shrek from "./Shrek";

export const metadata: Metadata = {
    title: "Shrek",
    description: "Shrek"
}

export default function Page() {

    return (
        <body>
            <Shrek imageUrl={process.env.SHREK_IMAGE} audioUrl={process.env.SHREK_AUDIO} />
        </body>
    )

}