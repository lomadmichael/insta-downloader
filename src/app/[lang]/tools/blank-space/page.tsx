import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale } from "@/i18n/config";
import BlankSpaceClient from "./BlankSpaceClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const baseUrl = "https://instadownload.me";

  return {
    title: dict.tools.blankSpace.metaTitle,
    description: dict.tools.blankSpace.metaDescription,
    openGraph: {
      title: dict.tools.blankSpace.metaTitle,
      description: dict.tools.blankSpace.metaDescription,
      type: "website",
      locale: lang === "ko" ? "ko_KR" : "en_US",
      siteName: "InstaDown",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.tools.blankSpace.metaTitle,
      description: dict.tools.blankSpace.metaDescription,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/tools/blank-space`,
      languages: {
        ko: `${baseUrl}/ko/tools/blank-space`,
        en: `${baseUrl}/en/tools/blank-space`,
        "x-default": `${baseUrl}/en/tools/blank-space`,
      },
    },
  };
}

export default async function BlankSpacePage({
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
      { "@type": "ListItem", position: 2, name: dict.nav.tools, item: `${baseUrl}/${lang}/tools` },
      { "@type": "ListItem", position: 3, name: dict.tools.blankSpace.title },
    ],
  };

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: dict.tools.blankSpace.metaTitle,
    description: dict.tools.blankSpace.metaDescription,
    url: `${baseUrl}/${lang}/tools/blank-space`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: lang === "ko" ? "KRW" : "USD" },
    inLanguage: lang,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.blankSpace.map((faq: { question: string; answer: string }) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlankSpaceClient />
    </>
  );
}
