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
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {/* Back link */}
        <Link
          href={`/${locale}/tools`}
          className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 transition-colors mb-6"
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

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-500">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Textarea */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <label
                htmlFor="text-input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {t.inputLabel}
              </label>
              <textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t.inputPlaceholder}
                rows={12}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y text-base leading-relaxed"
              />
            </div>
          </div>

          {/* Stats sidebar */}
          <div className="space-y-6">
            {/* Real-time stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                {[
                  { label: t.characters, value: stats.characters },
                  { label: t.words, value: stats.words },
                  { label: t.lines, value: stats.lines },
                  { label: t.hashtags, value: stats.hashtags },
                  { label: t.mentions, value: stats.mentions },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-500">{stat.label}</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instagram limits */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
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
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${getProgressColor(item.value, item.limit)}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p
                        className={`text-xs mt-1 ${getTextColor(item.value, item.limit)}`}
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
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
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
