'use client';

import { Anchor, Box, Container, Group } from '@mantine/core';
import { Link } from '@/components/link';
import type { SessionResponseBody } from '@/features/accounts/types';
import { DesktopNav } from './desktop-nav';
import { MobileNav } from './mobile-nav';
import cls from './styles.module.css';

interface HeaderProps {
  session: SessionResponseBody | null;
}

export function Header({ session }: HeaderProps) {
  return (
    <Container size="lg" strategy="grid" className={cls.header}>
      <Group p="sm" justify="space-between" wrap="nowrap">
        <Anchor
          underline="never"
          fz="h2"
          fw={600}
          href="/"
          component={Link}
          className={cls.logo}
        >
          CV Forest
        </Anchor>

        <Box visibleFrom="sm">
          <DesktopNav session={session} />
        </Box>

        <Box hiddenFrom="sm">
          <MobileNav session={session} />
        </Box>
      </Group>
    </Container>
  );
}
