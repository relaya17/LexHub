import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'LexHub - Revolutionary Legal Technology Platform | AI-Powered Legal Solutions',
    template: '%s | LexHub - Legal Technology Platform'
  },
  description: 'Transform your legal practice with LexHub - the most advanced, intelligent, and user-friendly legal technology platform. AI-powered case management, document automation, and courtroom analytics for modern law firms.',
  keywords: [
    'legal technology',
    'legal software',
    'law practice management',
    'legal AI',
    'case management software',
    'courtroom technology',
    'legal innovation',
    'justice technology',
    'legal automation',
    'document management',
    'legal analytics',
    'law firm software',
    'legal practice solutions',
    'attorney technology',
    'legal workflow automation',
    'court management system',
    'legal data analytics',
    'law office management',
    'legal tech platform',
    'digital legal services'
  ],
  authors: [{ name: 'LexHub Team', url: 'https://lexhub.com/about' }],
  creator: 'LexHub',
  publisher: 'LexHub',
  applicationName: 'LexHub',
  category: 'Legal Technology',
  classification: 'Legal Software',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lexhub.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'he': '/he',
      'ar': '/ar',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lexhub.com',
    title: 'LexHub - Revolutionary Legal Technology Platform | AI-Powered Legal Solutions',
    description: 'Transform your legal practice with LexHub - the most advanced, intelligent, and user-friendly legal technology platform. AI-powered case management, document automation, and courtroom analytics for modern law firms.',
    siteName: 'LexHub',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'LexHub - Revolutionary Legal Technology Platform',
        type: 'image/svg+xml',
      },
      {
        url: '/og-image-1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'LexHub Legal Technology Platform',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LexHub - Revolutionary Legal Technology Platform',
    description: 'Transform your legal practice with LexHub - AI-powered legal solutions for modern law firms.',
    images: ['/og-image.svg'],
    creator: '@lexhub',
    site: '@lexhub',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  other: {
    'msapplication-TileColor': '#3b82f6',
    'theme-color': '#3b82f6',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'LexHub',
    'application-name': 'LexHub',
    'msapplication-tooltip': 'LexHub Legal Technology Platform',
    'msapplication-starturl': '/',
    'msapplication-tap-highlight': 'no',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LexHub" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--card-foreground))',
                  border: '1px solid hsl(var(--border))',
                },
              }}
            />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}