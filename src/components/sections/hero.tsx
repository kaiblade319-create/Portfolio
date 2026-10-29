
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download, User } from 'lucide-react';
import NeuralNetworkBackground from '@/components/ui/neural-network-background';
// import { SyntheticBackground } from '@/components/ui/synthetic-background';

const Hero = () => {
  const heroStats = [
    { value: '20+', label: 'Projects' },
    { value: '10+', label: 'Technologies' },
    { value: '5+', label: 'Dashboards' },
    { value: '100%', label: 'Dedication' },
  ];

  return (
    <section id="home" className="relative h-dvh overflow-hidden flex items-center justify-center text-center pt-16 md:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.08),transparent_45%),radial-gradient(circle_at_80%_80%,hsl(var(--primary)/0.05),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.58))]" />
      </div>
      {/* Electric Blue Shader Background - Uncomment to enable */}
      {/* <SyntheticBackground /> */}
      
      {/* The main container for your hero content */}
      <div className="container z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-6">
          <p className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary md:text-sm">
            Target Role: Data Analyst (Path to Data Engineer and Data Scientist)
          </p>
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Kaushar Halani
            </h1>
            <h2 className="mx-auto max-w-5xl text-2xl md:text-3xl font-body text-foreground">
              Aspiring Data Analyst Building Toward Data Engineering & Data Science
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground md:text-lg leading-relaxed">
              I transform raw data into decision-ready insights through practical analysis, dashboarding, and reproducible workflows while growing into end-to-end data and ML engineering.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="animate-button-pulse shadow-lg shadow-primary/20">
              <Link href="/resume" prefetch={true}>
                <Download />
                Resume
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="animate-button-pulse border-primary/30 hover:border-primary/50">
                <Link href="/profile" prefetch={true}>
                  <>
                    <User />
                    Profile
                  </>
                </Link>
            </Button>
          </div>

          <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-primary/20 bg-card/60 px-4 py-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/15"
              >
                <p className="text-2xl font-bold font-headline text-primary md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs md:text-sm text-muted-foreground tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

