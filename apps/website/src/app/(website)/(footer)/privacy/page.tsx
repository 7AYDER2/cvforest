import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getPageContent } from '@/features/footer/utils/helpers';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t('meta.privacyTitle'),
    description: t('meta.privacyDescription'),
  };
}

export default async function PrivacyPage() {
  const content = await getPageContent('privacy');

  return <div>{content}</div>;
}
