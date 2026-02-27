const INSTAGRAM_URL_REGEX =
  /instagram\.com\/(?:[A-Za-z0-9_.]+\/)?(p|reels?|tv)\/([A-Za-z0-9_-]+)/;

export interface ParsedInstagramUrl {
  type: "post" | "reel";
  shortcode: string;
}

export function parseInstagramUrl(url: string): ParsedInstagramUrl {
  if (!url || typeof url !== "string") {
    throw new Error("올바른 인스타그램 URL을 입력해주세요.");
  }

  const trimmed = url.trim();

  if (!trimmed.includes("instagram.com")) {
    throw new Error("올바른 인스타그램 URL을 입력해주세요.");
  }

  const match = trimmed.match(INSTAGRAM_URL_REGEX);
  if (!match) {
    throw new Error(
      "올바른 인스타그램 게시물 또는 릴스 URL을 입력해주세요."
    );
  }

  const [, typeStr, shortcode] = match;
  const type = typeStr === "p" || typeStr === "tv" ? "post" : "reel";

  return { type, shortcode };
}

export function isValidInstagramUrl(url: string): boolean {
  try {
    parseInstagramUrl(url);
    return true;
  } catch {
    return false;
  }
}
