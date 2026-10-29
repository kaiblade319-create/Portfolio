
'use client';
import { use } from 'react';
import { projects } from '@/app/lib/data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ExternalLink, Github, FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find((p) => p.id.toString() === id);

  if (!project) {
    notFound();
  }

  const toolBadges = (() => {
    const tool = project.tool.trim();
    const matched = tool.match(/^([^()]+)\(([^()]+)\)$/);

    if (!matched) {
      return [tool];
    }

    const baseTool = matched[1].trim();
    const extraTools = matched[2]
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    return [baseTool, ...extraTools];
  })();

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1 py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">

          {/* Back button */}
          <div className="flex justify-start mb-8">
            <Button asChild variant="outline">
              <Link href="/#projects">
                <ArrowLeft className="mr-2" />
                Back to Projects
              </Link>
            </Button>
          </div>

          <article className="max-w-4xl mx-auto">

            <Card className="mb-8 overflow-hidden">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold font-headline mb-3">{project.title}</h1>
                  <p className="text-lg text-muted-foreground">{project.description}</p>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 text-sm">
                  <div>
                    <dt className="font-semibold text-foreground mb-2">Tool</dt>
                    <dd className="flex flex-wrap gap-2.5">
                      {toolBadges.map((tool) => (
                        <Badge key={tool} variant="secondary">{tool}</Badge>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-foreground mb-2">Project Types</dt>
                    <dd className="flex flex-wrap gap-2.5">
                      {project.projectTypes.map((type) => (
                        <Badge key={type} variant="secondary">{type}</Badge>
                      ))}
                    </dd>
                  </div>
                  {project.link && (
                    <div>
                      <dt className="font-semibold text-foreground mb-2">Link</dt>
                      <dd>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1 break-all"
                        >
                          {project.linkLabel ?? project.link.replace(/^https?:\/\//, '')}
                          <ExternalLink className="flex-shrink-0 h-3 w-3" />
                        </a>
                      </dd>
                    </div>
                  )}
                  {project.dataFiles && project.dataFiles.length > 0 && (
                    <div>
                      <dt className="font-semibold text-foreground mb-2">Data Files</dt>
                      <dd className="text-muted-foreground flex flex-col gap-1">
                        {project.dataFiles.map((file) => (
                          <a
                            key={file.url}
                            href={file.url}
                            download
                            className="inline-flex items-center gap-1.5 text-primary hover:underline"
                          >
                            <FileSpreadsheet className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                            {file.name}
                          </a>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            {/* ── Goal | Process | Insights ── */}
            <Card className="mb-8">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <section className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border/60">
                    <h3 className="text-xl font-headline font-semibold mb-3">Goal</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.goal}</p>
                  </section>
                  <section className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border/60">
                    <h3 className="text-xl font-headline font-semibold mb-3">Process</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.process}</p>
                  </section>
                  <section className="p-6 md:p-8">
                    <h3 className="text-xl font-headline font-semibold mb-3">Insights</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.insights}</p>
                  </section>
                </div>
              </CardContent>
            </Card>

            {project.placeholderLabel && (
              <section className="mb-8 text-center">
                <h3 className="text-4xl md:text-5xl font-bold font-headline mb-4">{project.placeholderLabel}</h3>
                <div className="max-w-2xl mx-auto rounded-lg bg-primary px-6 py-5 text-primary-foreground text-3xl md:text-5xl font-bold tracking-wide">
                  INSERT YOUR IMAGE HERE
                </div>
              </section>
            )}

            {/* ── Results ── */}
            {project.results && project.results.length > 0 && (
              <section className="mb-8">
                <div className="flex flex-col gap-6">
                  {project.results.map((result, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg font-headline">{result.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">{result.description}</p>
                        {result.imageUrl ? (
                          <div className="aspect-[16/9] relative rounded-lg overflow-hidden border border-border/50">
                            <Image
                              src={result.imageUrl}
                              alt={result.title}
                              fill
                              className="object-cover"
                              data-ai-hint={result.imageHint}
                            />
                          </div>
                        ) : (
                          <div className="aspect-[16/9] flex items-center justify-center rounded-lg border border-dashed border-border bg-muted text-muted-foreground text-sm tracking-widest">
                            INSERT YOUR IMAGE HERE
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-8 text-center">
              <h2 className="text-2xl font-bold font-headline mb-4">Project Detailed Report</h2>
              <p className="text-muted-foreground mb-6">
                For a deeper dive into methodology, performance, and theory, open the detailed report.
              </p>
              <Button asChild size="lg" className="animate-button-pulse transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
                <Link href={`/projects/${project.id}/report`}>
                  <BookOpen className="mr-2" />
                  View Detailed Report
                </Link>
              </Button>
            </section>

          </article>
        </div>
      </main>
    </div>
  );
}
