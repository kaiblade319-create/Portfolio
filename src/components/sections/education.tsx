
'use client';
import { education } from '@/app/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Education = () => {
  return (
    <div className="py-14 sm:py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline">Education</h2>
          <p className="text-xs sm:text-base md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">Academic foundation and coursework aligned with analytics, systems engineering, and rapid technical delivery.</p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline Track: left-3.5 on mobile, center on md+ */}
          <div className="absolute left-3.5 sm:left-4 md:left-1/2 top-2 bottom-4 w-0.5 bg-primary/25 -translate-x-1/2" />

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {education.map((edu, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={edu.id}
                  className={`relative flex items-start md:items-center w-full ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}
                >
                  {/* Timeline Node Icon: left-3.5 on mobile, center on desktop */}
                  <div className="absolute left-3.5 sm:left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center bg-background border-2 border-primary rounded-full p-1.5 sm:p-2 shadow-lg shadow-primary/20">
                    <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                  </div>

                  {/* Card Container: full width with left-padding on mobile, half width on desktop */}
                  <div
                    className={`w-full pl-9 sm:pl-11 md:pl-0 md:w-1/2 ${
                      isEven ? 'md:pr-8 lg:md:pr-10' : 'md:pl-8 lg:md:pl-10'
                    }`}
                  >
                    <Accordion type="single" collapsible>
                      <Card className="flex flex-col border border-border/70 bg-card/75 backdrop-blur-md rounded-2xl transition-all duration-300 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10 overflow-hidden">
                        <AccordionItem value={`item-${edu.id}`} className="border-none flex flex-col">
                          <div className="p-4 sm:p-5 md:p-6 space-y-2.5">
                            <header className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-base sm:text-lg font-bold font-headline leading-snug">
                                  {edu.degree}
                                </CardTitle>
                                <CardDescription className="text-xs sm:text-sm font-semibold text-foreground/90 mt-0.5">
                                  {edu.institution}
                                </CardDescription>
                                <p className="text-xs text-muted-foreground font-mono pt-1">
                                  {edu.period}
                                </p>
                              </div>
                            </header>

                            <CardContent className="space-y-3 p-0 pt-1">
                              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                {edu.description}
                              </p>
                            </CardContent>

                            <AccordionTrigger className="pt-2 pb-0 text-xs text-primary hover:no-underline font-medium flex items-center justify-between">
                              <span>View Coursework &amp; Highlights</span>
                            </AccordionTrigger>
                          </div>

                          <AccordionContent className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 pt-0 border-t border-border/40 mt-1 space-y-3">
                            <div className="pt-3">
                              <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-2">
                                Academic Highlights:
                              </h4>
                              <ul className="list-disc space-y-1 text-xs text-muted-foreground pl-4 leading-relaxed">
                                {edu.details.highlights.map((detail, i) => (
                                  <li key={i}>{detail}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider mb-2">
                                Relevant Coursework:
                              </h4>
                              <ul className="list-disc space-y-1 text-xs text-muted-foreground pl-4 leading-relaxed">
                                {edu.details.coursework.map((detail, i) => (
                                  <li key={i}>{detail}</li>
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
    </div>
  );
};

export default Education;
