import { Button } from '@/components/ui/button';
import type { translations as T } from '@/lib/translations';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

type Translations = typeof T.he;

interface HeroSectionProps {
    t: Translations;
}

export function HeroSection({ t }: HeroSectionProps) {
    return (
        <section id="home" className="pt-20 pb-8 sm:pt-24 sm:pb-12 md:pt-32 md:pb-16 bg-card">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="text-center md:text-right space-y-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-headline text-blue-600 leading-tight mb-4 sm:mb-6">
                            {t.slogan}
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto md:mx-0 font-medium">
                            {t.services.s3}
                        </p>
                        <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg font-semibold">
                            <a href="/#contact" className="group">
                                {t.get_quote}
                                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-center order-first md:order-last">
                     <Image
                        src="https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=600&h=400&auto=format&fit=crop"
                        alt="Digital Archive Illustration"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-xl object-cover w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
                        data-ai-hint="digital archive document management"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
