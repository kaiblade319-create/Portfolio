import test from 'node:test';
import assert from 'node:assert/strict';
import {
  groupToolsByDomain,
  isPlaceholderExternalUrl,
  getHeroFeaturedGridClass,
  getSkillsBentoSpanClass,
} from './portfolio-utils';
import { SIGNAL_ORANGE_THEME, DEFAULT_ACCENT, isValidAccent, resolveAccent } from './theme-config';

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

test('locked Signal Orange theme resolver defaults cleanly', () => {
  assert.equal(DEFAULT_ACCENT, 'orange');
  assert.equal(resolveAccent(null), 'orange');
  assert.equal(resolveAccent('blue'), 'orange');
  assert.equal(resolveAccent('green'), 'orange');
  assert.equal(isValidAccent('orange'), true);
  assert.equal(isValidAccent('blue'), false);
  assert.equal(SIGNAL_ORANGE_THEME.swatchHex, '#FF5E1A');
});
