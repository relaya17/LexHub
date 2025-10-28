'use client';

import Head from 'next/head';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/og-image.svg',
  noindex = false,
}: SEOHeadProps) {
  const { t, language } = useLanguage();

  const seoTitle = title || t('seo.title');
  const seoDescription = description || t('seo.description');
  const seoKeywords = keywords || t('seo.keywords');
  const canonicalUrl = canonical || `https://lexhub.com${language !== 'en' ? `/${language}` : ''}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language and Direction */}
      <meta httpEquiv="content-language" content={language} />
      <meta name="language" content={language} />
      {language === 'he' || language === 'ar' ? (
        <meta name="direction" content="rtl" />
      ) : (
        <meta name="direction" content="ltr" />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={`https://lexhub.com${ogImage}`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="LexHub" />
      <meta property="og:locale" content={language === 'he' ? 'he_IL' : language === 'ar' ? 'ar_SA' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={`https://lexhub.com${ogImage}`} />
      <meta name="twitter:site" content="@lexhub" />
      <meta name="twitter:creator" content="@lexhub" />

      {/* Additional Meta Tags */}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="googlebot" content="index,follow" />
      <meta name="bingbot" content="index,follow" />
      
      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="LexHub" />

      {/* Theme */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.unsplash.com" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="LexHub Team" />
      <meta name="publisher" content="LexHub" />
      <meta name="copyright" content="© 2024 LexHub. All rights reserved." />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="1 days" />
      <meta name="expires" content="never" />
      <meta name="cache-control" content="public, max-age=31536000" />

      {/* Geo Tags */}
      <meta name="geo.region" content="US-NY" />
      <meta name="geo.placename" content="New York" />
      <meta name="geo.position" content="40.7128;-74.0060" />
      <meta name="ICBM" content="40.7128, -74.0060" />

      {/* Business/Organization */}
      <meta name="business:contact_data:street_address" content="123 Legal Street, Suite 100" />
      <meta name="business:contact_data:locality" content="New York" />
      <meta name="business:contact_data:region" content="NY" />
      <meta name="business:contact_data:postal_code" content="10001" />
      <meta name="business:contact_data:country_name" content="United States" />

      {/* App Links */}
      <meta property="al:web:url" content={canonicalUrl} />
      <meta property="al:web:should_fallback" content="true" />
    </Head>
  );
}
