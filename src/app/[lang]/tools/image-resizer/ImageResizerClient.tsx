"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PRESETS: Record<string, { width: number; height: number }> = {
  feedSquare: { width: 1080, height: 1080 },
  feedPortrait: { width: 1080, height: 1350 },
  feedLandscape: { width: 1080, height: 566 },
  story: { width: 1080, height: 1920 },
  profile: { width: 110, height: 110 },
};

export default function ImageResizerPage() {
  const dict = useDictionary();
  const locale = useLocale();
  const t = dict.tools.imageResizer;

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [targetWidth, setTargetWidth] = useState<number>(1080);
  const [targetHeight, setTargetHeight] = useState<number>(1080);
  const [keepRatio, setKeepRatio] = useState<boolean>(true);
  const [selectedPreset, setSelectedPreset] = useState<string>("feedSquare");
  const [resizedUrl, setResizedUrl] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aspectRatioRef = useRef<number>(1);

  const handleImageLoad = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(file);
    setImageUrl(url);
    setResizedUrl("");

    const img = new Image();
    img.onload = () => {
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
      aspectRatioRef.current = img.width / img.height;
    };
    img.src = url;
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith("image/")) {
        handleImageLoad(file);
      }
    },
    [handleImageLoad]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        handleImageLoad(file);
      }
    },
    [handleImageLoad]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handlePresetClick = useCallback((presetKey: string) => {
    setSelectedPreset(presetKey);
    const preset = PRESETS[presetKey];
    if (preset) {
      setTargetWidth(preset.width);
      setTargetHeight(preset.height);
    }
  }, []);

  const handleWidthChange = useCallback(
    (value: number) => {
      setSelectedPreset("custom");
      setTargetWidth(value);
      if (keepRatio && originalWidth > 0) {
        setTargetHeight(Math.round(value / aspectRatioRef.current));
      }
    },
    [keepRatio, originalWidth]
  );

  const handleHeightChange = useCallback(
    (value: number) => {
      setSelectedPreset("custom");
      setTargetHeight(value);
      if (keepRatio && originalHeight > 0) {
        setTargetWidth(Math.round(value * aspectRatioRef.current));
      }
    },
    [keepRatio, originalHeight]
  );

  const resizeImage = useCallback(() => {
    if (!imageUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            if (resizedUrl) {
              URL.revokeObjectURL(resizedUrl);
            }
            const url = URL.createObjectURL(blob);
            setResizedUrl(url);
          }
        },
        "image/png",
        1.0
      );
    };
    img.src = imageUrl;
  }, [imageUrl, targetWidth, targetHeight, resizedUrl]);

  useEffect(() => {
    if (imageUrl && targetWidth > 0 && targetHeight > 0) {
      resizeImage();
    }
  }, [imageUrl, targetWidth, targetHeight]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDownload = useCallback(() => {
    if (!resizedUrl) return;
    const a = document.createElement("a");
    a.href = resizedUrl;
    const ext = uploadedImage?.name?.split(".").pop() || "png";
    a.download = `resized-${targetWidth}x${targetHeight}.${ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "webp" ? ext : "png"}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [resizedUrl, targetWidth, targetHeight, uploadedImage]);

  const presetLabels: Record<string, string> = {
    feedSquare: t.presetFeedSquare,
    feedPortrait: t.presetFeedPortrait,
    feedLandscape: t.presetFeedLandscape,
    story: t.presetStory,
    profile: t.presetProfile,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 animate-gradient">
          {/* Floating orbs */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 right-16 w-40 h-40 bg-cyan-300/15 rounded-full blur-3xl animate-pulse" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:py-16">
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center gap-1.5 text-sm text-white/90 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full hover:bg-white/25 transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {dict.tools.backToTools}
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {t.title}
            </h1>
            <p className="text-white/75 text-base sm:text-lg max-w-2xl">
              {t.subtitle}
            </p>
          </div>
        </section>

        {/* Upload & main content area */}
        <div className="max-w-5xl mx-auto px-4 py-8 -mt-6 relative z-10">
          {/* Upload zone card */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`bg-white rounded-2xl border-2 border-dashed shadow-xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? "border-emerald-500 bg-emerald-50 shadow-emerald-500/10"
                : "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/30"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-700">
                {t.uploadLabel}
              </p>
              <span className="inline-block bg-gradient-to-br from-emerald-500 to-teal-500 text-white px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/25 text-sm font-medium hover:shadow-emerald-500/40 transition-shadow">
                {t.uploadButton}
              </span>
              <p className="text-xs text-gray-400">{t.dragDrop}</p>
            </div>
          </div>

          {uploadedImage && (
            <div className="mt-8 space-y-8">
              {/* Presets */}
              <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-3">
                  {t.presets}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(presetLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => handlePresetClick(key)}
                      className={`px-4 py-1.5 text-sm rounded-full border transition-all ${
                        selectedPreset === key
                          ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white border-transparent shadow-sm"
                          : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300"
                      }`}
                    >
                      {label}
                      <span className="ml-1 text-xs opacity-70">
                        {PRESETS[key].width}&times;{PRESETS[key].height}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom size */}
              <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-3">
                  {t.custom}
                </h2>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">{t.width}</label>
                    <input
                      type="number"
                      min={1}
                      max={10000}
                      value={targetWidth}
                      onChange={(e) =>
                        handleWidthChange(parseInt(e.target.value) || 0)
                      }
                      className="w-24 px-3 py-1.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <span className="text-gray-400">&times;</span>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">{t.height}</label>
                    <input
                      type="number"
                      min={1}
                      max={10000}
                      value={targetHeight}
                      onChange={(e) =>
                        handleHeightChange(parseInt(e.target.value) || 0)
                      }
                      className="w-24 px-3 py-1.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={keepRatio}
                      onChange={(e) => setKeepRatio(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    {t.keepRatio}
                  </label>
                </div>
              </div>

              {/* Size info badges */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-gray-100 rounded-xl px-4 py-2.5">
                  <span className="text-gray-500">{t.originalSize}: </span>
                  <span className="font-medium text-gray-900">
                    {originalWidth} &times; {originalHeight}px
                  </span>
                </div>
                <div className="bg-emerald-50 rounded-xl px-4 py-2.5">
                  <span className="text-emerald-600">{t.newSize}: </span>
                  <span className="font-medium text-emerald-800">
                    {targetWidth} &times; {targetHeight}px
                  </span>
                </div>
              </div>

              {/* Preview */}
              <div>
                <h2 className="text-sm font-semibold text-gray-700 mb-3">
                  {t.preview}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Original */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                    <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                      <span className="text-xs font-medium text-gray-500">
                        {t.originalSize}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-center min-h-[200px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt="Original"
                        className="max-w-full max-h-[300px] object-contain"
                      />
                    </div>
                  </div>

                  {/* Resized */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
                    <div className="px-4 py-2.5 bg-emerald-50 border-b border-emerald-100">
                      <span className="text-xs font-medium text-emerald-700">
                        {t.newSize}
                      </span>
                    </div>
                    <div className="p-4 flex items-center justify-center min-h-[200px]">
                      {resizedUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={resizedUrl}
                          alt="Resized"
                          className="max-w-full max-h-[300px] object-contain"
                        />
                      ) : (
                        <div className="text-sm text-gray-400">...</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Download button */}
              <div className="flex justify-center">
                <button
                  onClick={handleDownload}
                  disabled={!resizedUrl}
                  className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {t.download}
                </button>
              </div>
            </div>
          )}

          {/* Hidden canvas for resizing */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Info section */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 sm:p-8 border border-emerald-100 mt-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              {t.howToTitle}
            </h2>
            <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
              {t.howToContent}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
