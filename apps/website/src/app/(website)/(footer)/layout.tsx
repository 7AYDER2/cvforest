import { Container, Typography } from '@mantine/core';

export default function FooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Typography>{children}</Typography>
    </Container>
  );
}
