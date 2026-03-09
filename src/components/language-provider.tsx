"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";

import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: {children: React.ReactNode;}) => {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  // Always default to English
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Set language to English and persist it
    setLanguageState("en");
    localStorage.setItem("language", "en");
    document.cookie = `language=en; path=/; max-age=31536000`;
  }, []);

  const setLanguage = (lang: Language) => {
    // Language switching disabled - always stay on English
    return;
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    return {
      language: "en" as Language,
      setLanguage: () => {},
      t: (key: string) => key
    };
  }
  return context;
};
