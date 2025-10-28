import ClientPage from '@/components/client-page';

export default function LocalePage({ params }: { params: { locale: string } }) {
  return <ClientPage params={params} />;
}