import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

const translations = {
  he: {
    appName: "אור הנשמה",
    tagline: "דרך רוחנית לטיהור, הגנה וחיבור עמוק",
    analyzeNow: "נתחו עכשיו",
    spiritualScan: "סריקה רוחנית",
    login: "התחברות",
    register: "הרשמה",
    startJourney: "התחל את מסע הריפוי שלך היום",
    registerNow: "רשום עכשיו",
    features: "התכונות שלנו",
    about: "אודות",
    contact: "יצירת קשר",
    privacy: "מדיניות פרטיות",
    terms: "תנאי שימוש",
    supportEmail: "support@oreneshama.app",
    allRights: "כל הזכויות שמורות",
    feature1: "סריקה רוחנית",
    feature1Desc: "נתח את אנרגיתך לפי שמך, שם אמך ותאריך לידתך",
    feature2: "ספריית אור",
    feature2Desc: "מאמרים מעמיקים מהזוהר וספרי הקבלה",
    feature3: "מדיטציות",
    feature3Desc: "ריפוי רוחני וחיבור לשמות קודש",
    feature4: "המלצות אישיות",
    feature4Desc: "ניתוח קבלי וטיפולים רוחניים מכוונים",
    feature5: "הגנה יומית",
    feature5Desc: "פסוקים וזכרונות למגן על הנשמה",
    feature6: "חוכמה עברית",
    feature6Desc: "עקרונות התורה והקבלה לחיים טובים",
    heroTitle: "אור הנשמה",
    heroSubtitle: "דרך לטיהור, הגנה והעצמה רוחנית",
  },
  en: {
    appName: "Or HaNeshama",
    tagline: "A Spiritual Path to Purification, Protection and Deep Connection",
    analyzeNow: "Analyze Now",
    spiritualScan: "Spiritual Scan",
    login: "Login",
    register: "Register",
    startJourney: "Start Your Healing Journey Today",
    registerNow: "Register Now",
    features: "Our Features",
    about: "About",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    supportEmail: "support@oreneshama.app",
    allRights: "All Rights Reserved",
    feature1: "Spiritual Scan",
    feature1Desc: "Analyze your spiritual energy based on your name, mother's name and birth date",
    feature2: "Light Library",
    feature2Desc: "Deep articles from the Zohar and Kabbalah texts",
    feature3: "Meditations",
    feature3Desc: "Spiritual healing and connection to sacred names",
    feature4: "Personal Recommendations",
    feature4Desc: "Kabbalistic analysis and targeted spiritual treatments",
    feature5: "Daily Protection",
    feature5Desc: "Verses and affirmations to protect the soul",
    feature6: "Hebrew Wisdom",
    feature6Desc: "Principles of Torah and Kabbalah for a good life",
    heroTitle: "Or HaNeshama",
    heroSubtitle: "A Path to Purification, Protection and Spiritual Empowerment",
  },
  ar: {
    appName: "نور الروح",
    tagline: "طريق روحي للتطهر والحماية والاتصال العميق",
    analyzeNow: "حلل الآن",
    spiritualScan: "المسح الروحي",
    login: "تسجيل الدخول",
    register: "التسجيل",
    startJourney: "ابدأ رحلة الشفاء الخاصة بك اليوم",
    registerNow: "سجل الآن",
    features: "ميزاتنا",
    about: "حول",
    contact: "اتصل",
    privacy: "سياسة الخصوصية",
    terms: "شروط الاستخدام",
    supportEmail: "support@oreneshama.app",
    allRights: "جميع الحقوق محفوظة",
    feature1: "المسح الروحي",
    feature1Desc: "حلل طاقتك الروحية بناءً على اسمك واسم أمك وتاريخ ميلادك",
    feature2: "مكتبة النور",
    feature2Desc: "مقالات عميقة من الزوهار وكتب القبالاه",
    feature3: "التأملات",
    feature3Desc: "الشفاء الروحي والاتصال بالأسماء المقدسة",
    feature4: "التوصيات الشخصية",
    feature4Desc: "تحليل القبالاه والعلاجات الروحية الموجهة",
    feature5: "الحماية اليومية",
    feature5Desc: "الآيات والتأكيدات لحماية الروح",
    feature6: "الحكمة العبرية",
    feature6Desc: "مبادئ التوراة والقبالاه لحياة جيدة",
    heroTitle: "نور الروح",
    heroSubtitle: "طريق للتطهر والحماية والقوة الروحية",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<'he' | 'en' | 'ar'>("he");
  const [isMounted, setIsMounted] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedLang = (localStorage.getItem("language") || "he") as 'he' | 'en' | 'ar';
    setLanguage(savedLang);

    // Check screen size
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640); // Only very small screens (phones)
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isMounted) {
    return null;
  }

  const t = translations[language];

  return (
    <>
      <Head>
        <title>{t.appName}</title>
        <meta name="description" content={t.tagline} />
      </Head>

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.25,
          zIndex: 0,
          pointerEvents: "none"
        }}
      >
        <source src="/motion2Fast__Leonardo_AI_Prompt__3D_Angelic_Curse_Removal_App__0.mp4" type="video/mp4" />
      </video>

      {/* Local Header for Home Page */}
      <header style={{ 
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        borderBottom: "none",
        padding: "1rem 2rem",
        position: "sticky",
        top: 0,
        zIndex: 50
      }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          gap: "1rem",
          maxWidth: "1280px",
          margin: "0 auto"
        }}>
          {/* Logo - Always visible on left */}
          <Link href="/" className="logo" style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            <span style={{ fontSize: "1.75rem" }}>🕊️</span>
            <span style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#b45309", display: isSmallScreen ? "none" : "block" }}>
              {t.appName}
            </span>
          </Link>

          {/* Desktop Navigation - Visible only on large screens */}
          {!isSmallScreen && (
          <nav style={{ 
            display: "flex",
            gap: "1rem", 
            alignItems: "center",
            flexWrap: "wrap"
          }}>
            <Link href="/about" style={{ color: "#3e3b37", textDecoration: "none", fontWeight: "500", fontSize: "0.9rem" }}>{t.about}</Link>
            <Link href="#features" style={{ color: "#3e3b37", textDecoration: "none", fontWeight: "500", fontSize: "0.9rem" }}>{t.features}</Link>
            <Link href="/auth/login" style={{ color: "#3e3b37", textDecoration: "none", fontWeight: "500", fontSize: "0.9rem" }}>{t.login}</Link>
            <Link href="/auth/register" style={{ 
              background: "#d97706", 
              color: "white", 
              padding: "0.5rem 1rem", 
              borderRadius: "0.5rem",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "0.9rem"
            }}>
              {t.register}
            </Link>
          </nav>
          )}

          {/* Mobile Hamburger - Show only on small screens */}
          {isSmallScreen && (
          <button 
            onClick={() => alert("Mobile menu - Coming soon!")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1.5rem",
              color: "#b45309"
            }}
            title="תפריט"
          >
            ☰
          </button>
          )}
        </div>
      </header>

      <main style={{ position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <section className="hero">
          <h2>{t.heroTitle}</h2>
          <p>{t.heroSubtitle}</p>
          <div className="buttons">
            <Link href="/auth/register" className="btn-primary">
              {t.analyzeNow}
            </Link>
            <Link href="#features" className="btn-secondary">
              {t.spiritualScan}
            </Link>
          </div>
        </section>

        {/* Features */}
        <section id="features" style={{ 
          backgroundColor: "rgba(245, 241, 232, 0.85)",
          backdropFilter: "blur(10px)",
          padding: "4rem 1rem",
          margin: "0"
        }}>
          <h2 style={{ textAlign: "center", color: "#3e3b37", marginBottom: "2rem", fontSize: "2rem" }}>
            {t.features}
          </h2>
          <div className="features">
            <div className="feature-card">
              <div className="icon">🔮</div>
              <h3>{t.feature1}</h3>
              <p>{t.feature1Desc}</p>
            </div>

            <div className="feature-card">
              <div className="icon">📚</div>
              <h3>{t.feature2}</h3>
              <p>{t.feature2Desc}</p>
            </div>

            <div className="feature-card">
              <div className="icon">🧘</div>
              <h3>{t.feature3}</h3>
              <p>{t.feature3Desc}</p>
            </div>

            <div className="feature-card">
              <div className="icon">✨</div>
              <h3>{t.feature4}</h3>
              <p>{t.feature4Desc}</p>
            </div>

            <div className="feature-card">
              <div className="icon">🛡️</div>
              <h3>{t.feature5}</h3>
              <p>{t.feature5Desc}</p>
            </div>

            <div className="feature-card">
              <div className="icon">💡</div>
              <h3>{t.feature6}</h3>
              <p>{t.feature6Desc}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <h2>{t.startJourney}</h2>
          <p>{t.registerNow}</p>
          <Link href="/auth/register">{t.registerNow}</Link>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div>
          <div className="footer-grid">
            <div>
              <h3>{t.about}</h3>
              <p>{t.appName} - {t.tagline}</p>
            </div>
            <div>
              <h3>{t.features}</h3>
              <Link href="#features">{t.spiritualScan}</Link>
              <Link href="#features">{t.feature2}</Link>
              <Link href="#features">{t.feature3}</Link>
            </div>
            <div>
              <h3>{t.contact}</h3>
              <p>{t.supportEmail}</p>
              <Link href="/privacy">{t.privacy}</Link>
              <Link href="/terms">{t.terms}</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 {t.appName}. {t.allRights}.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
