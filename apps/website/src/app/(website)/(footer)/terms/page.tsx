import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPageContent } from '@/features/footer/utils/helpers';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('meta.termsTitle'),
    description: t('meta.termsDescription'),
  };
}

export default async function TermsPage() {
  const content = await getPageContent('terms');

  return <div>{content}</div>;
}
