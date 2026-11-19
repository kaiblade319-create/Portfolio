'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);

    const isAtBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;
    if (isAtBottom) {
      setActiveSection('contact');
      return;
    }

    const scrollPosition = window.scrollY + 120;
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
      setActiveSection('home');
    } else {
      setActiveSection(pathname);
    }

    return () => {
      if (pathname === '/') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname, handleScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const sectionId = href.replace('/#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
      setIsOpen(false);
      setActiveSection(sectionId);
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || isOpen
          ? 'bg-[#050507]/90 backdrop-blur-xl border-b border-white/[0.09] shadow-[0_12px_40px_-15px_rgba(0,0,0,0.9)]'
          : 'bg-transparent'
      )}
    >
      <nav className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-6 h-16 md:h-20">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group whitespace-nowrap" aria-label="Kaushar Halani Home">
            <div
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-white/15 bg-white/[0.04] flex items-center justify-center font-mono font-bold text-xs sm:text-sm backdrop-blur-md transition-all duration-200 group-hover:scale-[1.03]"
              style={{ color: 'var(--accent-bright)' }}
            >
              KH
            </div>
            <span className="text-sm sm:text-base font-bold font-headline tracking-tight text-white whitespace-nowrap">
              Kaushar Halani
            </span>
          </Link>

          {/* Desktop Navigation - Spring Floating Active Segmented Bar */}
          <div className="hidden lg:flex items-center gap-1 p-1 bg-[#0D0D11]/90 backdrop-blur-xl rounded-full border border-white/[0.1]">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'relative px-3.5 xl:px-4 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0',
                    active ? 'font-semibold' : 'text-zinc-300 hover:text-white'
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
                        boxShadow: '0 2px 18px var(--accent-glow)',
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
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-md text-white hover:border-white/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
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
              className="lg:hidden fixed inset-0 top-16 md:top-20 bg-black/80 backdrop-blur-md -z-10"
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 bg-[#050507]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.95)] overflow-hidden"
            >
              <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-3 space-y-1.5">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 border',
                        active
                          ? 'font-semibold shadow-sm border-transparent'
                          : 'text-zinc-200 border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.07] hover:text-white'
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
