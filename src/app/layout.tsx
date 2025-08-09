import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FS Refer",
  description: "Sort your LinkedIn contacts for referrals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-black/10 dark:border-white/15">
              <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="font-semibold">FS Refer</Link>
                <nav className="text-sm text-black/60 dark:text-white/70">
                  <Link href="/sort">Sorter</Link>
                </nav>
              </div>
            </header>
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
