"use client";

import { useLocale } from "@/i18n/use-dictionary";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const lang = useLocale();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href={`/${lang}`} className="flex items-center gap-2">
          <svg
            className="w-7 h-7 text-purple-600"
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
          <span className="text-lg font-bold text-gray-900">InstaDown</span>
        </a>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
