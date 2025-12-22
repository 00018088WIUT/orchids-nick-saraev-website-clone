"use client";

import React from "react";
import { FaYoutube } from "react-icons/fa";

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
}

export default function YouTubeContent({ videos, title }: YouTubeContentProps) {
  return (
    <section className="px-4 sm:px-6 mb-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="border-b border-border mb-8 flex justify-between items-center pb-2.5">
          <h2 className="text-[14px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
            {title}
          </h2>
        </div>

        <div className={videos.length === 1 ? "max-w-[800px] mx-auto" : "grid grid-cols-1 md:grid-cols-3 gap-6"}>
          {videos.map((video) => (
            <div key={video.id} className="group flex flex-col gap-3">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              
              <div>
                <h3 className="text-[18px] md:text-[20px] font-medium leading-snug line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span 
                      className="text-[13px] text-muted-foreground block font-light"
                      suppressHydrationWarning
                  >
                    {new Date(video.published).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
