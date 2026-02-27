import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "InstaDown - 인스타그램 사진 & 릴스 다운로더",
  description:
    "인스타그램 게시물 URL을 붙여넣고 사진, 릴스 영상을 무료로 다운로드하세요.",
  openGraph: {
    title: "InstaDown - 인스타그램 사진 & 릴스 다운로더",
    description:
      "인스타그램 게시물 URL을 붙여넣고 사진, 릴스 영상을 무료로 다운로드하세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
