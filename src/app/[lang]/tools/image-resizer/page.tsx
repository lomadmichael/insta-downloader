import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale } from "@/i18n/config";
import ImageResizerClient from "./ImageResizerClient";

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
    title: dict.tools.imageResizer.metaTitle,
    description: dict.tools.imageResizer.metaDescription,
    openGraph: {
      title: dict.tools.imageResizer.metaTitle,
      description: dict.tools.imageResizer.metaDescription,
      type: "website",
      locale: lang === "ko" ? "ko_KR" : "en_US",
      siteName: "InstaDown",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.tools.imageResizer.metaTitle,
      description: dict.tools.imageResizer.metaDescription,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/tools/image-resizer`,
      languages: {
        ko: `${baseUrl}/ko/tools/image-resizer`,
        en: `${baseUrl}/en/tools/image-resizer`,
        "x-default": `${baseUrl}/en/tools/image-resizer`,
      },
    },
  };
}

export default async function ImageResizerPage({
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
      { "@type": "ListItem", position: 3, name: dict.tools.imageResizer.title },
    ],
  };

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: dict.tools.imageResizer.metaTitle,
    description: dict.tools.imageResizer.metaDescription,
    url: `${baseUrl}/${lang}/tools/image-resizer`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: lang === "ko" ? "KRW" : "USD" },
    inLanguage: lang,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.imageResizer.map((faq: { question: string; answer: string }) => ({
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
      <ImageResizerClient />
    </>
  );
}
