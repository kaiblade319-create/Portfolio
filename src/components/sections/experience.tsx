'use client';

import { useRef } from 'react';
import { experiences } from '@/app/lib/data';
import { Briefcase, UserCheck, CheckCircle2, Award } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeading, SpotlightCard } from '@/components/ui/motion-primitives';
import { cn } from '@/lib/utils';

const Experience = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 80%'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div className="py-14 sm:py-16 md:py-20 relative">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading
          kicker="Career Progression"
          title="Leadership & Experience"
          highlightWord="Experience"
          subtitle="Proven track record of leading developer cohorts, interfacing with clients, and delivering production software on schedule."
        />

        <div ref={timelineRef} className="relative">
          {/* Track & Scroll-Linked Animated Beam centered cleanly in column gap */}
          <div
            aria-hidden="true"
            className="absolute left-[10px] md:left-[14.75rem] lg:left-[18rem] md:-translate-x-1/2 top-3 bottom-3 w-[2px] bg-border overflow-hidden rounded-full"
          >
            <motion.div
              style={{
                scaleY: smoothProgress,
                background:
                  'linear-gradient(180deg, var(--accent-solid), var(--accent-bright), rgba(123,148,134,0.65))',
              }}
              className="h-full w-full origin-top"
            />
          </div>

          <div className="space-y-8 sm:space-y-10">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="relative grid grid-cols-1 md:grid-cols-[13.5rem_1fr] lg:grid-cols-[16.5rem_1fr] gap-4 md:gap-10 lg:gap-12 pl-9 md:pl-0"
              >
                {/* Milestone Node Aligned to Track */}
                <div
                  aria-hidden="true"
                  className={cn(
                    'absolute left-[1px] md:left-[14.75rem] lg:left-[18rem] md:-translate-x-1/2 top-2 md:top-3 flex h-5 w-5 items-center justify-center rounded-full border bg-background z-10',
                    exp.isCurrent ? 'border-[#2B6E73]' : 'border-border'
                  )}
                  style={
                    exp.isCurrent
                      ? { boxShadow: '0 0 10px rgba(43, 110, 115, 0.22)', borderColor: 'var(--accent-bright)' }
                      : undefined
                  }
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: exp.isCurrent
                        ? 'var(--accent-bright)'
                        : 'rgba(93, 101, 94, 0.45)',
                    }}
                  />
                </div>

                {/* Sticky Left Meta Column */}
                <div className="md:text-right pt-0.5 space-y-1">
                  <div className="md:sticky md:top-24 space-y-1">
                    {exp.isCurrent && (
                      <p
                        className="text-[11px] font-mono font-bold uppercase tracking-[0.16em]"
                        style={{ color: 'var(--accent-bright)' }}
                      >
                        Current Role
                      </p>
                    )}
                    <p className="text-lg sm:text-xl font-extrabold font-headline text-foreground leading-tight">
                      {exp.company}
                    </p>
                    <p className="text-xs sm:text-[13px] font-mono text-[#3D433E] tabular-nums">
                      {exp.period}
                    </p>
                    <p className="text-xs font-mono text-muted-foreground">
                      {[exp.mode, exp.type].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Right Detail Card */}
                <div>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={exp.isCurrent ? `item-${exp.id}` : undefined}
                    className="w-full"
                  >
                    <AccordionItem value={`item-${exp.id}`} className="border-none">
                      <SpotlightCard className="overflow-hidden">
                        <div className="p-5 sm:p-6 space-y-3.5">
                          <div className="space-y-1.5 pb-3 border-b border-border">
                            <h3 className="text-xl sm:text-2xl font-extrabold font-headline leading-snug text-foreground tracking-tight">
                              {exp.role}
                            </h3>
                            {exp.mentor && (
                              <p
                                className="flex items-center text-xs font-mono font-medium"
                                style={{ color: 'var(--accent-soft)' }}
                              >
                                <UserCheck
                                  className="mr-1.5 h-3.5 w-3.5 shrink-0"
                                  style={{ color: 'var(--accent-bright)' }}
                                />
                                <span>{exp.mentor}</span>
                              </p>
                            )}
                          </div>

                          <p className="text-base text-[#3D433E] leading-[1.68] max-w-[65ch]">
                            {exp.description}
                          </p>

                          <AccordionTrigger
                            className="pt-1 pb-0 text-xs sm:text-sm hover:no-underline font-semibold flex items-center justify-between cursor-pointer transition-colors"
                            style={{ color: 'var(--accent-bright)' }}
                          >
                            <span>View Contributions &amp; Outcomes</span>
                          </AccordionTrigger>
                        </div>

                        <AccordionContent className="px-5 sm:px-6 pb-6 pt-0 border-t border-border mt-1 space-y-4">
                          <div className="pt-4">
                            <h4 className="font-bold text-xs text-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                              <Briefcase
                                className="h-3.5 w-3.5"
                                style={{ color: 'var(--accent-bright)' }}
                              />
                              Key Contributions
                            </h4>
                            <ul className="space-y-2">
                              {exp.responsibilities.map((resp, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2.5 text-sm text-[#3D433E] leading-relaxed"
                                >
                                  <CheckCircle2
                                    className="h-4 w-4 shrink-0 mt-0.5"
                                    style={{ color: 'var(--accent-bright)' }}
                                  />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="border-t border-border pt-4">
                            <h4 className="font-bold text-xs text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <Award
                                className="h-3.5 w-3.5"
                                style={{ color: 'var(--accent-bright)' }}
                              />
                              Key Outcomes
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((ach, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed font-medium"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="font-mono mt-0.5"
                                    style={{ color: 'var(--accent-bright)' }}
                                  >
                                    —
                                  </span>
                                  <span>{ach}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </AccordionContent>
                      </SpotlightCard>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
