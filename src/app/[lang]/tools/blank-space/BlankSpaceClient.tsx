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
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 animate-gradient py-12 sm:py-16">
          {/* Floating orbs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-300/15 rounded-full blur-3xl pointer-events-none" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative max-w-3xl mx-auto px-4 text-center">
            {/* Back link pill */}
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center gap-1.5 mb-6 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium hover:bg-white/25 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {dict.tools.backToTools}
            </Link>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              {t.title}
            </h1>
            <p className="text-lg text-white/75">{t.subtitle}</p>
          </div>
        </section>

        {/* Tool */}
        <section className="max-w-xl mx-auto px-4 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-8 space-y-8">
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
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-blue-100 accent-blue-500"
              />

              {/* Quick buttons */}
              <div className="flex items-center gap-2">
                {QUICK_COUNTS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      count === n
                        ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-sm"
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
              <div className="rounded-xl border border-gray-200 bg-gray-50/80 p-4 text-center font-mono text-sm whitespace-pre-wrap break-words">
                <span className="text-blue-600 font-semibold">[</span>
                <span className="text-gray-400">{t.previewBetween}</span>
                <span className="text-blue-600 font-semibold">]</span>
                {"\n"}
                {blankText}
                {"\n"}
                <span className="text-blue-600 font-semibold">[</span>
                <span className="text-gray-400">{t.previewBetween}</span>
                <span className="text-blue-600 font-semibold">]</span>
              </div>
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                copied
                  ? "bg-green-500 text-white shadow-lg shadow-green-200"
                  : "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98]"
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
        <section className="py-12 sm:py-16 bg-gray-50/50">
          <div className="max-w-3xl mx-auto px-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              {t.howToTitle}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-6">
              {t.howToTitle}
            </h2>
            <ol className="space-y-4">
              {[t.howToStep1, t.howToStep2, t.howToStep3].map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold flex items-center justify-center text-sm">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why */}
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 sm:p-8 border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t.whyTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed">{t.whyContent}</p>
            </div>
          </div>
        </section>

        {/* Back link */}
        <div className="pb-12 sm:pb-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-colors text-sm"
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
