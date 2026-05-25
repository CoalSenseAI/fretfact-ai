import { ChordNotFoundError, lookupChord } from "@/lib/chords";
import { describe, expect, it } from "vitest";

describe("lookupChord", () => {
  it("returns fingerings for a known chord", () => {
    const result = lookupChord("c");
    expect(result.fingerings).toHaveLength(2);
    expect(result.fingerings[0].frets).toEqual([0, 1, 0, 2, 3, -1]);
  });

  it("throws 404 for unknown chord", () => {
    expect(() => lookupChord("Cmaj7")).toThrow(ChordNotFoundError);

    try {
      lookupChord("Cmaj7");
    } catch (err) {
      expect(err).toBeInstanceOf(ChordNotFoundError);
      expect((err as ChordNotFoundError).status).toBe(404);
      return;
    }

    expect.fail("lookupChord should throw for unknown chords");
  });
});
