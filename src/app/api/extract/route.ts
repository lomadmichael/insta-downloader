import { NextResponse } from "next/server";
import { extractInstagramMedia } from "@/lib/instagram";

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, error: "URL_REQUIRED" },
        { status: 400 }
      );
    }

    const data = await extractInstagramMedia(url);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "UNKNOWN_ERROR";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
