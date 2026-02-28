import { locales } from "@/i18n/config";
import HowToDetailClient from "./HowToDetailClient";

const ALL_SLUGS = [
  "download",
  "line-break",
  "blank-space",
  "fonts",
  "character-counter",
  "image-resizer",
  "reels-thumbnail",
];

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    ALL_SLUGS.map((slug) => ({ lang, slug }))
  );
}

export default function HowToDetailPage() {
  return <HowToDetailClient />;
}
