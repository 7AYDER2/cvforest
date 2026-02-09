'use client';

import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { IconKey, IconLogin, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useSignInForm } from '../../hooks/use-sign-in-form';
import { useSignInMut } from '../../hooks/use-sign-in-mut';

export function SignInForm() {
  const t = useTranslations();
  const form = useSignInForm();
  const signInMut = useSignInMut();

  const handleSubmit = form.onSubmit(({ email, password }) => {
    signInMut.mutate({ email, password });
  });

  return (
    <form onSubmit={handleSubmit}>
      <Paper withBorder p="sm">
        <Stack gap="md">
          <TextInput
            required
            autoCapitalize="off"
            label={t('signIn.email')}
            description={t('signIn.emailDescription')}
            leftSection={<IconUser size={18} />}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            required
            label={t('signIn.password')}
            description={t('signIn.passwordDescription')}
            leftSection={<IconKey size={18} />}
            {...form.getInputProps('password')}
          />

          <Button
            mt="sm"
            fullWidth
            type="submit"
            loading={signInMut.isPending}
            leftSection={<IconLogin size={18} />}
          >
            {t('signIn.signIn')}
          </Button>
        </Stack>

        <Text ta="center" c="dimmed" size="sm" mt="md">
          {t('signIn.dontHaveAccount')}{' '}
          <Anchor href="/sign-up" component={Link} c="blue" fw={500}>
            {t('signIn.signUp')}
          </Anchor>
        </Text>
      </Paper>
    </form>
  );
}
