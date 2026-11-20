'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, User } from 'lucide-react';
import { siteConfig } from '@/config/site';
import {
  BlurHeadline,
} from '@/components/ui/motion-primitives';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center text-center min-h-dvh pt-20 pb-14 lg:py-24 overflow-hidden bg-background"
    >
      <div className="w-full max-w-5xl relative z-10 mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-6 sm:space-y-7">
          {/* Concise Role Kicker */}
          <p
            className="text-xs sm:text-[13px] font-mono font-semibold uppercase tracking-[0.22em]"
            style={{ color: 'var(--accent-bright)' }}
          >
            Data Analyst
          </p>

          {/* Scale-Driven Display Hierarchy */}
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">
            <BlurHeadline
              text={siteConfig.name}
              accentWord="Halani"
              className="text-[clamp(2.1rem,10.2vw,3.1rem)] sm:text-6xl md:text-[5rem] font-extrabold font-headline tracking-[-0.035em] leading-[1.03] text-foreground"
            />
            <p className="mx-auto max-w-2xl text-base sm:text-xl md:text-[1.35rem] font-body text-[#3D433E] leading-[1.65] font-medium text-balance">
              Turning messy data into{' '}
              <span className="text-underline-accent font-semibold text-foreground whitespace-nowrap">
                clear decisions
              </span>{' '}
              with <strong className="text-foreground font-semibold">SQL, Python &amp; BI</strong> — uncovering
              churn signals and root causes.
            </p>
          </div>

          {/* Primary & Secondary Action Pair */}
          <div className="w-full max-w-xs sm:max-w-sm mx-auto grid grid-cols-2 gap-3 pt-1">
            <Button
              asChild
              size="default"
              className="btn-shimmer w-full h-11 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 text-xs sm:text-sm whitespace-nowrap shrink-0"
              style={{
                backgroundColor: 'var(--accent-solid)',
                color: 'var(--accent-ink)',
                boxShadow: '0 6px 18px -6px rgba(43, 110, 115, 0.35)',
              }}
            >
              <Link href="/resume" prefetch={true} className="flex items-center justify-center">
                <FileText className="mr-1.5 h-4 w-4 shrink-0" />
                <span>Resume</span>
              </Link>
            </Button>
            <Button
              asChild
              size="default"
              variant="outline"
              className="w-full h-11 rounded-xl border border-border bg-card hover:bg-secondary hover:border-[#2B6E73]/40 text-foreground font-semibold transition-all duration-200 shadow-sm hover:-translate-y-0.5 text-xs sm:text-sm whitespace-nowrap shrink-0"
            >
              <Link href="/profile" prefetch={true} className="flex items-center justify-center">
                <User
                  className="mr-1.5 h-4 w-4 shrink-0"
                  style={{ color: 'var(--accent-bright)' }}
                />
                <span>Profile</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
