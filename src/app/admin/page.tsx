"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

const AdminPanel = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(val.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("blogs").insert([
      { title, slug, excerpt, content },
    ]);

    if (error) {
      alert("Error creating blog: " + error.message);
    } else {
      alert("Blog created successfully!");
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto w-full py-12 px-4">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-8">Create New Blog</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
              className="bg-card border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors"
              placeholder="Enter blog title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="bg-card border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors"
              placeholder="blog-slug"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="bg-card border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors"
              placeholder="Short summary of the blog"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Content (Markdown supported)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={10}
              className="bg-card border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors font-mono text-sm"
              placeholder="Write your blog content here..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground font-bold py-4 rounded-lg hover:brightness-110 transition-all flex justify-center items-center disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Publish Blog"}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
