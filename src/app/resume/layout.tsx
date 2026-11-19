import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Analyst Resume',
  description:
    'Data Analyst resume for Kaushar Halani covering SQL, Python analytics, BI dashboards, and Blink Beyond project coordination.',
  openGraph: {
    title: 'Data Analyst Resume | Kaushar Halani',
    description:
      'Data Analyst resume for Kaushar Halani covering SQL, Python analytics, BI dashboards, and Blink Beyond project coordination.',
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
