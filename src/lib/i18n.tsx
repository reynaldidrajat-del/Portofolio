"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "./data";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => {},
  toggle: () => {},
});

const STORAGE_KEY = "rd-portfolio-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "id") setLocaleState(saved);
      else if (navigator.language?.startsWith("id")) setLocaleState("id");
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === "en" ? "id" : "en");
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** Helper: pick localized string */
export function useT() {
  const { locale } = useLanguage();
  return function t<T>(obj: { en: T; id: T }): T {
    return obj[locale];
  };
}
