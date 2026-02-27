"use client";

import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const lang = useLocale();
  const dict = useDictionary();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href={`/${lang}`} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center shadow-sm shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              <svg
                className="w-4.5 h-4.5 text-white"
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
            <span className="text-lg font-bold text-gray-900">InstaDown</span>
          </a>
          <nav className="hidden sm:flex items-center">
            <Link
              href={`/${lang}/tools`}
              className="text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-purple-50"
            >
              {dict.nav.tools}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/${lang}/tools`}
            className="sm:hidden text-sm font-medium text-gray-500 hover:text-purple-600 transition-colors px-3 py-1.5 rounded-lg"
          >
            {dict.nav.tools}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
