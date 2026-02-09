import { UploadCv } from '@/features/cvs/views/upload-cv';
import type { ProfileResponseBody } from '@/features/profile/types';
import { getKy } from '@/server/actions';

export default async function UploadCvPage() {
  const ky = await getKy();
  const profile = await ky.get('accounts/profile').json<ProfileResponseBody>();

  return <UploadCv profile={profile} />;
}
