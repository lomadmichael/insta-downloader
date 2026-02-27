"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "./get-dictionary";
import type { Locale } from "./config";

const DictionaryContext = createContext<Dictionary | null>(null);
const LocaleContext = createContext<Locale>("en");

export function DictionaryProvider({
  dictionary,
  locale,
  children,
}: {
  dictionary: Dictionary;
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>
      <DictionaryContext.Provider value={dictionary}>
        {children}
      </DictionaryContext.Provider>
    </LocaleContext.Provider>
  );
}

export function useDictionary(): Dictionary {
  const dict = useContext(DictionaryContext);
  if (!dict)
    throw new Error("useDictionary must be used within DictionaryProvider");
  return dict;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
