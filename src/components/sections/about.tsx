import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Folder,
  Mail,
  Zap,
  Crosshair,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

const operatingPrinciples = [
  {
    icon: Zap,
    title: 'Mindset',
    detail: 'High-Agency & Fast Learner',
    desc: 'Stack-agnostic; masters unfamiliar tools and workflows rapidly to deliver.',
  },
  {
    icon: Crosshair,
    title: 'Methodology',
    detail: 'Root-Cause Problem Solving',
    desc: 'Diagnoses core bottlenecks instead of applying temporary band-aids.',
  },
  {
    icon: ShieldCheck,
    title: 'Value Focus',
    detail: 'Loss Mitigation & Precision',
    desc: 'Anticipates friction early to protect time, margins, and operational reliability.',
  },
  {
    icon: CheckCircle2,
    title: 'Execution',
    detail: 'End-to-End Ownership',
    desc: 'Takes initiatives from initial ambiguity to clean, tested, documented delivery.',
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight">
            About Me
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mt-3 max-w-2xl mx-auto leading-relaxed">
            High-agency builder driven by root-cause problem solving, rapid adaptability, and measurable business impact.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border border-border/80 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 md:p-8 space-y-5">
                <h3 className="text-xl md:text-2xl font-bold font-headline text-foreground">
                  Building with Ownership in the AI Era
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  I am a Computer Science &amp; Engineering student who believes that in today’s landscape, true capability isn’t about memorizing one language or framework. It’s about having the daring and resourcefulness to walk into complex, unfamiliar problems and solve them from the root.
                </p>

                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Whether an organization needs to diagnose hidden operational bottlenecks, automate error-prone workflows, or deploy a machine learning model, I take end-to-end accountability. I use modern AI tools to accelerate research and execution, cutting down time-to-delivery without cutting corners on precision.
                </p>

                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Every system I build is designed to protect your bottom line, eliminate recurring losses, and create experiences that stakeholders and clients genuinely trust.
                </p>

                {/* Option B CTA Buttons */}
                <div className="pt-3 flex flex-wrap gap-3">
                  <Button asChild size="default" className="shadow-lg shadow-primary/20">
                    <Link href="/#projects">
                      <Folder className="mr-2 h-4 w-4" />
                      View Projects
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="default" className="border-primary/30 hover:border-primary/50">
                    <Link href="/#contact">
                      <Mail className="mr-2 h-4 w-4" />
                      Get in Touch
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Facts / How I Operate Column */}
          <div className="lg:col-span-5">
            <Card className="border border-primary/25 bg-card/70 backdrop-blur-md shadow-xl shadow-primary/5">
              <CardContent className="p-6 md:p-7 space-y-5">
                <div className="pb-3 border-b border-border">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    How I Operate
                  </p>
                </div>

                <div className="space-y-4">
                  {operatingPrinciples.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-3.5 group">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary mt-0.5 transition-colors group-hover:bg-primary group-hover:text-black">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                              {item.title}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-foreground">
                            {item.detail}
                          </p>
                          <p className="text-xs text-muted-foreground/80 leading-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
