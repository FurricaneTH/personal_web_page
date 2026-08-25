"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "tr" | "en";

const LanguageContext = createContext<{
  language: Language;
  toggleLanguage: () => void;
}>({ language: "tr", toggleLanguage: () => undefined });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("tr");

  useEffect(() => {
    const saved = window.localStorage.getItem("furkan-language");
    if (saved === "tr" || saved === "en") setLanguage(saved);
  }, []);

  const toggleLanguage = () => {
    setLanguage((current) => {
      const next = current === "tr" ? "en" : "tr";
      window.localStorage.setItem("furkan-language", next);
      return next;
    });
  };

  const value = useMemo(() => ({ language, toggleLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
