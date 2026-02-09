'use client';

import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { Gender } from '@repo/backend/prisma/enums';
import {
  IconAt,
  IconCheck,
  IconLock,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { PhoneNumberInput } from '@/components/phone-number-input';
import { useSignUpForm } from '@/features/accounts/hooks/use-sign-up-form';
import { useSignUpMut } from '@/features/accounts/hooks/use-sign-up-mut';

export function SignUpForm() {
  const form = useSignUpForm();
  const t = useTranslations();
  const signUpMut = useSignUpMut();

  const handleSubmit = form.onSubmit(async (data) => {
    await signUpMut.mutateAsync(data);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Paper withBorder p="sm">
        <Stack gap="md">
          <TextInput
            required
            label={t('signUp.name')}
            description={t('signUp.nameDescription')}
            leftSection={<IconUser size={18} />}
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <TextInput
            required
            type="email"
            label={t('signUp.email')}
            description={t('signUp.emailDescription')}
            leftSection={<IconAt size={18} />}
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <PhoneNumberInput
            label={t('signUp.phoneNumber')}
            description={t('signUp.phoneNumberDescription')}
            leftSection={<IconPhone size={18} />}
            key={form.key('phoneNumber')}
            {...form.getInputProps('phoneNumber')}
          />

          <PasswordInput
            required
            label={t('signUp.password')}
            description={t('signUp.passwordDescription')}
            leftSection={<IconLock size={18} />}
            key={form.key('password')}
            {...form.getInputProps('password')}
          />

          <PasswordInput
            required
            label={t('signUp.confirmPassword')}
            description={t('signUp.confirmPasswordDescription')}
            leftSection={<IconLock size={18} />}
            key={form.key('confirmPassword')}
            {...form.getInputProps('confirmPassword')}
          />

          <Select
            clearable
            label={t('signUp.gender')}
            description={t('signUp.genderDescription')}
            leftSection={<IconUser size={18} />}
            data={[
              { label: t('gender.male'), value: Gender.Male },
              { label: t('gender.female'), value: Gender.Female },
            ]}
            key={form.key('gender')}
            {...form.getInputProps('gender')}
          />

          <Button
            type="submit"
            leftSection={<IconCheck size={20} />}
            loading={signUpMut.isPending}
          >
            {t('signUp.submitButton')}
          </Button>
        </Stack>

        <Text ta="center" c="dimmed" size="sm" mt="md">
          {t('signUp.alreadyHaveAccount')}{' '}
          <Anchor href="/sign-in" component={Link} c="blue" fw={500}>
            {t('signUp.signIn')}
          </Anchor>
        </Text>
      </Paper>
    </form>
  );
}
