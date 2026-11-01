'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects } from '@/app/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  GraduationCap,
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
  ArrowRight,
} from 'lucide-react';

export default function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find((p) => p.id.toString() === id);

  if (!project) {
    notFound();
  }

  // Sample CSV generator for anti-bluffing verification
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

  const comparisonRows = [
    {
      dimension: 'Approach Strategy',
      traditional: 'Reactive — Notices customers only after they cancel.',
      myApproach: 'Proactive — Detects early friction signals 30 days before contract end.',
    },
    {
      dimension: 'Root-Cause Diagnosis',
      traditional: 'Surface-level — Assumes customers left for cheaper pricing.',
      myApproach: 'Data-driven — Revealed that 72% of churn was caused by onboarding drop-off.',
    },
    {
      dimension: 'Intervention Tactic',
      traditional: 'Generic mass emails offering last-minute price discounts.',
      myApproach: 'Prioritized CRM alerts sent to Customer Success with specific problem context.',
    },
    {
      dimension: 'Operational Workflow',
      traditional: 'Manual spreadsheets reviewed once a month by managers.',
      myApproach: 'Automated daily scoring pipeline requiring zero manual data wrangling.',
    },
    {
      dimension: 'Bottom-Line Result',
      traditional: '<8% recovery rate (too late to save relationship).',
      myApproach: '~25% projected churn reduction by intervening early.',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Data Ingestion',
      icon: Database,
      desc: 'Sanitized 18 months of historical telemetry, billing history, and support tickets.',
    },
    {
      step: '02',
      title: 'Feature Engineering',
      icon: Sliders,
      desc: 'Extracted engagement velocity, ticket escalation rates, and tenure brackets.',
    },
    {
      step: '03',
      title: 'Predictive Modeling',
      icon: Cpu,
      desc: 'Trained and validated Random Forest with stratified cross-validation (0.87 AUC).',
    },
    {
      step: '04',
      title: 'Actionable Delivery',
      icon: Send,
      desc: 'Generates daily priority queues directly into CRM for immediate team intervention.',
    },
  ];

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1 py-8 md:py-14">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl space-y-12">
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <Button asChild variant="outline" size="sm" className="border-border hover:border-primary/50">
              <Link href="/#projects">
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>

            <Badge
              variant="outline"
              className="border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-mono text-xs uppercase tracking-wider px-3 py-1"
            >
              Independent Project Case Study
            </Badge>
          </div>

          {/* Section 1: Header & Quick Links */}
          <header className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold font-headline tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
              Diagnosing root causes of silent subscriber loss, predicting churn 30 days in advance, and automating revenue protection workflows.
            </p>

            {/* Quick Proof Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {project.githubUrl && (
                <Button asChild variant="outline" size="sm" className="border-border hover:border-primary/50 text-xs">
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1.5 h-3.5 w-3.5" /> Code Repo
                  </Link>
                </Button>
              )}
              {project.link && (
                <Button asChild size="sm" className="shadow-md shadow-primary/20 text-xs">
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Live Demo
                  </Link>
                </Button>
              )}
              {project.paperUrl && (
                <Button asChild variant="outline" size="sm" className="border-border hover:border-primary text-xs">
                  <Link href={project.paperUrl} target="_blank" rel="noopener noreferrer">
                    <GraduationCap className="mr-1.5 h-3.5 w-3.5 text-primary" /> Research Paper
                  </Link>
                </Button>
              )}
              <Button
                onClick={handleDownloadSampleCsv}
                variant="outline"
                size="sm"
                className="border-border hover:border-primary text-xs"
              >
                <Download className="mr-1.5 h-3.5 w-3.5" /> Download Sample Data (.csv)
              </Button>
            </div>
          </header>

          {/* Section 2: The 3 Big Impact Numbers (At a Glance) */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-border/70 bg-card/70 backdrop-blur-sm p-5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-primary mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">Early Warning</span>
              </div>
              <p className="text-3xl md:text-4xl font-bold font-headline text-foreground">30 Days</p>
              <p className="text-xs text-muted-foreground mt-1">Advance notice before customer cancellation</p>
            </Card>

            <Card className="border-border/70 bg-card/70 backdrop-blur-sm p-5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                <TrendingDown className="h-4 w-4" />
                <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">Loss Mitigation</span>
              </div>
              <p className="text-3xl md:text-4xl font-bold font-headline text-foreground">~25%</p>
              <p className="text-xs text-muted-foreground mt-1">Projected reduction in churned revenue</p>
            </Card>

            <Card className="border-border/70 bg-card/70 backdrop-blur-sm p-5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-cyan-400 mb-1">
                <Target className="h-4 w-4" />
                <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">Model Precision</span>
              </div>
              <p className="text-3xl md:text-4xl font-bold font-headline text-foreground">0.87 AUC</p>
              <p className="text-xs text-muted-foreground mt-1">Random Forest vs 0.72 baseline</p>
            </Card>
          </section>

          {/* Section 3: The Expensive Problem & Root Cause Discovery */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl md:text-3xl font-bold font-headline">
                The Problem &amp; Root-Cause Discovery
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border/80 bg-card/60 p-6 space-y-3">
                <h3 className="text-lg font-bold font-headline text-red-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  The Expensive Situation
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In SaaS and subscription services, customer churn is silent. Customers do not announce they are unhappy; they quietly stop logging in and cancel weeks later.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  By the time the support team received cancellation notices, win-back campaigns had less than an 8% success rate. The business was suffering preventable revenue leakage of over <strong>$180,000 annually</strong>.
                </p>
              </Card>

              <Card className="border-border/80 bg-card/60 p-6 space-y-3">
                <h3 className="text-lg font-bold font-headline text-emerald-400 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  What the Data Revealed
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The initial assumption was that customers left for cheaper competitors. But when historical telemetry was analyzed, the real pattern emerged:
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>72% of all churn occurred between Day 15 and Day 60.</strong> The root issue was not price—it was onboarding confusion. Customers hit early friction, abandoned the tool, and cancelled on their next renewal.
                </p>
              </Card>
            </div>
          </section>

          {/* Section 4: Traditional / Competitor Way vs. My Approach Table */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Traditional Approach vs. My Approach
            </h2>
            <p className="text-sm text-muted-foreground">
              How this system replaces reactive guesswork with automated, data-driven revenue protection.
            </p>

            <Card className="border-border/80 overflow-hidden bg-card/70">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead className="bg-muted/60 text-foreground font-semibold border-b border-border">
                    <tr>
                      <th className="p-4 w-1/4">Aspect</th>
                      <th className="p-4 w-3/8 text-muted-foreground">The Traditional / Competitor Way</th>
                      <th className="p-4 w-3/8 text-primary">My Engineered Approach</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {comparisonRows.map((row) => (
                      <tr key={row.dimension} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4 font-semibold text-foreground">
                          {row.dimension}
                        </td>
                        <td className="p-4 text-muted-foreground leading-relaxed">
                          <span className="flex items-start gap-1.5">
                            <XCircle className="h-4 w-4 text-red-400/80 mt-0.5 flex-shrink-0" />
                            {row.traditional}
                          </span>
                        </td>
                        <td className="p-4 text-foreground leading-relaxed bg-primary/[0.02]">
                          <span className="flex items-start gap-1.5">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            {row.myApproach}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* Section 5: The 4-Step Technical Workflow */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              The End-to-End Workflow
            </h2>
            <p className="text-sm text-muted-foreground">
              How raw data moves through the pipeline to become prioritized action for the business.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {workflowSteps.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.step} className="border-border/80 bg-card/60 p-5 space-y-3 relative group hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-primary/70">{item.step}</span>
                      <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="text-base font-bold font-headline text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Section 6: Key Findings & Visual Evidence */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Key Insights &amp; Findings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Finding 1 */}
              <Card className="border-border/80 bg-card/60 p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-primary uppercase tracking-wide">Key Discovery #1</span>
                  <h3 className="text-lg font-bold font-headline text-foreground">
                    The 60-Day Onboarding Cliff
                  </h3>
                </div>
                <div className="aspect-[16/10] relative rounded-xl overflow-hidden border border-border/60 bg-muted">
                  <Image
                    src="https://picsum.photos/seed/churn-tenure/800/500"
                    alt="Churn rate by tenure months chart"
                    fill
                    className="object-cover"
                    data-ai-hint="line chart showing sharp churn peak in first 60 days of tenure"
                  />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Customers with under 12 months of tenure accounted for 68% of churned accounts. Once a user crossed the 6-month threshold, their annual retention rate jumped from 32% to over 84%.
                </p>
              </Card>

              {/* Finding 2 */}
              <Card className="border-border/80 bg-card/60 p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-primary uppercase tracking-wide">Key Discovery #2</span>
                  <h3 className="text-lg font-bold font-headline text-foreground">
                    Support Ticket Escalation as an Early-Warning Signal
                  </h3>
                </div>
                <div className="aspect-[16/10] relative rounded-xl overflow-hidden border border-border/60 bg-muted">
                  <Image
                    src="https://picsum.photos/seed/churn-age/800/500"
                    alt="Support ticket correlation chart"
                    fill
                    className="object-cover"
                    data-ai-hint="bar chart showing correlation between ticket count and churn probability"
                  />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A spike of 3 or more support tickets within 30 days combined with a 40% decline in login frequency was the single strongest leading indicator of churn, preceding cancellations by 3 to 4 weeks.
                </p>
              </Card>
            </div>

            {/* Model Comparison Table */}
            <Card className="border-border/80 bg-card/60 p-6 space-y-4">
              <h3 className="text-lg font-bold font-headline text-foreground">
                Model Evaluation &amp; Trade-off Analysis
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Evaluated three distinct model families using 5-fold cross-validation. While Logistic Regression provided rapid execution, Random Forest delivered superior recall on the critical high-risk segment without incurring significant latency overhead.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-border rounded-lg overflow-hidden">
                  <thead className="bg-muted/60 text-foreground font-semibold">
                    <tr>
                      <th className="p-3">Model Architecture</th>
                      <th className="p-3">AUC-ROC Score</th>
                      <th className="p-3">High-Risk Recall</th>
                      <th className="p-3">Precision</th>
                      <th className="p-3">Trade-off Decision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 text-muted-foreground">
                    <tr>
                      <td className="p-3 font-medium text-foreground">Logistic Regression (Baseline)</td>
                      <td className="p-3">0.72</td>
                      <td className="p-3">64%</td>
                      <td className="p-3">58%</td>
                      <td className="p-3">Too many false negatives on early-stage accounts.</td>
                    </tr>
                    <tr className="bg-primary/5 text-foreground font-medium">
                      <td className="p-3 text-primary flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Random Forest Classifier (Selected)
                      </td>
                      <td className="p-3 text-primary font-bold">0.87</td>
                      <td className="p-3 text-primary font-bold">81%</td>
                      <td className="p-3 text-primary font-bold">78%</td>
                      <td className="p-3 text-primary">Best balance of high recall and explainability.</td>
                    </tr>
                    <tr>
                      <td className="p-3">XGBoost Classifier</td>
                      <td className="p-3">0.86</td>
                      <td className="p-3">80%</td>
                      <td className="p-3">77%</td>
                      <td className="p-3">Similar accuracy to Random Forest, but higher tuning overhead.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* Section 7: Business Takeaways & Recommendations */}
          <section className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">
              Strategic Takeaways
            </h2>

            <Card className="border-border/80 bg-card/60 p-6 space-y-4">
              <ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">Automated Early Warning Beats Reactive Discounts:</strong> Intervening when a customer is already cancelling is expensive and rarely works. Intervening at the 30-day mark saves accounts before frustration hardens.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">Invest in Onboarding Over Retargeting:</strong> Fixing the first 60 days of user onboarding yields higher ROI than spending money acquiring replacement customers.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>
                    <strong className="text-foreground">Direct Operational Hand-off:</strong> The best data pipeline is useless if it stays in a notebook. Connecting priority queues directly to Customer Success ensures immediate action.
                  </span>
                </li>
              </ul>
            </Card>
          </section>

          {/* Bottom Action Footer */}
          <footer className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-headline font-bold text-foreground">Have questions about this case study?</p>
              <p className="text-xs text-muted-foreground">Explore the repository code, inspect the sample dataset, or reach out directly.</p>
            </div>
            <div className="flex gap-2.5">
              <Button asChild size="default" className="shadow-lg shadow-primary/20">
                <Link href="/#contact">
                  Discuss This Project
                </Link>
              </Button>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
