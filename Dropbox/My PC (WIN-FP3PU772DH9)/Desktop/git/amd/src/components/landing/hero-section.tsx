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
        <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-16 bg-card">
            <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-right space-y-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold font-headline text-blue-600 leading-tight mb-6">
                            {t.slogan}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto md:mx-0 font-medium">
                            {t.services.s3}
                        </p>
                        <Button size="lg" asChild className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold">
                            <a href="/#contact" className="group">
                                {t.get_quote}
                                <ArrowLeft className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                     <Image
                        src="https://images.unsplash.com/photo-1583521214690-73421a1829a9?q=80&w=600&h=400&auto=format&fit=crop"
                        alt="Digital Archive Illustration"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-xl object-cover"
                        data-ai-hint="digital archive document management"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
