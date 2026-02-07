import { getLocale } from 'next-intl/server';
import { SignIn } from '@/features/accounts/views/sign-in';

export default async function SignInPage() {
  const locale = await getLocale();

  return <SignIn locale={locale} />;
}
