"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Text Content - Top */}
          <div className="max-w-5xl">
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-extrabold text-blue-600 mb-6 leading-tight tracking-tight">
              מעבירים את הניירת שלך
              <br />
              לעידן הדיגיטלי
            </h1>
            <p className="font-body text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              אנו הופכים את הניירת שלכם לנכס דיגיטלי מאורגן, נגיש ובטוח.
            </p>
          </div>

          {/* Image Content - Bottom */}
          <div className="w-full max-w-3xl">
            <img 
              src="/mm.png"
              alt="דיגיטציה של מסמכים"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
