'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Globe, 
  CheckCircle,
  Play,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { StructuredData } from '@/components/seo/structured-data';
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'Bank-level encryption and security protocols to protect your sensitive legal data.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with sub-second response times for all operations.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Seamless collaboration tools for legal teams of any size.',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Comprehensive analytics to optimize your legal practice performance.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
  },
  {
    icon: Globe,
    title: 'Global Access',
    description: 'Access your legal data from anywhere in the world, 24/7.',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
  },
  {
    icon: CheckCircle,
    title: 'Compliance Ready',
    description: 'Built-in compliance tools for all major legal jurisdictions.',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/20',
  },
];

const stats = [
  { label: 'Happy Clients', value: '10,000+' },
  { label: 'Cases Managed', value: '1M+' },
  { label: 'Time Saved', value: '50%' },
  { label: 'Countries Served', value: '50+' },
];

export default function HomePage({ params }: { params: { locale: string } }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t, isRTL, setLanguage } = useLanguage();

  useEffect(() => {
    setMounted(true);
    // Set language based on URL parameter
    if (params.locale && ['en', 'he', 'ar'].includes(params.locale)) {
      setLanguage(params.locale as 'en' | 'he' | 'ar');
    }
  }, [params.locale, setLanguage]);

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  if (!mounted) return null;

  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700" role="navigation" aria-label="Main navigation">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center" aria-hidden="true">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">LexHub</span>
              </motion.div>

              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" aria-label="View features section">
                  {t('nav.services')}
                </a>
                <a href="#testimonials" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" aria-label="View testimonials section">
                  {t('nav.about')}
                </a>
                <a href="#pricing" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1" aria-label="View pricing section">
                  {t('nav.contact')}
                </a>
                <LanguageSwitcher />
                <Button variant="outline" size="sm" aria-label="Sign in to your account">
                  {t('common.login')}
                </Button>
                <Button size="sm" aria-label="Get started with LexHub">
                  {t('hero.cta')}
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Button>
                <ThemeToggle />
              </div>

              <div className="md:hidden flex items-center space-x-2">
                <LanguageSwitcher />
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
              >
                <div className="px-4 py-4 space-y-4">
                  <a href="#features" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t('nav.services')}
                  </a>
                  <a href="#testimonials" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t('nav.about')}
                  </a>
                  <a href="#pricing" className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {t('nav.contact')}
                  </a>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      {t('common.login')}
                    </Button>
                    <Button size="sm" className="flex-1">
                      {t('hero.cta')}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Section */}
        <section ref={heroRef} className="pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <Badge variant="secondary" className="mb-4 text-sm font-medium">
                  🚀 Revolutionary Legal Technology
                </Badge>
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('hero.title')}
                </h1>
                <p className={`text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('hero.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              >
                <Button size="lg" className="text-lg px-8 py-4" aria-label="Start your free trial">
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4" aria-label="Watch product demo video">
                  <Play className="w-5 h-5 mr-2" aria-hidden="true" />
                  {t('hero.learnMore')}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto"
                role="region"
                aria-label="Platform statistics"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-1" aria-label={`${stat.value} ${stat.label}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" ref={featuresRef} className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-900" aria-labelledby="features-heading">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4">
                ✨ Powerful Features
              </Badge>
              <h2 id="features-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Everything You Need to{' '}
                <span className="gradient-text">Excel</span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                Comprehensive tools and features designed to streamline your legal practice 
                and maximize your success.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-large transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Legal Practice?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of legal professionals who have already revolutionized 
                their practice with LexHub.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
                  Schedule Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">LexHub</span>
                </div>
                <p className="text-slate-400">
                  Revolutionary legal technology platform for the modern practice.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center text-slate-400 gap-4">
                <p>&copy; 2025 LexHub. All rights reserved.</p>
                <div className="flex gap-6 text-sm">
                  <a href="/privacy" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Privacy Policy</a>
                  <a href="/terms" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
