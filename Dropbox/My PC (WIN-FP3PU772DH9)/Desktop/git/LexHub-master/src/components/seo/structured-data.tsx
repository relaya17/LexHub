'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function StructuredData() {
  const { language } = useLanguage();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LexHub",
    "alternateName": "LexHub Legal Technology Platform",
    "url": "https://lexhub.com",
    "logo": "https://lexhub.com/logo.svg",
    "description": language === 'he' 
      ? "פלטפורמת טכנולוגיה משפטית מהפכנית עם פתרונות AI למשרדי עורכי דין מודרניים"
      : language === 'ar'
      ? "منصة التكنولوجيا القانونية الثورية مع حلول الذكاء الاصطناعي لمكاتب المحاماة الحديثة"
      : "Revolutionary legal technology platform with AI-powered solutions for modern law firms",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "LexHub Team"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Legal Street, Suite 100",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10001",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "support@lexhub.com"
    },
    "sameAs": [
      "https://twitter.com/lexhub",
      "https://linkedin.com/company/lexhub",
      "https://facebook.com/lexhub"
    ],
    "offers": {
      "@type": "Offer",
      "name": "Legal Technology Platform",
      "description": "AI-powered legal practice management software",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LexHub Legal Technology Platform",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "description": language === 'he'
      ? "פלטפורמת טכנולוגיה משפטית מתקדמת עם ניהול תיקים, אוטומציה של מסמכים ואנליטיקה לבית המשפט"
      : language === 'ar'
      ? "منصة التكنولوجيا القانونية المتقدمة مع إدارة القضايا وأتمتة المستندات وتحليلات المحكمة"
      : "Advanced legal technology platform with case management, document automation, and courtroom analytics",
    "url": "https://lexhub.com",
    "author": {
      "@type": "Organization",
      "name": "LexHub"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "featureList": [
      "AI-Powered Case Management",
      "Document Automation",
      "Courtroom Analytics",
      "Team Collaboration",
      "Advanced Security",
      "Global Access"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LexHub",
    "url": "https://lexhub.com",
    "description": language === 'he'
      ? "פלטפורמת טכנולוגיה משפטית מהפכנית"
      : language === 'ar'
      ? "منصة التكنولوجيا القانونية الثورية"
      : "Revolutionary Legal Technology Platform",
    "publisher": {
      "@type": "Organization",
      "name": "LexHub"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://lexhub.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": language === 'he' ? 'בית' : language === 'ar' ? 'الرئيسية' : 'Home',
        "item": "https://lexhub.com"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
