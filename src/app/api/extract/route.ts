import { NextResponse } from "next/server";
import { extractInstagramMedia } from "@/lib/instagram";

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { success: false, error: "URL을 입력해주세요." },
        { status: 400 }
      );
    }

    const data = await extractInstagramMedia(url);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
