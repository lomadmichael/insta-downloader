"use client";

import { useDictionary } from "@/i18n/use-dictionary";

export default function HowToUse() {
  const dict = useDictionary();

  const steps = [
    {
      title: dict.howToUse.step1Title,
      description: dict.howToUse.step1Desc,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.07-9.07l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
        </svg>
      ),
      color: "from-violet-500 to-purple-500",
    },
    {
      title: dict.howToUse.step2Title,
      description: dict.howToUse.step2Desc,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: "from-fuchsia-500 to-pink-500",
    },
    {
      title: dict.howToUse.step3Title,
      description: dict.howToUse.step3Desc,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      ),
      color: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <section className="py-10 bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
            HOW IT WORKS
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-gray-100">
              <div className={`shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-sm`}>
                {step.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-gray-900 mb-0.5">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
