import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume & Career Tracks',
  description:
    'Verified technical resumes and career track specializations across Data Analyst, Data Engineer, and Data Scientist roles for Kaushar Halani.',
  openGraph: {
    title: 'Resume & Career Tracks | Kaushar Halani',
    description:
      'Verified technical resumes and career track specializations across Data Analyst, Data Engineer, and Data Scientist roles for Kaushar Halani.',
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
