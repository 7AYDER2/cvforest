import { Group } from '@mantine/core';
import type { TablerIcon } from '@tabler/icons-react';

interface InfoItemProps {
  icon: TablerIcon;
  value: React.ReactNode;
}

export function InfoItem({ icon: Icon, value }: InfoItemProps) {
  return (
    <Group>
      <Icon size={18} color="var(--mantine-primary-color-5)" />

      {value}
    </Group>
  );
}
