import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Award, Shield } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: <CheckCircle className="h-8 w-8 text-primary-600" />,
      title: "דיוק גבוה",
      description: "מערכת אבחון עם דיוק של 99.5%"
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: "צוות מומחים",
      description: "רופאים מומחים עם ניסיון רב"
    },
    {
      icon: <Award className="h-8 w-8 text-primary-600" />,
      title: "איכות מוכחת",
      description: "תעודות איכות בינלאומיות"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: "אבטחת מידע",
      description: "הגנה מלאה על פרטיות המטופלים"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            אודות AMD
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            מערכת AMD היא פתרון מתקדם לאבחון רפואי המשלב טכנולוגיה מתקדמת 
            עם ניסיון רפואי עשיר לספק תוצאות מדויקות ומהירות.
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
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              למה לבחור ב-AMD?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
              <div>
                <h4 className="font-semibold text-lg text-gray-900 mb-2">טכנולוגיה מתקדמת</h4>
                <p className="text-gray-600">
                  שימוש באלגוריתמים מתקדמים של בינה מלאכותית לאבחון מדויק
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-900 mb-2">מהירות גבוהה</h4>
                <p className="text-gray-600">
                  תוצאות אבחון תוך דקות במקום ימים או שבועות
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-gray-900 mb-2">תמיכה 24/7</h4>
                <p className="text-gray-600">
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
