"use client";

import React from "react";
import { FaYoutube } from "react-icons/fa";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
            <FaYoutube className="text-sm text-[#FF0000]" />
            {moreText}
          </a>
        </div>

        <div className={videos.length === 1 ? "max-w-[800px] mx-auto" : "grid grid-cols-1 md:grid-cols-3 gap-6"}>
          {videos.map((video) => (
            <div key={video.id} className="group flex flex-col gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative aspect-video rounded-xl overflow-hidden border border-border group-hover:border-primary/50 transition-colors text-left outline-none">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                      <div className="w-16 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300">
                        <FaYoutube className="text-[#FF0000] text-4xl" />
                      </div>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl p-0 bg-black border-none overflow-hidden aspect-video">
                  <DialogHeader className="hidden">
                    <DialogTitle>{video.title}</DialogTitle>
                  </DialogHeader>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </DialogContent>
              </Dialog>
              
              <div>
                <h3 className="text-[18px] md:text-[20px] font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span 
                      className="text-[13px] text-muted-foreground block font-light"
                      suppressHydrationWarning
                  >
                    {new Date(video.published).toLocaleDateString()}
                  </span>
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-medium text-muted-foreground hover:text-[#FF0000] flex items-center gap-1 transition-colors"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
