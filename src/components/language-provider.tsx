"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";

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
      "hero.title": "Hozirda men frontend dasturlash bilan shug'ullanaman va Scrimba hamda YouTube orqali darslar olib boraman.",
      "hero.description": "Hozirda Fullstack dasturlashni Scrimba.com platformasida o'rganyapman. Sun'iy intellekt va dasturlash haqida eng so'nggi foydali ma'lumotlarni blogimda yozib boraman.",
      "hero.subscribe": "Obuna bo'lish",
      "hero.email_placeholder": "email kiriting",
      "feed.title": "Oxirgi maqolalar",
      "feed.no_posts": "Hozircha maqolalar yo'q.",
        "feed.all_blogs": "Barcha maqolalar",
        "youtube.title": "Oxirgi YouTube videolari",
        "youtube.more": "YouTube'da ko'rish",
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
      "hero.title": "Currently, I'm working with frontend development and teaching through Scrimba and YouTube.",
      "hero.description": "Currently learning Fullstack development at Scrimba.com. I write about the latest useful information regarding AI and programming on my blog.",
      "hero.subscribe": "Subscribe",
      "hero.email_placeholder": "Your email address",
      "feed.title": "Latest posts",
      "feed.no_posts": "No blog posts yet.",
        "feed.all_blogs": "All Blogs",
        "youtube.title": "Latest YouTube Videos",
        "youtube.more": "Watch on YouTube",
        "affiliates.title": "Affiliates & Useful Tools",
      "footer.quick_links": "Quick Links",
      "footer.description": "Personal blog of Ziyodulla Abdullayev.",
      "footer.rights": ""
    }
};

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
  }, [params?.lang]);

  const setLanguage = (lang: Language) => {
    const segments = pathname.split("/");
    // pathname starts with /, so segments[0] is "", segments[1] is the locale
    segments[1] = lang;
    const newPath = segments.join("/");
    router.push(newPath);
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
