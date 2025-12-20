import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Rss, Sun, Moon } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const nickSaraevLinks = [
    { label: 'About', href: '#' },
    { label: 'Who is Nick Saraev?', href: '/about/' },
    { label: 'Biography', href: '/biography/' },
    { label: 'Products', href: '#' },
    { label: 'Maker School', href: 'https://www.skool.com/makerschool/about' },
    { label: 'MMWM', href: 'https://www.skool.com/makemoneywithmake/about' },
    { label: 'Free Courses', href: '#' },
    { label: 'N8N Full Course (6hrs)', href: '/' },
    { label: 'Make.com for Making Money (57hrs)', href: 'https://www.youtube.com/watch?v=PjKHs-L6Sn4&list=PLSbQllRagIuSuiPQzqcNNbst3IWs58vDF' },
    { label: 'Build & Scale an Automation Agency (16hrs)', href: 'https://www.youtube.com/watch?v=T7qAiuWDwLw&list=PLSbQllRagIuSxGY2QGlfghPHDfTbnOG5S' },
    { label: 'Resources', href: '#' },
    { label: 'Journal Entries', href: '/tag/lfimpr/' },
    { label: 'YouTube Channel', href: 'https://youtube.com/@nicksaraev' },
    { label: 'Twitter/X', href: 'https://x.com/nicksaraev' },
  ];

  const categoriesLinks = [
    { label: 'Agency Strategy', href: '#' },
    { label: 'The Cusp Newsletter', href: '#' },
    { label: 'Futurology', href: '#' },
    { label: 'Life Improvement', href: '#' },
    { label: 'Miscellaneous', href: '#' },
    { label: 'Building in Public', href: '#' },
  ];

  return (
    <footer className="w-full bg-background border-t border-[#E2E8F0] pt-[64px] pb-[32px] px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-[64px]">
          {/* Brand Column */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <div className="w-[48px] h-[48px] bg-[#0091FF] rounded-[10px] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-[18px] tracking-tight">NSM</span>
              </div>
            </Link>
            <p className="text-[16px] leading-[1.6] font-light text-[#64748B] max-w-[360px]">
              Nick Saraev&apos;s AI & automation blog, where he documents his thoughts and shows people his journey to $2M/yr in annual profit.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] transition-all hover:text-[#0091FF] hover:border-[#0091FF]"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] transition-all hover:text-[#0091FF] hover:border-[#0091FF]"
                aria-label="X (Twitter)"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] transition-all hover:text-[#0091FF] hover:border-[#0091FF]"
                aria-label="RSS Feed"
              >
                <Rss size={16} />
              </a>
            </div>
          </div>

          {/* Nick Saraev Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-5">Nick Saraev</h3>
            <ul className="flex flex-col gap-3">
              {nickSaraevLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-normal text-[#64748B] hover:text-[#1A1A1A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Links */}
          <div className="md:col-span-3 lg:col-span-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-5">Categories</h3>
            <ul className="flex flex-col gap-3">
              {categoriesLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-[14px] font-normal text-[#64748B] hover:text-[#1A1A1A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#E2E8F0] gap-4">
          <p className="text-[14px] text-[#64748B]">
            ©{currentYear} Nick Saraev.
          </p>
          
          <div className="flex items-center gap-1 p-[3px] border border-[#E2E8F0] rounded-full bg-[#FFFFFF]">
            <button 
              className="p-[5px] rounded-full bg-[#F1F5F9] text-[#1A1A1A] transition-colors"
              aria-label="Light mode"
            >
              <Sun size={14} className="fill-current" />
            </button>
            <button 
              className="p-[5px] rounded-full text-[#64748B] opacity-50 hover:opacity-100 transition-all"
              aria-label="Dark mode"
            >
              <Moon size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;