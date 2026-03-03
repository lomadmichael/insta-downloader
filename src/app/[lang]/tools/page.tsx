import type { Metadata } from "next";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import ToolsIndexClient from "./ToolsIndexClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const baseUrl = "https://instadownload.me";

  const title = lang === "ko"
    ? "인스타그램 도구 모음 - 무료 인스타 유틸리티 | InstaDown"
    : "Instagram Tools - Free Instagram Utilities | InstaDown";
  const description = lang === "ko"
    ? "인스타 줄바꾸기, 공백문자, 폰트 변환기, 글자수 세기, 이미지 리사이저, 릴스 썸네일 추출 등 인스타그램 활용에 유용한 무료 도구 모음입니다."
    : "Free Instagram tools: line break generator, blank space, font generator, character counter, image resizer, and reels thumbnail extractor.";

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
      canonical: `${baseUrl}/${lang}/tools`,
      languages: {
        ko: `${baseUrl}/ko/tools`,
        en: `${baseUrl}/en/tools`,
      },
    },
  };
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) return null;
  const dict = await getDictionary(lang);
  const baseUrl = "https://instadownload.me";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "InstaDown", item: `${baseUrl}/${lang}` },
      { "@type": "ListItem", position: 2, name: dict.nav.tools },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ToolsIndexClient />
    </>
  );
}
