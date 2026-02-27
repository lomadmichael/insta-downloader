import { NextRequest, NextResponse } from "next/server";
import { ALLOWED_CDN_HOSTS } from "@/lib/constants";

export const maxDuration = 30;

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const filename = request.nextUrl.searchParams.get("filename") || "instagram-media";

  if (!url) {
    return NextResponse.json(
      { error: "URL 파라미터가 필요합니다." },
      { status: 400 }
    );
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

    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: "다운로드에 실패했습니다." },
        { status: 502 }
      );
    }

    const contentType =
      response.headers.get("content-type") || "application/octet-stream";
    const buffer = await response.arrayBuffer();

    const ext = contentType.includes("video") ? ".mp4" : ".jpg";
    const fullFilename = filename.includes(".") ? filename : `${filename}${ext}`;

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fullFilename}"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "다운로드 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
