'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { projects } from '@/app/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, FileText, GraduationCap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');

  const projectFilters = ['All', 'Independent', 'Guided'];

  const filteredProjects = activeTab === 'All'
    ? projects
    : projects.filter((project) => project.projectTrack === activeTab);

  return (
    <div className="py-14 sm:py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline tracking-tight">
            Projects
          </h2>
          <p className="mx-auto mt-2 sm:mt-3 max-w-2xl text-xs sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Hands-on technical builds solving root bottlenecks, mitigating risks, and delivering verifiable business impact.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="All" onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-6 sm:mb-10">
              <TabsList className="inline-flex items-center gap-1 sm:gap-1.5 p-1 bg-secondary/80 rounded-full h-auto border border-border">
                {projectFilters.map((filter) => (
                  <TabsTrigger
                    key={filter}
                    value={filter}
                    className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground"
                  >
                    {filter === 'All' ? 'All Builds' : `${filter} Projects`}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeTab}>
              {filteredProjects.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/40 max-w-xl mx-auto">
                  <p className="text-muted-foreground text-sm">
                    No {activeTab.toLowerCase()} projects added yet. More builds in progress!
                  </p>
                </div>
              ) : (
                <div className={filteredProjects.length === 1 ? "max-w-xl mx-auto" : "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"}>
                  {filteredProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="group flex flex-col justify-between overflow-hidden border border-border/70 bg-card/75 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-2xl hover:shadow-primary/10 rounded-2xl"
                    >
                      <CardHeader className="p-4 sm:p-5 pb-3 space-y-2.5">
                        {/* Clean top badge only */}
                        <div className="flex items-center">
                          <Badge
                            variant="outline"
                            className={
                              project.projectTrack === 'Independent'
                                ? 'border-primary/40 bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider px-2.5 py-0.5'
                                : 'border-border/70 bg-secondary/80 text-foreground/90 text-xs font-mono uppercase tracking-wider px-2.5 py-0.5'
                            }
                          >
                            {project.projectTrack === 'Independent' ? 'Independent Project' : 'Guided Project'}
                          </Badge>
                        </div>

                        {/* Image with crisp 16:9 modern aspect ratio */}
                        <div className="aspect-[16/9] relative w-full overflow-hidden rounded-xl border border-border/50 bg-muted">
                          {project.imageUrl ? (
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 600px"
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                              data-ai-hint={project.imageHint}
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs font-mono tracking-widest">
                              PROJECT PREVIEW
                            </div>
                          )}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>

                        {/* Prominent title */}
                        <CardTitle className="text-base sm:text-lg md:text-xl font-bold font-headline pt-1 group-hover:text-primary transition-colors leading-snug">
                          {project.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="px-4 sm:px-5 pb-4 space-y-3">
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                          {project.description}
                        </p>

                        {/* Clean tech and problem-solving badges */}
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {project.projectTypes.map((type) => (
                            <Badge
                              key={type}
                              variant="secondary"
                              className="text-[10px] sm:text-xs px-2 py-0.5 bg-secondary text-muted-foreground font-normal border border-border/50"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>

                      {/* Clean 2x2 button grid with Research Paper label */}
                      <CardFooter className="px-4 sm:px-5 py-3 border-t border-border/60 bg-muted/20 mt-auto">
                        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full">
                          {project.githubUrl && (
                            <Button asChild variant="outline" size="default" className="w-full text-xs border-border/80 hover:border-primary/50 hover:bg-secondary h-9">
                              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-1.5 h-3.5 w-3.5" />
                                Code
                              </Link>
                            </Button>
                          )}
                          {project.link && (
                            <Button asChild size="default" className="w-full text-xs shadow-md shadow-primary/20 h-9 bg-white text-zinc-950 hover:bg-zinc-200 font-semibold">
                              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                                Live Demo
                              </Link>
                            </Button>
                          )}
                          <Button asChild variant="outline" size="default" className="w-full text-xs border-border/80 hover:border-primary/50 hover:bg-secondary h-9">
                            <Link href={project.docsPath} prefetch={true}>
                              <FileText className="mr-1.5 h-3.5 w-3.5" />
                              Case Study
                            </Link>
                          </Button>
                          {project.paperUrl && (
                            <Button asChild variant="outline" size="default" className="w-full text-xs border-border/80 hover:border-primary hover:text-primary hover:bg-secondary h-9">
                              <Link href={project.paperUrl} target="_blank" rel="noopener noreferrer">
                                <GraduationCap className="mr-1.5 h-3.5 w-3.5 text-primary" />
                                Research Paper
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Projects;
