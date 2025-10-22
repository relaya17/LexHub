"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          AMD
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold mb-8 animate-slide-up">
          מערכת אבחון רפואי מתקדמת
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
          טכנולוגיה מתקדמת לאבחון רפואי מדויק ומהיר. 
          מערכת AMD מספקת פתרונות אבחון מתקדמים למומחי רפואה.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            התחל עכשיו
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold"
          >
            למידע נוסף
            <ArrowRight className="mr-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-white/10 rounded-full animate-bounce-slow delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-12 h-12 bg-white/10 rounded-full animate-bounce-slow delay-500"></div>
    </section>
  );
}
