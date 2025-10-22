"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-primary-600">
              AMD
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <a href="#home" className="text-gray-700 hover:text-primary-600 transition-colors">
              בית
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary-600 transition-colors">
              אודות
            </a>
            <a href="#services" className="text-gray-700 hover:text-primary-600 transition-colors">
              שירותים
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              צור קשר
            </a>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 ml-2" />
              03-1234567
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 ml-2" />
              info@amd.co.il
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-primary-600 hover:bg-primary-700">
              התחל עכשיו
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
