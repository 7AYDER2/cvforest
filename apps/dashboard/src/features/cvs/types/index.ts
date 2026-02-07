import type { GetRequestQuery, GetResponseBody } from '@/types/server/helpers';

export type CvsList = GetResponseBody<'/admin/cvs/', 'get'>;
export type CvsListQuery = GetRequestQuery<'/admin/cvs/', 'get'>;
export type Cv = CvsList['data'][number];
export type CvApproveResponse = GetResponseBody<
  '/admin/cvs/{id}/approve',
  'patch'
>;
export type CvRejectResponse = GetResponseBody<
  '/admin/cvs/{id}/reject',
  'patch'
>;
