'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { projects } from '@/app/lib/data';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, BookOpen, ScrollText } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  SectionHeading,
  SpotlightCard,
  TiltShowcaseCard,
} from '@/components/ui/motion-primitives';
import { cn } from '@/lib/utils';
import { getHeroFeaturedGridClass } from '@/lib/portfolio-utils';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');

  const projectFilters = ['All', 'Independent', 'Guided'];

  const filteredProjects =
    activeTab === 'All'
      ? projects
      : projects.filter((project) => project.projectTrack === activeTab);

  const layoutMode = getHeroFeaturedGridClass(filteredProjects.length);

  return (
    <div className="py-14 sm:py-16 md:py-20">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading
          kicker="Selected Work"
          title="Featured Projects"
          highlightWord="Projects"
          subtitle="Hands-on data analytics and ML builds solving root bottlenecks, mitigating churn risk, and driving measurable business outcomes."
        />

        <div>
          {/* Show interactive track filter only when multiple builds exist */}
          {projects.length > 1 && (
            <div className="flex justify-center mb-8 sm:mb-10">
              <div
                role="tablist"
                aria-label="Project track filters"
                className="inline-flex items-center gap-1 p-1 bg-card/95 rounded-full border border-border shadow-sm"
              >
                {projectFilters.map((filter) => {
                  const isSelected = activeTab === filter;
                  return (
                    <button
                      key={filter}
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveTab(filter)}
                      className={cn(
                        'relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0',
                        isSelected ? 'font-semibold' : 'text-[#3D433E] hover:text-foreground'
                      )}
                      style={isSelected ? { color: 'var(--accent-ink)' } : undefined}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="projects-filter-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-full -z-10"
                          style={{
                            backgroundColor: 'var(--accent-solid)',
                          }}
                        />
                      )}
                      <span className="relative z-10">
                        {filter === 'All' ? 'All Builds' : `${filter} Projects`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {filteredProjects.length === 0 ? (
            <SpotlightCard className="text-center py-12 px-6 max-w-xl mx-auto">
              <p className="text-[#3D433E] text-sm sm:text-base mb-4">
                No {activeTab.toLowerCase()} projects added yet. More builds in progress.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('All')}
                className="rounded-xl border-border bg-background hover:bg-secondary text-foreground text-xs sm:text-sm h-10 px-5"
              >
                Show All Builds
              </Button>
            </SpotlightCard>
          ) : layoutMode === 'single' ? (
            /* Aceternity 3D Tilt + BorderBeam Flagship Split Card */
            filteredProjects.map((project) => (
              <TiltShowcaseCard key={project.id} className="group overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left Architectural Diagram & Stack Column */}
                  <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between bg-secondary/35 border-b lg:border-b-0 lg:border-r border-border">
                    <div className="flex items-center justify-between gap-2 text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold" style={{ color: 'var(--accent-bright)' }}>
                          {project.projectTrack === 'Independent'
                            ? 'Independent Build'
                            : 'Guided Build'}
                        </span>
                        <span aria-hidden="true" className="text-muted-foreground/60">·</span>
                        <span className="text-[#3D433E]">{project.category}</span>
                      </div>
                      <span className="text-[11px] font-semibold hidden sm:inline text-[#3D433E]">
                        Flagship Case Study
                      </span>
                    </div>

                    <div className="aspect-[16/9] relative w-full overflow-hidden rounded-xl border border-border bg-secondary">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 620px"
                          className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          data-ai-hint={project.imageHint}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground text-xs font-mono tracking-widest">
                          {project.title}
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#232724]/18 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-35" />
                    </div>

                    <div className="pt-3.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#3D433E]">
                      <span>{project.tool}</span>
                      {project.caseStudy?.kpis?.[2] && (
                        <span
                          className="font-bold tabular-nums"
                          style={{ color: 'var(--accent-bright)' }}
                        >
                          {project.caseStudy.kpis[2].value}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Details, Bold Highlights & CTA Column */}
                  <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <h3 className="text-xl sm:text-2xl font-extrabold font-headline text-foreground leading-snug tracking-tight">
                        {project.title}
                      </h3>

                      <p className="text-[#3D433E] text-base leading-[1.7]">
                        End-to-end ML pipeline engineered to{' '}
                        <span className="text-underline-accent">
                          diagnose silent churn root causes
                        </span>
                        , predict cancellations{' '}
                        <strong className="text-foreground font-semibold">30 days early</strong>
                        , and automate retention queues.
                      </p>

                      {/* Unboxed Hairline KPI Spec Strip */}
                      {project.caseStudy?.kpis && (
                        <div className="grid grid-cols-3 divide-x divide-border border-y border-border py-3">
                          {project.caseStudy.kpis.map((kpi) => (
                            <div key={kpi.label} className="px-2 first:pl-0 last:pr-0 text-center">
                              <p
                                className="text-lg sm:text-xl font-extrabold font-headline tabular-nums"
                                style={{ color: 'var(--accent-bright)' }}
                              >
                                {kpi.value}
                              </p>
                              <p className="text-[10px] sm:text-[11px] font-mono text-muted-foreground leading-tight mt-0.5">
                                {kpi.label}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="text-xs font-mono text-muted-foreground">
                        {project.projectTypes.join(' · ')}
                      </p>
                    </div>

                    {(() => {
                      const hasDistinctDemo = Boolean(project.link && project.link !== project.githubUrl);
                      const actionCount =
                        (project.githubUrl ? 1 : 0) +
                        (hasDistinctDemo ? 1 : 0) +
                        1 +
                        (project.paperUrl ? 1 : 0);
                      return (
                        <div
                          className={cn(
                            'pt-2 grid gap-2.5 w-full',
                            actionCount === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'
                          )}
                        >
                          {project.githubUrl && (
                            <Button
                              asChild
                              variant="outline"
                              size="default"
                              className="w-full text-xs border-border bg-background hover:border-[#2B6E73]/40 hover:bg-secondary text-foreground h-10 rounded-xl whitespace-nowrap shrink-0"
                            >
                              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-1.5 h-3.5 w-3.5" />
                                Code
                              </Link>
                            </Button>
                          )}
                          {hasDistinctDemo && project.link && (
                            <Button
                              asChild
                              size="default"
                              className="btn-shimmer w-full text-xs h-10 rounded-xl font-semibold whitespace-nowrap shrink-0"
                              style={{
                                backgroundColor: 'var(--accent-solid)',
                                color: 'var(--accent-ink)',
                                boxShadow: '0 6px 18px -6px rgba(43, 110, 115, 0.35)',
                              }}
                            >
                              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                                Live Demo
                              </Link>
                            </Button>
                          )}
                          <Button
                            asChild
                            size="default"
                            className="btn-shimmer w-full text-xs h-10 rounded-xl font-semibold whitespace-nowrap shrink-0"
                            style={{
                              backgroundColor: 'var(--accent-solid)',
                              color: 'var(--accent-ink)',
                              boxShadow: '0 6px 18px -6px rgba(43, 110, 115, 0.35)',
                            }}
                          >
                            <Link href={project.docsPath} prefetch={true}>
                              <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                              Case Study
                            </Link>
                          </Button>
                          {project.paperUrl && (
                            <Button
                              asChild
                              variant="outline"
                              size="default"
                              className="w-full text-xs border-border bg-background hover:border-[#2B6E73]/40 hover:bg-secondary text-foreground h-10 rounded-xl whitespace-nowrap shrink-0"
                            >
                              <Link href={project.paperUrl} target="_blank" rel="noopener noreferrer">
                                <ScrollText
                                  className="mr-1.5 h-3.5 w-3.5"
                                  style={{ color: 'var(--accent-bright)' }}
                                />
                                Paper
                              </Link>
                            </Button>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </TiltShowcaseCard>
            ))
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {filteredProjects.map((project) => (
                <SpotlightCard
                  key={project.id}
                  className="group flex flex-col justify-between overflow-hidden hover:-translate-y-1"
                >
                  <div className="flex flex-col justify-between h-full">
                    <div className="p-5 sm:p-6 pb-4 space-y-3.5">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground">
                        <span className="font-semibold" style={{ color: 'var(--accent-bright)' }}>
                          {project.projectTrack === 'Independent'
                            ? 'Independent Build'
                            : 'Guided Build'}
                        </span>
                        <span aria-hidden="true" className="text-muted-foreground/60">·</span>
                        <span className="text-[#3D433E]">{project.category}</span>
                      </div>

                      <div className="aspect-[16/9] relative w-full overflow-hidden rounded-xl border border-border bg-secondary">
                        {project.imageUrl ? (
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 520px"
                            className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                            data-ai-hint={project.imageHint}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground text-xs font-mono tracking-widest">
                            {project.title}
                          </div>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold font-headline pt-1 text-foreground leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-[#3D433E] text-sm leading-relaxed">
                        {project.description}
                      </p>

                      <p className="text-xs font-mono text-muted-foreground">
                        {project.projectTypes.join(' · ')}
                      </p>
                    </div>

                    <div className="px-5 sm:px-6 py-4 border-t border-border bg-secondary/35 mt-auto">
                      <div className="grid grid-cols-2 gap-2.5 w-full">
                        {project.githubUrl && (
                          <Button
                            asChild
                            variant="outline"
                            size="default"
                            className="w-full text-xs border-border bg-background hover:border-[#2B6E73]/40 hover:bg-secondary text-foreground h-10 rounded-xl whitespace-nowrap shrink-0"
                          >
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-1.5 h-3.5 w-3.5" />
                              Code
                            </Link>
                          </Button>
                        )}
                        {project.link && (
                          <Button
                            asChild
                            size="default"
                            className="btn-shimmer w-full text-xs h-10 rounded-xl font-semibold whitespace-nowrap shrink-0"
                            style={{
                              backgroundColor: 'var(--accent-solid)',
                              color: 'var(--accent-ink)',
                            }}
                          >
                            <Link href={project.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                              Live Demo
                            </Link>
                          </Button>
                        )}
                        <Button
                          asChild
                          variant="outline"
                          size="default"
                          className="w-full text-xs border-border bg-background hover:border-[#2B6E73]/40 hover:bg-secondary text-foreground h-10 rounded-xl whitespace-nowrap shrink-0"
                        >
                          <Link href={project.docsPath} prefetch={true}>
                            <BookOpen className="mr-1.5 h-3.5 w-3.5" style={{ color: 'var(--accent-bright)' }} />
                            Case Study
                          </Link>
                        </Button>
                        {project.paperUrl && (
                          <Button
                            asChild
                            variant="outline"
                            size="default"
                            className="w-full text-xs border-border bg-background hover:border-[#2B6E73]/40 hover:bg-secondary text-foreground h-10 rounded-xl whitespace-nowrap shrink-0"
                          >
                            <Link href={project.paperUrl} target="_blank" rel="noopener noreferrer">
                              <ScrollText className="mr-1.5 h-3.5 w-3.5" style={{ color: 'var(--accent-bright)' }} />
                              Paper
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
