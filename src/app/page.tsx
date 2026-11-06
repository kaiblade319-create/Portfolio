
'use client';

import Footer from '@/components/layout/footer';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Experience from '@/components/sections/experience';
import Education from '@/components/sections/education';
import Contact from '@/components/sections/contact';
import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const MotionSection = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.1 }}
    variants={sectionVariants}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.section>
);


const SectionDivider = () => (
  <div className="w-full max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
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
