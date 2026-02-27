"use client";

import { useDictionary } from "@/i18n/use-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  const dict = useDictionary();

  const sections = [
    { title: dict.privacy.section1Title, content: dict.privacy.section1Content },
    { title: dict.privacy.section2Title, content: dict.privacy.section2Content },
    { title: dict.privacy.section3Title, content: dict.privacy.section3Content },
    { title: dict.privacy.section4Title, content: dict.privacy.section4Content },
    { title: dict.privacy.section5Title, content: dict.privacy.section5Content },
    { title: dict.privacy.section6Title, content: dict.privacy.section6Content },
    { title: dict.privacy.section7Title, content: dict.privacy.section7Content },
    { title: dict.privacy.section8Title, content: dict.privacy.section8Content },
  ];

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {dict.privacy.title}
        </h1>
        <p className="text-sm text-gray-500 mb-8">{dict.privacy.lastUpdated}</p>
        <p className="text-gray-700 leading-relaxed mb-10">
          {dict.privacy.intro}
        </p>

        {sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {section.title}
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
