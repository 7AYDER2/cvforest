import { Anchor, Button, Container, Group } from '@mantine/core';
import { IconLogin, IconUser } from '@tabler/icons-react';
import { getTranslations } from 'next-intl/server';
import cls from './styles.module.css';

export async function Header() {
  const t = await getTranslations();

  return (
    <Container size="lg" strategy="grid" className={cls.header}>
      <Group p="sm" justify="space-between">
        <Anchor fz="h2" fw={600} href="/">
          FindCV
        </Anchor>

        <Group>
          <Button leftSection={<IconUser size={18} />}>
            {t('header.signUp')}
          </Button>

          <Button variant="outline" leftSection={<IconLogin size={18} />}>
            {t('header.signIn')}
          </Button>
        </Group>
      </Group>
    </Container>
  );
}
