import type { Metadata } from "next";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import LavaCanvas from "@/components/LavaCanvas";
config.autoAddCss = false

export const metadata: Metadata = {
  title: "Toby Meehan",
  description: "Interested in computer science, politics, rail and aviation; recently graduated in Computer Science from the University of York.",
};

export default function RootLayout({
  children,
  lead,
  projects,
  tools
}: Readonly<{
  children: React.ReactNode;
  lead: React.ReactNode;
  projects: React.ReactNode;
  tools: React.ReactNode;
}>) {
  return (
    <html lang="en" className="box-border">
      <body className={`antialiased`}>



        <div className="min-h-screen flex flex-col bg-dark-850 text-light">

          <LavaCanvas />

          <div className="container flex flex-col xl:max-w-7xl sm:mx-auto z-10">
            <div className="p-8 md:my-52 md:max-w-xl rounded-2xl bg-dark-850 bg-opacity-50">
              {lead}
            </div>

            <div className="px-8 pt-8 sm:rounded-t bg-dark-800 text-sm sm:text-base">

              <main className="flex-grow">
                {children}

                {projects}
                <hr className="border-none my-5" />
                {tools}
              </main>

              <footer>
                <hr className="border-dark-700 mt-5" />

                <div className="my-5 flex flex-col md:flex-row justify-center items-center">

                  <div>
                    &copy; {new Date().getFullYear()} Absolutely Nobody
                  </div>

                  <div className="hidden md:block h-6 border-r border-dark-700 mx-3"></div>

                  <div>
                    This page is licensed under GNU AGPLv3
                  </div>

                </div>
              </footer>

            </div>
          </div>

        </div>
      </body>
    </html>
  );
}
