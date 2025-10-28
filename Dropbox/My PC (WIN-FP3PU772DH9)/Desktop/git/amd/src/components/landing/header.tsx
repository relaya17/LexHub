"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'he' | 'en'>('he');

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left */}
          <div className="flex items-center gap-2">
            <span className="font-headline text-sm sm:text-lg font-semibold text-gray-900">ארכיב דיגיטלי</span>
            <span className="text-sm sm:text-lg text-gray-400">|</span>
            <span className="font-headline text-base sm:text-xl font-bold text-blue-600">A.M.D</span>
          </div>

          {/* Menu Button + Language Buttons - Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage('en')}
              className={`px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm ${language === 'en' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <span className="hidden sm:inline">English</span>
              <span className="sm:hidden">EN</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setLanguage('he')}
              className={`px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm ${language === 'he' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              עברית
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-gray-100"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a
                href="#home"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                בית
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                אודות
              </a>
              <a
                href="#services"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                שירותים
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                צור קשר
              </a>
              <div className="pt-4">
                <Button className="w-full bg-primary-600 hover:bg-primary-700">
                  התחל עכשיו
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
