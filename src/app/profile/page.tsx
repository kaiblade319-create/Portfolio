'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { profileLinks } from '@/app/lib/data';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { SpotlightCard } from '@/components/ui/motion-primitives';
import { SubPageHeader } from '@/components/layout/subpage-header';

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <SubPageHeader backHref="/" backLabel="Back to Home" breadcrumb="Web Presence" />
      <main className="flex-1 relative">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14">
          <div className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto space-y-3">
            <span className="block text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[var(--accent-bright)]">
              Web Presence
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-headline tracking-tight text-foreground">
              Online <span className="text-[var(--accent-bright)]">Profiles</span>
            </h1>
            <p className="text-base md:text-lg text-[#3D433E] leading-relaxed">
              Verified platforms showcasing my <strong className="text-foreground font-semibold">data analytics work</strong>, SQL &amp; Python repositories, and research footprint.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
              {profileLinks.map((category, index) => {
                const Icon = (LucideIcons[category.icon as keyof typeof LucideIcons] ||
                  LucideIcons.Link) as React.ComponentType<{ className?: string }>;
                return (
                  <AccordionItem key={index} value={`item-${index}`} className="border-none">
                    <SpotlightCard className="overflow-hidden">
                      <AccordionTrigger className="text-base sm:text-lg font-headline p-5 hover:no-underline w-full text-foreground">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-[var(--accent-tint)] border border-[var(--accent-border)] text-[var(--accent-bright)]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="font-bold text-lg">{category.category}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-5 sm:px-6 pb-5 sm:pb-6 pt-3 border-t border-border">
                          {category.links.map((link) => (
                            <Link
                              key={link.name}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background hover:bg-secondary hover:border-[var(--accent-border)] transition-all duration-200 p-3.5 group text-foreground"
                            >
                              <span className="text-xs sm:text-sm font-medium">{link.name}</span>
                              <span className="text-xs font-mono text-muted-foreground group-hover:text-[var(--accent-bright)] group-hover:translate-x-0.5 transition-all">
                                ↗
                              </span>
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </SpotlightCard>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
}
