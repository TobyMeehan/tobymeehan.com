import { faDiscord, faGithub, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Lead() {
    return (
        <section className="text-center sm:text-left">
            <h1 className="font-extralight text-3xl">Toby Meehan</h1>
            <p className="text-xl font-light my-2">Hi! It&apos;s me, I&apos;m Toby.</p>
            <p>
                Interested in computer science, politics, rail and aviation;
                recently graduated in Computer Science from the University of York.
            </p>
            <ul className="flex flex-row justify-center gap-3 mt-4 text-4xl text-gray-800 dark:text-bright">
                <li>
                    <Link className="hover:text-gray-700 dark:hover:text-light transition" href="https://www.linkedin.com/in/toby-meehan/" aria-label="LinkedIn">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </Link>
                </li>
                <li>
                    <Link className="hover:text-gray-700 dark:hover:text-light transition" href="https://github.com/TobyMeehan" aria-label="GitHub">
                        <FontAwesomeIcon icon={faGithub} />
                    </Link>
                </li>
                <li>
                    <Link className="hover:text-gray-700 dark:hover:text-light transition" href="mailto:contact@tobymeehan.com" aria-label="Email">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </Link>
                </li>
                <li>
                    <Link className="hover:text-gray-700 dark:hover:text-light transition" href="https://www.instagram.com/toby.meehan/" aria-label="Instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                </li>
                <li>
                    <Link className="hover:text-gray-700 dark:hover:text-light transition" href="https://discord.com/users/253552918030974977" aria-label="Discord">
                        <FontAwesomeIcon icon={faDiscord} />
                    </Link>
                </li>
            </ul>
        </section>
    )
}