import type { Metadata } from "next";

import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
config.autoAddCss = false

export const metadata: Metadata = {
  title: "Toby Meehan",
  description: "Interested in computer science, politics, rail and aviation; recently graduated in Computer Science from the University of York.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="box-border">

        {children}

    </html>
  );
}
