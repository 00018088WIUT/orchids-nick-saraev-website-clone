"use client";

import React from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { useLanguage } from "@/components/language-provider";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto w-full py-16 md:py-24 px-4 sm:px-6">
        <h1 className="text-4xl md:text-[3.5rem] font-bold tracking-tight mb-12 font-display">
          {t("nav.about")}
        </h1>
        
        <div className="space-y-10">
          <p className="text-xl md:text-2xl text-foreground font-medium leading-[1.6]">
            {t("hero.greeting")} Ziyodulla Abdullayev.
          </p>

          <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-[1.8] font-sans">
            <p>
              {t("hero.title")}
            </p>
            
            <p>
              {t("hero.description")}
            </p>
            
            <p>
              I believe in the power of building in public and sharing the journey. 
              My goal is to make AI accessible and practical for everyone, 
              from developers to entrepreneurs.
            </p>

            <p>
              Through my YouTube channel and this blog, I document everything I learn 
              about AI agents, neural networks, and modern software development patterns.
            </p>
          </div>
          
          <div className="pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-6 font-display">Let&apos;s Connect</h2>
            <p className="text-lg text-muted-foreground">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to collaborate. 
              Feel free to reach out through any of my social links!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
