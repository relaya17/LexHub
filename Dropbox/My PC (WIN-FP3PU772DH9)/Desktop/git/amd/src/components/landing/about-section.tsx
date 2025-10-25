import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Award, Shield } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: <CheckCircle className="h-8 w-8 text-primary-600" />,
      title: "דיוק גבוה",
      description: "סריקה ודיגיטציה באיכות מקצועית"
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: "צוות מומחים",
      description: "מומחים בארגון ודיגיטציה של מסמכים"
    },
    {
      icon: <Award className="h-8 w-8 text-primary-600" />,
      title: "איכות מוכחת",
      description: "שירות מקצועי ואמין"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: "אבטחת מידע",
      description: "הגנה מלאה על המסמכים שלכם"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold text-gray-900 mb-4">
            אודות AMD
          </h2>
          <p className="font-body text-xl text-gray-600 max-w-3xl mx-auto">
            AMD היא פתרון מתקדם לדיגיטציה וארגון מסמכים המשלב טכנולוגיה מתקדמת 
            עם ניסיון עשיר לספק שירות מהיר, מדויק ובטוח.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 card-hover">
              <CardContent className="p-0">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="font-headline text-2xl font-bold text-gray-900 mb-4">
              למה לבחור ב-AMD?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
              <div>
                <h4 className="font-headline font-semibold text-lg text-gray-900 mb-2">טכנולוגיה מתקדמת</h4>
                <p className="font-body text-gray-600">
                  שימוש בטכנולוגיות סריקה מתקדמות לדיגיטציה מדויקת של מסמכים
                </p>
              </div>
              <div>
                <h4 className="font-headline font-semibold text-lg text-gray-900 mb-2">מהירות גבוהה</h4>
                <p className="font-body text-gray-600">
                  עיבוד ודיגיטציה מהירה של מסמכים תוך זמן קצר
                </p>
              </div>
              <div>
                <h4 className="font-headline font-semibold text-lg text-gray-900 mb-2">תמיכה 24/7</h4>
                <p className="font-body text-gray-600">
                  צוות מומחים זמין בכל שעות היממה לתמיכה וייעוץ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
