"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CAPTION_LIMIT = 2200;
const BIO_LIMIT = 150;
const HASHTAG_LIMIT = 30;

function getProgressColor(value: number, limit: number): string {
  const ratio = value / limit;
  if (ratio > 1) return "bg-red-500";
  if (ratio > 0.8) return "bg-yellow-500";
  return "bg-green-500";
}

function getTextColor(value: number, limit: number): string {
  const ratio = value / limit;
  if (ratio > 1) return "text-red-600";
  if (ratio > 0.8) return "text-yellow-600";
  return "text-green-600";
}

export default function CharacterCounterPage() {
  const dict = useDictionary();
  const locale = useLocale();
  const t = dict.tools.characterCounter;

  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const characters = text.length;
    const words = text.split(/\s+/).filter((w) => w.length > 0).length;
    const lines = text === "" ? 0 : text.split(/\n/).length;
    const hashtagMatches = text.match(/#\w+/g);
    const mentionMatches = text.match(/@\w+/g);
    const hashtags = hashtagMatches ? hashtagMatches.length : 0;
    const mentions = mentionMatches ? mentionMatches.length : 0;

    return { characters, words, lines, hashtags, mentions };
  }, [text]);

  const limits = useMemo(
    () => [
      {
        label: t.captionLimit,
        value: stats.characters,
        limit: CAPTION_LIMIT,
      },
      {
        label: t.bioLimit,
        value: stats.characters,
        limit: BIO_LIMIT,
      },
      {
        label: t.hashtagLimit,
        value: stats.hashtags,
        limit: HASHTAG_LIMIT,
      },
    ],
    [stats, t]
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 animate-gradient">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Floating orbs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-yellow-300/15 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16">
          <Link
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 hover:bg-white/25 transition-colors mb-6"
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
            {t.title}
          </h1>
          <p className="text-white/75 text-lg">{t.subtitle}</p>
        </div>
      </section>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 sm:py-12 -mt-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Textarea card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
              <label
                htmlFor="text-input"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                {t.inputLabel}
              </label>
              <textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t.inputPlaceholder}
                rows={12}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-y text-base leading-relaxed bg-gray-50/50 transition-all"
              />
            </div>
          </div>

          {/* Stats sidebar */}
          <div className="space-y-6">
            {/* Real-time stats card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div>
                {[
                  { label: t.characters, value: stats.characters },
                  { label: t.words, value: stats.words },
                  { label: t.lines, value: stats.lines },
                  { label: t.hashtags, value: stats.hashtags },
                  { label: t.mentions, value: stats.mentions },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                  >
                    <span className="text-sm text-gray-500">{stat.label}</span>
                    <span className="text-xl font-bold text-gray-900 tabular-nums">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instagram limits card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                Instagram Limits
              </h3>
              <div className="space-y-5">
                {limits.map((item) => {
                  const percentage = Math.min(
                    (item.value / item.limit) * 100,
                    100
                  );
                  const remaining = item.limit - item.value;
                  const isExceeded = remaining < 0;

                  return (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                        <span
                          className={`text-sm font-medium ${getTextColor(item.value, item.limit)}`}
                        >
                          {item.value} / {item.limit}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${getProgressColor(item.value, item.limit)}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p
                        className={`text-xs mt-1.5 ${getTextColor(item.value, item.limit)}`}
                      >
                        {isExceeded
                          ? `${t.exceeded}: ${Math.abs(remaining)}`
                          : `${t.remaining}: ${remaining}`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 border border-amber-100 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {t.howToTitle}
          </h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            {t.howToContent}
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
