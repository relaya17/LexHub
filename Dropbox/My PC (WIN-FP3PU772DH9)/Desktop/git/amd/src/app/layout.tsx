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