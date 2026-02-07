import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useKy } from '@/hooks/use-ky';
import { useNotifications } from '@/hooks/use-notifications';
import type { CvApproveResponse } from '../types';

export function useCvApprove() {
  const ky = useKy();
  const t = useTranslations();
  const n = useNotifications();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return ky.patch(`cvs/${id}/approve`).json<CvApproveResponse>();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/cvs'] });
      n.success(t('cvs.approvedSuccessfully'));
    },
  });
}
