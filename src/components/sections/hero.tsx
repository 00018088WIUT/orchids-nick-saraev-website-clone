"use client";

  import React from 'react';
  import Image from 'next/image';
  import { useLanguage } from '@/components/language-provider';
  import { Linkedin, Github, Youtube, Instagram, Send } from 'lucide-react';

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
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2z" />
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
      <section className="px-4 sm:px-6 mb-12 overflow-hidden">
        <div className="py-12 md:py-20 max-w-[1200px] mx-auto flex flex-col items-center gap-10 md:flex-row md:items-center">
          
          {/* Profile Picture Column */}
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-64 h-80 md:w-full md:max-w-xs aspect-[4/5] rounded-[2rem] overflow-hidden border border-border shadow-2xl">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766425144441.png?width=800&height=1000&resize=contain"
                alt="Ziyodulla Abdullayev"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Text Content Column */}
          <div 
            className="md:w-2/3 flex flex-col gap-6 md:gap-8 items-center text-center md:items-start md:text-left"
          >
            {/* Socials - Top Placement */}
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
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

            {/* Main Headline */}
            <div className="space-y-4 md:space-y-5">
              <h1 
                className="font-bold tracking-tight text-[1.75rem] leading-[1.2] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] text-foreground font-display break-words"
              >
                {t("hero.greeting")}<span className="text-primary">{t("hero.name")}</span>.
              </h1>
              
              <h2 className="font-semibold text-lg md:text-xl lg:text-2xl text-foreground leading-snug max-w-[700px]">
                {t("hero.title")}
              </h2>

              {/* Introductory Paragraph */}
              <p 
                className="font-light text-muted-foreground text-base md:text-lg leading-[1.8] max-w-[700px] font-sans"
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
