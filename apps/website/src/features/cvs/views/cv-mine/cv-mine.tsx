'use client';

import { Button, Stack } from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useCvMine } from '@/features/cvs/hooks/use-cv-mine';
import type { UserDetailResponse } from '@/features/cvs/types';
import { CvDetail } from '@/features/cvs/views/cv-detail';

interface CvMineProps {
  cv: UserDetailResponse;
}

export function CvMine({ cv }: CvMineProps) {
  const t = useTranslations();
  const { data } = useCvMine({ initialData: cv });

  if (!data) {
    return null;
  }

  return (
    <Stack gap="xl" py="xl">
      <Button
        variant="light"
        leftSection={<IconPencil size={18} />}
        component={Link}
        href="/cv/mine/edit"
        style={{ alignSelf: 'flex-end' }}
      >
        {t('cvMine.editCv')}
      </Button>

      <CvDetail id={data.id} initialData={data} />
    </Stack>
  );
}
