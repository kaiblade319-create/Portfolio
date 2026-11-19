'use client';

import { Button } from '@/components/ui/button';
import {
  Folder,
  Mail,
  Zap,
  Crosshair,
  ShieldCheck,
  Rocket,
} from 'lucide-react';
import { SectionHeading, SpotlightCard } from '@/components/ui/motion-primitives';

const operatingPrinciples = [
  {
    index: '01',
    icon: Zap,
    title: 'Mindset',
    detail: 'Curiosity & Fast Learning',
    desc: 'Picks up unfamiliar datasets, schemas, and tools quickly to reach reliable answers.',
  },
  {
    index: '02',
    icon: Crosshair,
    title: 'Methodology',
    detail: 'Root-Cause Diagnostics',
    desc: 'Digs past surface averages to isolate the metric drivers that actually move outcomes.',
  },
  {
    index: '03',
    icon: ShieldCheck,
    title: 'Value Focus',
    detail: 'Risk & Loss Mitigation',
    desc: 'Flags churn signals, bottlenecks, and quality gaps early before margins erode.',
  },
  {
    index: '04',
    icon: Rocket,
    title: 'Execution',
    detail: 'Decision-Ready Delivery',
    desc: 'Turns raw SQL/Python findings into clear reports and actionable stakeholder steps.',
  },
];

const About = () => {
  const handleScrollTo = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="py-14 sm:py-16 md:py-20 relative">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading
          kicker="Approach"
          title="About Me"
          highlightWord="Me"
          subtitle="Aspiring Data Analyst focused on root-cause diagnostics, clean metrics, and practical business impact."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch">
          {/* Narrative Editorial Panel */}
          <div className="lg:col-span-7 flex">
            <SpotlightCard className="w-full">
              <div className="p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <span
                      className="text-xs font-mono font-semibold uppercase tracking-[0.16em]"
                      style={{ color: 'var(--accent-bright)' }}
                    >
                      Analytical Profile
                    </span>
                    <span className="text-xs font-mono text-zinc-400">CSE · Data Science</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold font-headline text-white leading-tight tracking-tight">
                    From Raw Data to{' '}
                    <span className="text-underline-accent">Clear Action</span>
                  </h3>

                  <p className="max-w-[65ch] text-zinc-300 leading-[1.75] text-[15px] sm:text-base">
                    I am a Computer Science (Data Science) student who focuses on{' '}
                    <strong className="text-white font-semibold">
                      cleaning messy data, spotting hidden patterns, and diagnosing root causes
                    </strong>
                    —not just building charts that sit untouched.
                  </p>

                  <p className="max-w-[65ch] text-zinc-300 leading-[1.75] text-[15px] sm:text-base">
                    Through hands-on ML pipelines and client coordination at{' '}
                    <strong className="text-white font-semibold">Blink Beyond</strong>, I bridge
                    technical analysis and stakeholder communication so every dashboard or model
                    leads to measurable retention, efficiency, or revenue protection.
                  </p>
                </div>

                {/* Action Row */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <Button
                    onClick={(e) => handleScrollTo(e, 'projects')}
                    size="default"
                    className="btn-shimmer text-xs sm:text-sm h-11 px-5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0"
                    style={{
                      backgroundColor: 'var(--accent-solid)',
                      color: 'var(--accent-ink)',
                      boxShadow: '0 4px 24px -4px var(--accent-glow)',
                    }}
                  >
                    <Folder className="mr-2 h-4 w-4" />
                    View Projects
                  </Button>
                  <Button
                    onClick={(e) => handleScrollTo(e, 'contact')}
                    variant="outline"
                    size="default"
                    className="border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/30 text-white font-medium text-xs sm:text-sm h-11 px-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Mail className="mr-2 h-4 w-4" style={{ color: 'var(--accent-bright)' }} />
                    Get in Touch
                  </Button>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Pillar Stack Column */}
          <div className="lg:col-span-5 flex">
            <SpotlightCard className="w-full">
              <div className="p-6 sm:p-7 h-full flex flex-col justify-between space-y-5">
                <div className="pb-3 border-b border-white/[0.08] flex items-center justify-between">
                  <p
                    className="text-xs font-mono font-semibold uppercase tracking-[0.16em]"
                    style={{ color: 'var(--accent-bright)' }}
                  >
                    How I Work
                  </p>
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest tabular-nums">
                    4 Principles
                  </span>
                </div>

                <div className="divide-y divide-white/[0.08] flex-1 flex flex-col justify-between">
                  {operatingPrinciples.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0 group"
                      >
                        <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.04] mt-0.5 shrink-0 transition-transform duration-200 group-hover:scale-105">
                          <Icon className="h-4 w-4" style={{ color: 'var(--accent-bright)' }} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                            <span style={{ color: 'var(--accent-bright)' }}>{item.index}</span>
                            <span aria-hidden="true">·</span>
                            <span>{item.title}</span>
                          </div>
                          <p className="text-base font-bold text-white leading-snug">
                            {item.detail}
                          </p>
                          <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
