"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, LogOut } from "lucide-react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

const AdminPanel = () => {
  const [session, setSession] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCheckingAuth(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError(error.message);
    }
    setLoginLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

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
      setTitle("");
      setSlug("");
      setExcerpt("");
      setContent("");
      router.push("/blogs/" + slug);
    }
    setLoading(false);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="bg-card border border-border p-8 rounded-xl w-full max-w-[400px]">
            <h1 className="text-2xl font-medium mb-6 font-display">Admin Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors"
                  placeholder="admin@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>
              {loginError && (
                <p className="text-red-500 text-sm mt-1">{loginError}</p>
              )}
              <button
                type="submit"
                disabled={loginLoading}
                className="bg-primary text-primary-foreground font-medium py-3 rounded-lg hover:brightness-110 transition-all flex justify-center items-center disabled:opacity-50 mt-2"
              >
                {loginLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto w-full py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors text-sm"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>

        <h1 className="text-3xl font-medium mb-8 font-display">Create New Blog</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium font-sans">Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
              className="bg-card border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors font-sans"
              placeholder="Enter blog title"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium font-sans">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="bg-card border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors font-sans"
              placeholder="blog-slug"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium font-sans">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="bg-card border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors font-sans"
              placeholder="Short summary of the blog"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium font-sans">Content (Markdown supported)</label>
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
            className="bg-primary text-primary-foreground font-medium py-4 rounded-lg hover:brightness-110 transition-all flex justify-center items-center disabled:opacity-50 font-sans"
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
