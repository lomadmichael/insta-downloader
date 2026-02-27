import type { IGShortcodeMedia, ExtractedPost, MediaItem } from "@/types/instagram";
import {
  INSTAGRAM_GRAPHQL_ENDPOINT,
  INSTAGRAM_DOC_ID,
  INSTAGRAM_LSD,
  INSTAGRAM_APP_ID,
  INSTAGRAM_ASBD_ID,
  USER_AGENT,
} from "./constants";

export async function fetchFromGraphQL(
  shortcode: string
): Promise<IGShortcodeMedia | null> {
  const params = new URLSearchParams({
    variables: JSON.stringify({ shortcode }),
    doc_id: INSTAGRAM_DOC_ID,
    lsd: INSTAGRAM_LSD,
  });

  const response = await fetch(INSTAGRAM_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "User-Agent": USER_AGENT,
      "Content-Type": "application/x-www-form-urlencoded",
      "X-IG-App-ID": INSTAGRAM_APP_ID,
      "X-FB-LSD": INSTAGRAM_LSD,
      "X-ASBD-ID": INSTAGRAM_ASBD_ID,
      "Sec-Fetch-Site": "same-origin",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
    }
    throw new Error(`Instagram API 오류: ${response.status}`);
  }

  const json = await response.json();
  return json?.data?.xdt_shortcode_media ?? null;
}

export function transformGraphQLResponse(
  media: IGShortcodeMedia
): ExtractedPost {
  const caption =
    media.edge_media_to_caption?.edges?.[0]?.node?.text ?? undefined;
  const ownerUsername = media.owner?.username;
  const ownerProfilePic = media.owner?.profile_pic_url;
  const timestamp = media.taken_at_timestamp;

  const typeName = media.__typename;

  if (
    typeName === "XDTGraphSidecar" &&
    media.edge_sidecar_to_children?.edges
  ) {
    const items: MediaItem[] = media.edge_sidecar_to_children.edges.map(
      (edge, index) => {
        const node = edge.node;
        return mapNodeToMediaItem(node, index);
      }
    );

    return {
      shortcode: media.shortcode,
      type: "carousel",
      caption,
      ownerUsername,
      ownerProfilePic,
      timestamp,
      media: items,
    };
  }

  const item = mapNodeToMediaItem(media, 0);

  return {
    shortcode: media.shortcode,
    type: media.is_video ? "video" : "image",
    caption,
    ownerUsername,
    ownerProfilePic,
    timestamp,
    media: [item],
  };
}

function mapNodeToMediaItem(node: IGShortcodeMedia, index: number): MediaItem {
  const bestResource = node.display_resources
    ? node.display_resources.reduce((best, curr) =>
        curr.config_width > best.config_width ? curr : best
      )
    : null;

  return {
    id: `${node.shortcode}_${index}`,
    type: node.is_video ? "video" : "image",
    url: bestResource?.src ?? node.display_url,
    thumbnailUrl: node.thumbnail_src ?? node.display_url,
    width: node.dimensions.width,
    height: node.dimensions.height,
    videoUrl: node.video_url,
  };
}
