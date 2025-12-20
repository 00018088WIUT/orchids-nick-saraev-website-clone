"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, ChevronDown, Menu, X, Sun, Moon } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      label: "About",
      slug: "about",
      subItems: [
        { label: "Who is Nick Saraev?", href: "https://nicksaraev.com/about/" },
        { label: "Biography", href: "https://nicksaraev.com/biography/" },
      ],
    },
    {
      label: "Products",
      slug: "products",
      subItems: [
        { label: "Maker School", href: "https://www.skool.com/makerschool/about" },
        { label: "MMWM", href: "https://www.skool.com/makemoneywithmake/about" },
      ],
    },
    {
      label: "Free Courses",
      slug: "free-courses",
      subItems: [
        { label: "N8N Full Course (6hrs)", href: "https://nicksaraev.com/" },
        { label: "Make.com for Making Money (57hrs)", href: "https://www.youtube.com/watch?v=PjKHs-L6Sn4&list=PLSbQllRagIuSuiPQzqcNNbst3IWs58vDF" },
        { label: "Build & Scale an Automation Agency (16hrs)", href: "https://www.youtube.com/watch?v=T7qAiuWDwLw&list=PLSbQllRagIuSxGY2QGlfghPHDfTbnOG5S" },
      ],
    },
    {
      label: "Resources",
      slug: "resources",
      subItems: [
        { label: "Journal Entries", href: "https://nicksaraev.com/tag/lfimpr/" },
        { label: "YouTube Channel", href: "https://youtube.com/@nicksaraev" },
        { label: "Twitter/X", href: "https://x.com/nicksaraev" },
      ],
    },
  ];

  return (
    <header 
      className={`sticky top-0 z-[1000] w-full px-4 sm:px-6 transition-colors duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-white lg:bg-transparent'}`}
    >
      <div className="max-w-[1200px] mx-auto py-4 md:py-6 flex items-center justify-between gap-4 relative">
        
        {/* Logo Section */}
        <div className="flex-1 flex justify-start">
          <a href="https://nicksaraev.com" className="block shrink-0">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0a11ba3b-064b-46ae-8a64-25cfaa3ed80d-nicksaraev-com/assets/images/Untitled-design--12--1-1.png"
              alt="Nick Saraev"
              width={140}
              height={30}
              className="h-8 w-auto md:h-9 object-contain"
              priority
            />
          </a>
        </div>

        {/* Desktop Navigation Pill */}
        <nav 
          className="hidden lg:flex items-center justify-center p-1 border border-[#E2E8F0] rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300 shadow-sm"
        >
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <li 
                key={item.slug} 
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.slug)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="flex items-center px-4 py-1.5 rounded-full hover:bg-[#F1F5F9] cursor-pointer transition-colors">
                  <span className="text-sm font-normal text-[#1A1A1A]">{item.label}</span>
                  <ChevronDown className="ml-1 w-4 h-4 text-[#64748B] transition-transform duration-200 group-hover:rotate-180" />
                </div>
                
                {/* Dropdown Menu */}
                <ul 
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max min-w-[200px] bg-white border border-[#E2E8F0] rounded-xl shadow-2xl py-2 px-1.5 transition-all duration-200 ${
                    activeDropdown === item.slug ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'
                  }`}
                >
                  {item.subItems.map((sub, idx) => (
                    <li key={idx}>
                      <a 
                        href={sub.href}
                        className="block w-full px-4 py-1.5 text-sm text-[#1A1A1A] hover:bg-[#F1F5F9] rounded-lg transition-colors"
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {/* Scrolling CTA in Pill */}
          <a 
            href="https://leftclicker.gumroad.com/l/110-steps"
            className={`flex items-center justify-center bg-[#0091FF] text-white text-sm font-medium h-8 rounded-full transition-all duration-300 overflow-hidden shadow-[0_4px_10px_rgba(0,145,255,0.3)] hover:brightness-105 ${
              isScrolled ? 'w-[180px] px-4 ml-2 opacity-100' : 'w-0 p-0 opacity-0 ml-0 pointer-events-none'
            }`}
          >
            <span className="whitespace-nowrap">Free Roadmap to $25K</span>
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <button 
            className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-xl hover:text-[#0091FF] transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Primary CTA (Desktop) */}
          <a 
            href="https://leftclicker.gumroad.com/l/110-steps"
            className="hidden md:flex items-center justify-center bg-[#0091FF] text-white text-sm font-medium px-5 py-2 rounded-xl transition-all duration-300 hover:brightness-105 shadow-[0_4px_12px_rgba(0,145,255,0.2)]"
          >
            Free Roadmap to $25K
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="flex lg:hidden items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-xl hover:text-[#0091FF] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-x-0 top-[64px] md:top-[84px] bg-white border-t border-[#E2E8F0] shadow-xl z-[100] transition-all duration-300 transform lg:hidden ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
        }`}
      >
        <div className="px-4 py-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <div key={item.slug} className="flex flex-col">
                <button 
                  className="flex items-center justify-between py-2 text-base font-medium text-[#1A1A1A] hover:text-[#0091FF]"
                  onClick={() => setActiveDropdown(activeDropdown === item.slug ? null : item.slug)}
                >
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.slug ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === item.slug && (
                  <div className="flex flex-col gap-2 pl-4 mt-2 border-l border-[#E2E8F0]">
                    {item.subItems.map((sub, idx) => (
                      <a 
                        key={idx} 
                        href={sub.href}
                        className="py-1.5 text-sm text-[#64748B] hover:text-[#0091FF] transition-colors"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
            <div className="flex gap-1 p-1 bg-[#F1F5F9] rounded-lg">
              <button className="p-1.5 bg-white text-[#0091FF] rounded shadow-sm" aria-label="Light mode">
                <Sun className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-[#64748B] hover:text-[#1A1A1A]" aria-label="Dark mode">
                <Moon className="w-4 h-4" />
              </button>
            </div>
            <a 
              href="https://leftclicker.gumroad.com/l/110-steps"
              className="bg-[#0091FF] text-white text-sm font-medium px-4 py-2 rounded-xl"
            >
              Get Roadmap
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;"