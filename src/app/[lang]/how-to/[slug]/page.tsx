import type { Metadata } from "next";
import { locales, isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import HowToDetailClient from "./HowToDetailClient";

const ALL_SLUGS = [
  "download", "line-break", "blank-space", "fonts",
  "character-counter", "image-resizer", "reels-thumbnail",
];

const SLUG_TO_KEY: Record<string, string> = {
  "download": "download",
  "line-break": "lineBreak",
  "blank-space": "blankSpace",
  "fonts": "fonts",
  "character-counter": "characterCounter",
  "image-resizer": "imageResizer",
  "reels-thumbnail": "reelsThumbnail",
};

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    ALL_SLUGS.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const baseUrl = "https://instadownload.me";
  const key = SLUG_TO_KEY[slug];
  if (!key) return {};

  const data = (dict.howTo as Record<string, any>)[key];
  if (!data?.metaTitle) return {};

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      type: "article",
      locale: lang === "ko" ? "ko_KR" : "en_US",
      siteName: "InstaDown",
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/how-to/${slug}`,
      languages: {
        ko: `${baseUrl}/ko/how-to/${slug}`,
        en: `${baseUrl}/en/how-to/${slug}`,
        "x-default": `${baseUrl}/en/how-to/${slug}`,
      },
    },
  };
}

function parseStepsFromContent(content: string): { name: string; text: string }[] {
  const steps: { name: string; text: string }[] = [];
  const lines = content.split("\n");
  let currentStep: { name: string; text: string } | null = null;

  for (const line of lines) {
    const stepMatch = line.match(/^###\s+(.+)/);
    if (stepMatch) {
      if (currentStep) steps.push(currentStep);
      currentStep = { name: stepMatch[1], text: "" };
    } else if (currentStep && line.trim() && !line.startsWith("##")) {
      const clean = line.replace(/\*\*/g, "").replace(/^- /, "");
      currentStep.text += (currentStep.text ? " " : "") + clean;
    } else if (line.startsWith("## ") && currentStep) {
      steps.push(currentStep);
      currentStep = null;
    }
  }
  if (currentStep) steps.push(currentStep);
  return steps;
}

export default async function HowToDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return <HowToDetailClient />;
  const dict = await getDictionary(lang);
  const baseUrl = "https://instadownload.me";
  const key = SLUG_TO_KEY[slug];

  if (!key) return <HowToDetailClient />;
  const data = (dict.howTo as Record<string, any>)[key];
  if (!data) return <HowToDetailClient />;

  const howToLabel = lang === "ko" ? "HOW TO 가이드" : "HOW TO Guides";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "InstaDown", item: `${baseUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: howToLabel, item: `${baseUrl}/${lang}/how-to` },
      { "@type": "ListItem", position: 3, name: data.title },
    ],
  };

  const steps = parseStepsFromContent(data.content);
  const howToJsonLd = steps.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: data.title,
    description: data.metaDescription,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {howToJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      )}
      <HowToDetailClient />
    </>
  );
}
