import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { Github, Linkedin, Mail } from 'lucide-react';

const footerNav = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Education', href: '/#education' },
  { name: 'Contact', href: '/#contact' },
];

const socialIcons = [
  {
    name: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: Linkedin,
    show: !siteConfig.links.linkedin.includes('your-'),
  },
  {
    name: 'GitHub',
    href: siteConfig.links.github,
    icon: Github,
    show: !siteConfig.links.github.includes('your-'),
  },
  {
    name: 'Email',
    href: siteConfig.links.email ? `mailto:${siteConfig.links.email}` : null,
    icon: Mail,
    show: !!siteConfig.links.email,
  },
];

const Footer = () => {
  return (
    <footer
      aria-label="Site footer"
      className="border-t border-border bg-background/80 backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-base font-bold font-headline text-foreground">
              {siteConfig.name}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              {siteConfig.bio}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialIcons
                .filter((s) => s.show && s.href)
                .map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded p-1.5 bg-secondary/50 border border-border"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
            </div>
          </div>

          <div className="space-y-3 sm:col-span-1 md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Navigation
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {footerNav.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/70">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="font-mono tracking-wider text-primary/70">
            DATA SCIENCE &amp; ANALYTICS PORTFOLIO
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
