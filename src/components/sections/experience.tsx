'use client';

import { experiences } from '@/app/lib/data';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, MapPin, UserCheck, CheckCircle2, Award } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/**
 * EXPERIENCE SECTION COMPONENT
 * Centered stacked executive cards with clean collapsible impact details.
 * Seamless visual flow with zero asymmetrical margin offsets.
 */
const Experience = () => {
  return (
    <div className="py-14 sm:py-20 md:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline tracking-tight">
            Experience
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-muted-foreground mt-2 sm:mt-3 max-w-2xl mx-auto leading-relaxed">
            Demonstrated track record of delivering production solutions, taking end-to-end ownership, and adapting rapidly in real-world team environments.
          </p>
        </div>

        {/* Centered Stacked Layout: Perfectly symmetrical, seamless flow */}
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {experiences.map((exp) => (
            <Accordion key={exp.id} type="single" collapsible className="w-full">
              <AccordionItem value={`item-${exp.id}`} className="border-none">
                <Card className="border border-border/70 bg-card/75 backdrop-blur-md rounded-2xl transition-all duration-300 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
                  <div className="p-4 sm:p-6 space-y-3">
                    {/* Header: Role, Badges, Company */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-border/40">
                      <div>
                        <CardTitle className="text-base sm:text-lg md:text-xl font-bold font-headline leading-snug text-white">
                          {exp.role}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm font-semibold text-zinc-300 mt-0.5">
                          {exp.company}
                        </CardDescription>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-center">
                        {exp.isCurrent && (
                          <Badge variant="outline" className="text-[10px] sm:text-xs font-mono border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-medium">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                            Current Role
                          </Badge>
                        )}
                        {exp.period && (
                          <Badge variant="outline" className="text-[10px] sm:text-xs font-mono border-white/10 bg-white/[0.04] text-zinc-300">
                            <Calendar className="mr-1 h-3 w-3 text-zinc-400" />
                            {exp.period}
                          </Badge>
                        )}
                        {exp.mode && (
                          <Badge variant="secondary" className="text-[10px] sm:text-xs font-mono border border-border/60">
                            <MapPin className="mr-1 h-3 w-3 text-muted-foreground" />
                            {exp.mode}
                          </Badge>
                        )}
                        {exp.type && (
                          <Badge variant="outline" className="text-[10px] sm:text-xs font-mono border-primary/40 bg-primary/10 text-primary">
                            {exp.type}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Mentor Line */}
                    {exp.mentor && (
                      <p className="flex items-center text-xs text-primary/90 font-mono">
                        <UserCheck className="mr-1.5 h-3.5 w-3.5" />
                        {exp.mentor}
                      </p>
                    )}

                    {/* Summary Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Accordion Trigger */}
                    <AccordionTrigger className="pt-2 pb-0 text-xs text-primary hover:no-underline font-medium flex items-center justify-between cursor-pointer">
                      <span>View Responsibilities &amp; Achievements</span>
                    </AccordionTrigger>
                  </div>

                  {/* Accordion Content: Clean Structured Cards */}
                  <AccordionContent className="px-4 sm:px-6 pb-5 pt-0 border-t border-border/40 mt-1 space-y-4">
                    <div className="pt-3">
                      <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-primary" />
                        Key Contributions
                      </h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                            <CheckCircle2 className="h-3.5 w-3.5 text-primary/80 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-secondary/30 p-3 sm:p-4">
                      <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Award className="h-3.5 w-3.5 text-primary" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-1.5">
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
