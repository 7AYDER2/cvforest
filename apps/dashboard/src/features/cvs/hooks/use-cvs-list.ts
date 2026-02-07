import { useQuery } from '@tanstack/react-query';
import { useDataTable } from '@/hooks/use-data-table';
import { useKy } from '@/hooks/use-ky';
import type { CvsList, CvsListQuery } from '../types';

interface UseCvsListProps {
  initialData: CvsList;
  filters: Partial<CvsListQuery>;
}

export function useCvsList({ initialData, filters }: UseCvsListProps) {
  const ky = useKy();
  const { getTableProps, sorting, pagination } = useDataTable();

  const cvsListQuery: CvsListQuery = {
    ...pagination,
    ...sorting,
    ...filters,
  };

  const allCvsListQuery: Partial<CvsListQuery> = {
    ...sorting,
    ...filters,
  };

  const cvs = useQuery({
    initialData,
    queryKey: ['/cvs', cvsListQuery],
    queryFn: () => {
      return ky.get('cvs', { searchParams: cvsListQuery }).json<CvsList>();
    },
  });

  const allCvs = useQuery({
    queryKey: ['/cvs', allCvsListQuery],
    queryFn: () => {
      return ky.get('cvs', { searchParams: allCvsListQuery }).json<CvsList>();
    },
  });

  return { getTableProps, cvs, allCvs };
}
