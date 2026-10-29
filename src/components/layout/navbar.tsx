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
    
    const scrollPosition = window.scrollY + 100;
    let currentSectionId = '';

    // Find the current section by iterating from bottom to top
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
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Name */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-xl md:text-2xl font-bold font-heading bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
              Kaushar Halani
            </div>
          </Link>

          {/* Desktop Navigation - Pill Style */}
          <nav className="hidden md:flex items-center gap-2 p-1 bg-secondary rounded-full">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative z-50">
            <button
              className="p-2 rounded-md border border-border -mr-2 bg-background"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Outside container for full width */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    'block px-4 py-3 text-base rounded-md transition-colors',
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
