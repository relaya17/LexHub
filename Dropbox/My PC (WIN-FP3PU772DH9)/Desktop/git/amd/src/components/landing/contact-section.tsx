"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            צור קשר
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            נשמח לעזור לך. צור איתנו קשר בכל שאלה או בקשה
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                שלח לנו הודעה
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      שם מלא
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      אימייל
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    טלפון
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    הודעה
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="כתבו כאן את ההודעה שלכם..."
                  />
                </div>
                <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700">
                  שלח הודעה
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  פרטי התקשרות
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <Phone className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">טלפון</h3>
                    <p className="text-gray-600">03-1234567</p>
                    <p className="text-gray-600">050-1234567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <Mail className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">אימייל</h3>
                    <p className="text-gray-600">info@amd.co.il</p>
                    <p className="text-gray-600">support@amd.co.il</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <MapPin className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">כתובת</h3>
                    <p className="text-gray-600">רחוב הרפואה 123</p>
                    <p className="text-gray-600">תל אביב, ישראל</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <Clock className="h-6 w-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">שעות פעילות</h3>
                    <p className="text-gray-600">ראשון - חמישי: 8:00 - 20:00</p>
                    <p className="text-gray-600">שישי: 8:00 - 14:00</p>
                    <p className="text-gray-600">שבת: סגור</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">זקוקים לעזרה דחופה?</h3>
                <p className="mb-4">
                  במקרה חירום רפואי, אנא פנו ישירות למוקד החירום או לחדר המיון הקרוב.
                </p>
                <Button variant="outline" className="bg-white text-primary-600 hover:bg-gray-100 border-white">
                  מוקד חירום: 101
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
