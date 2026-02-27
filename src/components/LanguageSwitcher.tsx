"use client";

import { useLocale } from "@/i18n/use-dictionary";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const otherLocale = locale === "ko" ? "en" : "ko";
  const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <a
      href={newPath}
      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg transition-colors hover:bg-gray-50"
    >
      {locale === "ko" ? "English" : "한국어"}
    </a>
  );
}
