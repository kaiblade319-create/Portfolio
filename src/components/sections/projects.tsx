
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { projects } from '@/app/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');

  const projectCategories = ['All', 'Machine Learning', 'NLP', 'Data Analysis', 'Data Visualization'];

    const prioritizedProjects = [...projects].sort((a, b) => a.id - b.id);

    const filteredProjects = activeTab === 'All'
        ? prioritizedProjects
    : projects.filter(project => project.category === activeTab);

  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Projects</h2>
                    <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">Selected projects with clear problem statements, approach, and measurable outcomes.</p>
        </div>

        <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="All" onValueChange={setActiveTab} className="w-full">
                 <div className="flex justify-center mb-8">
                   <TabsList className="inline-flex items-center gap-2 p-1 bg-secondary rounded-full h-auto border-none">
                      {projectCategories.map((category) => (
                          <TabsTrigger
                              key={category}
                              value={category}
                              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm data-[state=inactive]:text-muted-foreground hover:text-foreground"
                          >
                              {category}
                          </TabsTrigger>
                      ))}
                  </TabsList>
                </div>

                <TabsContent value={activeTab}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                        {filteredProjects.map((project) => (
                                                <Card key={project.id} className="group flex flex-col overflow-hidden border-border/60 bg-card/70 backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/20 hover:shadow-2xl">
                        <CardHeader>
                                                    {project.id <= 3 && (
                                                        <div className="mb-3">
                                                            <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary text-[11px] uppercase tracking-wide">
                                                                Featured Project
                                                            </Badge>
                                                        </div>
                                                    )}
                            <div className="aspect-[3/2] relative w-full">
                            {project.imageUrl ? (
                                <Image
                                    src={project.imageUrl}
                                    alt={project.title}
                                    width={600}
                                    height={400}
                                    sizes="(max-width: 768px) 100vw, 600px"
                                    className="object-cover w-full h-full"
                                    data-ai-hint={project.imageHint}
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs font-medium tracking-widest">
                                    INSERT YOUR IMAGE HERE
                                </div>
                            )}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                            <CardTitle className="pt-4">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                                                        <p className="text-muted-foreground text-sm min-h-[84px]">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                            {project.projectTypes.map((type) => (
                                <Badge key={type} variant="secondary">{type}</Badge>
                            ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex w-full justify-center gap-2 flex-wrap">
                                {project.githubUrl && (
                                <Button asChild variant="outline" className="flex-1 min-w-[100px]">
                                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                    <Github /> GitHub
                                    </Link>
                                </Button>
                                )}
                                {project.link && (
                                <Button asChild className="flex-1 min-w-[100px] shadow-md shadow-primary/20">
                                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink /> Live
                                    </Link>
                                </Button>
                                )}
                                <Button asChild variant="outline" className="flex-1 min-w-[100px]">
                                    <Link href={project.docsPath} prefetch={true}>
                                    <FileText /> Docs
                                    </Link>
                                </Button>
                            </div>
                        </CardFooter>
                        </Card>
                    ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Projects;
