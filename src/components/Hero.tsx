"use client";

import { useDictionary } from "@/i18n/use-dictionary";
import UrlInput from "./UrlInput";

interface HeroProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function Hero({ onSubmit, loading }: HeroProps) {
  const dict = useDictionary();

  return (
    <section className="bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
          {dict.hero.titleLine1}
          <br />
          {dict.hero.titleLine2}
        </h1>
        <p className="text-white/80 text-base sm:text-lg mb-10 max-w-xl mx-auto">
          {dict.hero.subtitle}
        </p>
        <UrlInput onSubmit={onSubmit} loading={loading} />
      </div>
    </section>
  );
}
