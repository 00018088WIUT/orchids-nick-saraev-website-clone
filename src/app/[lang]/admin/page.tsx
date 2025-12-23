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
  const [activeTab, setActiveTab] = useState<"blogs" | "affiliates">("blogs");
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

  // Affiliate states
  const [affName, setAffName] = useState("");
  const [affDescription, setAffDescription] = useState("");
  const [affLink, setAffLink] = useState("");
  const [affImage, setAffImage] = useState<File | null>(null);
  const [affLoading, setAffLoading] = useState(false);
  const [affiliates, setAffiliates] = useState<any[]>([]);
  const [editingAffiliate, setEditingAffiliate] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCheckingAuth(false);
      if (session) fetchAffiliates();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchAffiliates();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchAffiliates = async () => {
    const { data } = await supabase.from("affiliates").select("*").order("display_order", { ascending: true });
    if (data) setAffiliates(data);
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
    setBlogLoading(false);
  };

  const startEdit = (aff: any) => {
    setEditingAffiliate(aff);
    setAffName(aff.name);
    setAffDescription(aff.description || "");
    setAffLink(aff.link_url || "");
    setAffImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingAffiliate(null);
    setAffName("");
    setAffDescription("");
    setAffLink("");
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
        .update({ name: affName, description: affDescription, image_url, link_url: affLink })
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
        { name: affName, description: affDescription, image_url, link_url: affLink, display_order: affiliates.length },
      ]);

      if (error) {
        alert("Error creating affiliate: " + error.message);
      } else {
        alert("Affiliate added successfully!");
        setAffName("");
        setAffDescription("");
        setAffLink("");
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
            onClick={() => setActiveTab("affiliates")}
            className={`text-lg font-medium transition-colors ${activeTab === "affiliates" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Affiliates
          </button>
        </div>

        {activeTab === "blogs" ? (
          <div>
            <h1 className="text-3xl font-medium mb-8 font-display">Create New Blog</h1>
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
                {blogLoading ? <Loader2 className="animate-spin" /> : "Publish Blog"}
              </button>
            </form>
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
                        <h3 className="font-medium">{aff.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1 max-w-[400px]">{aff.description}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteAffiliate(aff.id)}
                      className="p-2 text-muted-foreground hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
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
