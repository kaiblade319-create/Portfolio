
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, User } from 'lucide-react';
import { siteConfig } from '@/config/site';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * HERO SECTION COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Purpose:
 * First impression area introducing Kaushar Halani, core value proposition,
 * quick navigation to Resume & Profile, and a responsive 2x2 impact matrix.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const Hero = () => {
  // Key impact metrics defined in site.ts (single source of truth)
  const heroStats = siteConfig.stats;

  return (
    <section id="home" className="relative min-h-dvh flex items-center justify-center text-center pt-20 pb-8 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16 overflow-hidden">
      {/* Ambient background glow: subtle cyan radial gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.08),transparent_45%),radial-gradient(circle_at_80%_80%,hsl(var(--primary)/0.05),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.58))]" />
      </div>
      
      {/* Central hero content container */}
      <div className="container z-10 mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6 max-w-4xl mx-auto">
          {/* Badge: compact single line on mobile, expands on tablet/desktop */}
          <p className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 sm:px-5 sm:py-1.5 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-primary">
            <span>High-Agency Problem Solver</span>
            <span className="mx-1.5 text-primary/40">·</span>
            <span>Systems Builder</span>
            <span className="hidden sm:inline">
              <span className="mx-1.5 text-primary/40">·</span>
              Operational Precision
            </span>
          </p>

          <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              {siteConfig.name}
            </h1>
            <h2 className="mx-auto max-w-3xl text-sm sm:text-lg md:text-2xl font-body text-foreground leading-snug font-medium">
              {siteConfig.tagline}
            </h2>
            <p className="mx-auto max-w-2xl text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed pt-0.5">
              {siteConfig.bio}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 pt-1">
            <Button asChild size="default" className="sm:h-11 sm:px-6 animate-button-pulse shadow-lg shadow-primary/20 text-xs sm:text-sm">
              <Link href="/resume" prefetch={true}>
                <Briefcase className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Resume
              </Link>
            </Button>
            <Button asChild variant="outline" size="default" className="sm:h-11 sm:px-6 animate-button-pulse border-primary/30 hover:border-primary/50 text-xs sm:text-sm">
              <Link href="/profile" prefetch={true}>
                <User className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Profile
              </Link>
            </Button>
          </div>

          {/* Impact Cards: 2x2 on mobile, 4 columns on md+ */}
          <div className="mt-4 sm:mt-6 md:mt-10 grid w-full max-w-4xl grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl sm:rounded-2xl border border-primary/20 bg-card/60 p-2.5 sm:p-3 md:p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/15"
              >
                <p className="text-xs sm:text-base md:text-xl font-bold font-headline text-primary tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs md:text-sm text-muted-foreground tracking-wide leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

