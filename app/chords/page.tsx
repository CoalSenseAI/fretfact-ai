"use client";

import {
  type Fingering,
  fingeringToDiagram,
} from "@/lib/chords";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function FingeringDiagram({ frets }: Fingering) {
  const lines = fingeringToDiagram(frets);
  return (
    <pre className="font-mono text-sm leading-snug text-zinc-800 dark:text-zinc-200">
      {lines.join("\n")}
    </pre>
  );
}

export default function ChordsPage() {
  const [query, setQuery] = useState("");
  const [fingerings, setFingerings] = useState<Fingering[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (fingerings.length > 0) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [fingerings]);

  async function handleFind(e: FormEvent) {
    e.preventDefault();
    const name = query.trim();
    if (!name) {
      setFingerings([]);
      setMessage("Enter a chord name (e.g. C, G, D).");
      return;
    }

    setLoading(true);
    setMessage(null);
    setFingerings([]);

    try {
      const res = await fetch(
        `/api/chords?name=${encodeURIComponent(name)}`,
      );
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error ?? "Chord not found.");
        return;
      }

      setFingerings(data.fingerings ?? []);
      if (!data.fingerings?.length) {
        setMessage("No fingerings returned for that chord.");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 sm:px-10">
        <Link
          href="/"
          className="text-sm font-medium text-amber-700 hover:underline dark:text-amber-400"
        >
          ← Home
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          Chord finder
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Enter a chord name to see fingerings. Supported: C, G, D, A, E.
        </p>

        <form onSubmit={handleFind} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="chord-name">
            Chord name
          </label>
          <input
            id="chord-name"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Cmaj7"
            className="h-11 flex-1 rounded-lg border border-zinc-300 bg-white px-4 font-sans text-base outline-none ring-amber-600/0 transition focus:border-amber-600 focus:ring-2 focus:ring-amber-600/30 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {loading && <Spinner />}
            {loading ? "Finding…" : "Find"}
          </button>
        </form>

        {message && (
          <p
            role="status"
            className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200"
          >
            {message}
          </p>
        )}

        {fingerings.length > 0 && (
          <section
            ref={resultsRef}
            className="mt-10 scroll-mt-8"
            aria-label="Fingerings"
          >
            <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {fingerings.length} fingering{fingerings.length !== 1 ? "s" : ""}
            </h2>
            <ul className="mt-4 grid gap-6 sm:grid-cols-2">
              {fingerings.map((fingering, i) => (
                <li
                  key={i}
                  className="w-full max-w-[12rem] rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <FingeringDiagram {...fingering} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
