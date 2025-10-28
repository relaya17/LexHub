"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    <section id="contact" className="pt-8 sm:pt-12 pb-0 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-0">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-3">
            צרו קשר
          </h2>
          <p className="font-body text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            יש לכם שאלות? רוצים הצעת מחיר? השאירו פרטים ונחזור אליכם בהקדם.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-0 pb-0">
          {/* Contact Form */}
          <Card className="mb-0 pb-0">
            <CardHeader className="pb-1 p-4 sm:p-6">
              <CardTitle className="font-headline text-xl sm:text-2xl font-bold text-gray-900">
                שלח לנו הודעה
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-8 sm:pb-12 pt-0 p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="name" className="font-body block text-sm font-medium text-gray-700 mb-2">
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
                <div className="pt-2 sm:pt-4">
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 text-base sm:text-lg">
                    שלח הודעה
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
