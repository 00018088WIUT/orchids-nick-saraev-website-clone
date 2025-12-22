"use client";

  import React from 'react';
  import Image from 'next/image';
  import { useLanguage } from '@/components/language-provider';
  import { Linkedin, Github, Youtube, Instagram } from 'lucide-react';

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
        <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.75a2.25 2.25 0 0 0 .125 4.148l3.75 1.125a1.125 1.125 0 0 0 1.25-.43l5.25-6.75a.375.375 0 1 1 .58.473l-4.5 5.25a1.125 1.125 0 0 0-.25.872l.75 5.25a2.25 2.25 0 0 0 4.148.125l6.75-16.5a2.242 2.242 0 0 0-2.381-2.531Z" />
      </svg>
    );


  const HeroSection: React.FC = () => {
    const { t } = useLanguage();

    const socialLinks = [
      { 
        label: 'YouTube', 
        href: 'https://youtube.com/@ziyodulla_abdullayev', 
        icon: <Youtube size={20} /> 
      },
      { 
        label: 'Instagram', 
        href: 'https://instagram.com/ziyodulla__abdullayev', 
        icon: <Instagram size={20} /> 
      },
      { 
        label: 'Telegram', 
        href: 'https://t.me/abdullayevziyodulla', 
        icon: <TelegramIcon size={20} /> 
      },
      { 
        label: 'LinkedIn', 
        href: 'https://linkedin.com/in/abdullayevziyodulla', 
        icon: <Linkedin size={20} /> 
      },
      { 
        label: 'GitHub', 
        href: 'https://github.com/abdullayevziyodulla', 
        icon: <Github size={20} /> 
      },
    ];

      return (
        <section className="px-4 sm:px-6 mb-12 overflow-hidden w-full flex justify-center">
          <div className="py-12 md:py-20 max-w-[1200px] w-full flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
            
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
              <div className="flex gap-4 flex-wrap justify-center">
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
              className="flex flex-col gap-6 md:gap-8 items-center md:items-start text-center md:text-left flex-1"
            >
              {/* Main Headline */}
              <div className="space-y-4 md:space-y-5">
                <h1 
                  className="font-bold tracking-tight text-[1.75rem] leading-[1.2] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] text-foreground font-display break-words"
                >
                  {t("hero.greeting")}<span className="text-primary">{t("hero.name")}</span>
                </h1>
                
                <h2 className="font-semibold text-lg md:text-xl lg:text-2xl text-foreground/90 leading-snug">
                  {t("hero.title")}
                </h2>

                <p 
                  className="font-light text-muted-foreground text-base md:text-lg leading-[1.8] font-sans"
                >
                  {t("hero.description")}
                </p>
              </div>

              {/* Subscription Form */}
              <div className="w-full max-w-md">
                <form 
                  className="relative w-full bg-card border border-border flex items-center rounded-2xl p-1.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/20 transition-all duration-200"
                >
                  <input 
                    type="email"
                    placeholder="Your email address"
                    required
                    className="bg-transparent text-foreground flex-[2] py-2 px-3 text-sm md:text-base border-none focus:ring-0 placeholder:text-muted-foreground/60 outline-none w-full"
                  /> 
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground font-medium rounded-xl transition-all duration-200 hover:brightness-110 whitespace-nowrap"
                  >
                    <span>{t("hero.subscribe")}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      );

  };

  export default HeroSection;
