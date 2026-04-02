import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://blog.mediseenhms.com'),
  title: {
    default: 'MediSeen Blog — Hospital Management Insights for Nigerian Clinics',
    template: '%s | MediSeen Blog',
  },
  description: 'Expert guides on running a successful hospital in Nigeria. NHIS billing, digital records, pharmacy management, and growing your clinic — from the team behind MediSeen HMS.',
  keywords: ['hospital management Nigeria', 'HMS Nigeria', 'NHIS billing', 'clinic management', 'Nigerian hospitals', 'medical records', 'hospital software Nigeria', 'MediSeen'],
  authors: [{ name: 'MediSeen Team', url: 'https://mediseenhms.com' }],
  creator: 'MediSeen Health Systems Limited',
  publisher: 'MediSeen Health Systems Limited',
  openGraph: {
    type: 'website',
    siteName: 'MediSeen Blog',
    locale: 'en_NG',
    url: 'https://blog.mediseenhms.com',
    title: 'MediSeen Blog — Hospital Management Insights for Nigerian Clinics',
    description: 'Expert guides on running a successful hospital in Nigeria. From NHIS billing to digital records management.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MediSeen Blog',
    description: 'Hospital management insights for Nigerian clinics',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://blog.mediseenhms.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: 'MediSeen Blog',
              description: 'Hospital management insights for Nigerian clinics and hospitals',
              url: 'https://blog.mediseenhms.com',
              publisher: {
                '@type': 'Organization',
                name: 'MediSeen Health Systems Limited',
                url: 'https://mediseenhms.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://blog.mediseenhms.com/logo.png',
                },
              },
              inLanguage: 'en-NG',
            }),
          }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
