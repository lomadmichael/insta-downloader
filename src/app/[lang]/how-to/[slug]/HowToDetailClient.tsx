"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useDictionary, useLocale } from "@/i18n/use-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

const SLUG_MAP: Record<string, string> = {
  "download": "download",
  "line-break": "lineBreak",
  "blank-space": "blankSpace",
  "fonts": "fonts",
  "character-counter": "characterCounter",
  "image-resizer": "imageResizer",
  "reels-thumbnail": "reelsThumbnail",
};

const SLUG_COLORS: Record<string, string> = {
  "download": "from-purple-500 via-violet-500 to-indigo-500",
  "line-break": "from-violet-600 via-purple-600 to-fuchsia-600",
  "blank-space": "from-blue-500 via-cyan-500 to-teal-500",
  "fonts": "from-fuchsia-500 via-pink-500 to-rose-500",
  "character-counter": "from-amber-500 via-orange-500 to-red-500",
  "image-resizer": "from-emerald-500 via-teal-500 to-cyan-500",
  "reels-thumbnail": "from-rose-500 via-red-500 to-orange-500",
};

function parseInlineFormatting(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|'([^']+)'/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined) {
      nodes.push(
        <strong key={match.index} className="font-semibold text-gray-900">
          {match[1]}
        </strong>
      );
    } else if (match[2] !== undefined) {
      nodes.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-sm font-mono"
        >
          {match[2]}
        </code>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function parseBoldListItem(line: string): React.ReactNode {
  const stripped = line.replace(/^- /, "");
  return parseInlineFormatting(stripped);
}

function renderContent(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: React.ReactNode[] = [];
  let listType: "bold" | "regular" | null = null;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={`list-${elements.length}`}
          className="space-y-2 mb-4 ml-1"
        >
          {listItems.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-gray-600 leading-relaxed"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
      listType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-2xl font-bold text-gray-900 mt-8 mb-4 first:mt-0"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-lg font-semibold text-gray-800 mt-6 mb-3"
        >
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- **")) {
      if (listType !== "bold") {
        flushList();
        listType = "bold";
      }
      listItems.push(parseBoldListItem(line));
    } else if (line.startsWith("- ")) {
      if (listType !== "regular") {
        flushList();
        listType = "regular";
      }
      listItems.push(parseInlineFormatting(line.slice(2)));
    } else if (line.trim() === "") {
      flushList();
      elements.push(<br key={`br-${i}`} />);
    } else {
      flushList();
      elements.push(
        <p
          key={`p-${i}`}
          className="text-gray-600 leading-relaxed mb-3"
        >
          {parseInlineFormatting(line)}
        </p>
      );
    }
  }

  flushList();
  return elements;
}

interface HowToData {
  title: string;
  subtitle: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
}

export default function HowToDetailClient() {
  const params = useParams<{ lang: string; slug: string }>();
  const dict = useDictionary();
  const locale = useLocale();
  const slug = params.slug;

  const key = SLUG_MAP[slug];
  if (!key) {
    notFound();
  }

  const data = (dict.howTo as Record<string, unknown>)[key] as
    | HowToData
    | undefined;
  if (!data) {
    notFound();
  }

  const gradientColor =
    SLUG_COLORS[slug] || "from-purple-500 via-violet-500 to-indigo-500";
  const backToGuides =
    ((dict.howTo as Record<string, unknown>).backToGuides as string) || "\u2190 Back to Guides";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className={`relative bg-gradient-to-br ${gradientColor} overflow-hidden`}
        >
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Floating Orbs */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 right-16 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse [animation-delay:2s]" />

          <div className="relative max-w-3xl mx-auto px-4 py-16 sm:py-20">
            {/* Back Link Pill */}
            <Link
              href={`/${locale}/how-to`}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium hover:bg-white/25 transition-colors duration-200 mb-8"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              {backToGuides}
            </Link>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              {data.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/75 max-w-2xl leading-relaxed">
              {data.subtitle}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="-mt-6 relative z-10 max-w-3xl mx-auto px-4 pb-16 sm:pb-20">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10">
            {renderContent(data.content)}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
