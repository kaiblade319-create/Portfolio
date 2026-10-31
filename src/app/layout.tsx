import type { Metadata } from 'next';
import './globals.css';
import ScrollToTopButton from '@/components/ui/scroll-to-top-button';
import PreloaderWrapper from '@/components/preloader-wrapper';
import ConditionalNavbar from '@/components/conditional-navbar';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:9002';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kaushar Halani | Portfolio',
    template: '%s | Kaushar Halani',
  },
  description:
    'Portfolio of Kaushar Halani featuring engineering, machine learning, and analytical projects with technical documentation.',
  keywords: [
    'Kaushar Halani',
    'Portfolio',
    'Machine Learning Projects',
    'Software Engineering',
    'Python',
    'Next.js Portfolio',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Kaushar Halani Portfolio',
    title: 'Kaushar Halani | Portfolio',
    description:
      'Engineering and machine learning projects with clear problem statements, approach, and measurable outcomes.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Kaushar Halani Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaushar Halani | Portfolio',
    description:
      'Portfolio with ML and software projects focused on real-world outcomes.',
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
    jobTitle: 'Student & Developer',
    description:
      'Personal portfolio featuring engineering, machine learning, and software projects.',
  };

  return (
    <html lang="en" className="dark">
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ConditionalNavbar />
        <PreloaderWrapper>
          {children}
        </PreloaderWrapper>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
