"use client";

import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 mb-8 overflow-hidden">
      <div className="py-12 md:py-24 max-w-[1200px] mx-auto flex flex-col items-center gap-8 md:flex-row md:justify-center">
        <div 
          className="z-[2] w-full flex flex-col gap-6 md:gap-8 justify-center max-w-[800px] items-center text-center"
        >
          {/* Profile Picture */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background overflow-hidden shadow-2xl">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766425144441.png?width=800&height=800&resize=contain"
                alt="Ziyodulla Abdullayev"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 md:space-y-6">
            <h1 
              className="font-medium tracking-tight text-[2.25rem] leading-[1.2] sm:text-[3rem] md:text-[3.5rem] lg:text-[4.5rem] text-foreground font-display break-words"
            >
              I&apos;m <span className="text-primary">Ziyodulla Abdullayev</span>. I share my thoughts, experiences, and journey here.
            </h1>

            {/* Introductory Paragraph */}
            <p 
              className="font-light text-muted-foreground text-base md:text-[1.25rem] leading-[1.8] max-w-[700px] mx-auto font-sans px-2"
            >
              Welcome to my personal space. I write about technology, life, and everything in between. 
              Stay tuned for my latest blog posts and updates.
            </p>
          </div>

          {/* Subscription Form */}
          <div className="w-full max-w-md px-2">
            <form 
              className="relative w-full bg-card border border-border flex items-center rounded-[1rem] p-1.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/20 transition-all duration-200"
            >
              <input 
                type="email"
                placeholder="Your email address"
                required
                className="bg-transparent text-foreground flex-[2] py-2 px-3 text-[0.9375rem] md:text-[1rem] border-none focus:ring-0 placeholder:text-muted-foreground/60 outline-none w-full"
              /> 
              <button 
                type="submit"
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-[0.75rem] md:px-7 transition-all duration-200 hover:brightness-110 whitespace-nowrap"
              >
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
