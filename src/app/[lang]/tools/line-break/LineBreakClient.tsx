"use client";

import { useState } from "react";
import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LineBreakPage() {
  const dict = useDictionary();
  const locale = useLocale();
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);

  const convertedText = inputText.replace(/\n\n/g, "\n\u200B\n");

  const handleCopy = async () => {
    if (!convertedText) return;
    try {
      await navigator.clipboard.writeText(convertedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard write failed silently
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 animate-gradient py-12 sm:py-16">
          {/* Floating orbs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-fuchsia-400/10 rounded-full blur-3xl pointer-events-none" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNNDAgMEgwdjQwaDQwVjB6TTEgMWgzOHYzOEgxVjF6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-40 pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-4">
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium text-white/90 border border-white/20 hover:bg-white/25 transition-colors mb-6"
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
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {dict.tools.lineBreak.title}
            </h1>
            <p className="text-white/75 text-base sm:text-lg">
              {dict.tools.lineBreak.subtitle}
            </p>
          </div>
        </section>

        {/* Tool Section */}
        <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sm:p-8 space-y-6">
            {/* Input */}
            <div>
              <label
                htmlFor="line-break-input"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {dict.tools.lineBreak.inputLabel}
              </label>
              <textarea
                id="line-break-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={dict.tools.lineBreak.inputPlaceholder}
                rows={6}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-vertical transition-all bg-gray-50/50"
              />
            </div>

            {/* Arrow icon between textareas */}
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>

            {/* Result */}
            <div>
              <label
                htmlFor="line-break-result"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {dict.tools.lineBreak.resultLabel}
              </label>
              <textarea
                id="line-break-result"
                value={convertedText}
                readOnly
                rows={6}
                className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-vertical transition-all"
              />
            </div>

            {/* Copy Button */}
            <div className="flex justify-end">
              <button
                onClick={handleCopy}
                disabled={!convertedText}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${
                  copied
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/25"
                    : "bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 active:scale-95"
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {copied ? (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {dict.tools.lineBreak.copied}
                  </>
                ) : (
                  <>
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    {dict.tools.lineBreak.copyButton}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-600 mb-3">
              Guide
            </span>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {dict.tools.lineBreak.howToTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                dict.tools.lineBreak.howToStep1,
                dict.tools.lineBreak.howToStep2,
                dict.tools.lineBreak.howToStep3,
                dict.tools.lineBreak.howToStep4,
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-100 transition-all duration-300 flex gap-3"
                >
                  <span className="flex-shrink-0 bg-gradient-to-br from-violet-500 to-purple-500 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold">
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

        {/* Why Section */}
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-2xl p-6 sm:p-8 border border-purple-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {dict.tools.lineBreak.whyTitle}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.tools.lineBreak.whyContent}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
