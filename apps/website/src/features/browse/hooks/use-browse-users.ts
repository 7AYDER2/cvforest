import { useDebouncedValue } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { UserListQuery, UserListResponse } from '@/features/home/types';
import { useKy } from '@/hooks/use-ky';
import { BROWSE_PAGE_SIZE } from '@/utils/constants';

const initialFilters: Partial<UserListQuery> = {
  governorateId: undefined,
  skillIds: [],
  availabilityType: undefined,
  workLocationType: undefined,
  experienceMin: undefined,
  experienceMax: undefined,
};

export function useBrowseUsers() {
  const ky = useKy();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 300);
  const [filters, setFiltersState] =
    useState<Partial<UserListQuery>>(initialFilters);

  const query: UserListQuery = {
    page,
    pageSize: BROWSE_PAGE_SIZE,
    sortingColumn: 'createdAt',
    sortingDirection: 'desc',
    ...(debouncedSearch ? { search: debouncedSearch } : {}),
    ...(filters.governorateId ? { governorateId: filters.governorateId } : {}),
    ...(filters.skillIds && filters.skillIds.length > 0
      ? { skillIds: filters.skillIds }
      : {}),
    ...(filters.availabilityType
      ? { availabilityType: filters.availabilityType }
      : {}),
    ...(filters.workLocationType
      ? { workLocationType: filters.workLocationType }
      : {}),
    ...(filters.experienceMin !== undefined
      ? { experienceMin: filters.experienceMin }
      : {}),
    ...(filters.experienceMax !== undefined
      ? { experienceMax: filters.experienceMax }
      : {}),
  };

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) {
      continue;
    }
    if (Array.isArray(value)) {
      for (const v of value) {
        searchParams.append(key, String(v));
      }
    } else {
      searchParams.append(key, String(value));
    }
  }

  const users = useQuery({
    queryKey: ['/users', query],
    queryFn: () => {
      return ky.get('users', { searchParams }).json<UserListResponse>();
    },
  });

  const totalPages = Math.ceil((users.data?.total ?? 0) / BROWSE_PAGE_SIZE);

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function setFilters(update: Partial<UserListQuery>) {
    setFiltersState((prev) => ({ ...prev, ...update }));
    setPage(1);
  }

  return {
    users,
    search,
    setSearch: handleSearch,
    page,
    setPage,
    totalPages,
    filters,
    setFilters,
  };
}
