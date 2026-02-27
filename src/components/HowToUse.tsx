"use client";

import { useDictionary } from "@/i18n/use-dictionary";

export default function HowToUse() {
  const dict = useDictionary();

  const steps = [
    {
      title: dict.howToUse.step1Title,
      description: dict.howToUse.step1Desc,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.07-9.07l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
        </svg>
      ),
      color: "from-violet-500 to-purple-500",
      bgLight: "bg-violet-50",
    },
    {
      title: dict.howToUse.step2Title,
      description: dict.howToUse.step2Desc,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: "from-fuchsia-500 to-pink-500",
      bgLight: "bg-fuchsia-50",
    },
    {
      title: dict.howToUse.step3Title,
      description: dict.howToUse.step3Desc,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      ),
      color: "from-orange-500 to-amber-500",
      bgLight: "bg-orange-50",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-600 mb-3">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl font-bold text-gray-900">
            {dict.howToUse.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden sm:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[2px] bg-gradient-to-r from-gray-200 to-gray-200" />
              )}

              <div className="relative bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-lg hover:border-purple-100 transition-all duration-300">
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3">
                  <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                    Step {index + 1}
                  </span>
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} text-white mb-5 shadow-lg shadow-purple-500/10`}>
                  {step.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
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
