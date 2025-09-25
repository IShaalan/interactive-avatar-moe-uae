import "@/styles/globals.css";
import { Metadata } from "next";
import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

import { Analytics } from "@vercel/analytics/next"

import NavBar from "@/components/NavBar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "EduSofx Interactive Avatar Demo",
    template: `EduSofx Interactive Avatar Demo`,
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} font-sans`}
      lang="en"
    >
      <head />
      <body className="min-h-screen bg-gradient-to-br from-[#EAEAEC] to-white">
        <main className="relative flex flex-col min-h-screen">
          <NavBar />
          <div className="flex-1">{children}</div>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
