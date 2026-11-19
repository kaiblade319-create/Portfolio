import Link from 'next/link';
import { Home, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Number */}
        <h1 className="text-8xl sm:text-9xl md:text-[11rem] font-extrabold font-headline leading-none bg-gradient-to-b from-white via-zinc-200 to-[var(--accent-bright)] bg-clip-text text-transparent">
          404
        </h1>

        {/* Message */}
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-white">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            size="default"
            className="btn-shimmer rounded-xl bg-[var(--accent-solid)] text-[var(--accent-ink)] font-semibold hover:bg-[var(--accent-solid-hover)] shadow-[0_0_24px_-6px_var(--accent-glow)] whitespace-nowrap"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button
            asChild
            size="default"
            variant="outline"
            className="rounded-xl border-white/[0.12] bg-[#0E0E12] hover:border-[var(--accent-border)] hover:bg-white/[0.05] text-white whitespace-nowrap"
          >
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4 text-[var(--accent-bright)]" />
              View Projects
            </Link>
          </Button>
          <Button
            asChild
            size="default"
            variant="outline"
            className="rounded-xl border-white/[0.12] bg-[#0E0E12] hover:border-[var(--accent-border)] hover:bg-white/[0.05] text-white whitespace-nowrap"
          >
            <Link href="/#contact">
              <Mail className="mr-2 h-4 w-4 text-[var(--accent-bright)]" />
              Contact Me
            </Link>
          </Button>
        </div>

        {/* Decorative Element */}
        <div className="mt-14">
          <div className="inline-flex items-center gap-2 text-xs text-zinc-400 font-mono">
            <span className="text-[var(--accent-bright)]">·</span>
            <span>Error: Route not found</span>
          </div>
        </div>
      </div>
    </div>
  );
}
