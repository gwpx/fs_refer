"use client";

import Papa from "papaparse";
import { useState } from "react";
import { Person } from "@/lib/types";

function normalizePerson(row: Record<string, string>): Person | null {
  const name = row["Name"] || row["Full Name"] || row["First Name"] && row["Last Name"] ? `${row["First Name"] ?? ""} ${row["Last Name"] ?? ""}`.trim() : "";
  if (!name) return null;
  const title = row["Title"] || row["Position"] || row["Job Title"] || "";
  const company = row["Company"] || row["Company Name"] || row["Organization"] || "";
  const headline = row["Headline"] || row["Summary"] || "";
  const url = row["URL"] || row["Profile URL"] || row["Public Profile Url"] || "";
  return {
    id: `${name}-${url || Math.random().toString(36).slice(2)}`,
    name,
    title: title || null,
    company: company || null,
    headline: headline || null,
    url: url || null,
  };
}

export default function CsvUploader({ onLoaded }: { onLoaded?: (people: Person[]) => void }) {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File) {
    setError(null);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as Record<string, string>[];
        const people = rows
          .map(normalizePerson)
          .filter((p): p is Person => Boolean(p));
        if (!people.length) {
          setError("No contacts found in the CSV.");
          return;
        }
        try {
          localStorage.setItem("contacts", JSON.stringify(people));
        } catch (e) {
          // ignore storage errors
        }
        setCount(people.length);
        onLoaded?.(people);
      },
      error: (err) => {
        setError(err.message);
      },
    });
  }

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-sm font-medium">Upload CSV of your LinkedIn connections</span>
        <input
          type="file"
          accept=".csv,text/csv"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
          className="mt-2 block w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-black/90 file:text-white hover:file:bg-black"
        />
      </label>
      {count !== null && (
        <p className="text-sm text-emerald-700 dark:text-emerald-400">Loaded {count} contacts.</p>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
