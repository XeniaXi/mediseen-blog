import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: 'MediSeen Blog — Hospital Management Insights for Nigerian Clinics',
  description: 'Expert guides, tips and insights on running a successful hospital or clinic in Nigeria. From NHIS billing to digital records management.',
  openGraph: {
    siteName: 'MediSeen Blog',
    locale: 'en_NG',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <Header />
        <main>{children}</main>
        <footer className="bg-green-900 text-white py-12 mt-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-lg font-semibold mb-2">MediSeen Health Systems Limited</p>
            <p className="text-green-300 mb-4">RC: 9352905 · mediseenhms.com</p>
            <a href="https://app.mediseenhms.com/register"
               className="bg-yellow-400 text-green-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition">
              Start Free Trial →
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
