import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useKy } from '@/hooks/use-ky';
import type { LoginRequestBody } from '../types';

export function useSignInMut() {
  const ky = useKy();
  const router = useRouter();

  return useMutation({
    onSuccess: () => router.push('/'),

    mutationFn: async (body: LoginRequestBody) => {
      await ky.post('accounts/login', { json: body });
    },
  });
}
