import { faDiscord, faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { ReactNode } from "react";

export default function Lead() {
    return (
        <section className="text-center sm:text-left">
            <h1 className="font-extralight text-3xl">Toby Meehan</h1>
            <p className="text-xl font-light my-2">Hi! It&apos;s me, I&apos;m Toby.</p>
            <p>
                Interested in computer science, politics, rail and aviation;
                recently graduated in Computer Science from the University of York.
            </p>
            <ul className="flex flex-row justify-center mt-4 text-4xl text-gray-800 dark:text-bright">
                <li>
                    <SocialLink href="https://www.linkedin.com/in/toby-meehan/" label="LinkedIn">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </SocialLink>
                </li>
                <li>
                    <SocialLink href="https://github.com/TobyMeehan" label="GitHub">
                        <FontAwesomeIcon icon={faGithub} />
                    </SocialLink>
                </li>
                <li>
                    <SocialLink href="mailto:contact@tobymeehan.com" label="Email">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </SocialLink>
                </li>
                <li>
                    <SocialLink href="https://www.instagram.com/toby.meehan/" label="Instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                    </SocialLink>
                </li>
                <li>
                    <SocialLink href="https://discord.com/users/253552918030974977" label="Discord">
                        <FontAwesomeIcon icon={faDiscord} />
                    </SocialLink>
                </li>
            </ul>
        </section>
    )
}

function SocialLink({ children, href, label }: { children: ReactNode, href: Url, label: string }) {
    return (
        <Link className="flex w-14 h-14 justify-center items-center rounded transition
        hover:bg-gray-400 hover:bg-opacity-60 hover:text-gray-700 
        dark:hover:bg-dark-900 dark:hover:bg-opacity-60 dark:hover:text-light" href={href} aria-label={label}>
            {children}
        </Link>
    )
}