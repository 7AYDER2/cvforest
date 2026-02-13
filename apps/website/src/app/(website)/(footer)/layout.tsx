import { Container, Typography } from '@mantine/core';

export default function FooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container mt="xl" size="lg">
      <Typography>{children}</Typography>
    </Container>
  );
}
