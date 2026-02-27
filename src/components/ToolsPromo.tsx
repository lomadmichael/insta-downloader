"use client";

import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";

const tools = [
  {
    key: "lineBreak",
    route: "line-break",
    emoji: "↵",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    key: "blankSpace",
    route: "blank-space",
    emoji: "⎵",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    key: "fonts",
    route: "fonts",
    emoji: "𝐀",
    gradient: "from-fuchsia-500 to-pink-500",
  },
  {
    key: "characterCounter",
    route: "character-counter",
    emoji: "#",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    key: "imageResizer",
    route: "image-resizer",
    emoji: "🖼",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    key: "reelsThumbnail",
    route: "reels-thumbnail",
    emoji: "🎬",
    gradient: "from-rose-500 to-red-500",
  },
] as const;

export default function ToolsPromo() {
  const dict = useDictionary();
  const locale = useLocale();

  const toolCards = dict.tools.toolCards as Record<string, string>;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-600 mb-3">
            FREE TOOLS
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {dict.tools.title}
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            {dict.tools.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {tools.map(({ key, route, emoji, gradient }) => (
            <Link
              key={key}
              href={`/${locale}/tools/${route}`}
              className="group relative bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg hover:border-purple-100 transition-all duration-300 hover:-translate-y-0.5 text-center"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} text-white text-xl mb-3 shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-300`}>
                {emoji}
              </div>
              <div className="text-sm font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                {toolCards[key]}
              </div>
              <div className="text-xs text-gray-400 mt-1 leading-relaxed">
                {toolCards[`${key}Desc`]}
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-50 text-purple-600 font-semibold rounded-xl hover:bg-purple-100 transition-colors text-sm"
          >
            {dict.tools.title}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
