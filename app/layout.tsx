import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const siteUrl = 'https://blog.mediseenhms.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MediSeen Blog - Hospital Management Insights for Nigerian Clinics',
    template: '%s | MediSeen Blog',
  },
  description: 'Practical guides for Nigerian hospitals on NHIS billing, offline hospital software, digital patient records, pharmacy stock control, patient safety, and clinic growth from MediSeen HMS.',
  keywords: [
    'hospital management Nigeria',
    'hospital management system Nigeria',
    'HMS Nigeria',
    'NHIS billing',
    'NHIA claims',
    'offline hospital software Nigeria',
    'clinic management',
    'Nigerian hospitals',
    'medical records Nigeria',
    'hospital software Nigeria',
    'MediSeen HMS',
  ],
  authors: [{ name: 'MediSeen Team', url: 'https://mediseenhms.com' }],
  creator: 'MediSeen Health Systems Limited',
  publisher: 'MediSeen Health Systems Limited',
  openGraph: {
    type: 'website',
    siteName: 'MediSeen Blog',
    locale: 'en_NG',
    url: siteUrl,
    title: 'MediSeen Blog - Hospital Management Insights for Nigerian Clinics',
    description: 'Expert guides on running a better hospital in Nigeria, from NHIS billing and offline software to digital records and operational reporting.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MediSeen Blog',
    description: 'Hospital management insights for Nigerian clinics and hospitals',
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
    canonical: siteUrl,
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
              url: siteUrl,
              publisher: {
                '@type': 'Organization',
                name: 'MediSeen Health Systems Limited',
                url: 'https://mediseenhms.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://mediseenhms.com/og-image.png',
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
