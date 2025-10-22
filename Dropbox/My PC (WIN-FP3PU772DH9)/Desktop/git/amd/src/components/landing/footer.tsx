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
            <div className="text-2xl font-bold text-white mb-4">
              AMD
            </div>
            <p className="text-gray-400 mb-4">
              מערכת אבחון רפואי מתקדמת המבוססת על טכנולוגיה חדשנית 
              וניסיון רפואי עשיר לספק תוצאות מדויקות ומהירות.
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
            <h3 className="text-lg font-semibold mb-4">קישורים מהירים</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  בית
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  אודות
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                  שירותים
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  צור קשר
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">שירותים</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  אבחון כללי
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  נוירולוגיה
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  קרדיולוגיה
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  רפואת עיניים
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">צור קשר</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-primary-400" />
                <span className="text-gray-400">03-1234567</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-primary-400" />
                <span className="text-gray-400">info@amd.co.il</span>
              </div>
              <div className="flex items-start space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-primary-400 mt-1" />
                <span className="text-gray-400">רחוב הרפואה 123<br />תל אביב, ישראל</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4">הירשמו לניוזלטר</h3>
            <p className="text-gray-400 mb-4">
              קבלו עדכונים על שירותים חדשים וטיפים רפואיים
            </p>
            <div className="flex space-x-2 space-x-reverse">
              <Input 
                type="email" 
                placeholder="הכנסו את האימייל שלכם"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="bg-primary-600 hover:bg-primary-700">
                הירשמו
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 AMD. כל הזכויות שמורות. | 
            <a href="#" className="hover:text-white mr-2">מדיניות פרטיות</a> |
            <a href="#" className="hover:text-white mr-2">תנאי שימוש</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
