"use client";

import { useState } from "react";
import type { MediaItem } from "@/types/instagram";
import { getProxyUrl } from "@/lib/proxy-url";

interface MediaCardProps {
  item: MediaItem;
  index: number;
  total: number;
  shortcode: string;
}

export default function MediaCard({ item, index, total, shortcode }: MediaCardProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const mediaUrl = item.videoUrl || item.url;
      const filename = `instagram_${shortcode}_${index + 1}`;
      const downloadUrl = `/api/download?url=${encodeURIComponent(mediaUrl)}&filename=${encodeURIComponent(filename)}`;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => setDownloading(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square bg-gray-100">
        {item.type === "video" ? (
          <video
            src={item.videoUrl ? getProxyUrl(item.videoUrl) : undefined}
            poster={getProxyUrl(item.thumbnailUrl)}
            controls
            className="w-full h-full object-cover"
            preload="metadata"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getProxyUrl(item.thumbnailUrl)}
            alt={`미디어 ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}

        {/* Type badge */}
        <span
          className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-medium text-white ${
            item.type === "video" ? "bg-red-500" : "bg-blue-500"
          }`}
        >
          {item.type === "video" ? "영상" : "사진"}
        </span>

        {/* Index badge for carousel */}
        {total > 1 && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-xs font-medium bg-black/60 text-white">
            {index + 1}/{total}
          </span>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>
            {item.width} x {item.height}
          </span>
          <span>{item.type === "video" ? "MP4" : "JPG"}</span>
        </div>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {downloading ? "다운로드 중..." : "다운로드"}
        </button>
      </div>
    </div>
  );
}
