import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 mb-8" data-hero="none">
      <div className="py-16 md:py-24 max-w-[1200px] mx-auto flex flex-col items-center gap-6 lg:gap-8 md:flex-row">
        <div 
          className="z-[2] flex-1 flex flex-col gap-4 md:gap-8 justify-center max-w-[760px] mx-auto items-center text-center" 
          data-hero-content=""
        >
          {/* Main Headline */}
          <h1 
            className="font-semibold tracking-tight text-[2.5rem] leading-[1.1] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] text-[#1A1A1A]" 
            data-hero-headline=""
          >
            Your <span className="text-[#0091ff]">straight-line path</span> to a thriving AI &amp; automation business.
          </h1>

          {/* Introductory Paragraph */}
          <p 
            id="hero-input-label" 
            className="font-light text-[#64748B] text-lg md:text-[1.25rem] leading-[1.6] max-w-[700px]"
          >
            Hi 👋 I&apos;m Nick—I build &amp; teach AI automations. Below are my{' '}
            <a 
              href="https://nicksaraev.com/the-next-few-months-of-my-career/" 
              className="text-[#1A1A1A] font-normal hover:text-[#0091ff] transition-colors"
            >
              best journal entries
            </a>
            , all of my products, and my <b>free, 110-step roadmap to scaling your automation agency to $25K/mo</b> (just enter your email).
          </p>

          {/* Subscription Form */}
          <div className="w-full max-w-md">
            <form 
              className="relative w-full bg-white border border-[#E2E8F0] flex items-center rounded-[1rem] p-1.5 focus-within:border-[#0091ff] focus-within:ring-4 focus-within:ring-[#0091ff]/20 transition-all duration-200" 
              data-members-form="subscribe"
            >
              <input 
                type="email"
                placeholder="Your email address"
                required
                data-members-email="" 
                className="bg-transparent text-[#1A1A1A] flex-[2] py-2 px-3 text-[1rem] border-none focus:ring-0 placeholder:text-[#64748B]/60 outline-none"
              /> 
              <button 
                type="submit"
                className="flex-1 px-4 py-2.5 bg-[#1A1A1A] text-white font-medium rounded-[0.75rem] md:px-7 transition-all duration-200 hover:bg-[#0091ff] hover:text-white"
              >
                <span>Subscribe</span>
              </button>
              
              {/* Success/Error Messages (Hidden by default) */}
              <p data-msg="success" className="hidden absolute text-sm leading-tight -bottom-8 text-[#10B981] font-medium">
                Great! Check your inbox and click the link.
              </p>
              <p data-msg="error" className="hidden absolute text-sm leading-tight -bottom-8 text-[#ef4444] font-medium">
                Sorry, something went wrong. Please try again.
              </p>
            </form>

            {/* Social Proof Section */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="flex items-center">
                {/* Avatars Stack */}
                <div className="flex -space-x-2 mr-3">
                  {[
                    "https://nicksaraev.com/content/images/size/w100/2024/01/avatar-1.jpg",
                    "https://nicksaraev.com/content/images/size/w100/2024/01/avatar-2.jpg",
                    "https://nicksaraev.com/content/images/size/w100/2024/01/avatar-3.jpg",
                    "https://nicksaraev.com/content/images/size/w100/2024/01/avatar-4.jpg",
                    "https://nicksaraev.com/content/images/size/w100/2024/01/avatar-5.jpg"
                  ].map((src, i) => (
                    <div 
                      key={i} 
                      className="inline-block h-8 w-8 rounded-full ring-2 ring-white overflow-hidden bg-gray-100"
                    >
                      <Image 
                        src={src} 
                        alt="Subscriber avatar" 
                        width={32} 
                        height={32} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          // Fallback for missing avatar images
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${i}&background=random`;
                        }}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Star Rating */}
                <div className="flex flex-col items-start leading-tight">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className="w-4 h-4 text-[#FACC15] fill-current" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-[0.875rem] font-semibold text-[#1A1A1A]">5.0</span>
                  </div>
                  <span className="text-[0.75rem] text-[#64748B] font-medium">Join 1,000+ others</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;