"use client";

import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";

export default function Footer() {
  const dict = useDictionary();
  const locale = useLocale();

  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-500 mb-2">
          {dict.footer.disclaimer1}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {dict.footer.disclaimer2}
        </p>
        <div className="flex items-center justify-center gap-4 mb-4">
          <Link
            href={`/${locale}/privacy`}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {dict.footer.privacy}
          </Link>
          <span className="text-xs text-gray-300">|</span>
          <Link
            href={`/${locale}/terms`}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {dict.footer.terms}
          </Link>
        </div>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} InstaDown
        </p>
      </div>
    </footer>
  );
}
