import { Download } from "@/models/Download";
import Link from "next/link";
import Markdown from "react-markdown"

export interface DescriptionViewProps {
    download: Download
}

export default function DescriptionView({ download }: DescriptionViewProps) {
    return (
        <Markdown components={{
            h1(props) {
                const { children } = props
                return <h1 className="text-3xl mb-3">{children}</h1>
            },
            h2(props) {
                const { children } = props
                return <h2 className="text-2xl mb-3">{children}</h2>
            },
            h3(props) {
                const { children } = props
                return <h3 className="text-xl mb-3">{children}</h3>
            },
            h4(props) {
                const { children } = props
                return <h4 className="text-lg mb-3">{children}</h4>
            },
            h5(props) {
                const { children } = props
                return <h5 className="font-extrabold mb-3">{children}</h5>
            },
            h6(props) {
                const { children } = props
                return <h6 className="font-bold mb-3">{children}</h6>
            },
            p(props) {
                const { children } = props
                return <p className="mb-3">{children}</p>
            },
            a(props) {
                const { children, href } = props

                return (
                    <Link href={href!}
                        className="text-link hover:text-link-hover hover:underline transition">{children}
                    </Link>
                )
            },
            ul(props) {
                const { children } = props
                return (
                    <ul className="list-disc ml-8 mb-3">
                        {children}
                    </ul>
                )
            }
        }}>
            {download.description}
        </Markdown>
    )
}
