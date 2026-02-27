import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { faqJsonLd } from "@/lib/faq-data";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "InstaDown - 인스타그램 사진 & 릴스 다운로더 | 무료 인스타 저장",
  description:
    "인스타그램 사진, 릴스 영상, 캐러셀 게시물을 무료로 다운로드하세요. URL만 붙여넣으면 고화질 원본 저장이 가능합니다. 회원가입 불필요, 무료 인스타 다운로더.",
  keywords: [
    "인스타그램 다운로더",
    "인스타 사진 다운로드",
    "인스타 릴스 다운로드",
    "인스타 영상 저장",
    "인스타그램 사진 저장",
    "instagram downloader",
    "instagram reels download",
    "인스타 다운로드",
    "릴스 저장",
    "인스타그램 동영상 다운로드",
  ],
  openGraph: {
    title: "InstaDown - 인스타그램 사진 & 릴스 다운로더",
    description:
      "인스타그램 게시물 URL을 붙여넣고 사진, 릴스 영상을 무료로 다운로드하세요. 회원가입 불필요!",
    type: "website",
    locale: "ko_KR",
    siteName: "InstaDown",
  },
  twitter: {
    card: "summary_large_image",
    title: "InstaDown - 인스타그램 사진 & 릴스 다운로더",
    description:
      "인스타그램 게시물 URL을 붙여넣고 사진, 릴스 영상을 무료로 다운로드하세요.",
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
    canonical: "https://insta-downloader.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "InstaDown",
    description:
      "인스타그램 사진, 릴스 영상, 캐러셀 게시물을 무료로 다운로드할 수 있는 웹 서비스",
    url: "https://insta-downloader.vercel.app",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    inLanguage: "ko",
  };

  return (
    <html lang="ko">
      <head>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      </head>
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
