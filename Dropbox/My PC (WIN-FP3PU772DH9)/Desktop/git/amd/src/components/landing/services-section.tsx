import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, 
  Brain, 
  Heart, 
  Eye, 
  Activity,
  Microscope 
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: <Stethoscope className="h-12 w-12 text-primary-600" />,
      title: "אבחון כללי",
      description: "בדיקות כלליות ומעמיקות לכל הגילאים",
      features: ["בדיקות דם", "בדיקות שתן", "בדיקות לב"]
    },
    {
      icon: <Brain className="h-12 w-12 text-primary-600" />,
      title: "נוירולוגיה",
      description: "אבחון וטיפול במחלות מערכת העצבים",
      features: ["EEG", "MRI", "בדיקות קוגניטיביות"]
    },
    {
      icon: <Heart className="h-12 w-12 text-primary-600" />,
      title: "קרדיולוגיה",
      description: "אבחון וטיפול במחלות לב וכלי דם",
      features: ["אקו לב", "א.ק.ג", "בדיקות מאמץ"]
    },
    {
      icon: <Eye className="h-12 w-12 text-primary-600" />,
      title: "רפואת עיניים",
      description: "אבחון וטיפול בבעיות ראייה",
      features: ["בדיקת ראייה", "לחץ תוך עיני", "רשתית"]
    },
    {
      icon: <Activity className="h-12 w-12 text-primary-600" />,
      title: "אנדוקרינולוגיה",
      description: "אבחון וטיפול במחלות הורמונליות",
      features: ["סוכרת", "תירואיד", "הורמוני גדילה"]
    },
    {
      icon: <Microscope className="h-12 w-12 text-primary-600" />,
      title: "פתולוגיה",
      description: "בדיקות מעבדה מתקדמות",
      features: ["ביופסיה", "בדיקות גנטיות", "אונקולוגיה"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            השירותים שלנו
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            מגוון רחב של שירותי אבחון רפואי מתקדמים 
            המבוססים על טכנולוגיה חדשנית וניסיון רפואי עשיר.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-hover">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-center">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary-600 rounded-full ml-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-primary-600 hover:bg-primary-700">
                  למידע נוסף
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              רוצים לדעת יותר על השירותים שלנו?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              צרו איתנו קשר לקבלת ייעוץ אישי והתאמת השירות לצרכים שלכם
            </p>
            <Button 
              variant="outline" 
              className="bg-white text-primary-600 hover:bg-gray-100 border-white"
            >
              צור קשר עכשיו
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
