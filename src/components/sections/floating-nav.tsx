"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation bar after scrolling 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#" },
    { label: "Products", href: "#" },
    { label: "Free Courses", href: "#" },
    { label: "Resources", href: "#" },
  ];

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[1000] transition-all duration-300 ease-in-out transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <nav className="flex items-center gap-1 p-1 bg-white/90 backdrop-blur-md border border-[#e2e8f0] rounded-full shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
        <ul className="flex items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.label} className="group relative">
              <Link
                href={link.href}
                className="flex items-center gap-1 px-4 py-1.5 text-[13px] font-medium text-[#1a1a1a] transition-colors rounded-full hover:bg-[#f1f5f9]"
              >
                <span>{link.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#64748b] stroke-[2.5px]" />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="https://leftclicker.gumroad.com/l/110-steps"
          className="ml-1 bg-[#0091ff] hover:bg-[#0081e6] text-white text-[13px] font-medium px-5 py-2 rounded-full transition-all duration-200 hover:brightness-105 shadow-[0_4px_6px_-1px_rgba(0,145,255,0.2)] active:scale-95"
        >
          Free Roadmap to $25K
        </Link>
      </nav>
    </div>
  );
};

export default FloatingNav;