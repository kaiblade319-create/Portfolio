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
const MotionSection = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <section id={id}>
    {children}
  </section>
);

const SectionDivider = () => (
  <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
    <div
      className="h-px w-full opacity-25"
      style={{
        background:
          'linear-gradient(90deg, transparent, var(--accent-bright), transparent)',
      }}
    />
  </div>
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <ScrollProgressBar />
      <main className="flex-1">
        <Hero />
        <div>
          <SectionDivider />
          <MotionSection id="about">
            <About />
          </MotionSection>
          <SectionDivider />
          <MotionSection id="projects">
            <Projects />
          </MotionSection>
          <SectionDivider />
          <MotionSection id="experience">
            <Experience />
          </MotionSection>
          <SectionDivider />
          <MotionSection id="skills">
            <Skills />
          </MotionSection>
          <SectionDivider />
          <MotionSection id="education">
            <Education />
          </MotionSection>
          <SectionDivider />
          <MotionSection id="contact">
            <Contact />
          </MotionSection>
        </div>
      </main>
      <Footer />
    </div>
  );
}
