import type { CvsList } from '@/features/cvs/types';
import { Cvs } from '@/features/cvs/views/cvs';
import { getKy } from '@/server/actions';

export default async function CvsPage() {
  const ky = await getKy();

  const initialData = await ky.get('cvs').json<CvsList>();

  return <Cvs initialData={initialData} />;
}
