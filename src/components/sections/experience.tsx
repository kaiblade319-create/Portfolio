'use client';

import { experiences } from '@/app/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, MapPin, UserCheck } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * EXPERIENCE SECTION COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Displays internship track record using an adaptive timeline:
 * - On Mobile: Single-track left rail (left-3.5) with full-width cards.
 * - On Desktop (md+): Centered timeline spine (left-1/2) with alternating
 *   left/right card placement for visual balance.
 * - Accordion: Allows recruiters to inspect in-depth contributions & achievements.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const Experience = () => {
  return (
    <section id="experience" className="py-14 sm:py-20 md:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline tracking-tight">
            Experience
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-muted-foreground mt-2 sm:mt-3 max-w-2xl mx-auto leading-relaxed">
            Demonstrated track record of delivering production solutions, taking end-to-end ownership, and adapting rapidly in real-world team environments.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Track: left-3.5 on mobile, center on md+ */}
          <div className="absolute left-3.5 sm:left-4 md:left-1/2 top-2 bottom-4 w-0.5 bg-primary/25 -translate-x-1/2" />

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex items-start md:items-center w-full ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Timeline Node Icon: left-3.5 on mobile, center on desktop */}
                  <div className="absolute left-3.5 sm:left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center bg-background border-2 border-primary rounded-full p-1.5 sm:p-2 shadow-lg shadow-primary/20">
                    <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  </div>

                  {/* Card Container: full width with left-padding on mobile, half width on desktop */}
                  <div
                    className={`w-full pl-9 sm:pl-11 md:pl-0 md:w-1/2 ${
                      isEven ? 'md:pr-8 lg:md:pr-10' : 'md:pl-8 lg:md:pl-10'
                    }`}
                  >
                    <Accordion type="single" collapsible>
                      <Card className="border border-border/70 bg-card/75 backdrop-blur-md transition-all duration-300 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10 rounded-2xl overflow-hidden">
                        <AccordionItem value={`item-${exp.id}`} className="border-none">
                          <div className="p-4 sm:p-5 md:p-6 space-y-2.5 sm:space-y-3">
                            {/* Badges Bar: Period, Mode, Type */}
                            <div className="flex flex-wrap items-center gap-2">
                              {exp.type && (
                                <Badge
                                  variant="outline"
                                  className="border-primary/40 bg-primary/10 text-primary text-[10px] sm:text-xs font-mono uppercase tracking-wide"
                                >
                                  {exp.type}
                                </Badge>
                              )}
                              {exp.mode && (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] sm:text-xs font-mono border border-border/60"
                                >
                                  <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                                  {exp.mode}
                                </Badge>
                              )}
                            </div>

                            {/* Role and Company */}
                            <div>
                              <CardTitle className="text-lg md:text-xl font-bold font-headline leading-snug">
                                {exp.role}
                              </CardTitle>
                              <CardDescription className="text-sm font-semibold text-foreground/90 mt-0.5">
                                {exp.company}
                              </CardDescription>

                              <p className="flex items-center text-xs text-muted-foreground mt-1 font-mono">
                                <Calendar className="mr-1.5 h-3.5 w-3.5 text-primary" />
                                {exp.period}
                              </p>

                              {exp.mentor && (
                                <p className="flex items-center text-xs text-primary/80 mt-1 font-mono">
                                  <UserCheck className="mr-1.5 h-3.5 w-3.5" />
                                  {exp.mentor}
                                </p>
                              )}
                            </div>

                            {/* Summary description */}
                            <CardContent className="p-0 pt-1">
                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                {exp.description}
                              </p>
                            </CardContent>

                            {/* Toggle Trigger */}
                            <AccordionTrigger className="pt-2 pb-0 text-xs text-primary hover:no-underline font-medium flex items-center justify-between">
                              <span>View Responsibilities &amp; Achievements</span>
                            </AccordionTrigger>
                          </div>

                          <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-0 border-t border-border/40 mt-1 space-y-3 sm:space-y-4">
                            <div>
                              <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-2 pt-3">
                                Key Contributions:
                              </h4>
                              <ul className="list-disc space-y-1 text-xs text-muted-foreground pl-4 leading-relaxed">
                                {exp.responsibilities.map((resp, i) => (
                                  <li key={i}>{resp}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-2">
                                Key Achievements:
                              </h4>
                              <ul className="list-disc space-y-1 text-xs text-muted-foreground pl-4 leading-relaxed">
                                {exp.achievements.map((ach, i) => (
                                  <li key={i}>{ach}</li>
                                ))}
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Card>
                    </Accordion>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
