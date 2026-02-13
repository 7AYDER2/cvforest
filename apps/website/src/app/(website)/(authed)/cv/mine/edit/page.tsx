import { redirect } from 'next/navigation';
import type { UserCvsMineResponse } from '@/features/cvs/types';
import { CvMineEdit } from '@/features/cvs/views/cv-mine-edit';
import type { ProfileResponseBody } from '@/features/profile/types';
import { getKy } from '@/server/actions';

export default async function CvMineEditPage() {
  const ky = await getKy();

  const cvPromise = ky.get('cvs/mine').json<UserCvsMineResponse>();
  const profilePromise = ky.get('accounts/profile').json<ProfileResponseBody>();

  const [cv, profile] = await Promise.all([cvPromise, profilePromise]);

  if (!cv) {
    return redirect('/upload-cv');
  }

  return <CvMineEdit cv={cv} profile={profile} />;
}
