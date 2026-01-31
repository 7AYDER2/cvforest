import { useMutation } from '@tanstack/react-query';
import { useKy } from '@/hooks/use-ky';

interface SetupPasswordRequestBody {
  email: string;
  password: string;
}

interface SetupPasswordResponseBody {
  success: boolean;
}

export function useSetupPasswordMut() {
  const ky = useKy();

  return useMutation({
    mutationFn: ({ email, password }: SetupPasswordRequestBody) => {
      const body = { email, password };

      return ky
        .post('accounts/setup-password', { json: body })
        .json<SetupPasswordResponseBody>();
    },
  });
}
