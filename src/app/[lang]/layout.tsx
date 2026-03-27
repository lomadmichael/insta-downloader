import type { Metadata } from "next";
import { Noto_Sans_KR, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, type Locale, isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { DictionaryProvider } from "@/i18n/use-dictionary";
import "../globals.css";

const notoSansKR = Noto_Sans_KR({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

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
    verification: {
      google: "IBxCqMbKrAmUF_f1uB-d3AxjQe7xJVve1ue3HBMWSJ8",
    },
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      type: "website",
      locale: lang === "ko" ? "ko_KR" : "en_US",
      siteName: "InstaDown",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        ko: `${baseUrl}/ko`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/en`,
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "InstaDown",
    description: dict.jsonLd.appDescription,
    url: `https://instadownload.me/${lang}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: dict.jsonLd.priceCurrency,
    },
    inLanguage: lang,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const fontClass =
    lang === "ko"
      ? `${notoSansKR.variable} font-sans`
      : `${inter.variable} font-sans`;

  return (
    <html lang={lang}>
      <head>
        <script type="application/ld+json">
          {JSON.stringify(webAppJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      </head>
      <body className={`${fontClass} antialiased`}>
        <DictionaryProvider dictionary={dict} locale={lang as Locale}>
          {children}
        </DictionaryProvider>
      </body>
    </html>
  );
}
