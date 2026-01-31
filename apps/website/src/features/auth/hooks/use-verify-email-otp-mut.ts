import { useMutation } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';

interface VerifyEmailOtpRequestBody {
  email: string;
  otp: string;
}

interface VerifyEmailOtpResponseBody {
  success: boolean;
  userId: string;
  email: string;
}

export function useVerifyEmailOtpMut() {
  const ky = useKy();

  return useMutation({
    mutationFn: ({ email, otp }: VerifyEmailOtpRequestBody) => {
      const body = { email, otp };

      return ky
        .post('accounts/verify-email-otp', { json: body })
        .json<VerifyEmailOtpResponseBody>();
    },
  });
}
