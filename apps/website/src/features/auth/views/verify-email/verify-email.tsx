'use client';

import { Container, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { SetPasswordForm } from '@/features/auth/components/set-password-form';
import { VerifyEmailOtpForm } from '@/features/auth/components/verify-email-otp-form';
import { useVerifyEmailOtpMut } from '@/features/auth/hooks/use-verify-email-otp-mut';

interface VerifyEmailProps {
  email: string;
}

export function VerifyEmail({ email }: VerifyEmailProps) {
  const t = useTranslations();
  const verifyOtpMut = useVerifyEmailOtpMut();
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleVerifyOtp = async (otp: string) => {
    setErrorMessage(undefined);
    try {
      await verifyOtpMut.mutateAsync({ email, otp });
      setIsVerified(true);
    } catch {
      setErrorMessage(t('auth.invalidCode'));
    }
  };

  if (!email) {
    return (
      <Container size="xs" py={60}>
        <Text>{t('auth.invalidEmail')}</Text>
      </Container>
    );
  }

  if (isVerified) {
    return <SetPasswordForm email={email} />;
  }

  return (
    <Container size="xs" py={60}>
      <VerifyEmailOtpForm
        email={email}
        onVerify={handleVerifyOtp}
        isVerifying={verifyOtpMut.isPending}
        errorMessage={errorMessage}
      />
    </Container>
  );
}
