'use client';

import { Avatar } from '@mantine/core';
import { Link } from '@/components/link';
import type { SessionResponseBody } from '@/features/accounts/types';
import { constructImageUrl } from '@/utils/helpers';

interface HeaderUserButtonProps {
  session: SessionResponseBody;
}

export function HeaderUserButton({ session }: HeaderUserButtonProps) {
  return (
    <Link href="/profile">
      <Avatar
        size="md"
        radius="xl"
        name={session.user.name}
        src={constructImageUrl(session.user.avatar?.key)}
      />
    </Link>
  );
}
