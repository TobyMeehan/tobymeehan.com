import Shrek from "./Shrek";

export default function Page() {

    return (
        <body>
            <Shrek imageUrl={process.env.SHREK_IMAGE} audioUrl={process.env.SHREK_AUDIO} />
        </body>
    )

}