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
            <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 border-b border-white/10">
              <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="font-semibold text-white flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#6ee7f8] to-[#a78bfa]" />
                  FS Refer
                </Link>
                <nav className="text-sm text-white/80 flex items-center gap-5">
                  <Link href="/" className="hover:text-white">Home</Link>
                  <Link href="/sort" className="hover:text-white">Sorter</Link>
                </nav>
              </div>
            </header>
            <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">{children}</main>
            <footer className="border-t border-white/10 text-xs text-white/50 py-6">
              <div className="max-w-4xl mx-auto px-4">© {new Date().getFullYear()} FS Refer</div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
