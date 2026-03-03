import type { Metadata } from "next";
import { getDictionary } from "@/i18n/get-dictionary";
import { isValidLocale } from "@/i18n/config";
import FontsClient from "./FontsClient";

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
    title: dict.tools.fonts.metaTitle,
    description: dict.tools.fonts.metaDescription,
    openGraph: {
      title: dict.tools.fonts.metaTitle,
      description: dict.tools.fonts.metaDescription,
      type: "website",
      locale: lang === "ko" ? "ko_KR" : "en_US",
      siteName: "InstaDown",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.tools.fonts.metaTitle,
      description: dict.tools.fonts.metaDescription,
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/tools/fonts`,
      languages: {
        ko: `${baseUrl}/ko/tools/fonts`,
        en: `${baseUrl}/en/tools/fonts`,
      },
    },
  };
}

export default async function FontsPage({
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
      { "@type": "ListItem", position: 3, name: dict.tools.fonts.title },
    ],
  };

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: dict.tools.fonts.metaTitle,
    description: dict.tools.fonts.metaDescription,
    url: `${baseUrl}/${lang}/tools/fonts`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: lang === "ko" ? "KRW" : "USD" },
    inLanguage: lang,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <FontsClient />
    </>
  );
}
