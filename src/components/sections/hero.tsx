
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
    <section id="home" className="relative min-h-[85vh] sm:min-h-dvh flex items-center justify-center text-center pt-20 pb-10 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20 overflow-hidden bg-background">
      {/* Subtle ambient light glow matching the rest of the site */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.03),transparent_60%)]" />
      </div>
      
      {/* Central hero content container */}
      <div className="container z-10 mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-6 max-w-4xl mx-auto">
          {/* Badge: executive frosted pill - fully visible on mobile and desktop */}
          <p className="inline-flex flex-wrap items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 sm:px-5 sm:py-1.5 text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider text-zinc-300 backdrop-blur-md text-center">
            <span>High-Agency Problem Solver</span>
            <span className="mx-1.5 text-zinc-600">·</span>
            <span>Systems Builder</span>
            <span className="mx-1.5 text-zinc-600">·</span>
            <span>Operational Precision</span>
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

          {/* Symmetrical CTA Button Grid: Guarantees 50/50 exact center divider collinear with matrix below */}
          <div className="w-full max-w-xs sm:max-w-sm mx-auto grid grid-cols-2 gap-3 pt-2">
            <Button
              asChild
              size="default"
              className="w-full h-11 sm:h-12 rounded-xl bg-white text-zinc-950 font-semibold hover:bg-zinc-200 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-xs sm:text-sm"
            >
              <Link href="/resume" prefetch={true} className="flex items-center justify-center">
                <Briefcase className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span>Resume</span>
              </Link>
            </Button>
            <Button
              asChild
              size="default"
              className="w-full h-11 sm:h-12 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/[0.12] hover:border-white/25 text-white font-medium transition-all duration-200 backdrop-blur-md hover:-translate-y-0.5 text-xs sm:text-sm"
            >
              <Link href="/profile" prefetch={true} className="flex items-center justify-center">
                <User className="mr-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                <span>Profile</span>
              </Link>
            </Button>
          </div>

          {/* Impact Cards: 2x2 on mobile, 4 columns on md+ with matching center divider */}
          <div className="mt-4 sm:mt-6 md:mt-10 grid w-full max-w-4xl grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-3 md:p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-black/40"
              >
                <p className="text-xs sm:text-base md:text-xl font-bold font-headline text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs md:text-sm text-zinc-400 tracking-wide leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

