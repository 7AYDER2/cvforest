'use client';

import { Button, Divider, Group } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { Link } from '@/components/link';
import type { SessionResponseBody } from '@/features/accounts/types';
import { CvButton } from '../cv-button/cv-button';
import { UserButton } from '../user-button';
import cls from './styles.module.css';

interface DesktopNavProps {
  session: SessionResponseBody | null;
}

export function DesktopNav({ session }: DesktopNavProps) {
  const t = useTranslations();

  return (
    <div className={cls.navbar}>
      <Group>
        <Button href="/courses" variant="subtle" component={Link}>
          {t('header.courses')}
        </Button>

        {session ? (
          <Group gap="xs">
            <CvButton cv={session.user.cv} />

            <Divider orientation="vertical" />

            <UserButton session={session} />
          </Group>
        ) : (
          <>
            <Divider orientation="vertical" />

            <Group gap={4}>
              <Button href="/sign-in" variant="subtle" component={Link}>
                {t('header.signIn')}
              </Button>

              <Button href="/sign-up" variant="filled" component={Link}>
                {t('header.signUp')}
              </Button>
            </Group>
          </>
        )}
      </Group>
    </div>
  );
}
