import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPageContent } from '@/features/footer/utils/helpers';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('meta.whoTitle'),
    description: t('meta.whoDescription'),
  };
}

export default async function WhoPage() {
  const content = await getPageContent('who');

  return <div>{content}</div>;
}
