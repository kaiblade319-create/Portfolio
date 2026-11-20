'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { computeSectionScrollTop } from '@/lib/portfolio-utils';

const navItems = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Education', href: '/#education' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBrandName, setShowBrandName] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
    setShowBrandName(window.scrollY > 240);

    const isAtBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;
    if (isAtBottom) {
      setActiveSection('contact');
      return;
    }

    const headerHeight =
      document.querySelector('header')?.getBoundingClientRect().height ?? 80;
    const scrollPosition = window.scrollY + headerHeight + 24;
    let currentSectionId = '';

    for (let i = navItems.length - 1; i >= 0; i--) {
      const link = navItems[i];
      if (!link.href.startsWith('/#')) continue;

      const sectionId = link.href.substring(link.href.indexOf('#') + 1);
      const section = document.getElementById(sectionId);

      if (section && section.offsetTop <= scrollPosition) {
        currentSectionId = sectionId;
        break;
      }
    }

    if (currentSectionId) {
      setActiveSection(currentSectionId);
    } else if (window.scrollY < 200) {
      setActiveSection('home');
    }
  }, []);

  useEffect(() => {
    if (pathname === '/') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      const rafId = window.requestAnimationFrame(() => handleScroll());
      return () => {
        window.cancelAnimationFrame(rafId);
        window.removeEventListener('scroll', handleScroll);
      };
    }

    setActiveSection(pathname);
    return undefined;
  }, [pathname, handleScroll]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const sectionId = href.replace('/#', '');
      const element = document.getElementById(sectionId);
      const wasOpen = isOpen;

      if (wasOpen) {
        document.body.style.overflow = '';
      }
      setIsOpen(false);
      setActiveSection(sectionId);

      if (element) {
        const performScroll = () => {
          const headerHeight =
            document.querySelector('header')?.getBoundingClientRect().height ?? 81;
          const targetTop = computeSectionScrollTop(
            sectionId,
            element.getBoundingClientRect().top,
            window.scrollY,
            headerHeight
          );

          window.scrollTo({
            top: targetTop,
            behavior: 'smooth',
          });
          window.history.replaceState(null, '', href);
        };

        if (wasOpen) {
          window.requestAnimationFrame(performScroll);
        } else {
          performScroll();
        }
      }
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      const section = href.replace('/#', '');
      return activeSection === section;
    }
    return pathname === href;
  };

  if (pathname.startsWith('/projects/') || pathname.startsWith('/resume') || pathname.startsWith('/profile')) {
    return null;
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300',
        scrolled || isOpen
          ? 'bg-background/92 backdrop-blur-xl border-border shadow-[0_8px_24px_-12px_rgba(35,39,36,0.14)]'
          : 'bg-transparent border-transparent'
      )}
    >
      <nav className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-6 h-16 md:h-20">
          {/* Brand Identity (Monogram on Hero, Full Name once scrolled past Hero) */}
          <Link href="/" className="flex items-center shrink-0 group whitespace-nowrap" aria-label="Kaushar Halani Home">
            <div
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-border bg-card flex items-center justify-center font-mono font-bold text-xs sm:text-sm shadow-sm transition-all duration-200 group-hover:scale-[1.03] group-hover:border-[#2B6E73]/40"
              style={{ color: 'var(--accent-bright)' }}
            >
              KH
            </div>
            <span
              aria-hidden={!(showBrandName || isOpen)}
              className={cn(
                'text-sm sm:text-base font-bold font-headline tracking-tight text-foreground whitespace-nowrap overflow-hidden transition-all duration-300',
                showBrandName || isOpen
                  ? 'ml-2.5 opacity-100 max-w-[160px] translate-x-0'
                  : 'ml-0 opacity-0 max-w-0 -translate-x-1 pointer-events-none'
              )}
            >
              Kaushar Halani
            </span>
          </Link>

          {/* Desktop Navigation - Spring Floating Active Segmented Bar */}
          <div className="hidden lg:flex items-center gap-1 p-1 bg-card/95 backdrop-blur-xl rounded-full border border-border shadow-sm">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  scroll={false}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'relative px-3.5 xl:px-4 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0',
                    active ? 'font-semibold' : 'text-[#3D433E] hover:text-foreground'
                  )}
                  style={active ? { color: 'var(--accent-ink)' } : undefined}
                >
                  {active && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full -z-10"
                      style={{
                        backgroundColor: 'var(--accent-solid)',
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile & Tablet Menu Button */}
          <div className="lg:hidden relative z-50 shrink-0">
            <button
              type="button"
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-border bg-card text-foreground hover:border-[#2B6E73]/40 hover:bg-secondary/70 shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-nav-drawer"
            >
              {isOpen ? (
                <X className="h-5 w-5" style={{ color: 'var(--accent-bright)' }} />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 top-16 md:top-20 bg-[#232724]/35 backdrop-blur-sm -z-10"
            />

            <motion.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 bg-card border-b border-border shadow-[0_18px_40px_-15px_rgba(35,39,36,0.20)] overflow-hidden"
            >
              <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-3 space-y-1.5">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      scroll={false}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 border',
                        active
                          ? 'font-semibold shadow-sm border-transparent'
                          : 'text-[#3D433E] border-border bg-background/70 hover:bg-secondary hover:text-foreground'
                      )}
                      style={
                        active
                          ? {
                              backgroundColor: 'var(--accent-solid)',
                              color: 'var(--accent-ink)',
                            }
                          : undefined
                      }
                    >
                      <span>{item.name}</span>
                      <span className="text-xs font-mono">
                        {active ? 'Active' : '→'}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
