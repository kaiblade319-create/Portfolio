
'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Download } from 'lucide-react';
import { projects } from '@/app/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const reportSections = [
  { id: 'project-summary', title: 'Project Summary' },
  { id: 'project-environment', title: 'Project Environment' },
  { id: 'scope-steps', title: 'Scope & Project Steps' },
  { id: 'data-sources', title: 'Data Sources & Data Gathering' },
  { id: 'data-checks', title: 'Data Checks & Summary Metrics' },
  { id: 'worksheet-build', title: 'Worksheet Build' },
  { id: 'dashboard-build', title: 'Dashboard Build' },
  {
    id: 'story-build',
    title: "Story Build ⚠️ If not used, don't forget to DELETE THIS BLOCK ⚠️",
  },
  {
    id: 'detailed-discussion',
    title: "Detailed Project Discussion ⚠️ If not used, don't forget to DELETE THIS BLOCK ⚠️",
  },
  {
    id: 'extra-section',
    title: "Extra Section to Fit Your Own Project Structure ⚠️ If not used, don't forget to DELETE THIS BLOCK ⚠️",
  },
  {
    id: 'extra-toggle-section',
    title:
      "Extra Section With toggling to Fit Your Own Project Structure ⚠️ If not used, don't forget to DELETE THIS BLOCK ⚠️",
  },
] as const;

export default function ProjectReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find((item) => item.id.toString() === id);
  const [openSection, setOpenSection] = useState<string | undefined>(undefined);

  if (!project) {
    notFound();
  }

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        return;
      }
      const exists = reportSections.some((section) => section.id === hash);
      if (!exists) {
        return;
      }
      setOpenSection(hash);
      const target = document.getElementById(hash);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const handleTocClick = (sectionId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpenSection(sectionId);
    window.history.replaceState(null, '', `#${sectionId}`);
    requestAnimationFrame(() => {
      const target = document.getElementById(sectionId);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const downloadTextFile = (fileName: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(objectUrl);
  };

  const handleDocsDownload = () => {
    const docsContent = [
      `Project: ${project.title}`,
      `Description: ${project.description}`,
      `Tool: ${project.tool}`,
      `Project Types: ${project.projectTypes.join(', ')}`,
      `Link: ${project.link ?? 'N/A'}`,
      `Data Files: ${project.dataFiles?.map((file) => file.name).join(', ') ?? 'N/A'}`,
      '',
      'Goal',
      project.goal,
      '',
      'Process',
      project.process,
      '',
      'Insights',
      project.insights,
    ].join('\n');

    downloadTextFile(`${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-project-docs.txt`, docsContent);
  };

  const handleDetailedReportDownload = () => {
    const reportContent = [
      `${project.title} - Project Detailed Report`,
      '',
      'Table of Contents',
      ...reportSections.map((section, index) => `${index + 1}. ${section.title}`),
      '',
      ...reportSections.flatMap((section) => [
        section.title,
        `Add your detailed content for ${section.title} in this section.`,
        '',
      ]),
    ].join('\n');

    downloadTextFile(`${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-detailed-report.txt`, reportContent);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1 py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-start mb-8">
            <Button asChild variant="outline">
              <Link href={`/projects/${id}`}>
                <ArrowLeft className="mr-2" />
                Back to Project
              </Link>
            </Button>
          </div>

          <article className="max-w-5xl mx-auto space-y-8">
            <header className="text-center space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold font-headline">{project.title} - Project Detailed Report</h1>
              <p className="text-muted-foreground text-lg">Use the table of contents below to jump directly to any section.</p>
            </header>

            <Card id="table-of-contents">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  {reportSections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={handleTocClick(section.id)}
                        className="hover:text-primary hover:underline transition-colors"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Accordion
              type="single"
              collapsible
              value={openSection}
              onValueChange={(value) => setOpenSection(value || undefined)}
              className="space-y-4"
            >
              {reportSections.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  id={section.id}
                  className="scroll-mt-24 border-b-0 border border-border/60 rounded-xl bg-card/70 backdrop-blur-sm px-6 md:px-8 shadow-sm"
                >
                  <AccordionTrigger className="text-left text-xl font-headline font-semibold py-6 hover:no-underline">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      Add your detailed content for <strong>{section.title}</strong> in this section. Keep this block only if you need it in this project report.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button
                onClick={handleDocsDownload}
                variant="outline"
                size="lg"
                className="animate-button-pulse transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Project Docs
              </Button>
              <Button
                onClick={handleDetailedReportDownload}
                size="lg"
                className="animate-button-pulse transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Detailed Report
              </Button>
            </div>

          </article>
        </div>
      </main>
    </div>
  );
}
