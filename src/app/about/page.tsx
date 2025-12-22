"use client";

import React from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { useLanguage } from "@/components/language-provider";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-[720px] mx-auto w-full py-20 px-6">
        <h1 className="text-[30px] font-semibold tracking-tight mb-12 text-foreground">
          {t("nav.about")}
        </h1>
        
        <div className="space-y-8">
          <p className="text-[18px] text-foreground font-medium leading-[1.6]">
            Salom, men Ziyodulla Abdullayev.
          </p>

            <div className="space-y-6 text-[16px] font-normal text-muted-foreground leading-[1.8]">
              <p>
                Sun&apos;iy intellekt va dasturlash haqida eng so&apos;nggi foydali ma&apos;lumotlarni blogimda yozib boraman. 
                Hozirda Fullstack dasturlashni Scrimba.com da o&apos;rganyapman.
              </p>
            
            <p>
              I started YouTube where i share valuable information about ai and how to build with it. 
              You can find latest videos from my YouTube channel and tools i use with exclusive discounts through my affiliate links.
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
          
          <div className="pt-12 mt-12 border-t border-border">
            <h2 className="text-[20px] font-semibold mb-6">Let&apos;s Connect</h2>
            <p className="text-[16px] text-muted-foreground leading-[1.8]">
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
