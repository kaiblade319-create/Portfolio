'use client';

import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Experience from '@/components/sections/experience';
import Education from '@/components/sections/education';
import Contact from '@/components/sections/contact';
import { ScrollProgressBar } from '@/components/ui/motion-primitives';
const SectionDivider = () => (
  <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-1">
    <div
      className="h-px w-full opacity-40"
      style={{
        background:
          'linear-gradient(90deg, transparent, var(--accent-bright), transparent)',
      }}
    />
  </div>
);

const MotionSection = ({
  id,
  children,
  withDivider = true,
}: {
  id: string;
  children: React.ReactNode;
  withDivider?: boolean;
}) => (
  <>
    {withDivider && <SectionDivider />}
    <section id={id} className="scroll-mt-[65px] md:scroll-mt-[81px]">
      {children}
    </section>
  </>
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <ScrollProgressBar />
      <main className="flex-1">
        <Hero />
        <div>
          <MotionSection id="about">
            <About />
          </MotionSection>
          <MotionSection id="projects">
            <Projects />
          </MotionSection>
          <MotionSection id="experience">
            <Experience />
          </MotionSection>
          <MotionSection id="skills">
            <Skills />
          </MotionSection>
          <MotionSection id="education">
            <Education />
          </MotionSection>
          <MotionSection id="contact">
            <Contact />
          </MotionSection>
        </div>
      </main>
      <Footer />
    </div>
  );
}
