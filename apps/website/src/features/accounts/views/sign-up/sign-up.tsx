import { Box, Container, Stack, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { SignUpForm } from '../../components/sign-up-form';

export function SignUp() {
  const t = useTranslations();

  return (
    <Container size="xs" component={Stack} mt="md">
      <Box ta="center">
        <Title order={1}>{t('signUp.pageTitle')}</Title>
        <Text c="dimmed" size="lg">
          {t('signUp.pageDescription')}
        </Text>
      </Box>

      <SignUpForm />
    </Container>
  );
}
