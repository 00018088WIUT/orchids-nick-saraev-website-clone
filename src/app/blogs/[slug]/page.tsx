import React from "react";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// Calculate reading time (average 150 words per minute)
function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 150);
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("language", "en")
    .single();

  if (error || !blog) {
    notFound();
  }

  const readingTime = getReadingTime(blog.content || "");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto w-full py-12 px-4">
        <Link 
          href="/blogs"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blogs
        </Link>

          <article className="prose prose-invert prose-blue max-w-none">
            <header className="mb-12">
              <h1 className="text-2xl md:text-3xl font-semibold mb-4">{blog.title}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                  <span className="hidden sm:inline">•</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{readingTime} min read</span>
                  <span className="hidden sm:inline">•</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full overflow-hidden border border-border">
                    <img
                      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/image-1766425144441.png"
                      alt="Ziyodulla Abdullayev"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">Ziyodulla Abdullayev</span>
                </div>
              </div>
            </header>

            <div className="blog-content max-w-[680px] text-[18px] leading-[32px] font-medium text-[rgb(89,89,89)] dark:text-[rgb(179,179,179)] break-words [&>p]:mt-[24px] [&>p]:mb-0 [&>p]:px-0 [&>p:first-child]:mt-0 [&>h1]:mt-[32px] [&>h2]:mt-[32px] [&>h3]:mt-[24px] [&>ul]:mt-[24px] [&>ol]:mt-[24px] [&>blockquote]:mt-[24px]" style={{ fontFamily: 'Lexend, sans-serif', wordBreak: 'break-word', fontWeight: 500 }}>
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
          </article>
      </main>
      <Footer />
    </div>
  );
}
