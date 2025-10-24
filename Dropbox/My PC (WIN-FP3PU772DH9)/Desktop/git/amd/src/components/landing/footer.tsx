import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="font-headline text-2xl font-bold text-white mb-4">
              A.M.D
            </div>
            <p className="font-body text-gray-400 mb-4">
              ארכיב דיגיטלי - מעבירים את הניירת שלך לעידן הדיגיטלי. 
              שירותי סריקה, ארגון ואחסון מסמכים מקצועיים.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">קישורים</h3>
            <ul className="space-y-2 font-body">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  שירותים
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  אודותינו
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  צרו קשר
                </a>
              </li>
              <li>
                <a href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                  הצהרת נגישות
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  מדיניות פרטיות
                </a>
              </li>
              <li>
                <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                  תנאי שימוש
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">שירותים</h3>
            <ul className="space-y-2 font-body">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  סריקת מסמכים
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  ארגון דיגיטלי
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  אחסון בענן
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-headline text-lg font-semibold mb-4">צרו קשר</h3>
            <div className="space-y-3 font-body">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-400">054-1234567</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-400">info@amd-archive.co.il</span>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-primary-400 mt-1" />
                <span className="text-gray-400">ישראל</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="font-body text-gray-400">
            © 2025 A.M.D. כל הזכויות שמורות
          </p>
          <div className="mt-2 space-x-4 space-x-reverse">
            <a href="/accessibility" className="font-body text-gray-400 hover:text-white">הצהרת נגישות</a>
            <span className="text-gray-600">|</span>
            <a href="/privacy-policy" className="font-body text-gray-400 hover:text-white">מדיניות פרטיות</a>
            <span className="text-gray-600">|</span>
            <a href="/terms-of-service" className="font-body text-gray-400 hover:text-white">תנאי שימוש</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

