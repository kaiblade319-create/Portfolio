
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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

const skillLevelColor: Record<SkillLevel, string> = {
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
  Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const skillLevelHoverColor: Record<SkillLevel, string> = {
    Advanced: 'hover:shadow-red-500/20',
    Intermediate: 'hover:shadow-yellow-500/20',
    Beginner: 'hover:shadow-green-500/20',
};

const cefrLevelColor: Record<CEFRLevel, string> = {
  A1: 'bg-green-500/20 text-green-400 border-green-500/30',
  A2: 'bg-green-500/20 text-green-400 border-green-500/30',
  B1: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  B2: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  C1: 'bg-red-500/20 text-red-400 border-red-500/30',
  C2: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const cefrLevelHoverColor: Record<CEFRLevel, string> = {
  A1: 'hover:shadow-green-500/20',
  A2: 'hover:shadow-green-500/20',
  B1: 'hover:shadow-yellow-500/20',
  B2: 'hover:shadow-yellow-500/20',
  C1: 'hover:shadow-red-500/20',
  C2: 'hover:shadow-red-500/20',
};


const Skills = () => {
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            A snapshot of my technical and professional abilities.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          <div>
            <h3 className="text-2xl font-bold font-headline mb-6 text-center">
              Technical Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
              {skillCategories.map((category) => {
                const Icon =
                  (LucideIcons[category.icon as keyof typeof LucideIcons] ||
                  LucideIcons['Code']) as React.ComponentType<any>;
                return (
                  <Card
                    key={category.name}
                    className={cn(
                        "flex flex-col text-center items-center justify-start p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg",
                        skillLevelHoverColor[category.level]
                    )}
                  >
                    <CardHeader className="items-center p-2">
                      <div className="mb-2">
                        <Icon className="h-10 w-10 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow text-center p-2">
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </CardContent>
                    <CardFooter className="p-2">
                      <Badge
                        variant="outline"
                        className={cn('px-3 py-1 text-sm', skillLevelColor[category.level])}
                      >
                        {category.level}
                      </Badge>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            <div>
              <h3 className="text-xl font-bold font-headline mb-4 text-center">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {tools.map((tool) => (
                  <Badge
                    key={tool}
                    variant="secondary"
                    className="text-sm"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold font-headline mb-6 text-center">
              Soft Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {softSkills.map((skill) => {
                const Icon =
                  (LucideIcons[skill.icon as keyof typeof LucideIcons] ||
                  LucideIcons['Code']) as React.ComponentType<any>;
                return (
                  <Card
                    key={skill.name}
                    className={cn(
                        "flex flex-col text-center items-center justify-start p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg",
                        skillLevelHoverColor[skill.level]
                    )}
                  >
                    <CardHeader className="items-center p-2">
                      <div className="mb-2">
                        <Icon className="h-10 w-10 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{skill.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow text-center p-2">
                      <p className="text-sm text-muted-foreground">
                        {skill.description}
                      </p>
                    </CardContent>
                    <CardFooter className="p-2">
                      <Badge
                        variant="outline"
                        className={cn('px-3 py-1 text-sm', skillLevelColor[skill.level])}
                      >
                        {skill.level}
                      </Badge>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold font-headline mb-6 text-center">
              Languages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {languages.map((language) => {
                const languageLogoMap: Record<string, string> = {
                  English: 'E',
                  Hindi: 'ह',
                  Gujarati: 'ગ',
                };
                const languageLogo = languageLogoMap[language.name] ?? language.name.charAt(0).toUpperCase();
                return (
                  <Card
                    key={language.name}
                    className={cn(
                        "flex flex-col text-center items-center justify-start p-4 transform transition-all duration-300 hover:scale-105 hover:shadow-lg",
                        cefrLevelHoverColor[language.level]
                    )}
                  >
                    <CardHeader className="items-center p-2">
                      <div className="mb-2">
                        <span className="text-4xl font-bold leading-none text-primary">{languageLogo}</span>
                      </div>
                      <CardTitle className="text-lg">{language.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow text-center p-2">
                      <p className="text-sm text-muted-foreground">
                        {language.description}
                      </p>
                    </CardContent>
                    <CardFooter className="p-2">
                      <Badge
                        variant="outline"
                        className={cn('px-3 py-1 text-sm', cefrLevelColor[language.level])}
                      >
                        {language.level}
                      </Badge>
                    </CardFooter>
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
