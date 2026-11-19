'use client';

import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

interface SubPageHeaderProps {
  backHref: string;
  backLabel: string;
  breadcrumb: string;
}

export function SubPageHeader({ backHref, backLabel, breadcrumb }: SubPageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.09] bg-[#050507]/90 backdrop-blur-xl">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            aria-label={`${siteConfig.name} Home`}
            className="h-9 w-9 rounded-xl border border-white/15 bg-white/[0.04] flex items-center justify-center font-mono font-bold text-xs hover:border-white/30 transition-colors shrink-0"
            style={{ color: 'var(--accent-bright)' }}
          >
            {siteConfig.initials}
          </Link>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-xl border-white/15 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.08] text-white text-xs h-9 whitespace-nowrap shrink-0"
          >
            <Link href={backHref}>
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" style={{ color: 'var(--accent-bright)' }} />
              {backLabel}
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-[0.16em] whitespace-nowrap font-semibold"
            style={{ color: 'var(--accent-bright)' }}
          >
            {breadcrumb}
          </span>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="rounded-xl border-white/15 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.08] text-white text-xs h-9 whitespace-nowrap shrink-0"
          >
            <Link href="/#contact">
              <Mail className="mr-1.5 h-3.5 w-3.5" style={{ color: 'var(--accent-bright)' }} />
              Contact
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
