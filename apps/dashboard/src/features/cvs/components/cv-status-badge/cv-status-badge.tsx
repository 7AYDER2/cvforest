import { Badge, type MantineColor } from '@mantine/core';
import type { UserStatus } from '@repo/backend/prisma/enums';
import { useTranslations } from 'next-intl';
import { translateUserStatus } from '@/utils/translation-maps';

export function CvStatusBadge({ status }: { status: UserStatus }) {
  const t = useTranslations();

  const colors: Record<UserStatus, MantineColor> = {
    Pending: 'gray',
    Approved: 'green',
    Rejected: 'red',
  };

  return (
    <Badge color={colors[status]} variant="light" size="sm">
      {translateUserStatus(t, status)}
    </Badge>
  );
}
