
'use client';

import { education } from '@/app/lib/data';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle2, BookOpen } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Education = () => {
  return (
    <div className="py-14 sm:py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline tracking-tight">
            Education
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-muted-foreground mt-2 sm:mt-3 max-w-2xl mx-auto leading-relaxed">
            Academic foundation and coursework aligned with analytics, systems engineering, and rapid technical delivery.
          </p>
        </div>

        {/* Centered Stacked Layout matching Experience and rest of portfolio */}
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {education.map((edu) => (
            <Accordion key={edu.id} type="single" collapsible className="w-full">
              <AccordionItem value={`item-${edu.id}`} className="border-none">
                <Card className="border border-border/70 bg-card/75 backdrop-blur-md rounded-2xl transition-all duration-300 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
                  <div className="p-4 sm:p-6 space-y-3">
                    {/* Header: Degree, Period, Institution */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-border/40">
                      <div>
                        <CardTitle className="text-base sm:text-lg md:text-xl font-bold font-headline leading-snug text-white">
                          {edu.degree}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm font-semibold text-zinc-300 mt-0.5">
                          {edu.institution}
                        </CardDescription>
                      </div>

                      <Badge variant="outline" className="text-[10px] sm:text-xs font-mono border-white/10 bg-white/[0.04] text-zinc-300 self-start sm:self-center">
                        <Calendar className="mr-1 h-3 w-3 text-zinc-400" />
                        {edu.period}
                      </Badge>
                    </div>

                    {/* Summary Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>

                    {/* Accordion Trigger */}
                    <AccordionTrigger className="pt-2 pb-0 text-xs text-primary hover:no-underline font-medium flex items-center justify-between cursor-pointer">
                      <span>View Coursework &amp; Highlights</span>
                    </AccordionTrigger>
                  </div>

                  {/* Accordion Content: Coursework Badges & Highlights */}
                  <AccordionContent className="px-4 sm:px-6 pb-5 pt-0 border-t border-border/40 mt-1 space-y-4">
                    <div className="pt-3">
                      <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        Academic Highlights
                      </h4>
                      <ul className="space-y-1.5">
                        {edu.details.highlights.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-primary" />
                        Relevant Coursework
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.details.coursework.map((course, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs px-2.5 py-1 bg-secondary/80 border border-border/60 text-foreground/80 font-normal"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
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

export default Education;
