import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type { CvRejectResponse } from '../types';

export function useCvReject() {
  const ky = useKy();
  const t = useTranslations();
  const n = useNotifications();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return ky.patch(`cvs/${id}/reject`).json<CvRejectResponse>();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/cvs'] });
      n.success(t('cvs.rejectedSuccessfully'));
    },
  });
}
