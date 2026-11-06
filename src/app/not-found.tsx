import Link from 'next/link';
import { Home, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* 404 Number */}
        <h1 className="text-8xl sm:text-9xl md:text-[11rem] font-bold leading-none bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-200 bg-clip-text text-transparent">
          404
        </h1>

        {/* Message */}
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-foreground">
            Page Not Found
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="default" className="rounded-xl bg-white text-zinc-950 font-semibold hover:bg-zinc-200">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild size="default" variant="outline" className="rounded-xl border-border hover:border-primary/50">
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              View Projects
            </Link>
          </Button>
          <Button asChild size="default" variant="outline" className="rounded-xl border-border hover:border-primary/50">
            <Link href="/#contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Link>
          </Button>
        </div>

        {/* Decorative Element */}
        <div className="mt-14">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span className="block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>Error: Route not found</span>
          </div>
        </div>
      </div>
    </div>
  );
}
