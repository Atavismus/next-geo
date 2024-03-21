import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Link from "next/link";
import { HomeIcon } from '@/app/components/server/HomeIcon';

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
          <Link href="/" id="homesweethome" className="absolute top-7 left-7"><HomeIcon /></Link>
          <Link href="/funwith/list" id="listIcon" className="absolute top-7 right-7"><span></span><span></span><span></span><span></span></Link>
          <header className="mt-10">
            <h1 className="text-center marker text-blue-600 text-5xl font-black small-caps"><Link href="/" className="cursor-pointer"><span className="uppercase text-red-600">Fun</span> with <span id="geo">Geo</span></Link></h1>
          </header>

          <main className="flex min-h-screen flex-col items-center">
            {children}
          </main>

          <footer className="p-5">
            <p className="text-center">Copyleft 2024 - Made with <a href="https://nextjs.org/" target="_blank" className="text-blue-600 cursor-pointer">next.js</a> and <a href="https://countryapi.io/" target="_blank" className="text-blue-600 cursor-pointer">countryapi.io</a></p>
          </footer>
        </div>
      </body>
    </html>
  );
}
