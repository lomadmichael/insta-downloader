"use client";

import { useDictionary } from "@/i18n/use-dictionary";

export default function Footer() {
  const dict = useDictionary();

  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-sm text-gray-500 mb-2">
          {dict.footer.disclaimer1}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {dict.footer.disclaimer2}
        </p>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} InstaDown
        </p>
      </div>
    </footer>
  );
}
