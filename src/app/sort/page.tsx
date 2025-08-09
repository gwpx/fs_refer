"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Sorter from "@/components/Sorter";

export default function SortPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading…</div>;
  }

  if (!session) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-white/70">Sign in with LinkedIn to start sorting your connections.</p>
        <button
          onClick={() => signIn("linkedin")}
          className="button-primary"
        >
          Continue with LinkedIn
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-white/80">Signed in as {session.user?.name ?? session.user?.email}</div>
        <button onClick={() => signOut()} className="button-secondary">Sign out</button>
      </div>
      <Sorter />
    </div>
  );
}
