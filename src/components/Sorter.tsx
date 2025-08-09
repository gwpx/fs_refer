"use client";

import { useEffect, useMemo, useState } from "react";
import { Person } from "@/lib/types";
import { exportPeopleToExcel } from "@/lib/exportExcel";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";

function useContacts(): Person[] {
  return useMemo(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("contacts");
      if (!raw) return [];
      const parsed = JSON.parse(raw) as Person[];
      return parsed;
    } catch {
      return [];
    }
  }, []);
}

export default function Sorter() {
  const contacts = useContacts();
  const [index, setIndex] = useState(0);
  const [yesList, setYesList] = useState<Person[]>([]);
  const [noList, setNoList] = useState<Person[]>([]);

  const current = contacts[index];
  const finished = index >= contacts.length;

  function chooseYes() {
    if (!current) return;
    setYesList((l) => [...l, current]);
    setIndex((i) => i + 1);
  }

  function chooseNo() {
    if (!current) return;
    setNoList((l) => [...l, current]);
    setIndex((i) => i + 1);
  }

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        chooseYes();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        chooseNo();
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, current]);

  if (!contacts.length) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">No contacts loaded</h2>
        <p className="text-sm text-white/70">Go back and upload a CSV of your connections.</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Done</h2>
        <p className="text-sm text-white/80">You marked {yesList.length} as exceptional out of {contacts.length}.</p>
        <button
          onClick={() => exportPeopleToExcel(yesList)}
          className="button-primary"
        >
          <Download size={18} /> Download Excel
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Is this person exceptional?</h1>
      </div>

      <div className="mx-auto max-w-xl w-full p-6 card">
        <div className="space-y-2">
          <div className="text-lg font-semibold">{current.name}</div>
          {current.title || current.company ? (
            <div className="text-sm text-white/70">{[current.title, current.company].filter(Boolean).join(" • ")}</div>
          ) : null}
          {current.headline ? (
            <div className="text-sm text-white/70">{current.headline}</div>
          ) : null}
          {current.url ? (
            <a className="text-sm text-white/80 underline decoration-white/30 hover:decoration-white" href={current.url} target="_blank" rel="noreferrer">View profile</a>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={chooseNo}
          className="button-secondary"
        >
          <ArrowLeft size={18} /> No
        </button>
        <button
          onClick={chooseYes}
          className="button-primary"
        >
          Yes <ArrowRight size={18} />
        </button>
      </div>

      <div className="text-center text-xs text-white/60">Use Left/Right arrow keys</div>

      <div className="text-center text-xs text-white/60">{index + 1} / {contacts.length}</div>
    </div>
  );
}
