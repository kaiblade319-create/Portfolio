'use client';

import {
  skillCategories,
  tools,
  softSkills,
  languages,
  type CEFRLevel,
} from '@/app/lib/data';
import * as LucideIcons from 'lucide-react';
import { Layers, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  SectionHeading,
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/motion-primitives';
import {
  groupToolsByDomain,
  getSkillsBentoSpanClass,
} from '@/lib/portfolio-utils';

const cefrLevelColor: Record<CEFRLevel, string> = {
  A1: 'text-zinc-400',
  A2: 'text-zinc-400',
  B1: 'text-zinc-200',
  B2: 'text-white',
  C1: 'text-white',
  C2: 'text-white',
};

const Skills = () => {
  const toolGroups = groupToolsByDomain(tools);
  const firstTrack = tools.slice(0, Math.ceil(tools.length / 2));
  const secondTrack = tools.slice(Math.ceil(tools.length / 2));

  return (
    <div className="py-14 sm:py-16 md:py-20">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading
          kicker="Technical Stack"
          title="Skills & Capabilities"
          highlightWord="Capabilities"
          subtitle="Core analytical disciplines, SQL & Python tooling, and collaborative strengths applied across real projects."
        />

        <div className="space-y-12 sm:space-y-14">
          {/* 1. Technical Disciplines Bento */}
          <div>
            <div className="flex items-end justify-between border-b border-white/[0.08] pb-3 mb-6">
              <div>
                <span
                  className="text-xs font-mono font-semibold uppercase tracking-[0.18em]"
                  style={{ color: 'var(--accent-bright)' }}
                >
                  Core Capabilities
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-headline mt-0.5 text-white">
                  Technical Disciplines
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-400 tabular-nums hidden sm:inline">
                05 Disciplines
              </span>
            </div>

            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
              {skillCategories.map((category, idx) => {
                const Icon = (LucideIcons[category.icon as keyof typeof LucideIcons] ||
                  LucideIcons['Code']) as React.ComponentType<{ className?: string }>;
                return (
                  <StaggerItem
                    key={category.name}
                    className={getSkillsBentoSpanClass(idx, skillCategories.length)}
                  >
                    <SpotlightCard className="min-h-[225px] sm:min-h-[245px] h-full p-4 sm:p-5 hover:-translate-y-0.5">
                      <div className="flex flex-col justify-between h-full text-left">
                        <div className="flex items-center justify-between w-full mb-3">
                          <div className="h-10 w-10 rounded-xl border border-white/15 bg-white/[0.04] flex items-center justify-center shrink-0">
                            <span style={{ color: 'var(--accent-bright)' }}>
                              <Icon className="h-5 w-5" />
                            </span>
                          </div>
                          <span className="text-xs font-mono text-zinc-500 tabular-nums">
                            0{idx + 1}
                          </span>
                        </div>

                        <div className="space-y-1.5 my-auto">
                          <h4 className="text-base sm:text-lg font-extrabold font-headline leading-tight text-white">
                            {category.name}
                          </h4>
                          <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                            {category.description}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-white/[0.08] flex flex-col gap-0.5">
                          <span
                            className="text-xs font-mono font-semibold"
                            style={{ color: 'var(--accent-bright)' }}
                          >
                            {category.focus}
                          </span>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                            {category.level}
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* 2. React Bits / 21st.dev Infinite Marquee & Structured Matrix Tabs */}
            <SpotlightCard className="p-5 sm:p-6">
              <Tabs defaultValue="marquee" className="w-full space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3.5 border-b border-white/[0.08]">
                  <div>
                    <h4
                      className="text-xs font-mono font-semibold uppercase tracking-[0.18em]"
                      style={{ color: 'var(--accent-bright)' }}
                    >
                      Tooling &amp; Technology Stack
                    </h4>
                    <p className="text-sm sm:text-base font-bold text-white mt-0.5 tabular-nums">
                      {tools.length} Core Technologies Applied Across Projects
                    </p>
                  </div>

                  <TabsList className="bg-[#050507] border border-white/15 rounded-xl p-1 h-auto self-start sm:self-auto">
                    <TabsTrigger
                      value="marquee"
                      className="rounded-lg text-xs px-3 py-1.5 font-semibold text-zinc-300 data-[state=active]:bg-[var(--accent-solid)] data-[state=active]:text-[var(--accent-ink)]"
                    >
                      <Activity className="h-3.5 w-3.5 mr-1.5" />
                      Live Stream
                    </TabsTrigger>
                    <TabsTrigger
                      value="matrix"
                      className="rounded-lg text-xs px-3 py-1.5 font-semibold text-zinc-300 data-[state=active]:bg-[var(--accent-solid)] data-[state=active]:text-[var(--accent-ink)]"
                    >
                      <Layers className="h-3.5 w-3.5 mr-1.5" />
                      By Domain
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Live Dual-Track Infinite Marquee */}
                <TabsContent value="marquee" className="mt-0 space-y-3 overflow-hidden marquee-paused">
                  <div className="relative overflow-hidden">
                    <div className="animate-marquee gap-2.5 pr-2.5">
                      {[...firstTrack, ...firstTrack].map((tool, i) => (
                        <span
                          key={`row1-${tool}-${i}`}
                          className="text-xs sm:text-sm font-medium px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-100 whitespace-nowrap shrink-0 hover:border-white/30 transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <div className="animate-marquee-reverse gap-2.5 pr-2.5">
                      {[...secondTrack, ...secondTrack].map((tool, i) => (
                        <span
                          key={`row2-${tool}-${i}`}
                          className="text-xs sm:text-sm font-medium px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-100 whitespace-nowrap shrink-0 hover:border-white/30 transition-colors"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Categorized 4-Domain Matrix */}
                <TabsContent value="matrix" className="mt-0 space-y-4">
                  {toolGroups.map((group) => (
                    <div
                      key={group.id}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start sm:items-center"
                    >
                      <span className="sm:col-span-3 text-xs font-mono font-semibold uppercase tracking-wider text-zinc-300">
                        {group.label}
                      </span>
                      <div className="sm:col-span-9 flex flex-wrap gap-2">
                        {group.items.map((tool) => (
                          <span
                            key={tool}
                            className="text-xs sm:text-[13px] font-medium px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-zinc-100 hover:border-white/30 transition-colors select-none"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </SpotlightCard>
          </div>

          {/* 3. Professional & Soft Skills (Compact Architectural Card) */}
          <div>
            <div className="flex items-end justify-between border-b border-white/[0.08] pb-3 mb-5">
              <div>
                <span
                  className="text-xs font-mono font-semibold uppercase tracking-[0.18em]"
                  style={{ color: 'var(--accent-bright)' }}
                >
                  Execution Model
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-headline mt-0.5 text-white">
                  Professional &amp; Soft Skills
                </h3>
              </div>
            </div>

            <SpotlightCard className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                {softSkills.map((skill, idx) => {
                  const Icon = (LucideIcons[skill.icon as keyof typeof LucideIcons] ||
                    LucideIcons['Code']) as React.ComponentType<{ className?: string }>;
                  const isLast = idx === softSkills.length - 1;
                  const borderClasses = [
                    idx > 0 ? 'border-t border-white/[0.08]' : '',
                    idx >= 2 ? 'sm:border-t sm:border-white/[0.08]' : 'sm:border-t-0',
                    idx % 2 === 1 ? 'sm:border-l sm:border-white/[0.08]' : '',
                    isLast ? 'sm:col-span-2 lg:col-span-1' : '',
                    'lg:border-t-0',
                    idx > 0 ? 'lg:border-l lg:border-white/[0.08]' : 'lg:border-l-0',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <div
                      key={skill.name}
                      className={`p-4 sm:p-5 flex flex-col justify-between gap-3 hover:bg-white/[0.02] transition-colors ${borderClasses}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg border border-white/15 bg-white/[0.04] flex items-center justify-center shrink-0">
                          <span style={{ color: 'var(--accent-bright)' }}>
                            <Icon className="h-4 w-4" />
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold font-headline text-white leading-tight">
                          {skill.name}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        {skill.description}
                      </p>
                      <span
                        className="text-[11px] font-mono font-semibold"
                        style={{ color: 'var(--accent-bright)' }}
                      >
                        {skill.focus}
                      </span>
                    </div>
                  );
                })}
              </div>
            </SpotlightCard>
          </div>

          {/* 4. Languages */}
          <div>
            <div className="flex items-end justify-between border-b border-white/[0.08] pb-3 mb-5">
              <div>
                <span
                  className="text-xs font-mono font-semibold uppercase tracking-[0.18em]"
                  style={{ color: 'var(--accent-bright)' }}
                >
                  Communication
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-headline mt-0.5 text-white">
                  Languages
                </h3>
              </div>
            </div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {languages.map((language) => {
                const languageLogoMap: Record<string, string> = {
                  English: 'EN',
                  Hindi: 'HI',
                  Gujarati: 'GU',
                };
                const languageCode =
                  languageLogoMap[language.name] ?? language.name.slice(0, 2).toUpperCase();
                return (
                  <StaggerItem key={language.name}>
                    <SpotlightCard className="h-full p-4 sm:p-5 hover:-translate-y-0.5">
                      <div className="flex flex-col justify-between h-full space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className="h-9 w-9 rounded-xl border border-white/15 bg-white/[0.04] flex items-center justify-center font-mono font-bold text-xs shrink-0"
                              style={{ color: 'var(--accent-bright)' }}
                            >
                              {languageCode}
                            </div>
                            <h4 className="text-base sm:text-lg font-extrabold font-headline text-white">
                              {language.name}
                            </h4>
                          </div>
                          <span
                            className={`text-xs font-mono font-bold uppercase tracking-wider tabular-nums ${cefrLevelColor[language.level]}`}
                            style={{ color: 'var(--accent-bright)' }}
                          >
                            {language.level}
                          </span>
                        </div>

                        <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                          {language.description}
                        </p>
                      </div>
                    </SpotlightCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
