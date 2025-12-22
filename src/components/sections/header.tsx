"use client";

  import React, { useState, useEffect } from "react";
  import { Menu, X, Globe } from "lucide-react";
  import { useLanguage } from "@/components/language-provider";
  import Image from "next/image";

  const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
      { label: t("nav.about"), href: "/about" },
      { label: t("nav.blogs"), href: "/blogs" },
    ];

    const toggleLanguage = () => {
      setLanguage(language === "uz" ? "en" : "uz");
    };

    return (
      <header 
        className={`sticky top-0 z-[1000] w-full px-4 sm:px-6 transition-colors duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md' : 'bg-transparent'}`}
      >
        <div className="max-w-[1200px] mx-auto py-4 md:py-6 flex items-center justify-between gap-4 relative">
          
            {/* Logo Section */}
            <div className="flex-1 flex justify-start items-center gap-3">
              <a href="/" className="flex items-center gap-2 shrink-0">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  Ziyodulla Abdullayev
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
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border hover:bg-muted transition-colors text-sm font-medium text-foreground"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            <span>{language.toUpperCase()}</span>
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
