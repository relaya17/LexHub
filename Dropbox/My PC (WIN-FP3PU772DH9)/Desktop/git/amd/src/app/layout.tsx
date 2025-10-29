import type { Metadata } from "next";
import { Heebo, Rubik } from "next/font/google";
import "./globals.css";

const heebo = Heebo({ 
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-heebo",
  display: "swap",
});

const rubik = Rubik({ 
  subsets: ["latin", "hebrew"],
  weight: ["700", "900"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ארכיב דיגיטלי | A.M.D.",
  description: "מעבירים את הניירת שלך לעידן הדיגיטלי",
  icons: {
    icon: '/mm.png',
    apple: '/mm.png',
  },
  openGraph: {
    title: "ארכיב דיגיטלי | A.M.D.",
    description: "מעבירים את הניירת שלך לעידן הדיגיטלי",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Digital Archive Illustration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ארכיב דיגיטלי | A.M.D.",
    description: "מעבירים את הניירת שלך לעידן הדיגיטלי",
    images: ["https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${rubik.variable}`}>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}