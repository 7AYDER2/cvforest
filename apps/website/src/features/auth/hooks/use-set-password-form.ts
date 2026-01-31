import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

export function useSetPasswordForm() {
  const t = useTranslations();

  const schema = z.object({
    password: z.string().min(8, { error: t('auth.passwordMinLength') }),
    confirmPassword: z.string().min(8, { error: t('auth.passwordMinLength') }),
  });

  return useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: zod4Resolver(schema),
  });
}
