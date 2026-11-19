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
        'fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full border border-white/15 bg-[#0E0E12]/95 text-white backdrop-blur-xl shadow-[0_8px_28px_rgba(0,0,0,0.85)] transition-all duration-200 hover:border-white/35 hover:bg-white/10 hover:-translate-y-0.5',
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      )}
    >
      <ArrowUp className="h-5 w-5" style={{ color: 'var(--accent-bright)' }} />
      <span className="sr-only">Go to top</span>
    </Button>
  );
};

export default ScrollToTopButton;
