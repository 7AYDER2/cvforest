import { Container } from '@mantine/core';

interface CvsLayoutProps {
  children: React.ReactNode;
}

export default function CvsLayout({ children }: CvsLayoutProps) {
  return (
    <Container mt="xl" size="lg">
      {children}
    </Container>
  );
}
