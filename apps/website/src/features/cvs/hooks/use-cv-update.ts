import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type { UserCvsUpdateBody, UserCvsUpdateResponseBody } from '../types';

interface UseCvUpdateOptions {
  onSuccess?: () => void;
}

export function useCvUpdate({ onSuccess }: UseCvUpdateOptions) {
  const ky = useKy();
  const t = useTranslations();
  const n = useNotifications();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UserCvsUpdateBody) => {
      return ky
        .patch('cvs/mine', { json: body })
        .json<UserCvsUpdateResponseBody>();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/cvs'] });
      queryClient.invalidateQueries({ queryKey: ['/cv/mine'] });

      n.success(t('cvMine.updateSuccess'));
      onSuccess?.();
    },
  });
}
