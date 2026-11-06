import type { Metadata } from 'next';
import './globals.css';
import ScrollToTopButton from '@/components/ui/scroll-to-top-button';
import PreloaderWrapper from '@/components/preloader-wrapper';
import ConditionalNavbar from '@/components/conditional-navbar';

import SecurityGuard from '@/components/security-guard';

const siteUrl = process.env.APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kaushar Halani | Technical Project Coordinator & Systems Builder',
    template: '%s | Kaushar Halani',
  },
  description:
    'Official portfolio of Kaushar Halani – Technical Project Coordinator & Systems Builder. Delivering AI-accelerated engineering, machine learning pipelines, and verified business outcomes.',
  keywords: [
    'Kaushar Halani',
    'Technical Project Coordinator',
    'Systems Builder',
    'Blink Beyond',
    'Machine Learning Portfolio',
    'Software Engineering',
    'AI-Assisted Development',
    'Data Science Engineer',
    'Computer Science Portfolio',
    'Python',
    'Next.js Portfolio',
  ],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Kaushar Halani Portfolio',
    title: 'Kaushar Halani | Technical Project Coordinator & Systems Builder',
    description:
      'Engineering and machine learning systems built with end-to-end ownership, root-cause diagnostics, and verifiable business impact.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Kaushar Halani Portfolio – Systems Builder & Technical Coordinator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaushar Halani | Technical Project Coordinator & Systems Builder',
    description:
      'Engineering and machine learning systems built with end-to-end ownership, root-cause diagnostics, and verifiable business impact.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kaushar Halani',
    url: siteUrl,
    jobTitle: 'Technical Project Coordinator & Systems Builder',
    worksFor: {
      '@type': 'Organization',
      name: 'Blink Beyond',
      location: 'Palghar, Maharashtra, India',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'St. John College of Engineering and Management',
    },
    description:
      'Technical Project Coordinator and Computer Science Engineer specializing in AI-accelerated workflows, predictive machine learning pipelines, and robust software delivery.',
    knowsAbout: [
      'Machine Learning',
      'Data Pipelines',
      'Predictive Modeling',
      'AI-Assisted Software Engineering',
      'Python',
      'TypeScript',
      'Project Management',
    ],
  };

  return (
    <html lang="en" className="dark">
      <body className="font-body antialiased select-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SecurityGuard />
        <ConditionalNavbar />
        <PreloaderWrapper>
          {children}
        </PreloaderWrapper>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
