import { NextRequest, NextResponse } from "next/server";
import { ALLOWED_CDN_HOSTS } from "@/lib/constants";

export const runtime = "nodejs";
export const preferredRegion = "icn1";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL이 필요합니다." }, { status: 400 });
  }

  try {
    const parsed = new URL(url);
    const isAllowed = ALLOWED_CDN_HOSTS.some((host) =>
      parsed.hostname.endsWith(host)
    );

    if (!isAllowed) {
      return NextResponse.json(
        { error: "허용되지 않는 URL입니다." },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!response.ok) {
      return new NextResponse(null, { status: 502 });
    }

    const contentType =
      response.headers.get("content-type") || "image/jpeg";
    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
