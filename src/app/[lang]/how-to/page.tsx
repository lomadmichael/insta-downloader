"use client";

import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const guides = [
  {
    key: "download",
    route: "download",
    emoji: "📥",
    gradient: "from-purple-500 to-violet-500",
    shadow: "shadow-purple-500/20",
  },
  {
    key: "lineBreak",
    route: "line-break",
    emoji: "↵",
    gradient: "from-violet-500 to-purple-500",
    shadow: "shadow-violet-500/20",
  },
  {
    key: "blankSpace",
    route: "blank-space",
    emoji: "⎵",
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20",
  },
  {
    key: "fonts",
    route: "fonts",
    emoji: "𝐀",
    gradient: "from-fuchsia-500 to-pink-500",
    shadow: "shadow-fuchsia-500/20",
  },
  {
    key: "characterCounter",
    route: "character-counter",
    emoji: "#",
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/20",
  },
  {
    key: "imageResizer",
    route: "image-resizer",
    emoji: "🖼",
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
  },
  {
    key: "reelsThumbnail",
    route: "reels-thumbnail",
    emoji: "🎬",
    gradient: "from-rose-500 to-red-500",
    shadow: "shadow-rose-500/20",
  },
] as const;

type GuideKey = (typeof guides)[number]["key"];

export default function HowToPage() {
  const dict = useDictionary();
  const locale = useLocale();
  const guideCards = dict.howTo.guideCards as Record<string, string>;

  const getGuideName = (key: GuideKey): string => {
    return guideCards[key];
  };

  const getGuideDesc = (key: GuideKey): string => {
    return guideCards[`${key}Desc`];
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 animate-gradient">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" />
            <div className="absolute top-1/3 -right-20 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl animate-float-delayed" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-sm font-medium text-white/90 border border-white/20">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              How-To Guides
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              {dict.howTo.title}
            </h1>
            <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
              {dict.howTo.subtitle}
            </p>
          </div>
        </section>

        {/* Guide Cards Grid */}
        <section className="max-w-5xl mx-auto px-4 py-12 sm:py-16 -mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guides.map((guide) => (
              <Link
                key={guide.key}
                href={`/${locale}/how-to/${guide.route}`}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-indigo-100 hover:-translate-y-0.5"
              >
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${guide.gradient} flex items-center justify-center text-white text-2xl mb-5 shadow-lg ${guide.shadow} group-hover:scale-110 transition-transform duration-300`}>
                    {guide.emoji}
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors duration-300">
                    {getGuideName(guide.key)}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {getGuideDesc(guide.key)}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center text-indigo-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
