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
    "nav.blogs": "Blog",
    "nav.about": "Men Haqimda",
    "hero.greeting": "Barchaga salom, Men ",
    "hero.name": "Ziyodulla Abdullayev",
    "hero.title": "Men sun'iy intellekt (AI) bilan ishlash va uni qurish haqidagi qimmatli bilimlarimni ulashadigan YouTube kanalimni boshladim.",
    "hero.description": "Kanalimda AIdan foydalanish, asbob-uskunalar va chegirmali affiliate linklar haqida ma'lumot berib boraman. Shuningdek, qiziqarli maqolalarimni blogimda o'qishingiz mumkin.",
    "hero.subscribe": "Obuna bo'lish",
    "feed.title": "Oxirgi maqolalar",
    "feed.no_posts": "Hozircha maqolalar yo'q.",
    "affiliates.title": "Hamkorlik va foydali uskunalar",
    "footer.quick_links": "Tezkor linklar",
    "footer.description": "Ziyodulla Abdullayevning shaxsiy blogi. Texnologiya, dasturlash va hayotdagi sayohatim haqida.",
    "footer.rights": "",
  },
  en: {
    "nav.blogs": "Blog",
    "nav.about": "About",
    "hero.greeting": "I'm ",
    "hero.name": "Ziyodulla Abdullayev",
    "hero.title": "I share my journey building with AI and valuable insights on my YouTube channel.",
    "hero.description": "Learn about AI tools, development hacks, and get exclusive discounts through my affiliate links. Check out my latest videos and articles on the blog.",
    "hero.subscribe": "Subscribe",
    "feed.title": "Latest posts",
    "feed.no_posts": "No blog posts yet.",
    "affiliates.title": "Affiliates & Useful Tools",
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
