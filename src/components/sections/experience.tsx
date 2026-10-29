
'use client';
import { experiences } from '@/app/lib/data';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Experience = () => {
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Experience</h2>
          <p className="text-lg text-muted-foreground mt-2">Hands-on project and freelance experience in analytics, data workflows, and model delivery.</p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-primary/20" />
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`mb-8 flex items-center w-full ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? 'pr-8' : 'pl-8'
                }`}
              >
                <Accordion type="single" collapsible>
                    <Card className="flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 hover:shadow-2xl h-full">
                        <AccordionItem value={`item-${exp.id}`} className="border-none flex flex-col h-full">
                             <div className="p-6">
                                <header className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>{exp.role}</CardTitle>
                                        <CardDescription>{exp.company}</CardDescription>
                                        <p className="text-sm text-muted-foreground pt-1">{exp.period}</p>
                                    </div>
                                    <AccordionTrigger className="p-2 rounded-lg hover:bg-accent/50">
                                        <span className="sr-only">Toggle details</span>
                                    </AccordionTrigger>
                                </header>
                                <CardContent className="space-y-4 pt-4 px-0 pb-0">
                                   <p className="text-sm text-muted-foreground">{exp.description}</p>
                                </CardContent>
                            </div>
                            <AccordionContent>
                                <CardContent className="flex-grow space-y-4 pt-0 px-6 pb-6">
                                     <div>
                                      <h4 className="font-semibold text-sm">Key Responsibilities:</h4>
                                      <ul className="list-disc mt-2 space-y-1 text-sm text-muted-foreground pl-4">
                                        {exp.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                                      </ul>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-sm">Achievements:</h4>
                                      <ul className="list-disc mt-2 space-y-1 text-sm text-muted-foreground pl-4">
                                        {exp.achievements.map((ach, i) => <li key={i}>{ach}</li>)}
                                      </ul>
                                    </div>
                                </CardContent>
                            </AccordionContent>
                        </AccordionItem>
                    </Card>
                </Accordion>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 bg-background border-2 border-primary rounded-full p-2">
                <Briefcase className="text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
