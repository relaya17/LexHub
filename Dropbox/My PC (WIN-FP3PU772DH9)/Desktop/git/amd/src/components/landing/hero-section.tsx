"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content - Right Side */}
          <div className="text-right order-2 lg:order-1">
            <h1 className="text-5xl md:text-7xl font-bold text-blue-600 mb-8 leading-tight">
              מעבירים
              <br />
              את הניירת
              <br />
              שלך לעידן
              <br />
              הדיגיטלי
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              אנו הופכים את הניירת שלכם לנכס דיגיטלי מאורגן, נגיש ובטוח.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button 
                size="lg" 
                className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 text-base font-semibold"
              >
                צרו קשר
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-base font-semibold"
              >
                עברית
              </Button>
            </div>
          </div>

          {/* Image Content - Left Side */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-2">
            <div className="w-full max-w-md">
              <img 
                src="/mm.png"
                alt="דיגיטציה של מסמכים"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}