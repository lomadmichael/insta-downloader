"use client";

import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";

const toolLinks = [
  { key: "lineBreak" as const, route: "line-break" },
  { key: "blankSpace" as const, route: "blank-space" },
  { key: "fonts" as const, route: "fonts" },
  { key: "characterCounter" as const, route: "character-counter" },
  { key: "imageResizer" as const, route: "image-resizer" },
  { key: "reelsThumbnail" as const, route: "reels-thumbnail" },
];

const guideLinks = [
  { key: "download" as const, route: "download" },
  { key: "lineBreak" as const, route: "line-break" },
  { key: "blankSpace" as const, route: "blank-space" },
  { key: "fonts" as const, route: "fonts" },
  { key: "characterCounter" as const, route: "character-counter" },
  { key: "imageResizer" as const, route: "image-resizer" },
  { key: "reelsThumbnail" as const, route: "reels-thumbnail" },
];

export default function Footer() {
  const dict = useDictionary();
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Top section: brand + link columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-lg font-bold text-white">InstaDown</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {dict.footer.disclaimer1}
            </p>
          </div>

          {/* Tools column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              {dict.nav.tools}
            </h3>
            <ul className="space-y-1.5">
              {toolLinks.map(({ key, route }) => (
                <li key={key}>
                  <Link
                    href={`/${locale}/tools/${route}`}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    {dict.tools.toolCards[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              {dict.nav.howTo}
            </h3>
            <ul className="space-y-1.5">
              {guideLinks.map(({ key, route }) => (
                <li key={key}>
                  <Link
                    href={`/${locale}/how-to/${route}`}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    {dict.howTo.guideCards[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">
              {locale === "ko" ? "정보" : "Info"}
            </h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href={`/${locale}/privacy`}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {dict.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>{dict.footer.disclaimer2}</p>
            <p>&copy; {new Date().getFullYear()} InstaDown</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
