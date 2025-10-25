import type { translations as T } from '@/lib/translations';
import Link from 'next/link';

type Translations = typeof T.he;

interface FooterProps {
    t: Translations;
}

export function Footer({ t }: FooterProps) {
    const currentYear = new Date().getFullYear();
    const navItems = [
        { href: '/#services', label: t.services_title },
        { href: '/#about', label: t.about_us.title },
        { href: '/#contact', label: t.contact.title },
        { href: '/accessibility', label: t.accessibility_statement },
        { href: '/privacy-policy', label: t.privacy_policy },
        { href: '/terms-of-service', label: t.terms_of_service },
    ];
    return (
        <footer className="pt-4 pb-6 px-6 md:px-12 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto text-center">
                <nav className="flex justify-center flex-wrap gap-8 md:gap-10 mb-3">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href} className="text-base font-medium text-gray-600 hover:text-blue-600 transition-colors">
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <p className="text-base text-gray-600 mb-1.5">&copy; {currentYear} {t.titlePart2}. {t.rights_reserved}</p>
                <a
                  href="https://www.Amd-archive.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-block"
                >
                  https://www.Amd-archive.com
                </a>
            </div>
        </footer>
    );
}
