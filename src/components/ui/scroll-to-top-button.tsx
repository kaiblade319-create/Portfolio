'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      aria-label="Go to top"
      className={cn(
        'fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full border border-border bg-card/95 text-foreground backdrop-blur-xl shadow-[0_8px_22px_-8px_rgba(35,39,36,0.22)] transition-all duration-200 hover:border-[#2B6E73]/40 hover:bg-secondary hover:-translate-y-0.5',
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      )}
    >
      <ArrowUp className="h-5 w-5" style={{ color: 'var(--accent-bright)' }} />
      <span className="sr-only">Go to top</span>
    </Button>
  );
};

export default ScrollToTopButton;
