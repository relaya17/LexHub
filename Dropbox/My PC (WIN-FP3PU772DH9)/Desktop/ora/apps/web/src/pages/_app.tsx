import type { AppProps } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  const [language, setLanguage] = useState<'he' | 'en' | 'ar'>('he');

  useEffect(() => {
    const savedLang = (localStorage.getItem("language") || "he") as 'he' | 'en' | 'ar';
    setLanguage(savedLang);
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "rtl";
  }, []);

  const handleLanguageChange = (lang: 'he' | 'en' | 'ar') => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "rtl";
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="description" content="אור הנשמה - דרך רוחנית לטיהור והגנה" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>
      <Component {...pageProps} />
      <Footer language={language} onLanguageChange={handleLanguageChange} />
    </>
  );
}

