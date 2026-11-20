'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects } from '@/app/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ScrollProgressBar,
  SpotlightCard,
} from '@/components/ui/motion-primitives';
import { SubPageHeader } from '@/components/layout/subpage-header';
import {
  TelemetryAreaChart,
  BenchmarkBarChart,
} from '@/components/project-charts';
import {
  Github,
  ExternalLink,
  ScrollText,
  Download,
  Clock,
  Target,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Database,
  Sliders,
  Cpu,
  Send,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Table2,
  Activity,
} from 'lucide-react';

const KPI_ICONS = {
  Clock,
  TrendingDown,
  Target,
} as const;

const WORKFLOW_ICONS = {
  Database,
  Sliders,
  Cpu,
  Send,
} as const;

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find((p) => p.id.toString() === id);

  if (!project) {
    notFound();
  }

  const cs = project.caseStudy;

  const handleDownloadSampleCsv = () => {
    const headers =
      'customer_id,tenure_months,support_tickets_30d,monthly_logins,contract_type,churn_risk_score,actual_churn\n';
    const rows = [
      'CUST-10492,4,4,6,monthly,0.82,1\n',
      'CUST-10493,18,0,24,annual,0.11,0\n',
      'CUST-10494,2,5,3,monthly,0.91,1\n',
      'CUST-10495,29,1,19,annual,0.15,0\n',
      'CUST-10496,8,2,11,monthly,0.54,0\n',
      'CUST-10497,1,3,4,monthly,0.88,1\n',
      'CUST-10498,14,1,16,annual,0.22,0\n',
    ].join('');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'churn_pipeline_sample_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <ScrollProgressBar />
      <SubPageHeader
        backHref="/#projects"
        backLabel="Back to Projects"
        breadcrumb="Independent Project Case Study"
      />

      <main className="flex-1 py-8 sm:py-12 md:py-14">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-14">
          {/* Section 1: Header & Quick Links */}
          <header className="space-y-5">
            <span className="inline-block text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[var(--accent-bright)]">
              Case Study · 0{project.id}
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-headline tracking-tight leading-[1.06] text-foreground">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#3D433E] leading-relaxed max-w-[65ch]">
              {cs?.subtitle ?? project.description}
            </p>

            {/* Quick Proof Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {project.githubUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-border bg-card hover:border-[#2B6E73]/40 hover:bg-secondary text-foreground text-xs sm:text-sm h-10 px-4 whitespace-nowrap shrink-0"
                >
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1.5 h-4 w-4 text-[var(--accent-bright)]" /> Code Repo
                  </Link>
                </Button>
              )}
              {project.link && project.link !== project.githubUrl && (
                <Button
                  asChild
                  size="sm"
                  className="btn-shimmer rounded-xl bg-[var(--accent-solid)] text-[var(--accent-ink)] font-semibold hover:bg-[var(--accent-solid-hover)] text-xs sm:text-sm h-10 px-5 whitespace-nowrap shrink-0"
                >
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1.5 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
              )}
              {project.paperUrl && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-border bg-card hover:border-[#2B6E73]/40 hover:bg-secondary text-foreground text-xs sm:text-sm h-10 px-4 whitespace-nowrap shrink-0"
                >
                  <Link href={project.paperUrl} target="_blank" rel="noopener noreferrer">
                    <ScrollText className="mr-1.5 h-4 w-4 text-[var(--accent-bright)]" /> Research Paper
                  </Link>
                </Button>
              )}
              <Button
                onClick={handleDownloadSampleCsv}
                variant="outline"
                size="sm"
                className="rounded-xl border-border bg-card hover:border-[#2B6E73]/40 hover:bg-secondary text-foreground text-xs sm:text-sm h-10 px-4 whitespace-nowrap shrink-0"
              >
                <Download className="mr-1.5 h-4 w-4 text-[var(--accent-bright)]" /> Download Sample Data (.csv)
              </Button>
            </div>
          </header>

          {cs ? (
            <>
              {/* Section 2: Impact Numbers */}
              <section className="rounded-2xl border border-border bg-card/95 overflow-hidden grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border shadow-sm">
                {cs.kpis.map((kpi) => {
                  const Icon = KPI_ICONS[kpi.icon] ?? Target;
                  return (
                    <div key={kpi.label} className="p-5 sm:p-6 text-center space-y-1.5">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Icon className="h-4 w-4 text-[var(--accent-bright)]" />
                        <span className="text-[11px] uppercase font-mono font-semibold tracking-[0.16em] text-muted-foreground">
                          {kpi.label}
                        </span>
                      </div>
                      <p className="text-3xl sm:text-4xl font-extrabold font-headline text-foreground tabular-nums tracking-tight">
                        {kpi.value}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground tabular-nums">{kpi.sublabel}</p>
                    </div>
                  );
                })}
              </section>

              {/* Section 3: The Expensive Problem & Root Cause Discovery */}
              <section className="space-y-5">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)]">
                    Discovery Phase
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline tracking-tight mt-1 text-foreground">
                    The Problem &amp; <span className="text-[var(--accent-bright)]">Root-Cause Discovery</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
                  <SpotlightCard className="p-5 sm:p-7 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold font-headline text-foreground flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-muted-foreground shrink-0" />
                      {cs.problemTitle}
                    </h3>
                    {cs.problemParagraphs.map((paragraph, i) => (
                      <p key={i} className="text-sm sm:text-base text-[#3D433E] leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </SpotlightCard>

                  <SpotlightCard className="p-5 sm:p-7 space-y-3.5">
                    <h3 className="text-lg sm:text-xl font-bold font-headline text-foreground flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-[var(--accent-bright)] shrink-0" />
                      {cs.revealTitle}
                    </h3>
                    {cs.revealParagraphs.map((paragraph, i) => (
                      <p
                        key={i}
                        className={
                          i === cs.revealParagraphs.length - 1
                            ? 'text-sm sm:text-base text-[var(--accent-soft)] leading-relaxed font-semibold'
                            : 'text-sm sm:text-base text-[#3D433E] leading-relaxed'
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </SpotlightCard>
                </div>
              </section>

              {/* Section 4: Traditional vs. Engineered Approach */}
              <section className="space-y-4 sm:space-y-5">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)]">
                    Strategic Differentiation
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline tracking-tight mt-1 text-foreground">
                    Traditional Approach vs. <span className="text-[var(--accent-bright)]">My Approach</span>
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-[#3D433E]">
                  How this system replaces <span className="text-underline-accent">reactive guesswork</span> with automated,{' '}
                  <strong className="text-foreground font-semibold">data-driven revenue protection</strong>.
                </p>

                <SpotlightCard className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-secondary/60 text-foreground font-semibold border-b border-border">
                        <tr>
                          <th className="p-4 w-1/4">Aspect</th>
                          <th className="p-4 w-3/8 text-muted-foreground">The Traditional / Competitor Way</th>
                          <th className="p-4 w-3/8 text-[var(--accent-bright)]">My Engineered Approach</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {cs.comparisonRows.map((row) => (
                          <tr key={row.dimension} className="hover:bg-secondary/35 transition-colors">
                            <td className="p-4 font-semibold text-foreground text-sm">
                              {row.dimension}
                            </td>
                            <td className="p-4 text-muted-foreground leading-relaxed text-sm">
                              <span className="flex items-start gap-2">
                                <XCircle className="h-4 w-4 text-muted-foreground/75 mt-0.5 flex-shrink-0" />
                                {row.traditional}
                              </span>
                            </td>
                            <td className="p-4 text-foreground leading-relaxed bg-[var(--accent-tint-subtle)] text-sm">
                              <span className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[var(--accent-bright)] mt-0.5 flex-shrink-0" />
                                {row.myApproach}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SpotlightCard>
              </section>

              {/* Section 5: The 4-Step Technical Workflow */}
              <section className="space-y-5">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)]">
                    Architecture
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline tracking-tight mt-1 text-foreground">
                    The End-to-End <span className="text-[var(--accent-bright)]">Workflow</span>
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-[#3D433E]">
                  How raw telemetry flows through feature engineering and calibration into <strong className="text-foreground font-semibold">prioritized business action</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cs.workflowSteps.map((item) => {
                    const Icon = WORKFLOW_ICONS[item.icon] ?? Cpu;
                    return (
                      <SpotlightCard key={item.step} className="p-5 space-y-3 group hover:-translate-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[var(--accent-bright)] tabular-nums">
                            {item.step}
                          </span>
                          <div className="p-2.5 rounded-xl bg-[var(--accent-tint)] border border-[var(--accent-border)] text-[var(--accent-bright)] transition-all duration-200 group-hover:bg-[var(--accent-solid)] group-hover:text-[var(--accent-ink)]">
                            <Icon className="h-4 w-4" />
                          </div>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold font-headline text-foreground">{item.title}</h3>
                        <p className="text-xs sm:text-sm text-[#3D433E] leading-relaxed">{item.desc}</p>
                      </SpotlightCard>
                    );
                  })}
                </div>
              </section>

              {/* Section 6: Key Findings, Visual Evidence & Interactive Telemetry */}
              <section className="space-y-5">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)]">
                    Telemetry Evidence
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline tracking-tight mt-1 text-foreground">
                    Key Insights &amp; <span className="text-[var(--accent-bright)]">Findings</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
                  {cs.discoveries.map((item) => {
                    const imgUrl = item.imageId
                      ? PlaceHolderImages.find((img) => img.id === item.imageId)?.imageUrl ?? ''
                      : '';
                    return (
                      <SpotlightCard key={item.title} className="p-5 sm:p-6 space-y-4">
                        <div className="space-y-1">
                          <span className="text-xs font-mono font-semibold text-[var(--accent-bright)] uppercase tracking-wider">
                            {item.kicker}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold font-headline text-foreground">
                            {item.title}
                          </h3>
                        </div>
                        <div className="aspect-[16/10] relative rounded-xl overflow-hidden border border-border bg-secondary">
                          {imgUrl ? (
                            <Image
                              src={imgUrl}
                              alt={item.alt}
                              fill
                              sizes="(max-width: 768px) 100vw, 440px"
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-mono text-muted-foreground">
                              {item.fallbackLabel}
                            </div>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[#3D433E] leading-relaxed">{item.caption}</p>
                      </SpotlightCard>
                    );
                  })}
                </div>

                {/* Interactive Telemetry Trajectory */}
                {cs.telemetrySeries.length > 0 && (
                  <SpotlightCard className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-[var(--accent-bright)]" />
                        <h3 className="text-base sm:text-lg font-bold font-headline text-foreground">
                          {cs.telemetryTitle}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-[var(--accent-bright)] uppercase tracking-wider">
                        Interactive Telemetry
                      </span>
                    </div>
                    <TelemetryAreaChart
                      data={cs.telemetrySeries}
                      primaryName={cs.telemetryPrimaryLabel}
                      baselineName={cs.telemetryBaselineLabel}
                      unit={cs.telemetryUnit}
                    />
                  </SpotlightCard>
                )}

                {/* Model Evaluation Table / Interactive Chart Switcher */}
                <SpotlightCard className="p-5 sm:p-6 space-y-4">
                  <Tabs defaultValue="table" className="w-full space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <h3 className="text-lg sm:text-xl font-bold font-headline text-foreground">
                        Model Evaluation &amp; Trade-off Analysis
                      </h3>
                      <TabsList className="bg-background border border-border rounded-xl p-1 h-auto self-start sm:self-auto">
                        <TabsTrigger
                          value="table"
                          className="rounded-lg text-xs px-3 py-1.5 data-[state=active]:bg-[var(--accent-solid)] data-[state=active]:text-[var(--accent-ink)] font-semibold text-[#3D433E]"
                        >
                          <Table2 className="h-3.5 w-3.5 mr-1.5" />
                          Metrics Table
                        </TabsTrigger>
                        <TabsTrigger
                          value="chart"
                          className="rounded-lg text-xs px-3 py-1.5 data-[state=active]:bg-[var(--accent-solid)] data-[state=active]:text-[var(--accent-ink)] font-semibold text-[#3D433E]"
                        >
                          <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
                          Benchmark Chart
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <p className="text-xs sm:text-sm text-[#3D433E] leading-relaxed">{cs.modelNarrative}</p>

                    <TabsContent value="table" className="mt-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm border border-border rounded-xl overflow-hidden tabular-nums">
                          <thead className="bg-secondary/60 text-foreground font-semibold">
                            <tr>
                              <th className="p-3.5">Model Architecture</th>
                              <th className="p-3.5">AUC-ROC Score</th>
                              <th className="p-3.5">High-Risk Recall</th>
                              <th className="p-3.5">Precision</th>
                              <th className="p-3.5">Trade-off Decision</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border text-[#3D433E]">
                            {cs.benchmarks.map((row) => (
                              <tr
                                key={row.model}
                                className={
                                  row.selected ? 'bg-[var(--accent-tint)] text-foreground font-medium' : ''
                                }
                              >
                                <td
                                  className={
                                    row.selected
                                      ? 'p-3.5 text-[var(--accent-soft)] flex items-center gap-1.5 font-semibold'
                                      : 'p-3.5 font-medium text-foreground'
                                  }
                                >
                                  {row.selected && (
                                    <CheckCircle2 className="h-4 w-4 text-[var(--accent-bright)] shrink-0" />
                                  )}
                                  <span>
                                    {row.model}
                                    {row.selected ? ' (Selected)' : ''}
                                  </span>
                                </td>
                                <td className={row.selected ? 'p-3.5 text-[var(--accent-bright)] font-bold' : 'p-3.5'}>
                                  {row.auc}
                                </td>
                                <td className={row.selected ? 'p-3.5 text-[var(--accent-bright)] font-bold' : 'p-3.5'}>
                                  {row.recall}
                                </td>
                                <td className={row.selected ? 'p-3.5 text-[var(--accent-bright)] font-bold' : 'p-3.5'}>
                                  {row.precision}
                                </td>
                                <td className={row.selected ? 'p-3.5 text-foreground' : 'p-3.5 text-muted-foreground'}>
                                  {row.tradeoff}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>

                    <TabsContent value="chart" className="mt-0">
                      <BenchmarkBarChart
                        models={cs.benchmarks}
                        primaryMetricName="AUC Score (%)"
                        secondaryMetricName="High-Risk Recall (%)"
                      />
                    </TabsContent>
                  </Tabs>
                </SpotlightCard>
              </section>

              {/* Section 7: Strategic Takeaways */}
              <section className="space-y-4">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[var(--accent-bright)]">
                    Executive Summary
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline tracking-tight mt-1 text-foreground">
                    Strategic <span className="text-[var(--accent-bright)]">Takeaways</span>
                  </h2>
                </div>

                <SpotlightCard className="p-5 sm:p-7 space-y-4">
                  <ul className="space-y-3.5 text-sm sm:text-base text-[#3D433E] leading-relaxed">
                    {cs.takeaways.map((takeaway) => (
                      <li key={takeaway.title} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[var(--accent-bright)] mt-1 flex-shrink-0" />
                        <span>
                          <strong className="text-foreground font-semibold">{takeaway.title}:</strong> {takeaway.detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </section>
            </>
          ) : (
            <section className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SpotlightCard className="p-5 space-y-2">
                  <span className="text-xs font-mono font-semibold text-[var(--accent-bright)] uppercase tracking-wider">Goal</span>
                  <p className="text-sm text-[#3D433E] leading-relaxed">{project.goal}</p>
                </SpotlightCard>
                <SpotlightCard className="p-5 space-y-2">
                  <span className="text-xs font-mono font-semibold text-[var(--accent-bright)] uppercase tracking-wider">Process</span>
                  <p className="text-sm text-[#3D433E] leading-relaxed">{project.process}</p>
                </SpotlightCard>
                <SpotlightCard className="p-5 space-y-2">
                  <span className="text-xs font-mono font-semibold text-[var(--accent-bright)] uppercase tracking-wider">Insights</span>
                  <p className="text-sm text-[#3D433E] leading-relaxed">{project.insights}</p>
                </SpotlightCard>
              </div>
              {project.results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.results.map((res) => (
                    <SpotlightCard key={res.title} className="p-5 space-y-2">
                      <h3 className="text-base font-bold font-headline text-foreground">{res.title}</h3>
                      <p className="text-xs sm:text-sm text-[#3D433E] leading-relaxed">{res.description}</p>
                    </SpotlightCard>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Bottom Action Footer */}
          <footer className="pt-7 sm:pt-9 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-headline font-bold text-foreground text-base sm:text-lg">
                Have questions about this case study?
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Explore the repository code, inspect the sample dataset, or reach out directly.
              </p>
            </div>
            <div className="flex gap-2.5">
              <Button
                asChild
                size="default"
                className="btn-shimmer rounded-xl bg-[var(--accent-solid)] text-[var(--accent-ink)] font-semibold hover:bg-[var(--accent-solid-hover)] shadow-[0_6px_18px_-6px_rgba(43,110,115,0.35)] text-xs sm:text-sm h-10 px-5 whitespace-nowrap shrink-0"
              >
                <Link href="/#contact">Discuss This Project</Link>
              </Button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
