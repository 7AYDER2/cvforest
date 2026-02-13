'use client';

import { Button, Stack } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { UploadCvForm } from '@/features/cvs/components/upload-cv-form';
import { useCvMine } from '@/features/cvs/hooks/use-cv-mine';
import type { UserDetailResponse } from '@/features/cvs/types';
import type { ProfileResponseBody } from '@/features/profile/types';

interface CvMineEditProps {
  cv: UserDetailResponse;
  profile: ProfileResponseBody;
}

export function CvMineEdit({ cv, profile }: CvMineEditProps) {
  const t = useTranslations();
  const router = useRouter();
  const { data } = useCvMine({ initialData: cv });

  if (!data) {
    return null;
  }

  return (
    <Stack gap="xl" py="xl">
      <UploadCvForm
        profile={profile}
        cv={data}
        onUpdateSuccess={() => router.push('/cv/mine')}
      />

      <Button variant="default" component={Link} href="/cv/mine">
        {t('cvMine.cancel')}
      </Button>
    </Stack>
  );
}
