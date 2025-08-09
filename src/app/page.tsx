"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import CsvUploader from "@/components/CsvUploader";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Refer exceptional people</h1>
        <p className="text-sm text-black/70 dark:text-white/70">Sign in with LinkedIn, upload your connections CSV, then sort with a simple left/right UI. Download an Excel of your yes list.</p>
      </div>

      <div className="flex items-center gap-3">
        {!session ? (
          <button
            onClick={() => signIn("linkedin")}
            className="inline-flex items-center gap-2 rounded-md bg-[#0a66c2] text-white px-4 py-2 hover:opacity-90"
          >
            Continue with LinkedIn
          </button>
        ) : (
          <>
            <div className="text-sm">Signed in as {session.user?.name ?? session.user?.email}</div>
            <button onClick={() => signOut()} className="text-sm underline">Sign out</button>
          </>
        )}
      </div>

      <CsvUploader />

      <div>
        <Link href="/sort" className="inline-flex items-center gap-2 rounded-md bg-black text-white px-4 py-2 hover:bg-black/80">Start Sorting</Link>
      </div>

      <div className="text-xs text-black/60 dark:text-white/60 max-w-prose">
        Note: LinkedIn’s public API does not provide direct access to your connections unless you have special partner permissions. This app uses LinkedIn only for sign-in. To load contacts, export your connections from LinkedIn and upload the CSV here.
      </div>
    </div>
  );
}
