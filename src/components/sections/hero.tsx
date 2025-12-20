"use client";

import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 mb-8">
      <div className="py-16 md:py-24 max-w-[1200px] mx-auto flex flex-col items-center gap-6 lg:gap-8 md:flex-row">
        <div 
          className="z-[2] flex-1 flex flex-col gap-4 md:gap-8 justify-center max-w-[760px] mx-auto items-center text-center"
        >
          {/* Main Headline */}
          <h1 
            className="font-semibold tracking-tight text-[2.5rem] leading-[1.1] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] text-foreground"
          >
            I&apos;m <span className="text-primary">Ziyodulla Abdullayev</span>. I share my thoughts, experiences, and journey here.
          </h1>

          {/* Introductory Paragraph */}
          <p 
            className="font-light text-muted-foreground text-lg md:text-[1.25rem] leading-[1.6] max-w-[700px]"
          >
            Welcome to my personal space. I write about technology, life, and everything in between. 
            Stay tuned for my latest blog posts and updates.
          </p>

          {/* Subscription Form */}
          <div className="w-full max-w-md">
            <form 
              className="relative w-full bg-card border border-border flex items-center rounded-[1rem] p-1.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/20 transition-all duration-200"
            >
              <input 
                type="email"
                placeholder="Your email address"
                required
                className="bg-transparent text-foreground flex-[2] py-2 px-3 text-[1rem] border-none focus:ring-0 placeholder:text-muted-foreground/60 outline-none"
              /> 
              <button 
                type="submit"
                className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground font-medium rounded-[0.75rem] md:px-7 transition-all duration-200 hover:brightness-110"
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
