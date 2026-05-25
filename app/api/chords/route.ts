import { ChordNotFoundError, lookupChord } from "@/lib/chords";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const name = new URL(request.url).searchParams.get("name");

  if (!name?.trim()) {
    return NextResponse.json(
      { error: "Missing chord name. Use ?name=C" },
      { status: 400 },
    );
  }

  try {
    return NextResponse.json(lookupChord(name));
  } catch (err) {
    if (err instanceof ChordNotFoundError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    throw err;
  }
}
