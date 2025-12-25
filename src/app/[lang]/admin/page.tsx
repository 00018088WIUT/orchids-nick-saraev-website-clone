"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, LogOut, Plus, Trash2, Image as ImageIcon, Pencil, X } from "lucide-react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

const AdminPanel = () => {
  const [session, setSession] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<"blogs" | "affiliates" | "about">("blogs");
    // About states
    const [aboutContent, setAboutContent] = useState("");
    const [aboutLanguage, setAboutLanguage] = useState<'uz' | 'en'>('uz');
    const [aboutLoading, setAboutLoading] = useState(false);
    const [editingAbout, setEditingAbout] = useState<any>(null);
    const [aboutEntries, setAboutEntries] = useState<any[]>([]);
    const fetchAbout = async () => {
      const { data } = await supabase.from("about").select("*").order("created_at", { ascending: false });
      if (data) setAboutEntries(data);
    };
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
  const [blogLanguage, setBlogLanguage] = useState<"uz" | "en">("uz");
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingBlog, setEditingBlog] = useState<any>(null);

  // Affiliate states
  const [affName, setAffName] = useState("");
  const [affDescription, setAffDescription] = useState("");
  const [affLink, setAffLink] = useState("");
  const [affImage, setAffImage] = useState<File | null>(null);
  const [affLanguage, setAffLanguage] = useState<'uz' | 'en'>('uz');
  const [affLoading, setAffLoading] = useState(false);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [editingAffiliate, setEditingAffiliate] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCheckingAuth(false);
      if (session) {
        fetchAffiliates();
        fetchBlogs();
        fetchAbout();
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchAffiliates();
        fetchBlogs();
        fetchAbout();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // About section handlers (moved to component scope)
  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAboutLoading(true);
    // Check if an About entry for the selected language already exists
    const existing = aboutEntries.find((entry) => entry.language === aboutLanguage);
    if (existing && !editingAbout) {
      // If editing is not active, but entry exists, start editing that entry
      setEditingAbout(existing);
      setAboutContent(existing.content);
      setAboutLoading(false);
      alert("About section for this language already exists. Please edit it instead.");
      return;
    }
    if (editingAbout || existing) {
      // Update existing entry
      const idToUpdate = editingAbout ? editingAbout.id : existing.id;
      const { error } = await supabase
        .from("about")
        .update({ content: aboutContent, language: aboutLanguage })
        .eq("id", idToUpdate);
      if (error) {
        alert("Error updating about: " + error.message);
      } else {
        alert("About updated successfully!");
        cancelAboutEdit();
        fetchAbout();
      }
    } else {
      // Create new entry
      const { error } = await supabase.from("about").insert([
        { content: aboutContent, language: aboutLanguage },
      ]);
      if (error) {
        alert("Error creating about: " + error.message);
      } else {
        alert("About created successfully!");
        setAboutContent("");
        setAboutLanguage('uz');
        fetchAbout();
      }
    }
    setAboutLoading(false);
  };

  const startAboutEdit = (about: any) => {
    setEditingAbout(about);
    setAboutContent(about.content);
    setAboutLanguage(about.language);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelAboutEdit = () => {
    setEditingAbout(null);
    setAboutContent("");
    setAboutLanguage('uz');
  };

  const fetchAffiliates = async () => {
    const { data } = await supabase.from("affiliates").select("*").order("display_order", { ascending: true });
    if (data) setAffiliates(data);
  };

  const fetchBlogs = async () => {
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (data) setBlogs(data);
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
      // Update existing blog
      const { error } = await supabase
        .from("blogs")
        .update({ title, slug, excerpt, content, language: blogLanguage })
        .eq("id", editingBlog.id);

      if (error) {
        alert("Error updating blog: " + error.message);
      } else {
        alert("Blog updated successfully!");
        cancelBlogEdit();
        fetchBlogs();
      }
    } else {
      // Create new blog
      const { error } = await supabase.from("blogs").insert([
        { title, slug, excerpt, content, language: blogLanguage },
      ]);

      if (error) {
        alert("Error creating blog: " + error.message);
      } else {
        alert("Blog created successfully!");
        setTitle("");
        setSlug("");
        setExcerpt("");
        setContent("");
        setBlogLanguage("uz");
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
    setBlogLanguage(blog.language || "uz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelBlogEdit = () => {
    setEditingBlog(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setBlogLanguage("uz");
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchBlogs();
  };

  const startEdit = (aff: any) => {
    setEditingAffiliate(aff);
    setAffName(aff.name);
    setAffDescription(aff.description || "");
    setAffLink(aff.link_url || "");
    setAffLanguage(aff.language || 'uz');
    setAffImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingAffiliate(null);
    setAffName("");
    setAffDescription("");
    setAffLink("");
    setAffLanguage('uz');
    setAffImage(null);
  };

  const handleAffiliateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAffLoading(true);

    let image_url = "";
    if (affImage) {
      const fileName = `${Date.now()}-${affImage.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from("affiliates")
        .upload(fileName, affImage);

      if (uploadError) {
        alert("Error uploading image: " + uploadError.message);
        setAffLoading(false);
        return;
      }
      
      const { data: { publicUrl } } = supabase.storage.from("affiliates").getPublicUrl(fileName);
      image_url = publicUrl;
    } else if (editingAffiliate) {
      image_url = editingAffiliate.image_url;
    }

    if (editingAffiliate) {
      const { error } = await supabase
        .from("affiliates")
        .update({ name: affName, description: affDescription, image_url, link_url: affLink, language: affLanguage })
        .eq("id", editingAffiliate.id);

      if (error) {
        alert("Error updating affiliate: " + error.message);
      } else {
        alert("Affiliate updated successfully!");
        cancelEdit();
        fetchAffiliates();
      }
    } else {
      const { error } = await supabase.from("affiliates").insert([
        { name: affName, description: affDescription, image_url, link_url: affLink, display_order: affiliates.length, language: affLanguage },
      ]);

      if (error) {
        alert("Error creating affiliate: " + error.message);
      } else {
        alert("Affiliate added successfully!");
        setAffName("");
        setAffDescription("");
        setAffLink("");
        setAffLanguage('uz');
        setAffImage(null);
        fetchAffiliates();
      }
    }
    setAffLoading(false);
  };

  const deleteAffiliate = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from("affiliates").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchAffiliates();
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
              {/* Email field removed as requested */}
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
            onClick={() => setActiveTab("affiliates")}
            className={`text-lg font-medium transition-colors ${activeTab === "affiliates" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Affiliates
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
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium font-sans">Language</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAboutLanguage('uz')}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all font-sans ${
                      aboutLanguage === 'uz'
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary"
                    }`}
                  >
                    🇺🇿 O'zbek
                  </button>
                  <button
                    type="button"
                    onClick={() => setAboutLanguage('en')}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all font-sans ${
                      aboutLanguage === 'en'
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary"
                    }`}
                  >
                    🇬🇧 English
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {aboutLanguage === 'uz' ? "About will show on /uz pages" : "About will show on /en pages"}
                </p>
              </div>
              <button
                type="submit"
                disabled={aboutLoading}
                className="bg-primary text-primary-foreground font-medium py-4 rounded-lg hover:brightness-110 transition-all flex justify-center items-center disabled:opacity-50 font-sans"
              >
                {aboutLoading ? <Loader2 className="animate-spin" /> : (editingAbout ? "Update About" : "Publish About")}
              </button>
            </form>
            {/* Existing About List */}
            <div className="mt-12 space-y-4">
              <h2 className="text-xl font-medium mb-4 font-display">Existing About Sections</h2>
              {aboutEntries.length === 0 ? (
                <p className="text-muted-foreground italic">No about section yet.</p>
              ) : (
                aboutEntries.map((about) => (
                  <div key={about.id} className="flex items-center justify-between bg-card border border-border p-4 rounded-xl group">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${about.language === "uz" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}`}>
                          {about.language === "uz" ? "🇺🇿 UZ" : "🇬🇧 EN"}
                        </span>
                      </div>
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
        ) : activeTab === "blogs" ? (
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
                <label className="text-sm font-medium font-sans">Language</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setBlogLanguage("uz")}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all font-sans ${
                      blogLanguage === "uz"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary"
                    }`}
                  >
                    🇺🇿 O'zbek
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogLanguage("en")}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all font-sans ${
                      blogLanguage === "en"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border hover:border-primary"
                    }`}
                  >
                    🇬🇧 English
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {blogLanguage === "uz" ? "Blog will appear on /uz pages" : "Blog will appear on /en pages"}
                </p>
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

            {/* Existing Blogs List */}
            <div className="mt-12 space-y-4">
              <h2 className="text-xl font-medium mb-4 font-display">Existing Blogs</h2>
              {blogs.length === 0 ? (
                <p className="text-muted-foreground italic">No blogs yet.</p>
              ) : (
                blogs.map((blog) => (
                  <div key={blog.id} className="flex items-center justify-between bg-card border border-border p-4 rounded-xl group">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{blog.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded ${blog.language === "uz" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"}`}>
                          {blog.language === "uz" ? "🇺🇿 UZ" : "🇬🇧 EN"}
                        </span>
                      </div>
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
        ) : (
          <div>
            <h1 className="text-3xl font-medium mb-8 font-display">Manage Affiliates</h1>
            
            <form onSubmit={handleAffiliateSubmit} className="flex flex-col gap-6 mb-12 bg-card border border-border p-6 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-medium font-display">{editingAffiliate ? "Edit Affiliate" : "Add New Affiliate"}</h2>
                {editingAffiliate && (
                  <button 
                    type="button" 
                    onClick={cancelEdit}
                    className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={14} />
                    Cancel Edit
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium font-sans">Name</label>
                <input
                  type="text"
                  value={affName}
                  onChange={(e) => setAffName(e.target.value)}
                  required
                  className="bg-background border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors font-sans"
                  placeholder="e.g. Frontend Masters"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium font-sans">Description (Your words)</label>
                <textarea
                  value={affDescription}
                  onChange={(e) => setAffDescription(e.target.value)}
                  rows={2}
                  className="bg-background border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors font-sans"
                  placeholder="e.g. Learn frontend from the masters."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium font-sans">Link URL</label>
                <input
                  type="url"
                  value={affLink}
                  onChange={(e) => setAffLink(e.target.value)}
                  className="bg-background border border-border rounded-lg p-3 outline-none focus:border-primary transition-colors font-sans"
                  placeholder="https://..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium font-sans">Logo/Image</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-background border border-border border-dashed hover:border-primary transition-colors rounded-lg p-4 flex flex-col items-center justify-center gap-2 flex-1">
                    <ImageIcon size={24} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{affImage ? affImage.name : "Click to upload image"}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setAffImage(e.target.files?.[0] || null)}
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium font-sans">Show in</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAffLanguage('uz')}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all font-sans ${
                      affLanguage === 'uz'
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary"
                    }`}
                  >
                    🇺🇿 O'zbek
                  </button>
                  <button
                    type="button"
                    onClick={() => setAffLanguage('en')}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all font-sans ${
                      affLanguage === 'en'
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:border-primary"
                    }`}
                  >
                    🇬🇧 English
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {affLanguage === 'uz' ? "Affiliate will show on /uz pages" : "Affiliate will show on /en pages"}
                </p>
              </div>
              <button
                type="submit"
                disabled={affLoading}
                className="bg-primary text-primary-foreground font-medium py-3 rounded-lg hover:brightness-110 transition-all flex justify-center items-center disabled:opacity-50 font-sans"
              >
                {affLoading ? <Loader2 className="animate-spin" /> : (editingAffiliate ? "Update Affiliate" : "Add Affiliate")}
              </button>
            </form>

            <div className="space-y-4">
              <h2 className="text-xl font-medium mb-4 font-display">Existing Affiliates</h2>
              {affiliates.length === 0 ? (
                <p className="text-muted-foreground italic">No affiliates added yet.</p>
              ) : (
                affiliates.map((aff) => (
                  <div key={aff.id} className="flex items-center justify-between bg-card border border-border p-4 rounded-xl group">
                    <div className="flex items-center gap-4">
                      {aff.image_url ? (
                        <img src={aff.image_url} alt={aff.name} className="w-12 h-12 object-contain rounded bg-background p-1" />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center font-bold text-xs">NO IMG</div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{aff.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded ${aff.language === 'uz' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                            {aff.language === 'uz' ? "🇺🇿 UZ" : "🇬🇧 EN"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1 max-w-[400px]">{aff.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => startEdit(aff)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => deleteAffiliate(aff.id)}
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
