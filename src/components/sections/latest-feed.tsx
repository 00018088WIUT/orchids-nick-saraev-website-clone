"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Post {
  id: string;
  title: string;
  category: string;
  date: string;
  isFeatured?: boolean;
}

const categories = [
  "All posts",
  "Agency Strategy",
  "The Cusp Newsletter",
  "Futurology",
  "Life Improvement",
  "Miscellaneous",
  "Building in Public",
];

const posts: Post[] = [
  {
    id: "1",
    title: "Next few months",
    category: "Life Improvement",
    date: "Nov 19, 2025",
    isFeatured: true,
  },
  {
    id: "2",
    title: "The next few months of my life",
    category: "Life Improvement",
    date: "Jul 29, 2025",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Thoughts, goals, and actionables for 2025",
    category: "Building in Public",
    date: "Dec 26, 2024",
  },
  {
    id: "4",
    title: "A comprehensive audit of my lifestyle",
    category: "Life Improvement",
    date: "Nov 4, 2024",
  },
  {
    id: "5",
    title: "The next few months of my career",
    category: "Building in Public",
    date: "Sep 3, 2024",
    isFeatured: true,
  },
  {
    id: "6",
    title: "Make.com vs N8N in 2025 (AI Agents, Key Features, & More)",
    category: "YouTube",
    date: "Sep 2, 2024",
  },
  {
    id: "7",
    title: "5 More Automations You Can Sell Today for $1,500 (Or $10,000)",
    category: "YouTube",
    date: "Sep 1, 2024",
  },
  {
    id: "8",
    title: "Hiring pitfalls & how I fix them",
    category: "Agency Strategy",
    date: "Mar 23, 2024",
  },
  {
    id: "9",
    title: "My approach to productization",
    category: "Agency Strategy",
    date: "Mar 15, 2024",
  },
  {
    id: "10",
    title: "Serendipity & network effects",
    category: "Agency Strategy",
    date: "Mar 13, 2024",
  },
  {
    id: "11",
    title: "Building internet statues",
    category: "Building in Public",
    date: "Mar 8, 2024",
  },
  {
    id: "12",
    title: "Expected value & how to choose the right things to work on",
    category: "Agency Strategy",
    date: "Mar 4, 2024",
  },
];

const LatestFeed: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All posts");

  const filteredPosts =
    activeCategory === "All posts"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <section className="px-4 sm:px-6 mb-24">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="border-b border-[#E2E8F0] mb-8">
          <h2 className="text-[14px] font-semibold uppercase tracking-[0.05em] text-[#64748B] pb-2.5">
            Latest
          </h2>
        </div>

        {/* Category Filter */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 whitespace-nowrap min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-[14px] font-medium pb-2 transition-all duration-200 relative ${
                  activeCategory === category
                    ? "text-[#1A1A1A]"
                    : "text-[#64748B] hover:text-[#1A1A1A]"
                }`}
              >
                {category}
                {activeCategory === category && (
                  <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1A1A1A]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="flex flex-col">
          {filteredPosts.map((post) => (
            <a
              key={post.id}
              href={`#post-${post.id}`}
              className="group flex items-center justify-between py-5 border-b border-[#E2E8F0] hover:bg-[#F1F5F9]/30 transition-soft px-1"
            >
              {/* Title Part */}
              <div className="flex-1 flex items-center gap-2">
                <h3 className="text-[18px] font-medium leading-[1.4] text-[#1A1A1A] group-hover:text-[#0091FF] transition-colors">
                  {post.title}
                </h3>
                {post.isFeatured && (
                  <Star className="size-3.5 fill-[#FFC107] text-[#FFC107]" />
                )}
              </div>

              {/* Category (Hidden on very small screens) */}
              <div className="hidden md:block w-48 text-center px-4">
                <span className="text-[14px] text-[#64748B] font-light">
                  {post.category}
                </span>
              </div>

              {/* Date & Author */}
              <div className="flex items-center gap-6">
                <span className="text-[14px] text-[#64748B] font-light w-28 text-right">
                  {post.date}
                </span>
                <div className="size-8 rounded-full overflow-hidden border border-[#E2E8F0] bg-[#F1F5F9]">
                  {/* Nick's Avatar Placeholder */}
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nick"
                    alt="Author"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-8">
          <button className="flex items-center gap-1.5 px-4 py-1.5 text-[14px] font-medium text-[#64748B] border border-[#E2E8F0] rounded-full hover:bg-[#F1F5F9] transition-soft">
            <ChevronLeft className="size-4" />
            Prev
          </button>

          <span className="text-[14px] font-medium text-[#1A1A1A]">
            Page 1 of 11
          </span>

          <button className="flex items-center gap-1.5 px-4 py-1.5 text-[14px] font-medium text-[#1A1A1A] border border-[#E2E8F0] rounded-full hover:bg-[#F1F5F9] transition-soft">
            Next
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default LatestFeed;"