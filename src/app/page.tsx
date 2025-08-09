"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import CsvUploader from "@/components/CsvUploader";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Refer exceptional people</h1>
        <p className="text-sm text-white/70 max-w-prose">Sign in with LinkedIn, upload your connections CSV, then sort with a simple left/right UI. Download an Excel of your yes list.</p>
      </div>

      <div className="flex items-center gap-3">
        {!session ? (
          <button
            onClick={() => signIn("linkedin")}
            className="button-primary"
          >
            Continue with LinkedIn
          </button>
        ) : (
          <>
            <div className="text-sm text-white/80">Signed in as {session.user?.name ?? session.user?.email}</div>
            <button onClick={() => signOut()} className="button-secondary">Sign out</button>
          </>
        )}
      </div>

      <div className="card p-5">
        <CsvUploader />
      </div>

      <div>
        <Link href="/sort" className="button-primary">Start Sorting</Link>
      </div>

      <div className="text-xs text-white/60 max-w-prose">
        Note: LinkedIn’s public API does not provide direct access to your connections unless you have special partner permissions. This app uses LinkedIn only for sign-in. To load contacts, export your connections from LinkedIn and upload the CSV here.
      </div>
    </div>
  );
}
