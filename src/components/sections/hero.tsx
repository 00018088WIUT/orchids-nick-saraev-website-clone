"use client";

  import React from 'react';
  import Image from 'next/image';
  import { useLanguage } from '@/components/language-provider';
  import { Linkedin, Github, Youtube, Instagram } from 'lucide-react';
  import { FaXTwitter, FaTiktok } from 'react-icons/fa6';

    const TelegramIcon = ({ size = 24 }: { size?: number }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21.928 2.484c-.313-1.244-1.488-1.884-2.644-1.454L2.43 7.954c-1.222.487-1.235 1.188-.235 1.494l4.46 1.392L17.33 4.52c.152-.135.543-.296.636-.199.094.097.016.45-.133.61L8.23 14.67l-.382 4.213c.358.05.577-.15.773-.33l2.075-1.958 4.322 3.183c.789.435 1.483.212 1.686-.717L21.928 2.484z" />
      </svg>
    );


  const HeroSection: React.FC = () => {
    const { t, language } = useLanguage();

    const socialLinks = language === "en"
      ? [
          { label: 'YouTube', href: 'https://youtube.com/@ziyodulla_ai', icon: <Youtube size={20} /> },
          { label: 'Instagram', href: 'https://instagram.com/ziyodulla_ai', icon: <Instagram size={20} /> },
          { label: 'TikTok', href: 'https://tiktok.com/@ziyodulla_ai', icon: <FaTiktok size={20} /> },
          { label: 'X', href: 'https://x.com/ziyodulla_ai', icon: <FaXTwitter size={20} /> },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/abdullayevziyodulla', icon: <Linkedin size={20} /> },
          { label: 'GitHub', href: 'https://github.com/abdullayevziyodulla', icon: <Github size={20} /> },
        ]
      : [
          { label: 'YouTube', href: 'https://youtube.com/@ziyodulla_abdullayev', icon: <Youtube size={20} /> },
          { label: 'Instagram', href: 'https://instagram.com/ziyodulla__abdullayev', icon: <Instagram size={20} /> },
          { label: 'Telegram', href: 'https://t.me/abdullayevziyodulla', icon: <TelegramIcon size={20} /> },
          { label: 'TikTok', href: 'https://tiktok.com/@ziyodulla_abdullayev', icon: <FaTiktok size={20} /> },
          { label: 'LinkedIn', href: 'https://linkedin.com/in/abdullayevziyodulla', icon: <Linkedin size={20} /> },
          { label: 'GitHub', href: 'https://github.com/abdullayevziyodulla', icon: <Github size={20} /> },
        ];

      return (
        <section className="px-4 sm:px-6 mb-16 overflow-hidden w-full flex justify-center">
          <div className="py-16 md:py-24 max-w-[1200px] w-full flex flex-col md:flex-row items-center md:items-center gap-12 md:gap-20">
            
            {/* Profile Picture & Socials Column */}
            <div className="flex flex-col items-center gap-6 shrink-0">
              <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden border border-border shadow-xl bg-muted">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766425144441.png?width=800&height=1000&resize=contain"
                  alt="Ziyodulla Abdullayev"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Socials - Under Image */}
              <div className="flex gap-3 flex-wrap justify-center max-w-[300px]">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground transition-all hover:text-primary hover:border-primary hover:scale-110"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Text Content */}
            <div 
              className="flex flex-col gap-8 items-center md:items-start text-center md:text-left flex-1 max-w-[650px]"
            >
              {/* Main Headline */}
              <div className="space-y-6">
                <h1 
                  className="font-bold tracking-tight text-[2rem] leading-[1.15] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.75rem] text-foreground font-display"
                >
                  {t("hero.greeting")}<span className="text-primary">{t("hero.name")}</span>
                </h1>
                
                <h2 className="font-medium text-[1.125rem] md:text-[1.25rem] lg:text-[1.375rem] text-foreground leading-relaxed max-w-[600px]">
                  {t("hero.title")}
                </h2>

                <p 
                  className="text-muted-foreground text-[1rem] md:text-[1.0625rem] leading-[1.75] font-sans max-w-[580px]"
                >
                  {t("hero.description").split("Scrimba.com").map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <a 
                          href="https://scrimba.com/?via=u01a3gb" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          Scrimba.com
                        </a>
                      )}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </section>
      );

  };

  export default HeroSection;
