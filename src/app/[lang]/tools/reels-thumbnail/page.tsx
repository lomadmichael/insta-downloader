"use client";

import { useState } from "react";
import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ReelsThumbnailPage() {
  const dict = useDictionary();
  const locale = useLocale();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = async () => {
    const trimmed = url.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setThumbnailUrl(null);
    setError(null);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      const data = await response.json();

      if (data.success && data.data) {
        const media = data.data.media as Array<{
          type: "image" | "video";
          url: string;
          thumbnailUrl?: string;
        }>;

        // Find the thumbnail: prefer thumbnailUrl from a video item,
        // then first image item's url, then video item's url as fallback
        let found: string | null = null;

        for (const item of media) {
          if (item.type === "video" && item.thumbnailUrl) {
            found = item.thumbnailUrl;
            break;
          }
        }

        if (!found) {
          const firstImage = media.find((item) => item.type === "image");
          if (firstImage) {
            found = firstImage.url;
          }
        }

        if (!found) {
          const firstVideo = media.find((item) => item.type === "video");
          if (firstVideo) {
            found = firstVideo.thumbnailUrl || firstVideo.url;
          }
        }

        if (found) {
          setThumbnailUrl(found);
        } else {
          setError(dict.tools.reelsThumbnail.noThumbnail);
        }
      } else {
        setError(data.error || dict.tools.reelsThumbnail.noThumbnail);
      }
    } catch {
      setError(dict.tools.reelsThumbnail.noThumbnail);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExtract();
  };

  const handleDownload = async () => {
    if (!thumbnailUrl) return;

    try {
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(thumbnailUrl)}`;
      const response = await fetch(proxyUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "reels_thumbnail.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      // download failed silently
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-purple-50 to-white py-12">
          <div className="max-w-3xl mx-auto px-4">
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors mb-6"
            >
              {dict.tools.backToTools}
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {dict.tools.reelsThumbnail.title}
            </h1>
            <p className="text-gray-600">
              {dict.tools.reelsThumbnail.subtitle}
            </p>
          </div>
        </section>

        {/* Tool Section */}
        <section className="py-8">
          <div className="max-w-3xl mx-auto px-4 space-y-6">
            {/* URL Input */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={dict.tools.reelsThumbnail.inputPlaceholder}
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    {dict.tools.reelsThumbnail.extracting}
                  </span>
                ) : (
                  dict.tools.reelsThumbnail.extractButton
                )}
              </button>
            </form>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Thumbnail Preview */}
            {thumbnailUrl && (
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/api/proxy?url=${encodeURIComponent(thumbnailUrl)}`}
                    alt="Reels Thumbnail"
                    className="w-full h-auto max-h-[600px] object-contain"
                  />
                </div>

                {/* Download Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold bg-green-600 text-white hover:bg-green-700 active:scale-95 transition-all"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    {dict.tools.reelsThumbnail.download}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* How to Use Section */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {dict.tools.reelsThumbnail.howToTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                dict.tools.reelsThumbnail.howToStep1,
                dict.tools.reelsThumbnail.howToStep2,
                dict.tools.reelsThumbnail.howToStep3,
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-xl bg-white p-4 shadow-sm border border-gray-100"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
