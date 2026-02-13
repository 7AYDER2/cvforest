'use client';

import { Button, Paper, Select, Stack, TextInput, Title } from '@mantine/core';
import {
  IconAB,
  IconAt,
  IconCheck,
  IconMapPin,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { PhoneNumberInput } from '@/components/phone-number-input';
import { useGovernoratesQuery } from '@/features/cvs/hooks/use-governorates-query';
import { useProfileForm } from '@/features/profile/hooks/use-profile-form';
import { useProfileUpdate } from '@/features/profile/hooks/use-profile-update';
import type { ProfileResponseBody } from '@/features/profile/types';

export function ProfileForm({ profile }: { profile: ProfileResponseBody }) {
  const t = useTranslations();
  const form = useProfileForm({ profile });
  const updateProfileMut = useProfileUpdate();

  const governoratesQuery = useGovernoratesQuery();
  const governorateOptions =
    governoratesQuery.data?.map((gov) => ({
      label: gov.name,
      value: gov.id,
    })) ?? [];

  const handleSubmit = form.onSubmit(async (data) => {
    await updateProfileMut.mutateAsync(data);
  });

  return (
    <div>
      <Paper withBorder p="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <Title order={3}>{t('profiles.updateProfile')}</Title>

            <TextInput
              label={t('profiles.name')}
              leftSection={<IconUser size={18} />}
              {...form.getInputProps('name')}
            />

            <TextInput
              disabled
              label={t('profiles.email')}
              leftSection={<IconAt size={18} />}
              {...form.getInputProps('email')}
            />

            <PhoneNumberInput
              disabled
              label={t('profiles.phone')}
              placeholder="+964 770 333 4444"
              leftSection={<IconPhone size={18} />}
              {...form.getInputProps('phoneNumber')}
            />

            <Select
              label={t('profiles.gender')}
              allowDeselect={false}
              leftSection={<IconAB size={18} />}
              {...form.getInputProps('gender')}
              data={[
                { label: t('profiles.male'), value: 'Male' },
                { label: t('profiles.female'), value: 'Female' },
              ]}
            />

            <Select
              label={t('users.governorate')}
              allowDeselect
              searchable
              placeholder={t('browse.governoratePlaceholder')}
              leftSection={<IconMapPin size={18} />}
              data={governorateOptions}
              disabled={governoratesQuery.isLoading}
              {...form.getInputProps('governorateId')}
            />

            <Button
              type="submit"
              loading={form.submitting}
              leftSection={<IconCheck />}
            >
              {t('_.save')}
            </Button>
          </Stack>
        </form>
      </Paper>
    </div>
  );
}
