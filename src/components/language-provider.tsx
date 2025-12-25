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
  const [language, setLanguageState] = useState<Language>((params?.lang as Language) || "en");

  useEffect(() => {
    if (params?.lang && (params.lang === "uz" || params.lang === "en")) {
      const lang = params.lang as Language;
      setLanguageState(lang);
      localStorage.setItem("language", lang);
      document.cookie = `language=${lang}; path=/; max-age=31536000`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.lang]);

  const setLanguage = (lang: Language) => {
    const segments = pathname.split("/");
    segments[1] = lang;
    const newPath = segments.join("/");
    window.location.href = newPath;
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
      language: "uz" as Language,
      setLanguage: () => {},
      t: (key: string) => key
    };
  }
  return context;
};
