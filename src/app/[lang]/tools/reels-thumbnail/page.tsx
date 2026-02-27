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
        <section className="relative overflow-hidden bg-gradient-to-br from-rose-500 via-red-500 to-orange-500 animate-gradient py-12 sm:py-16">
          {/* Floating orbs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl pointer-events-none" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center gap-1.5 text-sm text-white/90 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 hover:bg-white/25 transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              {dict.tools.backToTools}
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {dict.tools.reelsThumbnail.title}
            </h1>
            <p className="text-white/75 text-base sm:text-lg">
              {dict.tools.reelsThumbnail.subtitle}
            </p>
          </div>
        </section>

        {/* Tool Section */}
        <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-8 space-y-6">
            {/* URL Input */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={dict.tools.reelsThumbnail.inputPlaceholder}
                disabled={loading}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="bg-gradient-to-br from-rose-500 to-red-500 text-white font-semibold rounded-xl shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 px-6 py-3 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none shrink-0"
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
              <div className="flex items-start gap-3 rounded-2xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-700">
                <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Thumbnail Preview */}
            {thumbnailUrl && (
              <div className="space-y-5">
                <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 shadow-lg">
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
                    className="inline-flex items-center gap-2 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl px-6 py-3 font-semibold shadow-lg shadow-green-500/25 hover:shadow-green-500/40 active:scale-[0.98] transition-all"
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
        </div>

        {/* How to Use Section */}
        <section className="py-12 sm:py-16 bg-gray-50/50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
                {dict.tools.reelsThumbnail.howToTitle}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                dict.tools.reelsThumbnail.howToStep1,
                dict.tools.reelsThumbnail.howToStep2,
                dict.tools.reelsThumbnail.howToStep3,
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 bg-gradient-to-br from-rose-500 to-red-500 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
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
