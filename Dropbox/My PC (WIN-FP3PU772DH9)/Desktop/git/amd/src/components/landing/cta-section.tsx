import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">
          מוכנים להתחיל?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
          הצטרפו לאלפי רופאים ומטופלים שכבר בחרו ב-AMD לאבחון רפואי מתקדם ומדויק.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
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
            קבל הצעת מחיר
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">התקשר אלינו</h3>
            <p className="opacity-90">03-1234567</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">שלח אימייל</h3>
            <p className="opacity-90">info@amd.co.il</p>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">24/7</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">תמיכה 24/7</h3>
            <p className="opacity-90">זמינים תמיד</p>
          </div>
        </div>
      </div>
    </section>
  );
}
