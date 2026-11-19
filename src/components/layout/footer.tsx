'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, FileText, User, Mail, MapPin } from 'lucide-react';
import { socialLinks } from '@/app/lib/data';
import { siteConfig } from '@/config/site';
import { isPlaceholderExternalUrl } from '@/lib/portfolio-utils';

const footerLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Education', href: '/#education' },
  { name: 'Contact', href: '/#contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  const socialItems = [
    { name: 'GitHub', href: socialLinks.github, icon: Github },
    { name: 'LinkedIn', href: socialLinks.linkedin, icon: Linkedin },
    { name: 'Twitter', href: socialLinks.twitter, icon: Twitter },
  ].filter((item) => !isPlaceholderExternalUrl(item.href));

  return (
    <footer className="relative border-t border-white/[0.09] bg-[#050507] text-zinc-300" aria-label="Site footer">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 pb-8 border-b border-white/[0.08]">
          {/* Brand Summary */}
          <div className="sm:col-span-2 md:col-span-6 space-y-4">
            <div className="space-y-1">
              <p className="text-lg font-bold font-headline text-white">{siteConfig.name}</p>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--accent-bright)' }}>
                {siteConfig.role.badge}
              </p>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
              {siteConfig.bio}
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <Link
                href="/resume"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white border border-white/15 bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.09] px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                <FileText className="h-3.5 w-3.5" style={{ color: 'var(--accent-bright)' }} />
                Resume
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white border border-white/15 bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.09] px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap"
              >
                <User className="h-3.5 w-3.5" style={{ color: 'var(--accent-bright)' }} />
                Profiles
              </Link>
            </div>
          </div>

          {/* Section Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent-bright)' }}>
              Navigation
            </p>
            <nav aria-label="Footer navigation">
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-1.5 text-sm">
                {footerLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Availability & Connect */}
          <div className="md:col-span-3 space-y-4">
            <div className="space-y-2.5">
              <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent-bright)' }}>
                Availability
              </p>
              <div className="space-y-2 text-xs text-zinc-400">
                <p className="flex items-start gap-2 leading-relaxed">
                  <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: 'var(--accent-bright)' }} />
                  <span>Palghar · Onsite, Hybrid &amp; Remote</span>
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-200 hover:text-white transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" style={{ color: 'var(--accent-bright)' }} />
                  <span>Send an inquiry</span>
                </Link>
              </div>
            </div>

            {socialItems.length > 0 && (
              <div className="space-y-2 pt-1">
                <p className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--accent-bright)' }}>
                  Connect
                </p>
                <div className="flex items-center gap-2">
                  {socialItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.name}
                        className="h-9 w-9 rounded-lg border border-white/15 bg-white/[0.04] flex items-center justify-center text-zinc-300 hover:border-white/30 hover:text-white transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500">
          <p className="tabular-nums">&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
            Personal Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
