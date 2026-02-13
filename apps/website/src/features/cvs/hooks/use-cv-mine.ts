import { useQuery } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';
import type { UserCvsMineResponse } from '../types';

interface UseCvMineOptions {
  initialData?: UserCvsMineResponse;
}

export function useCvMine({ initialData }: UseCvMineOptions) {
  const ky = useKy();

  return useQuery({
    initialData,
    queryKey: ['/cv/mine'],
    queryFn: () => ky.get('cvs/mine').json<UserCvsMineResponse>(),
  });
}
