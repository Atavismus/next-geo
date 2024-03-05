import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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

        <header className="p-5">
          <h1 className="text-center">Next-geo: have fun with flags (and more)!</h1>
        </header>

        <main className="flex min-h-screen flex-col items-center">
          {children}
        </main>

        <footer className="p-5">
          <p className="text-center">Copyleft 2024 - Made with next.js and countryapi.io</p>
        </footer>
      </body>
    </html>
  );
}
