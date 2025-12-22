"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { Loader2 } from "lucide-react";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  created_at: string;
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("language", language)
        .order("created_at", { ascending: false });
      
      if (data) setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, [language]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-[900px] mx-auto w-full py-16 px-6">
        <h1 className="text-[30px] font-semibold tracking-tight mb-12 text-foreground">
          {t("nav.blogs")}
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-12">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${language}/blogs/${post.slug}`}
                  className="group block"
                >
                  <div className="flex flex-col gap-3">
                    <span className="text-[14px] text-muted-foreground font-normal">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    <h3 className="text-[24px] font-semibold text-foreground group-hover:text-primary transition-colors leading-[1.3]">
                      {post.title}
                    </h3>
                    <p className="text-[16px] text-muted-foreground font-normal leading-[1.6] line-clamp-2">
                      {post.excerpt || "Read more about this post..."}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="py-20 text-center text-muted-foreground font-normal">
                {t("feed.no_posts")}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
