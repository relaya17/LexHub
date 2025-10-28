'use client';

import { motion } from 'framer-motion';
import { Shield, FileText, AlertCircle, Scale, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const termsSections = [
  {
    icon: FileText,
    title: 'Acceptance of Terms',
    content: 'By accessing and using LexHub services, you agree to be bound by these Terms of Service and all applicable laws and regulations.',
  },
  {
    icon: CheckCircle,
    title: 'Use License',
    content: 'We grant you a limited, non-exclusive, non-transferable license to use our services for your legal practice in accordance with these terms.',
  },
  {
    icon: AlertCircle,
    title: 'User Responsibilities',
    content: 'You are responsible for maintaining the confidentiality of your account, all activities under your account, and for the content you upload or share.',
  },
  {
    icon: Scale,
    title: 'Legal Compliance',
    content: 'You agree to use our services in compliance with all applicable laws, regulations, and professional ethical obligations.',
  },
  {
    icon: Shield,
    title: 'Intellectual Property',
    content: 'All content, features, and functionality of LexHub are owned by us and protected by copyright, trademark, and other intellectual property laws.',
  },
  {
    icon: XCircle,
    title: 'Termination',
    content: 'We reserve the right to terminate or suspend your account and access to services at our sole discretion, without notice, for conduct that violates these terms.',
  },
];

export default function TermsPage() {
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
              <FileText className="w-4 h-4 mr-2 inline" aria-hidden="true" />
              Terms of Service
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using LexHub services. 
              By using our platform, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Last Updated: October 10, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Overview */}
      <section className="py-12 sm:py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {termsSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-large transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/20 rounded-lg flex items-center justify-center mb-4">
                      <section.icon className="w-6 h-6 text-purple-500" aria-hidden="true" />
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

          {/* Detailed Terms */}
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
                  <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                  <p className="mb-6">
                    These Terms of Service constitute a legally binding agreement between you and LexHub. 
                    By accessing or using our services, you acknowledge that you have read, understood, and agree 
                    to be bound by these Terms.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">2. Eligibility</h2>
                  <p className="mb-6">
                    You must be at least 18 years old and have the legal capacity to enter into contracts to use our services. 
                    If you are using LexHub on behalf of an organization, you represent that you have the authority to bind 
                    that organization to these Terms.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">3. User Accounts</h2>
                  <p className="mb-4">To use certain features of LexHub, you must create an account. You agree to:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Maintain the security of your password and account</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4 mt-8">4. Acceptable Use</h2>
                  <p className="mb-4">You agree not to:</p>
                  <ul className="list-disc pl-6 mb-6 space-y-2">
                    <li>Use our services for any illegal purpose or in violation of any laws</li>
                    <li>Violate or infringe upon the rights of others</li>
                    <li>Upload or transmit viruses or malicious code</li>
                    <li>Interfere with or disrupt the services or servers</li>
                    <li>Attempt to gain unauthorized access to any systems</li>
                    <li>Use automated systems to access the services without permission</li>
                    <li>Impersonate any person or entity</li>
                    <li>Collect or harvest personal information without consent</li>
                  </ul>

                  <h2 className="text-2xl font-bold mb-4 mt-8">5. Intellectual Property Rights</h2>
                  <p className="mb-6">
                    LexHub and its entire contents, features, and functionality are owned by LexHub, its licensors, 
                    or other providers and are protected by United States and international copyright, trademark, 
                    patent, trade secret, and other intellectual property laws.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">6. User Content</h2>
                  <p className="mb-6">
                    You retain all rights to content you submit, post, or display on or through the services. 
                    By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, 
                    reproduce, and display such content solely for the purpose of providing our services.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">7. Privacy and Data Protection</h2>
                  <p className="mb-6">
                    Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy 
                    to understand our practices regarding the collection and use of your information.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">8. Service Modifications</h2>
                  <p className="mb-6">
                    We reserve the right to modify, suspend, or discontinue any part of our services at any time, 
                    with or without notice. We shall not be liable to you or any third party for any modification, 
                    suspension, or discontinuation of the services.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">9. Limitation of Liability</h2>
                  <p className="mb-6">
                    To the fullest extent permitted by law, LexHub shall not be liable for any indirect, incidental, 
                    special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
                    directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">10. Disclaimer of Warranties</h2>
                  <p className="mb-6">
                    The services are provided "as is" and "as available" without warranties of any kind, either express 
                    or implied, including, but not limited to, implied warranties of merchantability, fitness for a 
                    particular purpose, or non-infringement.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">11. Governing Law</h2>
                  <p className="mb-6">
                    These Terms shall be governed by and construed in accordance with the laws of the State of New York, 
                    United States, without regard to its conflict of law provisions.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">12. Changes to Terms</h2>
                  <p className="mb-6">
                    We reserve the right to modify these Terms at any time. We will notify you of any changes by posting 
                    the new Terms on this page and updating the "Last Updated" date. Your continued use of the services 
                    after any changes constitutes acceptance of the new Terms.
                  </p>

                  <h2 className="text-2xl font-bold mb-4 mt-8">13. Contact Information</h2>
                  <p className="mb-2">
                    If you have any questions about these Terms, please contact us:
                  </p>
                  <ul className="list-none mb-6 space-y-2">
                    <li>Email: legal@lexhub.com</li>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of legal professionals using LexHub today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  Back to Home
                </Button>
              </Link>
              <Link href="/privacy">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
                  Privacy Policy
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


