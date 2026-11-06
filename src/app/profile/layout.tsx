import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verified Technical & Research Profiles',
  description:
    'Verified public profiles across GitHub, LinkedIn, Google Scholar, ResearchGate, and LeetCode for Kaushar Halani.',
  openGraph: {
    title: 'Verified Profiles | Kaushar Halani',
    description:
      'Verified public profiles across GitHub, LinkedIn, Google Scholar, ResearchGate, and LeetCode for Kaushar Halani.',
  },
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
