import React from "react";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto w-full py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">About Me</h1>
        
        <div className="prose prose-invert prose-orange max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Hello! I&apos;m Ziyodulla Abdullayev. I am a passionate individual who loves technology, coding, and sharing knowledge.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">My Journey</h2>
          <p className="mb-6">
            I started this blog as a way to document my experiences and share what I learn along the way. 
            I believe in the power of open-source and continuous learning.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">What I Do</h2>
          <p className="mb-6">
            Currently, I am focused on building meaningful software and exploring the latest trends in the tech world. 
            When I&apos;m not coding, you can find me reading or exploring nature.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Let&apos;s Connect</h2>
          <p>
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
            Feel free to reach out to me!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
