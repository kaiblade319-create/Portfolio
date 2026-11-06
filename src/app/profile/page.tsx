
'use client';

import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { profileLinks } from '@/app/lib/data';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import * as LucideIcons from 'lucide-react';


export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1 relative">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          <div className="mb-6 sm:mb-8">
            <Button asChild variant="outline" className="rounded-xl border-border/70 bg-card/75 backdrop-blur-md hover:border-primary/50 text-xs sm:text-sm">
              <Link href="/">
                <ArrowLeft className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
          <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Web Presence</span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-headline tracking-tight mt-1">
              Online Profiles
            </h1>
            <p className="text-xs sm:text-base md:text-lg text-muted-foreground mt-2 sm:mt-3 leading-relaxed">
              Verified platforms that showcase my analytics work, learning, and professional presence.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {profileLinks.map((category, index) => {
                const Icon = (LucideIcons[category.icon as keyof typeof LucideIcons] || LucideIcons.Link) as React.ComponentType<any>;
                return (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border/70 bg-card/75 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/45 hover:shadow-xl hover:shadow-primary/10"
                  >
                    <AccordionTrigger className="text-base sm:text-lg font-headline p-4 sm:p-5 hover:no-underline w-full">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-bold">{category.category}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
                        {category.links.map((link) => {
                          return (
                            <Card
                              key={link.name}
                              className="rounded-xl border border-border/70 bg-secondary/50 hover:bg-secondary hover:border-primary/40 transition-all duration-300 group"
                            >
                              <CardContent className="p-0">
                                <Link
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between gap-3 text-foreground p-3.5"
                                >
                                  <span className="text-xs sm:text-sm font-medium group-hover:text-primary transition-colors">{link.name}</span>
                                  <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors">↗</span>
                                </Link>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>
      </main>
    </div>
  );
}
