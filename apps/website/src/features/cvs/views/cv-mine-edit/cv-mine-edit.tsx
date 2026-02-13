'use client';

import { useRouter } from 'next/navigation';
import { UploadCvForm } from '@/features/cvs/components/upload-cv-form';
import { useCvMine } from '@/features/cvs/hooks/use-cv-mine';
import type { UserDetailResponse } from '@/features/cvs/types';
import type { ProfileResponseBody } from '@/features/profile/types';

interface CvMineEditProps {
  cv: UserDetailResponse;
  profile: ProfileResponseBody;
}

export function CvMineEdit({ cv, profile }: CvMineEditProps) {
  const router = useRouter();
  const { data } = useCvMine({ initialData: cv });

  if (!data) {
    return null;
  }

  return (
    <UploadCvForm
      profile={profile}
      cv={data}
      onUpdateSuccess={() => router.push('/cv/mine')}
    />
  );
}
