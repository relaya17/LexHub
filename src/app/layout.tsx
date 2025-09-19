import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'LexHub - Revolutionary Legal Technology Platform',
    template: '%s | LexHub'
  },
  description: 'Transform your legal practice with LexHub - the most advanced, intelligent, and user-friendly legal technology platform. Experience the future of law.',
  keywords: [
    'legal technology',
    'courtroom management',
    'legal software',
    'law practice',
    'legal innovation',
    'justice technology',
    'legal AI',
    'case management'
  ],
  authors: [{ name: 'LexHub Team' }],
  creator: 'LexHub',
  publisher: 'LexHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lexhub.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lexhub.com',
    title: 'LexHub - Revolutionary Legal Technology Platform',
    description: 'Transform your legal practice with LexHub - the most advanced, intelligent, and user-friendly legal technology platform.',
    siteName: 'LexHub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LexHub - Revolutionary Legal Technology Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LexHub - Revolutionary Legal Technology Platform',
    description: 'Transform your legal practice with LexHub - the most advanced, intelligent, and user-friendly legal technology platform.',
    images: ['/og-image.jpg'],
    creator: '@lexhub',
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
  verification: {
    google: 'your-google-verification-code',
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
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
