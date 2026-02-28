"use client";

import { useDictionary } from "@/i18n/use-dictionary";
import UrlInput from "./UrlInput";

interface HeroProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

export default function Hero({ onSubmit, loading }: HeroProps) {
  const dict = useDictionary();

  const steps = [
    {
      title: dict.howToUse.step1Title,
      desc: dict.howToUse.step1Desc,
      num: "1",
    },
    {
      title: dict.howToUse.step2Title,
      desc: dict.howToUse.step2Desc,
      num: "2",
    },
    {
      title: dict.howToUse.step3Title,
      desc: dict.howToUse.step3Desc,
      num: "3",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 animate-gradient text-white">
      {/* Decorative floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 -right-20 w-64 h-64 bg-pink-400/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute -bottom-10 left-1/3 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 pt-16 sm:pt-24 pb-10 sm:pb-14 text-center">
        {/* Instagram icon badge */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-sm font-medium text-white/90 border border-white/20">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          Instagram Downloader
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 leading-[1.1] tracking-tight">
          {dict.hero.titleLine1}
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-pink-200">
            {dict.hero.titleLine2}
          </span>
        </h1>
        <p className="text-white/75 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          {dict.hero.subtitle}
        </p>

        <UrlInput onSubmit={onSubmit} loading={loading} />

        {/* HOW IT WORKS - inline compact */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3 text-left">
                <span className="shrink-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-sm font-bold text-white border border-white/20">
                  {step.num}
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">{step.title}</div>
                  <div className="text-xs text-white/50 leading-snug">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
