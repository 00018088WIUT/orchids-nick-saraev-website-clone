"use client";

import React, { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blogs" },
    { label: "About", href: "/about" },
  ];

  return (
    <header 
      className={`sticky top-0 z-[1000] w-full px-4 sm:px-6 transition-colors duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'}`}
    >
      <div className="max-w-[1200px] mx-auto py-4 md:py-6 flex items-center justify-between gap-4 relative">
        
        {/* Logo Section */}
        <div className="flex-1 flex justify-start">
          <a href="/" className="block shrink-0">
            <span className="text-xl font-bold tracking-tight text-foreground">
              Ziyodulla<span className="text-primary">.</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation Pill */}
        <nav 
          className="hidden lg:flex items-center justify-center p-1 border border-border rounded-full bg-card/80 backdrop-blur-sm transition-all duration-300 shadow-pill"
        >
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href}
                  className="flex items-center px-6 py-2 rounded-full hover:bg-muted cursor-pointer transition-colors text-sm font-medium text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <button 
            className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-xl hover:text-primary transition-colors text-foreground"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="flex lg:hidden items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-xl hover:text-primary transition-colors text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-x-0 top-[64px] md:top-[84px] bg-background border-t border-border shadow-xl z-[100] transition-all duration-300 transform lg:hidden ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible pointer-events-none'
        }`}
      >
        <div className="px-4 py-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                className="py-2 text-lg font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
