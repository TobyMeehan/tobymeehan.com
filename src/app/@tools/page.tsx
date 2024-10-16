import Image from "next/image"
import Link from "next/link"
import { Url } from "next/dist/shared/lib/router/router"
import { ReactNode } from "react"

import csharp from "./csharp.png"
import java from "./java.png"
import python from "./python.png"
import typescript from "./typescript.png"
import html from "./html.png"
import css from "./css.png"
import javascript from "./javascript.png"

import dotnet from "./dotnet.png"
import blazor from "./blazor.png"
import react from "./react.png"
import nextjs from "./next.png"
import micronaut from "./micronaut.png"
import pytorch from "./pytorch.png"
import git from "./git.png"
import linux from "./linux.png"
import mysql from "./mysql.png"
import postgres from "./postgres.png"
import mongodb from "./mongodb.png"



export default function Tools() {
    return (
        <section>

            <h2 className="mb-3 text-center text-2xl font-semibold">Tools I&apos;ve Used</h2>

            <section>
                <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">

                    <ToolItem href="https://dotnet.microsoft.com/en-us/languages/csharp" title="C#">
                        <Image src={csharp} alt="C Sharp" className="w-full" />
                    </ToolItem>

                    <ToolItem href="https://www.java.com" title="Java">
                        <Image src={java} alt="Java" className="w-full" />
                    </ToolItem>

                    <ToolItem href="https://www.python.org" title="Python">
                        <Image src={python} alt="Python" className="w-full" />
                    </ToolItem>

                    <ToolItem href="https://www.typescriptlang.org" title="TypeScript">
                        <Image src={typescript} alt="TypeScript" className="w-full" />
                    </ToolItem>

                    <ToolItem title="HTML">
                        <Image src={html} alt="HTML" className="w-full" />
                    </ToolItem>

                    <ToolItem title="CSS">
                        <Image src={css} alt="CSS" className="w-full" />
                    </ToolItem>

                    <ToolItem title="JavaScript">
                        <Image src={javascript} alt="JavaScript" className="w-full" />
                    </ToolItem>

                </ul>
            </section>

            <hr className="border-dark-700 my-5" />

            <section>
                <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">

                    <ToolItem href="https://asp.net" title="ASP.NET Core">
                        <div className="rounded-full bg-bright p-1">
                            <Image src={dotnet} alt="ASP.NET Core" className="w-full" />
                        </div>
                    </ToolItem>

                    <ToolItem href="https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor" title="Blazor">
                        <Image src={blazor} alt="Blazor" className="w-full" />
                    </ToolItem>

                    <ToolItem href="https://react.dev" title="React">
                        <Image src={react} alt="React" className="w-full" />
                    </ToolItem>

                    <ToolItem href="https://nextjs.org" title="Next.js">
                        <div className="rounded-full bg-bright p-1">
                            <Image src={nextjs} alt="Next.js" className="w-full" />
                        </div>
                    </ToolItem>

                    <ToolItem href="https://micronaut.io" title="Micronaut">
                        <Image src={micronaut} alt="Micronaut" className="w-full" />
                    </ToolItem>

                    <ToolItem href="https://pytorch.org" title="PyTorch">
                        <Image src={pytorch} alt="PyTorch" className="w-full" />
                    </ToolItem>

                    <ToolItem href="https://git-scm.com" title="Git">
                        <Image src={git} alt="Git" className="w-full" />
                    </ToolItem>

                    <ToolItem href="https://www.linux.org" title="Linux">
                        <Image src={linux} alt="Linux" className="w-full" />
                    </ToolItem>

                    <ToolItem href="https://www.mysql.com" title="MySql">
                        <Image src={mysql} alt="MySql" className="w-full" />
                    </ToolItem>

                    <ToolItem href="https://www.postgresql.org" title="PostgreSQL">
                        <Image src={postgres} alt="Postgres" className="w-full" />
                    </ToolItem>

                    <ToolItem href="https://www.mongodb.com" title="MongoDB">
                        <Image src={mongodb} alt="MongoDB" className="w-full" />
                    </ToolItem>

                </ul>
            </section>
            
        </section>
    )
}

function ToolItem({ href, title, children }: { href?: Url, title: string, children: ReactNode }) {
    return (
        <li>
            {
                href ? <Link href={href} className="group h-full p-3 flex flex-col justify-between items-center gap-2">
                    <div className="mt-auto">
                        {children}
                    </div>

                    <div className="transition text-link group-hover:text-link-hover group-hover:underline">
                        {title}
                    </div>
                </Link>
                : <div className="h-full p-3 flex flex-col justify-between items-center gap-2">
                    <div className="mt-auto">
                        {children}
                    </div>

                    {title}
                </div>
            }

        </li>
    )
}