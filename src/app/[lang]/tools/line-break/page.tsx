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
        <section className="bg-gradient-to-b from-purple-50 to-white py-12">
          <div className="max-w-3xl mx-auto px-4">
            <Link
              href={`/${locale}/tools`}
              className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors mb-6"
            >
              {dict.tools.backToTools}
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {dict.tools.lineBreak.title}
            </h1>
            <p className="text-gray-600">
              {dict.tools.lineBreak.subtitle}
            </p>
          </div>
        </section>

        {/* Tool Section */}
        <section className="py-8">
          <div className="max-w-3xl mx-auto px-4 space-y-6">
            {/* Input */}
            <div>
              <label
                htmlFor="line-break-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {dict.tools.lineBreak.inputLabel}
              </label>
              <textarea
                id="line-break-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={dict.tools.lineBreak.inputPlaceholder}
                rows={6}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none resize-vertical transition-colors"
              />
            </div>

            {/* Result */}
            <div>
              <label
                htmlFor="line-break-result"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {dict.tools.lineBreak.resultLabel}
              </label>
              <textarea
                id="line-break-result"
                value={convertedText}
                readOnly
                rows={6}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 resize-vertical outline-none"
              />
            </div>

            {/* Copy Button */}
            <div className="flex justify-end">
              <button
                onClick={handleCopy}
                disabled={!convertedText}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-purple-600 text-white hover:bg-purple-700 active:scale-95"
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
        </section>

        {/* How to Use Section */}
        <section className="py-10 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {dict.tools.lineBreak.howToTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                dict.tools.lineBreak.howToStep1,
                dict.tools.lineBreak.howToStep2,
                dict.tools.lineBreak.howToStep3,
                dict.tools.lineBreak.howToStep4,
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

        {/* Why Section */}
        <section className="py-10">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {dict.tools.lineBreak.whyTitle}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {dict.tools.lineBreak.whyContent}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
