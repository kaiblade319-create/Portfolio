'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
} from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Scroll Progress Hairline driven by dynamic accent CSS variables.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, var(--accent-solid), var(--accent-bright), #7B9486)',
      }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] pointer-events-none"
    />
  );
}

/**
 * Calm Pointer-Tracking Spotlight Card on Matte Warm Ivory (#FAF7F0).
 */
interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  borderBeam?: boolean;
}

export function SpotlightCard({
  children,
  className,
  borderBeam = false,
  ...props
}: SpotlightCardProps) {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== 'mouse') return;
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const handlePointerLeave = useCallback(() => {
    mouseX.set(-400);
    mouseY.set(-400);
  }, [mouseX, mouseY]);

  const backgroundGlow = useMotionTemplate`radial-gradient(460px circle at ${mouseX}px ${mouseY}px, var(--accent-spotlight), transparent 72%)`;
  const borderGlow = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, var(--accent-border), transparent 72%)`;

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn(
        'group/spotlight relative rounded-2xl border border-border bg-card/95 transition-[border-color,transform,box-shadow] duration-200 ease-out hover:border-[#2B6E73]/30 shadow-[0_6px_24px_-14px_rgba(35,39,36,0.10)] hover:shadow-[0_14px_34px_-16px_rgba(35,39,36,0.16)]',
        borderBeam && 'border-beam-ring',
        className
      )}
      {...props}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{ background: backgroundGlow }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background: borderGlow,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

/**
 * Aceternity UI-inspired 3D Interactive Tilt Card + 21st.dev BorderBeam Showcase.
 */
export function TiltShowcaseCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rotateX = useSpring(0, { stiffness: 220, damping: 24 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 24 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== 'mouse') return;
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY.set(px * 4.5);
      rotateX.set(-py * 4.5);
    },
    [rotateX, rotateY]
  );

  const handlePointerLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="will-change-transform"
      >
        <SpotlightCard borderBeam className={className}>
          {children}
        </SpotlightCard>
      </motion.div>
    </div>
  );
}

/**
 * React Bits BlurText-inspired Headline Reveal (guaranteed immediate legibility).
 */
export function BlurHeadline({
  text,
  accentWord,
  className,
}: {
  text: string;
  accentWord?: string;
  className?: string;
}) {
  const words = text.split(' ');
  return (
    <h1 className={className}>
      {words.map((word, idx) => {
        const isAccent = accentWord && word.toLowerCase() === accentWord.toLowerCase();
        return (
          <motion.span
            key={`${word}-${idx}`}
            initial={{ opacity: 1, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: idx * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block mr-[0.26em] last:mr-0"
            style={isAccent ? { color: 'var(--accent-bright)' } : undefined}
          >
            {word}
          </motion.span>
        );
      })}
    </h1>
  );
}

/**
 * React Bits CountUp-inspired animated numeric counter for metrics strips.
 */
export function CountUpMetric({ value }: { value: string }) {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? '';
  const target = match ? Number(match[2]) : null;
  const suffix = match?.[3] ?? '';

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [display, setDisplay] = useState<number>(target ?? 0);

  useEffect(() => {
    if (target === null || !inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(target);
      return;
    }
    const start = performance.now();
    const duration = 650;
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  if (target === null) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/**
 * High-Contrast Section Heading with Bold Typographic Hierarchy.
 */
export function SectionHeading({
  kicker,
  title,
  highlightWord,
  subtitle,
}: {
  kicker?: string;
  title: string;
  highlightWord?: string;
  subtitle: string;
}) {
  const renderTitle = () => {
    if (!highlightWord) return title;
    const idx = title.toLowerCase().indexOf(highlightWord.toLowerCase());
    if (idx === -1) return title;
    const before = title.slice(0, idx);
    const match = title.slice(idx, idx + highlightWord.length);
    const after = title.slice(idx + highlightWord.length);
    return (
      <>
        {before}
        <span style={{ color: 'var(--accent-bright)' }}>{match}</span>
        {after}
      </>
    );
  };

  return (
    <div className="text-center mb-10 sm:mb-12 md:mb-14 max-w-3xl mx-auto">
      {kicker && (
        <p
          className="text-xs sm:text-[13px] font-mono font-semibold uppercase tracking-[0.2em] mb-2.5"
          style={{ color: 'var(--accent-bright)' }}
        >
          {kicker}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-[3.25rem] font-extrabold font-headline tracking-[-0.03em] leading-[1.08] text-foreground text-balance">
        {renderTitle()}
      </h2>
      <p className="text-base md:text-lg text-[#3D433E] mt-3 sm:mt-4 leading-[1.65] max-w-2xl mx-auto font-normal">
        {subtitle}
      </p>
    </div>
  );
}

/**
 * Staggered grid wrapper.
 */
export function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.02 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0.94, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
