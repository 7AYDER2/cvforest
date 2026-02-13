import { redirect } from 'next/navigation';
import type { UserCvsMineResponse } from '@/features/cvs/types';
import { CvMine } from '@/features/cvs/views/cv-mine';
import { getKy } from '@/server/actions';

export default async function CvMinePage() {
  const ky = await getKy();
  const cv = await ky.get('cvs/mine').json<UserCvsMineResponse>();

  if (!cv) {
    return redirect('/upload-cv');
  }

  return <CvMine cv={cv} />;
}
