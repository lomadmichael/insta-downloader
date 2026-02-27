"use client";

import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";

const tools = [
  { key: "lineBreak", route: "line-break" },
  { key: "blankSpace", route: "blank-space" },
  { key: "fonts", route: "fonts" },
  { key: "characterCounter", route: "character-counter" },
  { key: "imageResizer", route: "image-resizer" },
  { key: "reelsThumbnail", route: "reels-thumbnail" },
] as const;

export default function ToolsPromo() {
  const dict = useDictionary();
  const locale = useLocale();

  const toolCards = dict.tools.toolCards as Record<string, string>;

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
          {dict.tools.title}
        </h2>
        <p className="text-gray-500 text-center mb-10">
          {dict.tools.subtitle}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {tools.map(({ key, route }) => (
            <Link
              key={key}
              href={`/${locale}/tools/${route}`}
              className="group flex flex-col items-center p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all text-center"
            >
              <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                {toolCards[key]}
              </span>
              <span className="text-xs text-gray-400 mt-1">
                {toolCards[`${key}Desc`]}
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href={`/${locale}/tools`}
            className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
          >
            {dict.tools.title} →
          </Link>
        </div>
      </div>
    </section>
  );
}
