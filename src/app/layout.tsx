import type { Metadata } from 'next';
import {
  Atkinson_Hyperlegible_Next,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import './globals.css';
import ScrollToTopButton from '@/components/ui/scroll-to-top-button';
import ConditionalNavbar from '@/components/conditional-navbar';
import SecurityGuard from '@/components/security-guard';

const atkinsonNext = Atkinson_Hyperlegible_Next({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  adjustFontFallback: false,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = process.env.APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kaushar Halani | Data Analyst',
    template: '%s | Kaushar Halani',
  },
  description:
    'Portfolio of Kaushar Halani — Data Analyst & Technical Project Coordinator. Turning raw data into SQL & Python insights, dashboards, and measurable business outcomes.',
  keywords: [
    'Kaushar Halani',
    'Data Analyst',
    'SQL Analytics',
    'Python Data Analysis',
    'Business Intelligence',
    'Blink Beyond',
    'Customer Churn Analysis',
    'Data Science Portfolio',
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
    title: 'Kaushar Halani | Data Analyst',
    description:
      'Data analytics projects, root-cause diagnostics, and decision-ready insights backed by Python, SQL, and operational coordination.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Kaushar Halani — Data Analyst Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaushar Halani | Data Analyst',
    description:
      'Data analytics projects, root-cause diagnostics, and decision-ready insights backed by Python, SQL, and operational coordination.',
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
    jobTitle: 'Data Analyst & Technical Project Coordinator',
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
      'Data Analyst and Computer Science (Data Science) student focused on SQL, Python analytics, predictive churn diagnostics, and stakeholder reporting.',
    knowsAbout: [
      'Data Analysis',
      'SQL',
      'Python',
      'Pandas',
      'Data Visualization',
      'Machine Learning',
      'Project Coordination',
    ],
  };

  return (
    <html
      lang="en"
      className={`${atkinsonNext.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SecurityGuard />
        <ConditionalNavbar />
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}
