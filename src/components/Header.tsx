"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";
import LanguageSwitcher from "./LanguageSwitcher";

const toolItems = [
  { key: "lineBreak", route: "line-break", emoji: "↵" },
  { key: "blankSpace", route: "blank-space", emoji: "⎵" },
  { key: "fonts", route: "fonts", emoji: "𝐀" },
  { key: "characterCounter", route: "character-counter", emoji: "#" },
  { key: "imageResizer", route: "image-resizer", emoji: "🖼" },
  { key: "reelsThumbnail", route: "reels-thumbnail", emoji: "🎬" },
] as const;

const howToItems = [
  { key: "download", route: "download", emoji: "📥" },
  { key: "lineBreak", route: "line-break", emoji: "↵" },
  { key: "blankSpace", route: "blank-space", emoji: "⎵" },
  { key: "fonts", route: "fonts", emoji: "𝐀" },
  { key: "characterCounter", route: "character-counter", emoji: "#" },
  { key: "imageResizer", route: "image-resizer", emoji: "🖼" },
  { key: "reelsThumbnail", route: "reels-thumbnail", emoji: "🎬" },
] as const;

export default function Header() {
  const lang = useLocale();
  const dict = useDictionary();
  const [openMenu, setOpenMenu] = useState<"tools" | "howto" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toolCards = dict.tools.toolCards as Record<string, string>;
  const guideCards = dict.howTo.guideCards as Record<string, string>;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6" ref={menuRef}>
          <a href={`/${lang}`} className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center shadow-sm shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </div>
            <span className="text-base font-bold text-gray-900">InstaDown</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {/* Tools dropdown trigger */}
            <button
              onClick={() => setOpenMenu(openMenu === "tools" ? null : "tools")}
              className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                openMenu === "tools"
                  ? "text-purple-600 bg-purple-50"
                  : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
              }`}
            >
              {dict.nav.tools}
              <svg className={`w-3.5 h-3.5 transition-transform ${openMenu === "tools" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* HOW TO dropdown trigger */}
            <button
              onClick={() => setOpenMenu(openMenu === "howto" ? null : "howto")}
              className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                openMenu === "howto"
                  ? "text-purple-600 bg-purple-50"
                  : "text-gray-500 hover:text-purple-600 hover:bg-purple-50"
              }`}
            >
              {dict.nav.howTo}
              <svg className={`w-3.5 h-3.5 transition-transform ${openMenu === "howto" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </nav>

          {/* Tools dropdown panel */}
          {openMenu === "tools" && (
            <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50">
              <div className="max-w-5xl mx-auto px-4 py-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {toolItems.map(({ key, route, emoji }) => (
                    <Link
                      key={key}
                      href={`/${lang}/tools/${route}`}
                      onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-colors group"
                    >
                      <span className="text-lg w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 group-hover:bg-purple-100 transition-colors">
                        {emoji}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                          {toolCards[key]}
                        </div>
                        <div className="text-xs text-gray-400">
                          {toolCards[`${key}Desc`]}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Link
                    href={`/${lang}/tools`}
                    onClick={() => setOpenMenu(null)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    {dict.tools.title}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* HOW TO dropdown panel */}
          {openMenu === "howto" && (
            <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50">
              <div className="max-w-5xl mx-auto px-4 py-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {howToItems.map(({ key, route, emoji }) => (
                    <Link
                      key={key}
                      href={`/${lang}/how-to/${route}`}
                      onClick={() => setOpenMenu(null)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-colors group"
                    >
                      <span className="text-lg w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 group-hover:bg-purple-100 transition-colors">
                        {emoji}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                          {guideCards[key]}
                        </div>
                        <div className="text-xs text-gray-400">
                          {guideCards[`${key}Desc`]}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Link
                    href={`/${lang}/how-to`}
                    onClick={() => setOpenMenu(null)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    {dict.howTo.title}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile: simple links */}
          <Link
            href={`/${lang}/tools`}
            className="sm:hidden text-xs font-medium text-gray-500 hover:text-purple-600 transition-colors px-2 py-1 rounded"
          >
            {dict.nav.tools}
          </Link>
          <Link
            href={`/${lang}/how-to`}
            className="sm:hidden text-xs font-medium text-gray-500 hover:text-purple-600 transition-colors px-2 py-1 rounded"
          >
            {dict.nav.howTo}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
