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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {/* Back link */}
        <Link
          href={`/${locale}/tools`}
          className="inline-block text-sm text-purple-600 hover:text-purple-800 mb-6 transition-colors"
        >
          {dict.tools.backToTools}
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-500 mb-8">{t.subtitle}</p>

        {/* Upload area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
            isDragging
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50/50"
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
          <div className="flex flex-col items-center gap-3">
            <svg
              className="w-12 h-12 text-gray-400"
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
            <p className="text-sm font-medium text-gray-700">
              {t.uploadLabel}
            </p>
            <span className="inline-block px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
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
                    className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                      selectedPreset === key
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-purple-400 hover:text-purple-600"
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
                    className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={keepRatio}
                    onChange={(e) => setKeepRatio(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  {t.keepRatio}
                </label>
              </div>
            </div>

            {/* Size info */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="bg-gray-50 rounded-lg px-4 py-2">
                <span className="text-gray-500">{t.originalSize}: </span>
                <span className="font-medium text-gray-900">
                  {originalWidth} &times; {originalHeight}px
                </span>
              </div>
              <div className="bg-purple-50 rounded-lg px-4 py-2">
                <span className="text-purple-600">{t.newSize}: </span>
                <span className="font-medium text-purple-900">
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
                <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <div className="px-3 py-2 bg-gray-50 border-b border-gray-200">
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
                <div className="border border-purple-200 rounded-xl overflow-hidden bg-white">
                  <div className="px-3 py-2 bg-purple-50 border-b border-purple-200">
                    <span className="text-xs font-medium text-purple-600">
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
                className="px-8 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t.download}
              </button>
            </div>
          </div>
        )}

        {/* Hidden canvas for resizing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Info section */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            {t.howToTitle}
          </h2>
          <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
            {t.howToContent}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
