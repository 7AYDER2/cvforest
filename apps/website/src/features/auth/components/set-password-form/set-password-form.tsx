'use client';

import {
  Button,
  Container,
  PasswordInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useSetPasswordForm } from '@/features/auth/hooks/use-set-password-form';
import { useSetupPasswordMut } from '@/features/auth/hooks/use-setup-password-mut';

interface SetPasswordFormProps {
  email: string;
}

export function SetPasswordForm({ email }: SetPasswordFormProps) {
  const t = useTranslations();
  const setupPasswordMut = useSetupPasswordMut();
  const form = useSetPasswordForm();

  const handleSubmit = form.onSubmit(async ({ password }) => {
    await setupPasswordMut.mutateAsync({ email, password });
  });

  return (
    <Container size="xs" py={60}>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Title>{t('auth.setPassword')}</Title>
          <Text>{t('auth.emailVerified')}</Text>

          <PasswordInput
            label={t('auth.passwordPlaceholder')}
            placeholder={t('auth.passwordPlaceholder')}
            required
            {...form.getInputProps('password')}
          />

          <PasswordInput
            label={t('auth.confirmPassword')}
            placeholder={t('auth.confirmPassword')}
            required
            {...form.getInputProps('confirmPassword')}
          />

          <Button type="submit" loading={setupPasswordMut.isPending}>
            {t('auth.setPassword')}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
