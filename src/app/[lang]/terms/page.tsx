"use client";

import { useDictionary } from "@/i18n/use-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  const dict = useDictionary();

  const sections = [
    { title: dict.terms.section1Title, content: dict.terms.section1Content },
    { title: dict.terms.section2Title, content: dict.terms.section2Content },
    { title: dict.terms.section3Title, content: dict.terms.section3Content },
    { title: dict.terms.section4Title, content: dict.terms.section4Content },
    { title: dict.terms.section5Title, content: dict.terms.section5Content },
    { title: dict.terms.section6Title, content: dict.terms.section6Content },
    { title: dict.terms.section7Title, content: dict.terms.section7Content },
    { title: dict.terms.section8Title, content: dict.terms.section8Content },
  ];

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {dict.terms.title}
        </h1>
        <p className="text-sm text-gray-500 mb-8">{dict.terms.lastUpdated}</p>
        <p className="text-gray-700 leading-relaxed mb-10">
          {dict.terms.intro}
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
