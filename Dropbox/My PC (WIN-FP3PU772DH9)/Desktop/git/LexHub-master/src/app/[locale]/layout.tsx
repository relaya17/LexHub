import { ReactNode } from 'react';
import { notFound } from 'next/navigation';

const locales = ['en', 'he', 'ar'];

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params: { locale } }: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return <>{children}</>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
