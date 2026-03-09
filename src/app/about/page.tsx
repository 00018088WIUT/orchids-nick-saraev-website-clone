"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { useLanguage } from "@/components/language-provider";
import { supabase } from "@/lib/supabase";

export default function AboutPage() {
  const { t, language } = useLanguage();
  const [aboutContent, setAboutContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("about")
        .select("content")
        .eq("language", language)
        .limit(1)
        .single();
      if (error || !data) {
        setAboutContent("");
      } else {
        setAboutContent(data.content);
      }
      setLoading(false);
    };
    fetchAbout();
  }, [language]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-[720px] mx-auto w-full py-20 px-6">
        <h1 className="text-[30px] font-semibold tracking-tight mb-12 text-foreground">
          {t("nav.about")}
        </h1>
        <div className="space-y-8">
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : aboutContent ? (
            <div className="text-[18px] text-foreground font-medium leading-[1.6] whitespace-pre-line">{aboutContent}</div>
          ) : (
            <p className="text-muted-foreground">No About content found for this language.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
