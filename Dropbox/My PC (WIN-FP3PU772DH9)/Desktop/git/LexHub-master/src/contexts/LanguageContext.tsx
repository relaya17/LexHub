'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'he' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.privacy': 'Privacy Policy',
    'nav.terms': 'Terms of Service',
    'hero.title': 'Revolutionary Legal Technology Platform',
    'hero.subtitle': 'Transform your legal practice with LexHub - the most advanced, intelligent, and user-friendly legal technology platform. Experience unprecedented efficiency, security, and innovation.',
    'hero.cta': 'Get Started',
    'hero.learnMore': 'Learn More',
    'features.title': 'Powerful Features',
    'features.subtitle': 'Everything you need to modernize your legal practice',
    'features.secure.title': 'Advanced Security',
    'features.secure.description': 'Bank-level encryption and security protocols to protect your sensitive legal data.',
    'features.fast.title': 'Lightning Fast',
    'features.fast.description': 'Optimized performance with sub-second response times for all operations.',
    'features.responsive.title': 'Fully Responsive',
    'features.responsive.description': 'Perfect experience on all devices.',
    'features.seo.title': 'SEO Optimized',
    'features.seo.description': 'Built for maximum search engine visibility.',
    'features.darkMode.title': 'Dark Mode',
    'features.darkMode.description': 'Beautiful dark and light themes.',
    'features.accessibility.title': 'Accessibility',
    'features.accessibility.description': 'WCAG compliant for all users.',
    'footer.description': 'Revolutionary legal technology platform for the modern practice.',
    'footer.quickLinks': 'Quick Links',
    'footer.legal': 'Legal',
    'footer.social': 'Follow Us',
    'footer.copyright': '© 2024 LexHub. All rights reserved.',
    'common.login': 'Sign In',
    'common.signup': 'Sign Up',
    'privacy.title': 'Privacy Policy',
    'privacy.subtitle': 'Your Privacy is Our Priority',
    'privacy.description': 'We are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and safeguard your data.',
    'terms.title': 'Terms of Service',
    'terms.subtitle': 'Terms of Service',
    'terms.description': 'Please read these terms carefully before using LexHub services. By using our platform, you agree to be bound by these terms.',
  },
  he: {
    'nav.home': 'בית',
    'nav.about': 'אודות',
    'nav.services': 'שירותים',
    'nav.contact': 'צור קשר',
    'nav.privacy': 'מדיניות פרטיות',
    'nav.terms': 'תנאי שימוש',
    'hero.title': 'פלטפורמת טכנולוגיה משפטית מהפכנית',
    'hero.subtitle': 'שנו את הפרקטיקה המשפטית שלכם עם LexHub - הפלטפורמה המתקדמת, החכמה וידידותית למשתמש ביותר לטכנולוגיה משפטית. חוו יעילות, אבטחה וחדשנות חסרי תקדים.',
    'hero.cta': 'התחל עכשיו',
    'hero.learnMore': 'למידע נוסף',
    'features.title': 'תכונות חזקות',
    'features.subtitle': 'כל מה שאתם צריכים למודרניזציה של הפרקטיקה המשפטית שלכם',
    'features.secure.title': 'אבטחה מתקדמת',
    'features.secure.description': 'פרוטוקולי הצפנה ואבטחה ברמת בנק להגנה על הנתונים המשפטיים הרגישים שלכם.',
    'features.fast.title': 'מהיר כברק',
    'features.fast.description': 'ביצועים מותאמים עם זמני תגובה של פחות משנייה לכל הפעולות.',
    'features.responsive.title': 'מגיב במלואו',
    'features.responsive.description': 'חוויה מושלמת בכל המכשירים.',
    'features.seo.title': 'מותאם ל-SEO',
    'features.seo.description': 'נבנה למקסימום נראות במנועי חיפוש.',
    'features.darkMode.title': 'מצב כהה',
    'features.darkMode.description': 'ערכות נושא כהה ובהיר יפות.',
    'features.accessibility.title': 'נגישות',
    'features.accessibility.description': 'תואם ל-WCAG לכל המשתמשים.',
    'footer.description': 'פלטפורמת טכנולוגיה משפטית מהפכנית לפרקטיקה המודרנית.',
    'footer.quickLinks': 'קישורים מהירים',
    'footer.legal': 'משפטי',
    'footer.social': 'עקבו אחרינו',
    'footer.copyright': '© 2024 LexHub. כל הזכויות שמורות.',
    'common.login': 'התחברות',
    'common.signup': 'הרשמה',
    'privacy.title': 'מדיניות פרטיות',
    'privacy.subtitle': 'הפרטיות שלכם היא העדיפות שלנו',
    'privacy.description': 'אנחנו מחויבים להגן על המידע האישי שלכם ועל הזכות לפרטיות. מדיניות זו מסבירה איך אנחנו אוספים, משתמשים ומגנים על הנתונים שלכם.',
    'terms.title': 'תנאי שירות',
    'terms.subtitle': 'תנאי שירות',
    'terms.description': 'אנא קראו את התנאים בקפידה לפני השימוש בשירותי LexHub. על ידי השימוש בפלטפורמה שלנו, אתם מסכימים להיות מחויבים לתנאים אלה.',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.about': 'حول',
    'nav.services': 'الخدمات',
    'nav.contact': 'اتصل بنا',
    'nav.privacy': 'سياسة الخصوصية',
    'nav.terms': 'شروط الخدمة',
    'hero.title': 'منصة التكنولوجيا القانونية الثورية',
    'hero.subtitle': 'حوّل ممارستك القانونية مع LexHub - منصة التكنولوجيا القانونية الأكثر تطوراً وذكاءً وسهولة في الاستخدام. اختبر الكفاءة والأمان والابتكار غير المسبوق.',
    'hero.cta': 'ابدأ الآن',
    'hero.learnMore': 'اعرف المزيد',
    'features.title': 'ميزات قوية',
    'features.subtitle': 'كل ما تحتاجه لتحديث ممارستك القانونية',
    'features.secure.title': 'أمان متقدم',
    'features.secure.description': 'بروتوكولات تشفير وأمان على مستوى البنوك لحماية بياناتك القانونية الحساسة.',
    'features.fast.title': 'سريع كالبرق',
    'features.fast.description': 'أداء محسّن مع أوقات استجابة أقل من ثانية لجميع العمليات.',
    'features.responsive.title': 'متجاوب بالكامل',
    'features.responsive.description': 'تجربة مثالية على جميع الأجهزة.',
    'features.seo.title': 'محسّن لمحركات البحث',
    'features.seo.description': 'مبني لأقصى وضوح في محركات البحث.',
    'features.darkMode.title': 'الوضع المظلم',
    'features.darkMode.description': 'سمات جميلة مظلمة وفاتحة.',
    'features.accessibility.title': 'إمكانية الوصول',
    'features.accessibility.description': 'متوافق مع WCAG لجميع المستخدمين.',
    'footer.description': 'منصة التكنولوجيا القانونية الثورية للممارسة الحديثة.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.legal': 'قانوني',
    'footer.social': 'تابعنا',
    'footer.copyright': '© 2024 LexHub. جميع الحقوق محفوظة.',
    'common.login': 'تسجيل الدخول',
    'common.signup': 'تسجيل',
    'privacy.title': 'سياسة الخصوصية',
    'privacy.subtitle': 'خصوصيتك هي أولويتنا',
    'privacy.description': 'نحن ملتزمون بحماية معلوماتك الشخصية وحقك في الخصوصية. تشرح هذه السياسة كيف نجمع ونستخدم ونحمي بياناتك.',
    'terms.title': 'شروط الخدمة',
    'terms.subtitle': 'شروط الخدمة',
    'terms.description': 'يرجى قراءة هذه الشروط بعناية قبل استخدام خدمات LexHub. باستخدام منصتنا، فإنك توافق على الالتزام بهذه الشروط.',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'he', 'ar'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language to localStorage when it changes
    localStorage.setItem('language', language);
    
    // Update document direction and language
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' || language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const isRTL = language === 'he' || language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
