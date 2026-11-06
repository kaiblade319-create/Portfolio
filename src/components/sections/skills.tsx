
'use client';

import {
  skillCategories,
  tools,
  softSkills,
  languages,
  type SkillLevel,
  type CEFRLevel,
} from '@/app/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardTitle } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

const skillLevelColor: Record<SkillLevel, string> = {
  Advanced: 'bg-primary/15 text-primary border-primary/40 font-mono',
  Intermediate: 'bg-secondary/90 text-foreground/90 border-border/80 font-mono',
  Beginner: 'bg-muted/40 text-muted-foreground border-border/60 font-mono',
};

const skillLevelHoverColor: Record<SkillLevel, string> = {
  Advanced: 'hover:border-primary/50 hover:shadow-primary/15',
  Intermediate: 'hover:border-primary/35 hover:shadow-primary/10',
  Beginner: 'hover:border-primary/25 hover:shadow-primary/10',
};

const cefrLevelColor: Record<CEFRLevel, string> = {
  A1: 'bg-muted/40 text-muted-foreground border-border/60 font-mono',
  A2: 'bg-muted/40 text-muted-foreground border-border/60 font-mono',
  B1: 'bg-secondary/90 text-foreground/90 border-border/80 font-mono',
  B2: 'bg-secondary/90 text-foreground/90 border-border/80 font-mono',
  C1: 'bg-primary/15 text-primary border-primary/40 font-mono',
  C2: 'bg-primary/15 text-primary border-primary/40 font-mono',
};

const cefrLevelHoverColor: Record<CEFRLevel, string> = {
  A1: 'hover:border-primary/25 hover:shadow-primary/10',
  A2: 'hover:border-primary/25 hover:shadow-primary/10',
  B1: 'hover:border-primary/35 hover:shadow-primary/10',
  B2: 'hover:border-primary/35 hover:shadow-primary/10',
  C1: 'hover:border-primary/50 hover:shadow-primary/15',
  C2: 'hover:border-primary/50 hover:shadow-primary/15',
};


/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SKILLS & EXPERTISE SECTION COMPONENT
 * ─────────────────────────────────────────────────────────────────────────────
 * Organizes capabilities into 3 distinct, digestible layers:
 * 1. Technical Disciplines (5 pillars: Programming, Databases, Cloud, ML, AI)
 * 2. Tooling & Technology Stack (Badges with responsive flex wrap)
 * 3. Soft Skills & Execution Model (5 pillars: Communication, Teamwork, etc.)
 * 4. Languages (CEFR-standardized 3-column responsive card grid)
 * ─────────────────────────────────────────────────────────────────────────────
 */
