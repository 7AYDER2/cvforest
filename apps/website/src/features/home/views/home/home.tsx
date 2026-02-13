import { Container, Stack } from '@mantine/core';
import { CvsSection } from '@/features/home/components/cvs-section';
import { Hero } from '@/features/home/components/hero/hero';

export function Home() {
  return (
    <Stack>
      <Hero />
      <Container size="lg">
        <CvsSection />
      </Container>
    </Stack>
  );
}
