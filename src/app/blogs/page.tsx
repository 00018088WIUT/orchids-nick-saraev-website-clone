import React from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import Link from "next/link";

export default async function BlogsPage() {
  const { data: posts, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 max-w-[1200px] mx-auto w-full py-16 px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-12">All Blogs</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="group flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:border-primary transition-all duration-300"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                    {post.excerpt || "Read more about this post..."}
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="size-6 rounded-full overflow-hidden border border-border">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=ZA&backgroundColor=60a5fa`}
                          alt="Ziyodulla"
                          className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-xs font-medium text-foreground">Ziyodulla Abdullayev</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-muted-foreground">
              No blog posts found. Check back later!
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
