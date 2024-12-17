import GitHubButton from "../GitHubButton";
import SiteButton from "../SiteButton";
import Image from "next/image";

import cloud from "./cloud.svg"
import bot from "./bot.svg"

export default function Projects() {
    return (
        <section>

            <h2 className="mb-3 text-center text-2xl font-semibold">Things I&apos;ve Done</h2>

            <ul>

                <li className="mb-10">
                    <h3 className="text-xl font-bold mb-0.5">Currently Working On...</h3>
                    Custom OpenID Connect authentication provider and expanded REST API for use with other projects.
                    <div className="flex flex-row mt-3">
                        <GitHubButton href="https://github.com/Thavyra/api" />
                    </div>
                </li>

                <li className="flex mb-10">
                    <div className="shrink-0">
                        <Image src={cloud} alt="API Logo" />
                    </div>
                    <div className="grow ms-3">
                        REST API secured by handmade OAuth 2.0 implementation for user management and scoreboard tracking.
                        <div className="flex flex-row mt-3">
                            <GitHubButton href="https://github.com/TobyMeehan/Website/tree/master/TobyMeehan.Com.Api" />
                        </div>
                    </div>
                </li>

                <li className="mb-10">
                    <h3 className="text-xl font-bold mb-0.5">Downloads</h3>
                    Full stack file hosting web application.
                    <div className="flex flex-col sm:flex-row gap-3 mt-3">
                        <GitHubButton href="https://github.com/TobyMeehan/Website" />
                        <SiteButton href="/downloads" />
                    </div>
                </li>

                <li className="flex mb-10">
                    <div className="shrink-0">
                        <Image src={bot} alt="Oxide Logo" />
                    </div>
                    <div className="grow ms-3">
                        <h3 className="text-xl font-bold mb-0.5">Oxide</h3>
                        Discord music bot with track queue, saveable playlists and audio effects.
                        <div className="flex flex-col sm:flex-row gap-3 mt-3">
                            <GitHubButton href="https://github.com/TobyMeehan/TobysBot" />
                            <SiteButton href="https://bot.tobymeehan.com" />
                        </div>
                    </div>
                </li>

                <li>
                    <h3 className="text-xl font-bold mb-0.5">Final Year Project</h3>
                    Intrusion Detection System source code auto-generated using a Domain Specific Language for modelling security concerns.
                    <div className="flex flex-row mt-3">
                        <GitHubButton href="https://github.com/TobyMeehan/GeneratedIds" />
                    </div>
                </li>

            </ul>

        </section>
    )
}
