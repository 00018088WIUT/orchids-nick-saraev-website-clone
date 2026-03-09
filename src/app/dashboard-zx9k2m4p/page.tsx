"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, LogOut, Trash2, Pencil, X } from "lucide-react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

const AdminPanel = () => {
  const [session, setSession] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<"blogs" | "affiliates" | "about">("blogs");
  
  // About states
  const [aboutContent, setAboutContent] = useState("");
  const [aboutLoading, setAboutLoading] = useState(false);
  const [editingAbout, setEditingAbout] = useState<any>(null);
  const [aboutEntries, setAboutEntries] = useState<any[]>([]);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Blog states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  const router = useRouter();

  const fetchAbout = async () => {
    const { data } = await supabase.from("about").select("*").eq("language", "en").order("created_at", { ascending: false });
    if (data) setAboutEntries(data);
  };

  const fetchBlogs = async () => {
    const { data } = await supabase.from("blogs").select("*").eq("language", "en").order("created_at", { ascending: false });
    if (data) setBlogs(data);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCheckingAuth(false);
      if (session) {
        fetchBlogs();
        fetchAbout();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchBlogs();
        fetchAbout();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAboutLoading(true);
    
    const existing = aboutEntries.find((entry) => entry.language === "en");
    if (existing && !editingAbout) {
      setEditingAbout(existing);
      setAboutContent(existing.content);
      setAboutLoading(false);
      alert("About section already exists. Editing it instead.");
      return;
    }
    
    if (editingAbout || existing) {
      const idToUpdate = editingAbout ? editingAbout.id : existing.id;
      const { error } = await supabase
        .from("about")
        .update({ content: aboutContent, language: "en" })
        .eq("id", idToUpdate);
      if (error) {
        alert("Error updating about: " + error.message);
      } else {
        alert("About updated successfully!");
        cancelAboutEdit();
        fetchAbout();
      }
    } else {
      const { error } = await supabase.from("about").insert([
        { content: aboutContent, language: "en" },
      ]);
      if (error) {
        alert("Error creating about: " + error.message);
      } else {
        alert("About created successfully!");
        setAboutContent("");
        fetchAbout();
      }
    }
    setAboutLoading(false);
  };

  const startAboutEdit = (about: any) => {
    setEditingAbout(about);
    setAboutContent(about.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelAboutEdit = () => {
    setEditingAbout(null);
    setAboutContent("");
  };

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

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlogLoading(true);

    if (editingBlog) {
      const { error } = await supabase
        .from("blogs")
        .update({ title, slug, excerpt, content, language: "en" })
        .eq("id", editingBlog.id);

      if (error) {
        alert("Error updating blog: " + error.message);
      } else {
        alert("Blog updated successfully!");
        cancelBlogEdit();
        fetchBlogs();
      }
    } else {
      const { error } = await supabase.from("blogs").insert([
        { title, slug, excerpt, content, language: "en" },
      ]);

      if (error) {
        alert("Error creating blog: " + error.message);
      } else {
        alert("Blog created successfully!");
        setTitle("");
        setSlug("");
        setExcerpt("");
        setContent("");
        fetchBlogs();
      }
    }
    setBlogLoading(false);
  };

  const startBlogEdit = (blog: any) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setSlug(blog.slug);
    setExcerpt(blog.excerpt || "");
    setContent(blog.content || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelBlogEdit = () => {
    setEditingBlog(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchBlogs();
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

        <div className="flex gap-4 mb-8 border-b border-border pb-4">
          <button 
            onClick={() => setActiveTab("blogs")}
            className={`text-lg font-medium transition-colors ${activeTab === "blogs" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Blogs
          </button>
          <button 
            onClick={() => setActiveTab("about")}
            className={`text-lg font-medium transition-colors ${activeTab === "about" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            About
          </button>
        </div>

        {activeTab === "about" ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-medium font-display">{editingAbout ? "Edit About" : "Create About Section"}</h1>
              {editingAbout && (
                <button 
                  type="button" 
                  onClick={cancelAboutEdit}
                  className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={14} />
                  Cancel Edit
                </button>
              )}
            </div>
            <form onSubmit={handleAboutSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium font-sans">Content</label>
                <textarea
                  value={aboutContent}
                  onChange={(e) => setAboutContent(e.target.value)}
                  rows={8}
                  required
                  className="bg-card border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors font-sans"
                  placeholder="Write about section content..."
                />
              </div>
              <button
                type="submit"
                disabled={aboutLoading}
                className="bg-primary text-primary-foreground font-medium py-4 rounded-lg hover:brightness-110 transition-all flex justify-center items-center disabled:opacity-50 font-sans"
              >
                {aboutLoading ? <Loader2 className="animate-spin" /> : (editingAbout ? "Update About" : "Publish About")}
              </button>
            </form>

            <div className="mt-12 space-y-4">
              <h2 className="text-xl font-medium mb-4 font-display">Existing About Sections</h2>
              {aboutEntries.length === 0 ? (
                <p className="text-muted-foreground italic">No about section yet.</p>
              ) : (
                aboutEntries.map((about) => (
                  <div key={about.id} className="flex items-center justify-between bg-card border border-border p-4 rounded-xl group">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground line-clamp-2">{about.content}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => startAboutEdit(about)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-medium font-display">{editingBlog ? "Edit Blog" : "Create New Blog"}</h1>
              {editingBlog && (
                <button 
                  type="button" 
                  onClick={cancelBlogEdit}
                  className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={14} />
                  Cancel Edit
                </button>
              )}
            </div>
            <form onSubmit={handleBlogSubmit} className="flex flex-col gap-6">
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
                disabled={blogLoading}
                className="bg-primary text-primary-foreground font-medium py-4 rounded-lg hover:brightness-110 transition-all flex justify-center items-center disabled:opacity-50 font-sans"
              >
                {blogLoading ? <Loader2 className="animate-spin" /> : (editingBlog ? "Update Blog" : "Publish Blog")}
              </button>
            </form>

            <div className="mt-12 space-y-4">
              <h2 className="text-xl font-medium mb-4 font-display">Existing Blogs</h2>
              {blogs.length === 0 ? (
                <p className="text-muted-foreground italic">No blogs yet.</p>
              ) : (
                blogs.map((blog) => (
                  <div key={blog.id} className="flex items-center justify-between bg-card border border-border p-4 rounded-xl group">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{blog.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{blog.excerpt || blog.slug}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => startBlogEdit(blog)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => deleteBlog(blog.id)}
                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