const Skills = () => {
  return (
    <div className="py-14 sm:py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-headline tracking-tight">
            Skills &amp; Expertise
          </h2>
          <p className="text-xs sm:text-base md:text-lg text-muted-foreground mt-2 sm:mt-3 max-w-2xl mx-auto leading-relaxed">
            A snapshot of my technical disciplines, tools, and professional capabilities.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
          {/* Technical Skills */}
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Capabilities</span>
              <h3 className="text-xl sm:text-2xl font-bold font-headline mt-1">
                Technical Disciplines
              </h3>
            </div>
            <div className="flex flex-wrap justify-center lg:grid lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-12">
              {skillCategories.map((category) => {
                const Icon =
                  (LucideIcons[category.icon as keyof typeof LucideIcons] ||
                  LucideIcons['Code']) as React.ComponentType<any>;
                return (
                  <Card
                    key={category.name}
                    className={cn(
                      "w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.67rem)] lg:w-full min-h-[225px] sm:min-h-[235px] h-full flex flex-col items-center justify-between text-center p-3 sm:p-4 rounded-2xl border border-border/70 bg-card/75 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]",
                      skillLevelHoverColor[category.level]
                    )}
                  >
                    <div className="flex flex-col items-center w-full">
                      <div className="mb-2 h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <CardTitle className="text-xs sm:text-sm md:text-base font-bold font-headline leading-tight">
                        {category.name}
                      </CardTitle>
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed my-auto px-1 py-1">
                      {category.description}
                    </p>
                    <div className="pt-1 w-full flex justify-center">
                      <Badge
                        variant="outline"
                        className={cn('px-2.5 py-0.5 text-[10px] sm:text-xs', skillLevelColor[category.level])}
                      >
                        {category.level}
                      </Badge>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Technologies */}
            <div className="rounded-2xl border border-border/70 bg-card/50 p-4 sm:p-6 backdrop-blur-sm max-w-4xl mx-auto">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-3 text-center">
                Tooling &amp; Technology Stack
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                {tools.map((tool) => (
                  <Badge
                    key={tool}
                    variant="secondary"
                    className="text-xs px-2.5 py-1 bg-secondary/80 border border-border/60 text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Execution Model</span>
              <h3 className="text-xl sm:text-2xl font-bold font-headline mt-1">
                Professional &amp; Soft Skills
              </h3>
            </div>
            <div className="flex flex-wrap justify-center lg:grid lg:grid-cols-5 gap-3 sm:gap-4">
              {softSkills.map((skill) => {
                const Icon =
                  (LucideIcons[skill.icon as keyof typeof LucideIcons] ||
                  LucideIcons['Code']) as React.ComponentType<any>;
                return (
                  <Card
                    key={skill.name}
                    className={cn(
                      "w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.67rem)] lg:w-full min-h-[225px] sm:min-h-[235px] h-full flex flex-col items-center justify-between text-center p-3 sm:p-4 rounded-2xl border border-border/70 bg-card/75 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]",
                      skillLevelHoverColor[skill.level]
                    )}
                  >
                    <div className="flex flex-col items-center w-full">
                      <div className="mb-2 h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <CardTitle className="text-xs sm:text-sm md:text-base font-bold font-headline leading-tight">
                        {skill.name}
                      </CardTitle>
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed my-auto px-1 py-1">
                      {skill.description}
                    </p>
                    <div className="pt-1 w-full flex justify-center">
                      <Badge
                        variant="outline"
                        className={cn('px-2.5 py-0.5 text-[10px] sm:text-xs', skillLevelColor[skill.level])}
                      >
                        {skill.level}
                      </Badge>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Languages */}
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">Communication</span>
              <h3 className="text-xl sm:text-2xl font-bold font-headline mt-1">
                Languages
              </h3>
            </div>
            <div className="flex flex-wrap justify-center lg:grid lg:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {languages.map((language) => {
                const languageLogoMap: Record<string, string> = {
                  English: 'EN',
                  Hindi: 'HI',
                  Gujarati: 'GU',
                };
                const languageCode = languageLogoMap[language.name] ?? language.name.slice(0, 2).toUpperCase();
                return (
                  <Card
                    key={language.name}
                    className={cn(
                      "w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.67rem)] lg:w-full min-h-[225px] sm:min-h-[235px] h-full flex flex-col items-center justify-between text-center p-3 sm:p-4 rounded-2xl border border-border/70 bg-card/75 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]",
                      cefrLevelHoverColor[language.level]
                    )}
                  >
                    <div className="flex flex-col items-center w-full">
                      <div className="mb-2 h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono font-bold text-xs sm:text-base shrink-0">
                        {languageCode}
                      </div>
                      <CardTitle className="text-xs sm:text-sm md:text-base font-bold font-headline leading-tight">
                        {language.name}
                      </CardTitle>
                    </div>
                    <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed my-auto px-1 py-1">
                      {language.description}
                    </p>
                    <div className="pt-1 w-full flex justify-center">
                      <Badge
                        variant="outline"
                        className={cn('px-2.5 sm:px-3 py-0.5 text-[10px] sm:text-xs font-mono', cefrLevelColor[language.level])}
                      >
                        CEFR {language.level}
                      </Badge>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
