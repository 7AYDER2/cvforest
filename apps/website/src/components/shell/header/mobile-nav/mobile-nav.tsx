'use client';

import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslations } from 'next-intl';
import { Link } from '@/components/link';
import type { SessionResponseBody } from '@/features/accounts/types';
import { CvButton } from '../cv-button/cv-button';
import { UserButton } from '../user-button';
import cls from './styles.module.css';

interface MobileNavProps {
  session: SessionResponseBody | null;
}

export function MobileNav({ session }: MobileNavProps) {
  const t = useTranslations();
  const [opened, { close, toggle }] = useDisclosure(false);

  return (
    <div className={cls.navbar}>
      <Group gap="sm">
        {session && (
          <Box className={cls.cv}>
            <CvButton cv={session.user.cv} />
          </Box>
        )}
        <Burger
          opened={opened}
          onClick={toggle}
          aria-label={t('header.menu')}
          size="sm"
        />
      </Group>

      <Drawer
        opened={opened}
        onClose={close}
        title={t('header.menu')}
        position="right"
        classNames={{ header: cls.drawerHeader }}
      >
        <Stack gap="md">
          <Button
            href="/courses"
            variant="subtle"
            component={Link}
            fullWidth
            justify="flex-start"
            size="md"
            onClick={close}
          >
            {t('header.courses')}
          </Button>

          {session ? (
            <>
              <Box onClick={close}>
                <CvButton cv={session.user.cv} />
              </Box>

              <Divider />

              <Box onClick={close}>
                <UserButton session={session} />
              </Box>
            </>
          ) : (
            <>
              <Divider />

              <Stack gap="xs">
                <Button
                  href="/sign-in"
                  variant="subtle"
                  component={Link}
                  fullWidth
                  onClick={close}
                >
                  {t('header.signIn')}
                </Button>

                <Button
                  href="/sign-up"
                  variant="filled"
                  component={Link}
                  fullWidth
                  onClick={close}
                >
                  {t('header.signUp')}
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Drawer>
    </div>
  );
}
