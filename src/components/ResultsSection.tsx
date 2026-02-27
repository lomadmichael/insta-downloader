"use client";

import type { ExtractedPost } from "@/types/instagram";
import MediaCard from "./MediaCard";
import { getProxyUrl } from "@/lib/proxy-url";
import { useDictionary } from "@/i18n/use-dictionary";

interface ResultsSectionProps {
  result: ExtractedPost;
}

export default function ResultsSection({ result }: ResultsSectionProps) {
  const dict = useDictionary();

  const handleDownloadAll = () => {
    result.media.forEach((item, index) => {
      setTimeout(() => {
        const mediaUrl = item.videoUrl || item.url;
        const filename = `instagram_${result.shortcode}_${index + 1}`;
        const downloadUrl = `/api/download?url=${encodeURIComponent(mediaUrl)}&filename=${encodeURIComponent(filename)}`;
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 500);
    });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      {/* Post info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {result.ownerProfilePic && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={getProxyUrl(result.ownerProfilePic)}
              alt={result.ownerUsername || ""}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div>
            {result.ownerUsername && (
              <p className="font-semibold text-gray-900">
                @{result.ownerUsername}
              </p>
            )}
            <p className="text-sm text-gray-500">
              {dict.results.mediaCount
                .replace("{count}", String(result.media.length))
                .replace(
                  "{type}",
                  result.type === "carousel"
                    ? dict.results.media
                    : result.type === "video"
                      ? dict.results.video
                      : dict.results.photo
                )}
            </p>
          </div>
        </div>

        {result.media.length > 1 && (
          <button
            onClick={handleDownloadAll}
            className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm"
          >
            {dict.results.downloadAll}
          </button>
        )}
      </div>

      {/* Caption */}
      {result.caption && (
        <p className="text-gray-700 text-sm mb-6 line-clamp-3">
          {result.caption}
        </p>
      )}

      {/* Media grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {result.media.map((item, index) => (
          <MediaCard
            key={item.id}
            item={item}
            index={index}
            total={result.media.length}
            shortcode={result.shortcode}
          />
        ))}
      </div>
    </section>
  );
}
