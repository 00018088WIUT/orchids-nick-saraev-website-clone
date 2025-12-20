import React from "react";
import { supabase } from "@/lib/supabase";
import ReactMarkdown from "react-markdown";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !blog) {
    notFound();
  }

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
              <h1 className="text-4xl md:text-5xl font-medium mb-4">{blog.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-full overflow-hidden border border-border">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=ZA&backgroundColor=60a5fa`}
                      alt="Ziyodulla"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">Ziyodulla Abdullayev</span>
                </div>
              </div>
            </header>

            <div className="text-lg leading-relaxed font-light">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
          </article>
      </main>
      <Footer />
    </div>
  );
}
