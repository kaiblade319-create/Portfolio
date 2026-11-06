'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// List of navigation links for smooth scrolling to sections on the homepage
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
  // State for mobile drawer open/close
  const [isOpen, setIsOpen] = useState(false);
  // State to apply blur & border when page is scrolled down
  const [scrolled, setScrolled] = useState(false);
  // State tracking which section is currently visible in viewport
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  /**
   * Scroll handler: detects how far down the user has scrolled
   * and highlights the corresponding section in the navigation bar.
   */
  const handleScroll = useCallback(() => {
    // Add glass background once user scrolls beyond 20px
    setScrolled(window.scrollY > 20);
    
    // Add 100px offset to detect section before it touches the very top
    const scrollPosition = window.scrollY + 100;
    let currentSectionId = '';

    // Check each section from bottom to top to find current section
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

  // Listen to window scroll events only on the homepage
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

  // Hide navbar on project detail pages, resume, and profile
  if (pathname.startsWith('/projects/') || pathname.startsWith('/resume') || pathname.startsWith('/profile')) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || isOpen
          ? 'bg-[#090b10]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Identity: Sleek Monogram + Scroll-triggered Name Reveal */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Kaushar Halani Home">
            {/* Minimalist Executive Monogram */}
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-white shadow-sm backdrop-blur-md transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/[0.1]">
              KH
            </div>

            {/* Brand Name: clearly visible across mobile and desktop */}
            <div className="text-sm sm:text-base font-bold font-heading bg-gradient-to-b from-neutral-50 to-neutral-300 bg-clip-text text-transparent whitespace-nowrap">
              Kaushar Halani
            </div>
          </Link>

          {/* Desktop Navigation - Pill Style */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 p-1.5 bg-[#090b10]/70 backdrop-blur-xl rounded-full border border-white/10 shadow-inner">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'px-3.5 xl:px-4 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-medium transition-all duration-200',
                    active
                      ? 'bg-white/15 text-white border border-white/25 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile & Tablet Menu Button */}
          <div className="lg:hidden relative z-50">
            <button
              className="p-2.5 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md text-foreground hover:border-white/30 hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Ambient Backdrop Overlay: softly dims body when menu is open */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 top-16 md:top-20 bg-black/75 backdrop-blur-md -z-10"
            />

            {/* Frosted Glassmorphism Dropdown Panel: identical glass aesthetic to navbar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="lg:hidden absolute top-full left-0 right-0 bg-[#090b10]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              {/* Subtle top reflective glass shimmer */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="container mx-auto px-4 py-3 space-y-1">
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
                          ? 'bg-white/10 border-white/25 text-white shadow-sm backdrop-blur-md'
                          : 'text-zinc-300 border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.06] hover:text-white hover:border-white/10'
                      )}
                    >
                      <span>{item.name}</span>
                      {active ? (
                        <span className="flex items-center gap-1.5 text-xs text-zinc-300 font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="text-xs text-zinc-500">→</span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Bottom ambient glass border */}
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
