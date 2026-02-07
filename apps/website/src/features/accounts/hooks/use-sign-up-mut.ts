import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type { SignUpRequestBody, SignUpResponseBody } from '../types';

export function useSignUpMut() {
  const ky = useKy();
  const t = useTranslations();
  const n = useNotifications();
  const router = useRouter();

  return useMutation({
    mutationFn: (values: SignUpRequestBody) => {
      return ky
        .post('accounts/sign-up', { json: values })
        .json<SignUpResponseBody>();
    },

    onSuccess: (data) => {
      n.success(t('signup.registrationSuccess'));
      router.push(`/verify-email?email=${encodeURIComponent(data.user.email)}`);
    },
  });
}
