"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BLANK_CHAR = "\u3164";
const QUICK_COUNTS = [1, 3, 5, 10];

export default function BlankSpacePage() {
  const dict = useDictionary();
  const locale = useLocale();
  const t = dict.tools.blankSpace;

  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(false);

  const blankText = Array.from({ length: count }, () => BLANK_CHAR).join("\n");

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(blankText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = blankText;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [blankText]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-purple-50 to-white py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {t.title}
            </h1>
            <p className="text-lg text-gray-600">{t.subtitle}</p>
          </div>
        </section>

        {/* Tool */}
        <section className="py-10 sm:py-14">
          <div className="max-w-xl mx-auto px-4 space-y-8">
            {/* Count selector */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                {t.countLabel}
              </label>

              {/* Slider */}
              <input
                type="range"
                min={1}
                max={10}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-purple-200 accent-purple-600"
              />

              {/* Quick buttons */}
              <div className="flex items-center gap-2">
                {QUICK_COUNTS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      count === n
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                {t.previewLabel}
              </p>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center font-mono text-sm whitespace-pre-wrap break-words">
                <span className="text-purple-600 font-semibold">[</span>
                <span className="text-gray-400">{t.previewBetween}</span>
                <span className="text-purple-600 font-semibold">]</span>
                {"\n"}
                {blankText}
                {"\n"}
                <span className="text-purple-600 font-semibold">[</span>
                <span className="text-gray-400">{t.previewBetween}</span>
                <span className="text-purple-600 font-semibold">]</span>
              </div>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                copied
                  ? "bg-green-500 text-white shadow-lg shadow-green-200"
                  : "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-200 active:scale-[0.98]"
              }`}
            >
              {copied
                ? t.copied
                : count === 1
                  ? t.copyOne
                  : t.copyMultiple.replace("{count}", String(count))}
            </button>
          </div>
        </section>

        {/* How to Use */}
        <section className="py-10 sm:py-14 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t.howToTitle}
            </h2>
            <ol className="space-y-4">
              {[t.howToStep1, t.howToStep2, t.howToStep3].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why */}
        <section className="py-10 sm:py-14">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t.whyTitle}
            </h2>
            <p className="text-gray-700 leading-relaxed">{t.whyContent}</p>
          </div>
        </section>

        {/* Back link */}
        <div className="pb-10 sm:pb-14">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {dict.tools.backToTools}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
