export type MediaType = "image" | "video" | "carousel";

export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  videoUrl?: string;
}

export interface ExtractedPost {
  shortcode: string;
  type: MediaType;
  caption?: string;
  ownerUsername?: string;
  ownerProfilePic?: string;
  timestamp?: number;
  media: MediaItem[];
}

export interface ExtractResponse {
  success: boolean;
  data?: ExtractedPost;
  error?: string;
}

export interface IGShortcodeMedia {
  __typename: string;
  shortcode: string;
  dimensions: { width: number; height: number };
  display_url: string;
  display_resources?: Array<{
    src: string;
    config_width: number;
    config_height: number;
  }>;
  is_video: boolean;
  video_url?: string;
  edge_media_to_caption?: {
    edges: Array<{ node: { text: string } }>;
  };
  edge_sidecar_to_children?: {
    edges: Array<{ node: IGShortcodeMedia }>;
  };
  owner?: {
    username: string;
    profile_pic_url: string;
  };
  taken_at_timestamp?: number;
  thumbnail_src?: string;
}
