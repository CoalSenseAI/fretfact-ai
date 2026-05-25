export type Fingering = { frets: number[] };

export type ChordLookupResult = { fingerings: Fingering[] };

/** Frets per string: high e → low E. Use -1 for muted (x). */
const CHORDS: Record<string, Fingering[]> = {
  C: [{ frets: [0, 1, 0, 2, 3, -1] }, { frets: [3, 5, 5, 5, 3, -1] }],
  G: [{ frets: [3, 0, 0, 0, 2, 3] }, { frets: [3, 0, 0, 0, 0, 3] }],
  D: [{ frets: [2, 3, 2, 0, -1, -1] }, { frets: [2, 3, 2, 4, -1, -1] }],
  A: [{ frets: [0, 2, 2, 2, 0, -1] }, { frets: [0, 3, 2, 2, 0, -1] }],
  E: [{ frets: [0, 0, 1, 2, 2, 0] }, { frets: [0, 2, 0, 1, 2, 0] }],
};

const SUPPORTED = new Set(Object.keys(CHORDS));

export class ChordNotFoundError extends Error {
  readonly status = 404;

  constructor(name: string) {
    super(
      `Chord "${name}" not found. Try C, G, D, A, or E.`,
    );
    this.name = "ChordNotFoundError";
  }
}

export function lookupChord(name: string): ChordLookupResult {
  const trimmed = name.trim();
  const key = trimmed.toUpperCase();
  if (!SUPPORTED.has(key)) {
    throw new ChordNotFoundError(trimmed || name);
  }
  return { fingerings: CHORDS[key] };
}

const STRING_LABELS = ["e", "B", "G", "D", "A", "E"] as const;

export function formatFret(fret: number): string {
  return fret < 0 ? "x" : String(fret);
}

export function fingeringToDiagram(frets: number[]): string[] {
  return STRING_LABELS.map(
    (label, i) => `${label}|--${formatFret(frets[i] ?? -1)}--`,
  );
}
