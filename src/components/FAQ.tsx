"use client";

import { useState } from "react";
import { useDictionary } from "@/i18n/use-dictionary";

export default function FAQ() {
  const dict = useDictionary();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-600 mb-3">
            FAQ
          </span>
          <h2 className="text-3xl font-bold text-gray-900">
            {dict.faq.title}
          </h2>
        </div>
        <div className="space-y-3">
          {dict.faq.items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-purple-200 shadow-md shadow-purple-500/5"
                    : "border-gray-100 shadow-sm hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className={`font-semibold pr-4 transition-colors ${isOpen ? "text-purple-700" : "text-gray-800"}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? "bg-purple-100 text-purple-600 rotate-180"
                      : "bg-gray-100 text-gray-400"
                  }`}>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`accordion-content ${isOpen ? "open" : ""}`}>
                  <div className="accordion-inner">
                    <div className="px-6 pb-5">
                      <p className="text-gray-500 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
