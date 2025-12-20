"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "uz" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  uz: {
    "nav.home": "Asosiy",
    "nav.blogs": "Bloglar",
    "nav.about": "Haqida",
    "footer.quick_links": "Tezkor linklar",
    "footer.description": "Ziyodulla Abdullayevning shaxsiy blogi. Texnologiya, dasturlash va hayotdagi sayohatim haqida.",
    "footer.rights": "",
  },
  en: {
    "nav.home": "Home",
    "nav.blogs": "Blogs",
    "nav.about": "About",
    "footer.quick_links": "Quick Links",
    "footer.description": "Personal blog of Ziyodulla Abdullayev. Sharing my journey through technology, development, and life.",
    "footer.rights": "",
  },
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("uz");

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
      language: "uz" as Language,
      setLanguage: () => {},
      t: (key: string) => key,
    };
  }
  return context;
};
