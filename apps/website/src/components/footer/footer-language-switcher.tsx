'use client';

import { Anchor, Group } from '@mantine/core';
import { useLocale } from 'next-intl';
import { useSetLocale } from '@/hooks/use-set-locale';
import { SUPPORTED_LOCALES } from '@/i18n/locales';
import cls from './styles.module.css';

export function FooterLanguageSwitcher() {
  const locale = useLocale();
  const setLocaleMut = useSetLocale();

  return (
    <Group gap="xs">
      {SUPPORTED_LOCALES.filter(({ code }) => code !== locale).map(
        ({ code, label }) => {
          const isActive = locale === code;
          return (
            <Anchor
              key={code}
              size="xs"
              c="gray"
              aria-label={label}
              className={cls.languageOption}
              variant={isActive ? 'filled' : 'subtle'}
              onClick={() => setLocaleMut.mutate(code)}
              aria-current={isActive ? 'true' : undefined}
            >
              {label}
            </Anchor>
          );
        },
      )}
    </Group>
  );
}
