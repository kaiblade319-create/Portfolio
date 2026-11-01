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
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight">
            Projects
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Hands-on technical builds solving root bottlenecks, mitigating risks, and delivering verifiable business impact.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="All" onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="inline-flex items-center gap-1.5 p-1 bg-secondary/80 rounded-full h-auto border border-border">
                {projectFilters.map((filter) => (
                  <TabsTrigger
                    key={filter}
                    value={filter}
                    className="px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground"
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
                <div className="max-w-2xl mx-auto">
                  {filteredProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="group flex flex-col overflow-hidden border border-border/70 bg-card/75 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-2xl hover:shadow-primary/10 rounded-2xl"
                    >
                      <CardHeader className="p-6 md:p-8 pb-4 space-y-4">
                        {/* Clean top badge only - no clunky stack string */}
                        <div className="flex items-center">
                          <Badge
                            variant="outline"
                            className={
                              project.projectTrack === 'Independent'
                                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-wider px-3 py-1'
                                : 'border-primary/40 bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider px-3 py-1'
                            }
                          >
                            {project.projectTrack === 'Independent' ? 'Independent Project' : 'Guided Project'}
                          </Badge>
                        </div>

                        {/* Image with classic, spacious 3:2 aspect ratio */}
                        <div className="aspect-[3/2] relative w-full overflow-hidden rounded-xl border border-border/50 bg-muted">
                          {project.imageUrl ? (
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, 700px"
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

                        {/* Spacious, prominent title */}
                        <CardTitle className="text-xl md:text-2xl font-bold font-headline pt-2 group-hover:text-primary transition-colors leading-snug">
                          {project.title}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="px-6 md:px-8 pb-6 space-y-5">
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          {project.description}
                        </p>

                        {/* Clean tech and problem-solving badges */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {project.projectTypes.map((type) => (
                            <Badge
                              key={type}
                              variant="secondary"
                              className="text-xs px-2.5 py-1 bg-secondary text-muted-foreground font-normal border border-border/50"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>

                      {/* Clean, balanced 2x2 button grid with GraduationCap icon for Research Paper */}
                      <CardFooter className="px-6 md:px-8 py-5 border-t border-border/60 bg-muted/20">
                        <div className="grid grid-cols-2 gap-3 w-full">
                          {project.githubUrl && (
                            <Button asChild variant="outline" size="default" className="w-full text-xs sm:text-sm border-border/80 hover:border-primary/50 hover:bg-secondary">
                              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                Code
                              </Link>
                            </Button>
                          )}
                          {project.link && (
                            <Button asChild size="default" className="w-full text-xs sm:text-sm shadow-md shadow-primary/20">
                              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Live Demo
                              </Link>
                            </Button>
                          )}
                          <Button asChild variant="outline" size="default" className="w-full text-xs sm:text-sm border-border/80 hover:border-primary/50 hover:bg-secondary">
                            <Link href={project.docsPath} prefetch={true}>
                              <FileText className="mr-2 h-4 w-4" />
                              Case Study
                            </Link>
                          </Button>
                          {project.paperUrl && (
                            <Button asChild variant="outline" size="default" className="w-full text-xs sm:text-sm border-border/80 hover:border-primary hover:text-primary hover:bg-secondary">
                              <Link href={project.paperUrl} target="_blank" rel="noopener noreferrer">
                                <GraduationCap className="mr-2 h-4 w-4 text-primary" />
                                Paper
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
    </section>
  );
};

export default Projects;
