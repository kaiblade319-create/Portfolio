import type { Metadata } from 'next';
import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import ScrollToTopButton from '@/components/ui/scroll-to-top-button';
import PreloaderWrapper from '@/components/preloader-wrapper';
import ConditionalNavbar from '@/components/conditional-navbar';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:9002';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kaushar Halani | Data Science Portfolio',
    template: '%s | Kaushar Halani',
  },
  description:
    'Portfolio of Kaushar Halani featuring machine learning, NLP, and data analysis projects with practical outcomes and technical documentation.',
  keywords: [
    'Kaushar Halani',
    'Data Science Portfolio',
    'Machine Learning Projects',
    'NLP Projects',
    'Data Analysis',
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
    title: 'Kaushar Halani | Data Science Portfolio',
    description:
      'Machine learning, NLP, and data analytics projects with clear problem statements, approach, and measurable outcomes.',
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
    title: 'Kaushar Halani | Data Science Portfolio',
    description:
      'Data science portfolio with ML, NLP, and analytics projects focused on real-world outcomes.',
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
    jobTitle: 'Data Science Student',
    description:
      'Data science portfolio featuring machine learning, NLP, and analytics projects.',
  };

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}>
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
