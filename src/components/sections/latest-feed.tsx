"use client";

  import React, { useState, useEffect } from "react";
  import { ChevronLeft, ChevronRight, Star, Loader2 } from "lucide-react";
  import { supabase } from "@/lib/supabase";
  import { useLanguage } from "@/components/language-provider";

  interface Post {
    id: string;
    title: string;
    excerpt: string;
    slug: string;
    created_at: string;
  }

    const LatestFeed: React.FC = () => {
      const [posts, setPosts] = useState<Post[]>([]);
      const [loading, setLoading] = useState(true);
      const { t, language } = useLanguage();

      useEffect(() => {
        const fetchPosts = async () => {
          const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('language', language)
            .order('created_at', { ascending: false });
          
          if (data) setPosts(data);
          setLoading(false);
        };

        fetchPosts();
      }, [language]);

      if (loading) {
        return (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        );
      }

      return (
        <section className="px-4 sm:px-6 mb-24">
          <div className="max-w-[1200px] mx-auto">
            <div className="border-b border-border mb-8">
              <h2 className="text-[14px] font-semibold uppercase tracking-[0.05em] text-muted-foreground pb-2.5">
                {t("feed.title")}
              </h2>
            </div>

            <div className="flex flex-col">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <a
                    key={post.id}
                    href={`/${language}/blogs/${post.slug}`}
                    className="group flex items-center justify-between py-5 border-b border-border hover:bg-card/30 transition-all px-1"
                  >
                  <div className="flex-1 flex items-center gap-2">
                    <h3 className="text-[18px] font-medium leading-[1.4] text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </div>

                    <div className="flex items-center gap-6">
                      <span 
                        className="text-[14px] text-muted-foreground font-light w-28 text-right"
                        suppressHydrationWarning
                      >
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>

                    <div className="size-8 rounded-full overflow-hidden border border-border bg-card">
                        <img
                          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/image-1766425144441.png"
                          alt="Ziyodulla Abdullayev"
                          className="w-full h-full object-cover"
                        />
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="py-10 text-center text-muted-foreground">
                {t("feed.no_posts")}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };

export default LatestFeed;
