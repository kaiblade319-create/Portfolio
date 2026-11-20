import test from 'node:test';
import assert from 'node:assert/strict';
import {
  groupToolsByDomain,
  isPlaceholderExternalUrl,
  getHeroFeaturedGridClass,
  getSkillsBentoSpanClass,
  computeSectionScrollTop,
  resolveSiteUrl,
} from './portfolio-utils';
import { WARM_PAPER_THEME, DEFAULT_ACCENT, isValidAccent, resolveAccent } from './theme-config';

const PORTFOLIO_TOOLS = [
  'Python', 'R', 'Java', 'SQL', 'TypeScript',
  'Scikit-learn', 'Pandas', 'NumPy', 'NLP', 'TensorFlow', 'PyTorch', 'Tableau', 'Airflow',
  'AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform',
  'MySQL', 'PostgreSQL', 'MongoDB',
  'Generative AI', 'Large Language Models',
];

test('groupToolsByDomain preserves every tool without loss or duplication', () => {
  const groups = groupToolsByDomain(PORTFOLIO_TOOLS);
  const flattened = groups.flatMap((g) => g.items);

  assert.equal(flattened.length, PORTFOLIO_TOOLS.length);
  assert.deepEqual(new Set(flattened), new Set(PORTFOLIO_TOOLS));
  assert.equal(groups.length, 4);
});

test('groupToolsByDomain places unmapped future tools into Additional Tooling', () => {
  const groups = groupToolsByDomain([...PORTFOLIO_TOOLS, 'DuckDB']);
  const extra = groups.find((g) => g.id === 'additional');
  assert.ok(extra);
  assert.deepEqual(extra.items, ['DuckDB']);
});

test('isPlaceholderExternalUrl identifies unconfigured placeholder links cleanly', () => {
  assert.equal(isPlaceholderExternalUrl('https://github.com/your-github-handle/repo'), true);
  assert.equal(isPlaceholderExternalUrl('https://arxiv.org/abs/2301.00000'), true);
  assert.equal(isPlaceholderExternalUrl('https://github.com/kaushar/churn-pipeline'), false);
  assert.equal(isPlaceholderExternalUrl(''), true);
});

test('getHeroFeaturedGridClass selects horizontal split mode for single project', () => {
  assert.equal(getHeroFeaturedGridClass(1), 'single');
  assert.equal(getHeroFeaturedGridClass(2), 'grid');
});

test('getSkillsBentoSpanClass prevents orphan cards on mobile (2-col) and tablet (6-col)', () => {
  assert.equal(getSkillsBentoSpanClass(0, 5), 'col-span-1 sm:col-span-2 lg:col-span-1');
  assert.equal(getSkillsBentoSpanClass(3, 5), 'col-span-1 sm:col-span-3 lg:col-span-1');
  assert.equal(getSkillsBentoSpanClass(4, 5), 'col-span-2 sm:col-span-3 lg:col-span-1');
});

test('locked Warm Cream Paper theme resolver defaults cleanly', () => {
  assert.equal(DEFAULT_ACCENT, 'sage');
  assert.equal(resolveAccent(null), 'sage');
  assert.equal(resolveAccent('orange'), 'sage');
  assert.equal(resolveAccent('slate'), 'sage');
  assert.equal(isValidAccent('sage'), true);
  assert.equal(isValidAccent('orange'), false);
  assert.equal(WARM_PAPER_THEME.swatchHex, '#2B6E73');
});

test('computeSectionScrollTop aligns sections right below fixed header and returns 0 for home', () => {
  assert.equal(computeSectionScrollTop('home', 120, 400, 80), 0);
  assert.equal(computeSectionScrollTop('about', 760, 0, 80), 680);
  assert.equal(computeSectionScrollTop('about', 760, 0, 64), 696);
  assert.equal(computeSectionScrollTop('projects', 20, 0, 80), 0);
});

test('resolveSiteUrl handles Vercel domains, empty env strings, and explicit URLs safely', () => {
  assert.equal(resolveSiteUrl({}), 'http://localhost:3000');
  assert.equal(
    resolveSiteUrl({ APP_URL: '', NEXT_PUBLIC_SITE_URL: '   ', VERCEL_PROJECT_PRODUCTION_URL: 'kaushar.vercel.app' }),
    'https://kaushar.vercel.app'
  );
  assert.equal(
    resolveSiteUrl({ VERCEL_URL: 'kaushar-preview.vercel.app' }),
    'https://kaushar-preview.vercel.app'
  );
  assert.equal(
    resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: 'https://kausharhalani.com/' }),
    'https://kausharhalani.com'
  );
  assert.equal(
    resolveSiteUrl({ APP_URL: 'not a valid url', NEXT_PUBLIC_SITE_URL: 'https://kaushar.dev/path' }),
    'https://kaushar.dev'
  );
});

