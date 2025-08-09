"use client";

import Link from "next/link";
import CsvUploader from "@/components/CsvUploader";

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Refer exceptional people</h1>
        <p className="text-sm text-white/70 max-w-prose">Upload your LinkedIn connections CSV, then sort with a simple left/right UI. Download an Excel of your yes list.</p>
      </div>

      <div className="card p-5">
        <CsvUploader />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">How to export your LinkedIn connections CSV</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-white/80 max-w-prose">
          <li>On LinkedIn (desktop): Me → Settings & Privacy → Data privacy → Get a copy of your data</li>
          <li>Select <span className="font-medium">Download larger data archive</span> (includes connections, contacts, history, etc.)</li>
          <li>Click <span className="font-medium">Request archive</span> and re-enter your password</li>
          <li>Wait ~24 hours for LinkedIn’s email, then download and unzip the file</li>
          <li>Inside the archive, open the <span className="font-medium">Connections.csv</span> file and upload it here</li>
        </ol>
      </div>

      <div>
        <Link href="/sort" className="button-primary">Start Sorting</Link>
      </div>
    </div>
  );
}
