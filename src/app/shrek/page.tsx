import Shrek from "./Shrek";

export default function Page() {

    return (
        <Shrek imageUrl={process.env.SHREK_IMAGE} audioUrl={process.env.SHREK_AUDIO} />
    )

}