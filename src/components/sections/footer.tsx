"use client";

  import React from 'react';
  import Link from 'next/link';
  import { Linkedin, Github, Youtube, Instagram } from 'lucide-react';
  import { ThemeToggle } from '../theme-toggle';
  import { useLanguage } from '@/components/language-provider';

    const TelegramIcon = ({ size = 24 }: { size?: number }) => (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      >
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    );


  const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { language, t } = useLanguage();

    const links = [
      { label: t("nav.about"), href: '/about' },
      { label: t("nav.blogs"), href: '/blogs' },
    ];

    const socialLinks = [
      { 
        label: 'YouTube', 
        href: 'https://youtube.com/@ziyodulla_abdullayev', 
        icon: <Youtube size={16} /> 
      },
      { 
        label: 'Instagram', 
        href: 'https://instagram.com/ziyodulla__abdullayev', 
        icon: <Instagram size={16} /> 
      },
      { 
        label: 'Telegram', 
        href: 'https://t.me/abdullayevziyodulla', 
        icon: <TelegramIcon size={16} /> 
      },
      { 
        label: 'LinkedIn', 
        href: 'https://linkedin.com/in/abdullayevziyodulla', 
        icon: <Linkedin size={16} /> 
      },
      { 
        label: 'GitHub', 
        href: 'https://github.com/abdullayevziyodulla', 
        icon: <Github size={16} /> 
      },
    ];

    return (
      <footer className="w-full bg-background border-t border-border pt-[64px] pb-[32px] px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-[64px]">
            {/* Brand Column */}
            <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-6">
              <Link href="/" className="inline-block">
                <span className="text-xl font-bold tracking-tight text-foreground">
                  Ziyodulla
                </span>
              </Link>
            <p className="text-[16px] leading-[1.6] font-light text-muted-foreground max-w-[360px]">
              {t("footer.description")}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all hover:text-primary hover:border-primary"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-[16px] font-semibold text-foreground mb-5">{t("footer.quick_links")}</h3>
            <ul className="flex flex-col gap-3">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-normal text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[14px] text-muted-foreground">
                  © {currentYear} Ziyodulla Abdullayev
                </span>
                <ThemeToggle />
              </div>
              {language === "en" && (
                <>
                  <span className="text-[14px] text-muted-foreground hidden sm:inline">•</span>
                  <p className="text-[14px] text-muted-foreground hidden sm:inline">
                    {t("footer.rights")}
                  </p>
                </>
              )}
            </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
