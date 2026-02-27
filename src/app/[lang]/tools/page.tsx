"use client";

import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const tools = [
  {
    key: "lineBreak" as const,
    route: "line-break",
    emoji: "↵",
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/20",
  },
  {
    key: "blankSpace" as const,
    route: "blank-space",
    emoji: "⎵",
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20",
  },
  {
    key: "fonts" as const,
    route: "fonts",
    emoji: "𝐀",
    gradient: "from-fuchsia-500 to-pink-500",
    shadow: "shadow-fuchsia-500/20",
  },
  {
    key: "characterCounter" as const,
    route: "character-counter",
    emoji: "#",
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-500/20",
  },
  {
    key: "imageResizer" as const,
    route: "image-resizer",
    emoji: "🖼",
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
  },
  {
    key: "reelsThumbnail" as const,
    route: "reels-thumbnail",
    emoji: "🎬",
    gradient: "from-rose-500 to-red-500",
    shadow: "shadow-rose-500/20",
  },
] as const;

type ToolKey = (typeof tools)[number]["key"];

export default function ToolsPage() {
  const dict = useDictionary();
  const locale = useLocale();

  const getToolName = (key: ToolKey): string => {
    return dict.tools.toolCards[key] as string;
  };

  const getToolDesc = (key: ToolKey): string => {
    const descKey = `${key}Desc` as keyof typeof dict.tools.toolCards;
    return dict.tools.toolCards[descKey] as string;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 animate-gradient">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" />
            <div className="absolute top-1/3 -right-20 w-64 h-64 bg-pink-400/15 rounded-full blur-3xl animate-float-delayed" />
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384-3.19A.6.6 0 015.67 11.4l5.384-3.192a.6.6 0 01.928.504v6.384a.6.6 0 01-.562.574z" />
              </svg>
              Free Instagram Tools
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              {dict.tools.title}
            </h1>
            <p className="text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
              {dict.tools.subtitle}
            </p>
          </div>
        </section>

        {/* Tool Cards Grid */}
        <section className="max-w-5xl mx-auto px-4 py-12 sm:py-16 -mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <Link
                key={tool.key}
                href={`/${locale}/tools/${tool.route}`}
                className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-purple-100 hover:-translate-y-1"
              >
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white text-2xl mb-5 shadow-lg ${tool.shadow} group-hover:scale-110 transition-transform duration-300`}>
                    {tool.emoji}
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
                    {getToolName(tool.key)}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {getToolDesc(tool.key)}
                  </p>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center text-purple-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
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
