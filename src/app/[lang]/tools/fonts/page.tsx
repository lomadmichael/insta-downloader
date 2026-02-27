"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FontStyle {
  key: string;
  upper?: number;
  lower?: number;
  digits?: number;
}

const FONT_STYLES: FontStyle[] = [
  { key: "bold", upper: 0x1d400, lower: 0x1d41a, digits: 0x1d7ce },
  { key: "italic", upper: 0x1d434, lower: 0x1d44e },
  { key: "boldItalic", upper: 0x1d468, lower: 0x1d482 },
  { key: "script", upper: 0x1d49c, lower: 0x1d4b6 },
  { key: "boldScript", upper: 0x1d4d0, lower: 0x1d4ea },
  { key: "fraktur", upper: 0x1d504, lower: 0x1d51e },
  { key: "doubleStruck", upper: 0x1d538, lower: 0x1d552, digits: 0x1d7d8 },
  { key: "sansSerif", upper: 0x1d5a0, lower: 0x1d5ba, digits: 0x1d7e2 },
  { key: "sansSerifBold", upper: 0x1d5d4, lower: 0x1d5ee, digits: 0x1d7ec },
  { key: "sansSerifItalic", upper: 0x1d608, lower: 0x1d622 },
  { key: "monospace", upper: 0x1d670, lower: 0x1d68a, digits: 0x1d7f6 },
  { key: "circled" },
  { key: "squared" },
  { key: "squaredNeg" },
  { key: "fullwidth", upper: 0xff21, lower: 0xff41, digits: 0xff10 },
];

function convertToFont(text: string, style: FontStyle): string {
  return Array.from(text)
    .map((char) => {
      const code = char.codePointAt(0)!;

      // Circled style has special handling
      if (style.key === "circled") {
        if (code >= 65 && code <= 90) {
          return String.fromCodePoint(0x24b6 + (code - 65));
        }
        if (code >= 97 && code <= 122) {
          return String.fromCodePoint(0x24d0 + (code - 97));
        }
        if (code === 48) {
          return String.fromCodePoint(0x24ea); // circled 0
        }
        if (code >= 49 && code <= 57) {
          return String.fromCodePoint(0x2460 + (code - 49)); // circled 1-9
        }
        return char;
      }

      // Squared: uppercase only
      if (style.key === "squared") {
        if (code >= 65 && code <= 90) {
          return String.fromCodePoint(0x1f130 + (code - 65));
        }
        return char;
      }

      // Squared Negative: uppercase only
      if (style.key === "squaredNeg") {
        if (code >= 65 && code <= 90) {
          return String.fromCodePoint(0x1f170 + (code - 65));
        }
        return char;
      }

      // General offset-based styles
      if (code >= 65 && code <= 90 && style.upper !== undefined) {
        return String.fromCodePoint(style.upper + (code - 65));
      }
      if (code >= 97 && code <= 122 && style.lower !== undefined) {
        return String.fromCodePoint(style.lower + (code - 97));
      }
      if (code >= 48 && code <= 57 && style.digits !== undefined) {
        return String.fromCodePoint(style.digits + (code - 48));
      }

      return char;
    })
    .join("");
}

export default function FontsPage() {
  const dict = useDictionary();
  const locale = useLocale();
  const [inputText, setInputText] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fonts = dict.tools.fonts;

  const styleNames: Record<string, string> = {
    bold: fonts.styles.bold,
    italic: fonts.styles.italic,
    boldItalic: fonts.styles.boldItalic,
    script: fonts.styles.script,
    boldScript: fonts.styles.boldScript,
    fraktur: fonts.styles.fraktur,
    doubleStruck: fonts.styles.doubleStruck,
    sansSerif: fonts.styles.sansSerif,
    sansSerifBold: fonts.styles.sansSerifBold,
    sansSerifItalic: fonts.styles.sansSerifItalic,
    monospace: fonts.styles.monospace,
    circled: fonts.styles.circled,
    squared: fonts.styles.squared,
    squaredNeg: fonts.styles.squaredNeg,
    fullwidth: fonts.styles.fullwidth,
  };

  const handleCopy = useCallback(
    async (text: string, key: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      } catch {
        // Fallback: ignore if clipboard API fails
      }
    },
    []
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-purple-50 to-white py-12">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {fonts.title}
            </h1>
            <p className="text-gray-600 text-lg">{fonts.subtitle}</p>
          </div>
        </section>

        {/* Input Section */}
        <section className="max-w-3xl mx-auto px-4 py-8">
          <label
            htmlFor="font-input"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {fonts.inputLabel}
          </label>
          <input
            id="font-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={fonts.inputPlaceholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
          />
        </section>

        {/* Results Section */}
        {inputText.trim() && (
          <section className="max-w-3xl mx-auto px-4 pb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {fonts.resultLabel}
            </h2>
            <div className="grid gap-3">
              {FONT_STYLES.map((style) => {
                const converted = convertToFont(inputText, style);
                const isCopied = copiedKey === style.key;

                return (
                  <div
                    key={style.key}
                    className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl px-5 py-4 hover:border-purple-200 hover:shadow-sm transition-all"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-purple-600 mb-1">
                        {styleNames[style.key]}
                      </p>
                      <p className="text-lg text-gray-900 truncate">
                        {converted}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(converted, style.key)}
                      className={`shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                        isCopied
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                      }`}
                    >
                      {isCopied ? fonts.copied : fonts.copy}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* How to Use Section */}
        <section className="max-w-3xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {fonts.howToTitle}
          </h2>
          <div className="space-y-4">
            {[fonts.howToStep1, fonts.howToStep2, fonts.howToStep3].map(
              (step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 pt-1">{step}</p>
                </div>
              )
            )}
          </div>
        </section>

        {/* Note */}
        <section className="max-w-3xl mx-auto px-4 pb-10">
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800">
            {fonts.note}
          </div>
        </section>

        {/* Back Link */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <Link
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 transition-colors"
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
        </section>
      </main>
      <Footer />
    </div>
  );
}
