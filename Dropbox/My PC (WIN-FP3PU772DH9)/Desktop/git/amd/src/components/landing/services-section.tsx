import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Scan, 
  FolderOpen, 
  Cloud, 
  Shield, 
  FileText,
  Users 
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: <Scan className="h-12 w-12 text-blue-600" />,
      title: "סריקה ואחסון",
      description: "סריקה מקצועית ואחסון בענן מאובטח",
      features: ["סריקה", "ארגון", "אחסון בענן"]
    },
    {
      icon: <FolderOpen className="h-12 w-12 text-blue-600" />,
      title: "ארגון וסדר",
      description: "ארגון מסמכים בצורה מסודרת ונגישה",
      features: ["מסמכים קטנים", "זמן ומאמץ"]
    },
    {
      icon: <Users className="h-12 w-12 text-blue-600" />,
      title: "שירות אישי",
      description: "אנו מציעים שירות מותאם אישית לעסקים ופרטיים, תוך הבנת הצרכים הייחודיים של כל לקוח.",
      features: []
    }
  ];

  return (
    <section id="services" className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-3">
            שירותים
          </h2>
          <p className="font-body text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            אנו מתמחים בהפיכת הניירת שלכם לנכס דיגיטלי מאורגן, נגיש ובטוח.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-hover">
              <CardHeader className="text-center p-4 sm:p-6">
                <div className="flex justify-center mb-3 sm:mb-4">
                  {service.icon}
                </div>
                <CardTitle className="font-headline text-lg sm:text-xl font-semibold text-blue-600">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="font-body text-sm sm:text-base text-gray-600 mb-4 text-center">
                  {service.description}
                </p>
                {service.features.length > 0 && (
                  <ul className="space-y-2 mb-4 sm:mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-gray-600 font-body">
                        <div className="w-2 h-2 bg-blue-600 rounded-full ml-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
