import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 py-20 sm:px-10">
        <p className="mb-3 font-mono text-sm tracking-wide text-amber-700 dark:text-amber-400">
          fretfact-ai
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Know the chord behind every shape
        </h1>
        <div className="mt-8 space-y-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          <p>
            FretFact AI is a guitar-theory assistant built for players who
            learn by ear and by hand. Type any six-string fingering—open
            chords, partial grips, or full barre voicings—and get clear chord
            names back in seconds.
          </p>
          <p>
            Stop guessing whether that grip is Am7, C6, or a slash chord.
            Connect fretboard patterns to harmony so you can transpose, write,
            and jam with confidence. Fast, focused, and made for real practice
            sessions—not textbook drills.
          </p>
        </div>
        <div className="mt-10">
          <Link
            href="/chords"
            className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-base font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Try the Chord-Finder
          </Link>
        </div>
      </main>
    </div>
  );
}
