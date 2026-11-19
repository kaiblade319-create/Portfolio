'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

interface PreloaderProps {
  onComplete?: () => void;
}

const PRELOADER_DURATION_MS = 720;

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const completedRef = useRef(false);
  const exitTimerRef = useRef<number | null>(null);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsExiting(true);
    exitTimerRef.current = window.setTimeout(() => onComplete?.(), 320);
  }, [onComplete]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        finish();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    const start = performance.now();
    let rafId = 0;
    let holdTimer: number | null = null;

    const tick = (now: number) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / PRELOADER_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        holdTimer = window.setTimeout(finish, 110);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(rafId);
      if (holdTimer !== null) window.clearTimeout(holdTimer);
      if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
    };
  }, [finish]);

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={isExiting ? { y: '-100%', opacity: 0.96 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.36, ease: [0.76, 0, 0.24, 1] }}
      onClick={finish}
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050507] px-6 cursor-pointer select-none"
    >
      {/* Subtle overhead Signal Orange horizon glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[320px] w-[min(90vw,640px)] rounded-full blur-3xl opacity-35"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255, 94, 26, 0.4) 0%, transparent 72%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center w-full max-w-xs space-y-5"
      >
        {/* Monogram Badge */}
        <div
          className="h-14 w-14 rounded-2xl border border-white/15 bg-white/[0.04] flex items-center justify-center font-mono font-bold text-lg tracking-wider shadow-[0_0_32px_-8px_rgba(255,94,26,0.45)]"
          style={{ color: 'var(--accent-bright)' }}
        >
          {siteConfig.initials}
        </div>

        {/* Name & Discipline */}
        <div className="space-y-1">
          <p className="text-xl sm:text-2xl font-extrabold font-headline tracking-tight text-white">
            {siteConfig.name}
          </p>
          <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
            Data Analyst Portfolio
          </p>
        </div>

        {/* Crisp Signal Orange Progress Rail */}
        <div className="w-full space-y-2">
          <div className="h-[3px] w-full rounded-full bg-white/[0.08] overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-75 ease-out"
              style={{
                width: `${progress}%`,
                background:
                  'linear-gradient(90deg, var(--accent-solid), var(--accent-bright))',
              }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-zinc-500">
            <span>Loading</span>
            <span style={{ color: 'var(--accent-bright)' }}>{progress}%</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
