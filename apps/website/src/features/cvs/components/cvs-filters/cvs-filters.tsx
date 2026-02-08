'use client';

import {
  MultiSelect,
  NumberInput,
  Select,
  SimpleGrid,
  Stack,
} from '@mantine/core';
import {
  AvailabilityType,
  Currency,
  WorkLocationType,
} from '@repo/backend/prisma/enums';
import {
  IconBriefcase,
  IconBuilding,
  IconCurrencyDollar,
  IconMapPin,
  IconTools,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useGovernoratesQuery } from '@/features/cvs/hooks/use-governorates-query';
import { useSkillsQuery } from '@/features/cvs/hooks/use-skills-query';
import type { CvListQuery } from '@/features/home/types';
import {
  translateAvailabilityType,
  translateCurrency,
  translateWorkLocationType,
} from '@/utils/translation-maps';

interface CvsFiltersProps {
  filters: Partial<CvListQuery>;
  setFilters: (update: Partial<CvListQuery>) => void;
}

export function CvsFilters({ filters, setFilters }: CvsFiltersProps) {
  const t = useTranslations();
  const skillsQuery = useSkillsQuery();
  const governoratesQuery = useGovernoratesQuery();

  const governorateOptions =
    governoratesQuery.data?.map((gov) => ({
      label: gov.name,
      value: gov.id,
    })) ?? [];

  const skillOptions =
    skillsQuery.data?.map((skill) => ({
      label: skill.name,
      value: skill.id,
    })) ?? [];

  const availabilityOptions = Object.values(AvailabilityType).map((value) => ({
    label: translateAvailabilityType(t, value),
    value,
  }));

  const workLocationOptions = Object.values(WorkLocationType).map((value) => ({
    label: translateWorkLocationType(t, value),
    value,
  }));

  const currencyOptions = Object.values(Currency).map((value) => ({
    label: translateCurrency(t, value),
    value,
  }));

  return (
    <Stack>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
        <Select
          clearable
          searchable
          placeholder={t('browse.governoratePlaceholder')}
          data={governorateOptions}
          value={filters.governorateId}
          leftSection={<IconMapPin size={18} />}
          disabled={governoratesQuery.isLoading}
          onChange={(value) =>
            setFilters({ governorateId: value ?? undefined })
          }
        />

        <Select
          clearable
          placeholder={t('browse.availabilityPlaceholder')}
          leftSection={<IconBriefcase size={18} />}
          data={availabilityOptions}
          value={filters.availabilityType}
          onChange={(value) => {
            setFilters({
              availabilityType: (value ?? undefined) as AvailabilityType,
            });
          }}
        />

        <Select
          clearable
          placeholder={t('browse.workLocationPlaceholder')}
          leftSection={<IconBuilding size={18} />}
          data={workLocationOptions}
          value={filters.workLocationType}
          onChange={(value) => {
            setFilters({
              workLocationType: (value ?? undefined) as WorkLocationType,
            });
          }}
        />

        <Select
          clearable
          placeholder={t('browse.currencyPlaceholder')}
          leftSection={<IconCurrencyDollar size={18} />}
          data={currencyOptions}
          value={filters.salaryCurrency}
          onChange={(value) => {
            setFilters({
              salaryCurrency: (value ?? undefined) as Currency,
            });
          }}
        />

        <NumberInput
          placeholder={t('browse.experienceMin')}
          min={0}
          value={filters.experienceMin ?? ''}
          onChange={(value) =>
            setFilters({
              experienceMin: value === '' ? undefined : Number(value),
            })
          }
        />

        <NumberInput
          placeholder={t('browse.experienceMax')}
          min={0}
          value={filters.experienceMax ?? ''}
          onChange={(value) =>
            setFilters({
              experienceMax: value === '' ? undefined : Number(value),
            })
          }
        />
      </SimpleGrid>

      <MultiSelect
        clearable
        searchable
        data={skillOptions}
        label={t('cvs.skills')}
        placeholder={t('cvs.skillsPlaceholder')}
        disabled={skillsQuery.isLoading}
        leftSection={<IconTools size={18} />}
        onChange={(value) => setFilters({ skillIds: value })}
        value={
          Array.isArray(filters.skillIds)
            ? filters.skillIds
            : filters.skillIds
              ? [filters.skillIds]
              : undefined
        }
      />
    </Stack>
  );
}
