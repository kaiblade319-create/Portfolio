export interface ToolGroup {
  id: string;
  label: string;
  items: string[];
}

const DOMAIN_RULES: Array<{ id: string; label: string; matches: string[] }> = [
  {
    id: 'languages',
    label: 'Languages',
    matches: ['Python', 'R', 'Java', 'SQL', 'TypeScript'],
  },
  {
    id: 'ml-analytics',
    label: 'ML & Analytics',
    matches: ['Scikit-learn', 'Pandas', 'NumPy', 'NLP', 'TensorFlow', 'PyTorch', 'Tableau', 'Airflow'],
  },
  {
    id: 'cloud-devops',
    label: 'Cloud & Infra',
    matches: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform'],
  },
  {
    id: 'data-ai',
    label: 'Databases & GenAI',
    matches: ['MySQL', 'PostgreSQL', 'MongoDB', 'Generative AI', 'Large Language Models'],
  },
];

export function groupToolsByDomain(tools: string[]): ToolGroup[] {
  const assigned = new Set<string>();
  const groups: ToolGroup[] = DOMAIN_RULES.map((rule) => {
    const items = tools.filter((tool) => {
      if (rule.matches.includes(tool)) {
        assigned.add(tool);
        return true;
      }
      return false;
    });
    return {
      id: rule.id,
      label: rule.label,
      items,
    };
  }).filter((group) => group.items.length > 0);

  const remaining = tools.filter((t) => !assigned.has(t));
  if (remaining.length > 0) {
    groups.push({
      id: 'additional',
      label: 'Additional Tooling',
      items: remaining,
    });
  }

  return groups;
}

const PLACEHOLDER_TOKENS = [
  'your-linkedin-handle',
  'your-github-handle',
  'your-twitter-handle',
  'your-username',
  'your-name',
  'user=your-id',
  '2301.00000',
];

export function isPlaceholderExternalUrl(url?: string | null): boolean {
  if (!url) return true;
  const normalized = url.toLowerCase();
  return PLACEHOLDER_TOKENS.some((token) => normalized.includes(token));
}

export function getHeroFeaturedGridClass(count: number): 'single' | 'grid' {
  return count === 1 ? 'single' : 'grid';
}

export function getSkillsBentoSpanClass(index: number, total: number): string {
  if (total === 5) {
    if (index === 4) {
      return 'col-span-2 sm:col-span-3 lg:col-span-1';
    }
    if (index === 3) {
      return 'col-span-1 sm:col-span-3 lg:col-span-1';
    }
    return 'col-span-1 sm:col-span-2 lg:col-span-1';
  }
  return 'col-span-1';
}

export function computeSectionScrollTop(
  sectionId: string,
  rectTop: number,
  scrollY: number,
  headerHeight: number
): number {
  if (sectionId === 'home') {
    return 0;
  }
  return Math.max(0, Math.round(rectTop + scrollY - headerHeight));
}
