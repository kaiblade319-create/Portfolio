import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Case Studies & Machine Learning Pipelines',
  description:
    'In-depth engineering case studies, telemetry analyses, model evaluation benchmarks, and architecture workflows by Kaushar Halani.',
  openGraph: {
    title: 'Engineering Case Studies | Kaushar Halani',
    description:
      'In-depth engineering case studies, telemetry analyses, model evaluation benchmarks, and architecture workflows by Kaushar Halani.',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
