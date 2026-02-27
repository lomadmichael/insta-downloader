import type { ExtractedPost } from "@/types/instagram";
import { parseInstagramUrl } from "./url-parser";
import { fetchFromGraphQL, transformGraphQLResponse } from "./instagram-graphql";

export async function extractInstagramMedia(
  url: string
): Promise<ExtractedPost> {
  const { shortcode } = parseInstagramUrl(url);

  try {
    const result = await fetchFromGraphQL(shortcode);
    if (result) {
      return transformGraphQLResponse(result);
    }
    throw new Error(
      "게시물을 찾을 수 없습니다. 비공개 계정이거나 삭제된 게시물입니다."
    );
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
}
