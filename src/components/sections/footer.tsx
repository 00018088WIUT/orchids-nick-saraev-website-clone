import { ThemeToggle } from '../theme-toggle';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'About', href: '/about' },
  ];

  return (
    <footer className="w-full bg-background border-t border-border pt-[64px] pb-[32px] px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-[64px]">
          {/* Brand Column */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight text-foreground">
                Ziyodulla<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-[16px] leading-[1.6] font-light text-muted-foreground max-w-[360px]">
              Personal blog of Ziyodulla Abdullayev. Sharing my journey through technology, development, and life.
            </p>
            <div className="flex gap-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all hover:text-primary hover:border-primary"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all hover:text-primary hover:border-primary"
                aria-label="Github"
              >
                <Github size={16} />
              </a>
              <a
                href="/rss.xml"
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all hover:text-primary hover:border-primary"
                aria-label="RSS Feed"
              >
                <Rss size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <h3 className="text-[16px] font-semibold text-foreground mb-5">Quick Links</h3>
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
          <p className="text-[14px] text-muted-foreground">
            ©{currentYear} Ziyodulla Abdullayev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
