"use client";

import React from "react";
import { FaYoutube } from "react-icons/fa";
import Image from "next/image";

interface YouTubeVideo {
  id: string;
  title: string;
  link: string;
  thumbnail: string;
  published: string;
}

interface YouTubeContentProps {
  videos: YouTubeVideo[];
  title: string;
  moreText: string;
}

export default function YouTubeContent({ videos, title, moreText }: YouTubeContentProps) {
  return (
    <section className="px-4 sm:px-6 mb-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="border-b border-border mb-8 flex justify-between items-center pb-2.5">
          <h2 className="text-[14px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
            {title}
          </h2>
          <a
            href="https://www.youtube.com/@ziyodulla_abdullayev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-medium text-primary hover:underline flex items-center gap-1.5"
          >
            <FaYoutube className="text-sm" />
            {moreText}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border group-hover:border-primary/50 transition-colors">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                  <div className="w-10 h-10 bg-primary/90 text-white rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                    <FaYoutube size={20} />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-[16px] font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <span className="text-[13px] text-muted-foreground mt-2 block font-light">
                  {new Date(video.published).toLocaleDateString()}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
