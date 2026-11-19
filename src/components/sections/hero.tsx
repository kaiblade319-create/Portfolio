'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, User } from 'lucide-react';
import { siteConfig } from '@/config/site';
import {
  HeroArchitecturalBackdrop,
  BlurHeadline,
  CountUpMetric,
} from '@/components/ui/motion-primitives';

const Hero = () => {
  const heroStats = siteConfig.stats;

  return (
    <section
      id="home"
      className="relative flex items-center justify-center text-center pt-28 pb-14 sm:pt-32 sm:pb-16 lg:min-h-[calc(100dvh-1rem)] lg:py-24 overflow-hidden bg-background"
    >
      <HeroArchitecturalBackdrop />

      <div className="w-full max-w-5xl relative z-10 mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-6 sm:space-y-7">
          {/* Concise Role Kicker */}
          <p className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs sm:text-[13px] font-mono font-semibold uppercase tracking-[0.2em] text-zinc-300">
            <span>Data Analyst</span>
            <span aria-hidden="true" style={{ color: 'var(--accent-bright)' }}>·</span>
            <span>SQL &amp; Python</span>
            <span aria-hidden="true" style={{ color: 'var(--accent-bright)' }}>·</span>
            <span>Root-Cause Diagnostics</span>
          </p>

          {/* Scale-Driven Display Hierarchy */}
          <div className="max-w-3xl mx-auto space-y-3.5 sm:space-y-4">
            <BlurHeadline
              text={siteConfig.name}
              accentWord="Halani"
              className="text-5xl sm:text-6xl md:text-[5rem] font-extrabold font-headline tracking-[-0.035em] leading-[1.03] text-white"
            />
            <h2 className="mx-auto max-w-[42rem] text-lg sm:text-2xl md:text-[1.65rem] font-body text-zinc-100 leading-snug font-semibold text-balance">
              Turning raw datasets into{' '}
              <span className="text-underline-accent whitespace-nowrap">clear decisions</span>,
              early churn signals, and measurable growth.
            </h2>
            <p className="mx-auto max-w-xl text-sm sm:text-base md:text-[17px] text-zinc-300 leading-[1.7] font-normal">
              <strong className="text-white font-semibold">Computer Science (Data Science)</strong>{' '}
              student &amp; Coordinator at{' '}
              <strong className="text-white font-semibold">Blink Beyond</strong>. I use SQL,
              Python, and BI workflows to uncover root causes and guide business execution.
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
                boxShadow: '0 4px 28px -4px var(--accent-glow)',
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
              className="w-full h-11 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/30 text-white font-semibold transition-all duration-200 backdrop-blur-md hover:-translate-y-0.5 text-xs sm:text-sm whitespace-nowrap shrink-0"
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

          {/* 4-Column Proof Strip aligned to max-w-5xl rail */}
          <div className="mt-2 sm:mt-3 w-full rounded-2xl border border-white/10 bg-[#0E0E12]/90 backdrop-blur-md overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
              {heroStats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="p-4 sm:p-5 text-left flex flex-col justify-between gap-2 hover:bg-white/[0.025] transition-colors"
                >
                  <span
                    className="text-[11px] font-mono font-semibold tabular-nums tracking-wider"
                    style={{ color: 'var(--accent-bright)' }}
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold font-headline text-white tracking-tight">
                      <CountUpMetric value={stat.value} />
                    </p>
                    <p className="mt-1 text-xs sm:text-[13px] text-zinc-300 leading-snug font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
