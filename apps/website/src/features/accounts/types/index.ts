import type { GetRequestBody } from '@/types/server/helpers';

export type LoginRequestBody = GetRequestBody<'/user/accounts/login', 'post'>;

export type VerifyEmailOtpRequestBody = GetRequestBody<
  '/user/accounts/verify-email-otp',
  'post'
>;
