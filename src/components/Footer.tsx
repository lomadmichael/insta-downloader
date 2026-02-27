"use client";

import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";

export default function Footer() {
  const dict = useDictionary();
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Top section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
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

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}/tools`}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {dict.nav.tools}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {dict.footer.privacy}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {dict.footer.terms}
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p>{dict.footer.disclaimer1}</p>
            <p>&copy; {new Date().getFullYear()} InstaDown</p>
          </div>
          <p className="text-xs text-gray-600 text-center sm:text-left mt-2">
            {dict.footer.disclaimer2}
          </p>
        </div>
      </div>
    </footer>
  );
}
