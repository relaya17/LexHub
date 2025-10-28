'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Database, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const privacySections = [
  {
    icon: Database,
    title: 'Information We Collect',
    content: 'We collect information you provide directly to us, including name, email address, professional information, and any other information you choose to provide when using our services.',
  },
  {
    icon: Lock,
    title: 'How We Use Your Information',
    content: 'We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.',
  },
  {
    icon: Shield,
    title: 'Data Security',
    content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
  },
  {
    icon: Eye,
    title: 'Information Sharing',
    content: 'We do not sell your personal information. We may share your information with service providers, legal authorities when required, or with your consent.',
  },
  {
    icon: UserCheck,
    title: 'Your Rights',
    content: 'You have the right to access, correct, delete, or restrict the use of your personal information. You may also object to processing or request data portability.',
  },
  {
    icon: Globe,
    title: 'International Transfers',
    content: 'Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700" role="navigation" aria-label="Main navigation">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg" aria-label="Return to homepage">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold gradient-text">LexHub</span>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" aria-label="Back to home">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4 text-sm font-medium">
              <Shield className="w-4 h-4 mr-2 inline" aria-hidden="true" />
              Privacy Policy
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Your Privacy is Our{' '}
              <span className="gradient-text">Priority</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              We are committed to protecting your personal information and your right to privacy. 
              This policy explains how we collect, use, and safeguard your data.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last Updated: October 10, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="py-12 sm:py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {privacySections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-large transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex items-center justify-center mb-4">
                      <section.icon className="w-6 h-6 text-blue-500" aria-hidden="true" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                      {section.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Detailed Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <Card>
              <CardContent className="p-8 sm:p-12">
                <article className="prose prose-slate dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                  <p className="mb-6">
                    LexHub ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
                    This privacy policy will inform you about how we look after your personal data and tell you about your 
                    privacy rights and how the law protects you.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">2. Data Controller</h2>
                  <p className="mb-6">
                    LexHub is the data controller and responsible for your personal data. If you have any questions about 
                    this privacy policy, please contact us at privacy@lexhub.com.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">3. The Data We Collect</h2>
                  <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li><strong>Identity Data:</strong> First name, last name, username or similar identifier</li>
                    <li><strong>Contact Data:</strong> Email address, telephone numbers, billing address</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
                    <li><strong>Usage Data:</strong> Information about how you use our services</li>
                    <li><strong>Professional Data:</strong> Law firm, practice area, bar number</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4 mt-8">4. How We Use Your Data</h2>
                  <p className="mb-4">We use your personal data for the following purposes:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>To provide and maintain our services</li>
                    <li>To notify you about changes to our services</li>
                    <li>To provide customer support</li>
                    <li>To gather analysis to improve our services</li>
                    <li>To monitor the usage of our services</li>
                    <li>To detect, prevent and address technical issues</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4 mt-8">5. Data Security</h2>
                  <p className="mb-6">
                    We have implemented appropriate security measures to prevent your personal data from being accidentally 
                    lost, used, or accessed in an unauthorized way. We use SSL/TLS encryption, secure servers, and regular 
                    security audits to protect your data.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">6. Data Retention</h2>
                  <p className="mb-6">
                    We will only retain your personal data for as long as necessary to fulfill the purposes we collected 
                    it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">7. Your Legal Rights</h2>
                  <p className="mb-4">Under certain circumstances, you have rights under data protection laws:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Request access to your personal data</li>
                    <li>Request correction of your personal data</li>
                    <li>Request erasure of your personal data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Request restriction of processing your personal data</li>
                    <li>Request transfer of your personal data</li>
                    <li>Right to withdraw consent</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4 mt-8">8. Contact Us</h2>
                  <p className="mb-2">
                    If you have any questions about this privacy policy, please contact us:
                  </p>
                  <ul className="list-none mb-6 space-y-2">
                    <li>Email: privacy@lexhub.com</li>
                    <li>Phone: +1 (555) 123-4567</li>
                    <li>Address: 123 Legal Street, Suite 100, New York, NY 10001</li>
                  </ul>
                </article>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Have Questions?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our team is here to help answer any questions about your privacy and data protection.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  Back to Home
                </Button>
              </Link>
              <Link href="/terms">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
                  Terms of Service
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


