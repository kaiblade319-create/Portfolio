'use client';

import { education } from '@/app/lib/data';
import { Award, GraduationCap } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeading, SpotlightCard } from '@/components/ui/motion-primitives';

const Education = () => {
  return (
    <div className="py-14 sm:py-16 md:py-20">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading
          kicker="Academic Foundation"
          title="Education"
          subtitle="Computer Science & Data Science coursework covering SQL databases, statistical analysis, and applied machine learning."
        />

        <div className="space-y-5">
          {education.map((edu) => (
            <Accordion key={edu.id} type="single" collapsible className="w-full">
              <AccordionItem value={`item-${edu.id}`} className="border-none">
                <SpotlightCard className="overflow-hidden">
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-white/[0.08]">
                      <div className="space-y-1">
                        <h3 className="text-xl sm:text-2xl font-extrabold font-headline leading-snug text-white tracking-tight">
                          {edu.degree}
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-zinc-200">
                          {edu.institution}
                        </p>
                      </div>

                      <span
                        className="text-sm sm:text-base font-mono font-bold tabular-nums self-start whitespace-nowrap"
                        style={{ color: 'var(--accent-bright)' }}
                      >
                        {edu.period}
                      </span>
                    </div>

                    <p className="text-sm sm:text-[15px] text-zinc-300 leading-[1.75] max-w-[65ch]">
                      Pursuing a{' '}
                      <strong className="text-white font-semibold">
                        Computer Science &amp; Data Science specialization
                      </strong>{' '}
                      covering SQL database systems,{' '}
                      <strong className="text-white font-semibold">
                        predictive analytics
                      </strong>
                      , and scalable data workflows.
                    </p>

                    <AccordionTrigger
                      className="pt-1 pb-0 text-xs sm:text-sm hover:no-underline font-semibold flex items-center justify-between cursor-pointer transition-colors"
                      style={{ color: 'var(--accent-bright)' }}
                    >
                      <span>View Coursework &amp; Academic Highlights</span>
                    </AccordionTrigger>
                  </div>

                  <AccordionContent className="px-6 sm:px-8 pb-6 pt-0 border-t border-white/[0.08] mt-1 space-y-5">
                    <div className="pt-4">
                      <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Award
                          className="h-3.5 w-3.5"
                          style={{ color: 'var(--accent-bright)' }}
                        />
                        Academic Highlights
                      </h4>
                      <ul className="space-y-2">
                        {edu.details.highlights.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-zinc-300 leading-relaxed"
                          >
                            <span
                              aria-hidden="true"
                              className="font-mono mt-0.5"
                              style={{ color: 'var(--accent-bright)' }}
                            >
                              —
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <GraduationCap
                          className="h-3.5 w-3.5"
                          style={{ color: 'var(--accent-bright)' }}
                        />
                        Relevant Coursework
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.details.coursework.map((course, i) => (
                          <span
                            key={i}
                            className="text-xs sm:text-[13px] font-medium px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-100"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </SpotlightCard>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
