import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next-Geo",
  description: "Did someone said \"Fun with flags\"?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="whiteboard">
          <header className="pt-10">
            <Link href="/"><h1 className="text-center marker text-blue-600 text-5xl font-black small-caps cursor-pointer"><span className="uppercase text-red-600">Fun</span> with GEO</h1></Link>
          </header>

          <main className="flex min-h-screen flex-col items-center">
            {children}
          </main>

          <footer className="p-5">
            <p className="text-center">Copyleft 2024 - Made with <a href="https://nextjs.org/" target="blank" className="text-blue-600 cursor-pointer">next.js</a> and <a href="https://countryapi.io/" target="blank" className="text-blue-600 cursor-pointer">countryapi.io</a></p>
          </footer>
        </div>
      </body>
    </html>
  );
}
