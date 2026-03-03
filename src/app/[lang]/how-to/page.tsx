import type { Metadata } from "next";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import HowToIndexClient from "./HowToIndexClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const baseUrl = "https://instadownload.me";

  const title = lang === "ko"
    ? "HOW TO 가이드 - 인스타그램 기능별 사용법 | InstaDown"
    : "HOW TO Guides - Instagram Feature Guides | InstaDown";
  const description = lang === "ko"
    ? "인스타그램 다운로드, 줄바꾸기, 공백문자, 폰트 변환, 글자수 세기, 이미지 리사이저, 릴스 썸네일 추출 등 기능별 사용 가이드를 확인하세요."
    : "Step-by-step guides for Instagram tools: download, line breaks, blank spaces, fonts, character counter, image resizer, and reels thumbnails.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang === "ko" ? "ko_KR" : "en_US",
      siteName: "InstaDown",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/how-to`,
      languages: {
        ko: `${baseUrl}/ko/how-to`,
        en: `${baseUrl}/en/how-to`,
      },
    },
  };
}

export default async function HowToPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return null;
  const baseUrl = "https://instadownload.me";

  const howToLabel = lang === "ko" ? "HOW TO 가이드" : "HOW TO Guides";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "InstaDown", item: `${baseUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: howToLabel },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <HowToIndexClient />
    </>
  );
}
