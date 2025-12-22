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
    "hero.greeting": "Salom, men ",
    "hero.name": "Ziyodulla Abdullayev",
    "hero.title": "Sun'iy intellekt va darturlash haqida eng so'nggi foydali ma'lumotlarni blogimda yozib boraman.",
    "hero.description": "Hozirda Fullstack dasturlashni Scrimba.com da o'rganyapman. Scrimba uchun 20 % chegirmani va sun'iy intellekt websitelar uchun chegirmalarni pastdagi linklardan olishingiz mumkin.",
    "hero.subscribe": "Obuna bo'lish",
    "feed.title": "Oxirgi maqolalar",
    "feed.no_posts": "Hozircha maqolalar yo'q.",
    "feed.all_blogs": "Barcha maqolalar",
    "affiliates.title": "Hamkorlik va foydali uskunalar",
    "footer.quick_links": "Havolalar",
    "footer.description": "Ziyodulla Abdullayevning shaxsiy blogi.",
    "footer.rights": ""
  },
  en: {
    "nav.blogs": "blog",
    "nav.about": "About",
    "hero.greeting": "I'm ",
    "hero.name": "Ziyodulla Abdullayev",
    "hero.title": "I share my journey building with AI and valuable insights on my YouTube channel.",
    "hero.description": "Learn about AI tools, development hacks, and get exclusive discounts through my affiliate links. Check out my latest videos and articles on the blog.",
    "hero.subscribe": "Subscribe",
    "feed.title": "Latest posts",
    "feed.no_posts": "No blog posts yet.",
    "feed.all_blogs": "All Blogs",
    "affiliates.title": "Affiliates & Useful Tools",
    "footer.quick_links": "Quick Links",
    "footer.description": "Personal blog of Ziyodulla Abdullayev.",
    "footer.rights": ""
  }

};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: {children: React.ReactNode;}) => {
  const [language, setLanguage] = useState<Language>("uz");

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>);

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