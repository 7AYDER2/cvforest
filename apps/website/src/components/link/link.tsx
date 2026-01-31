'use client';

import NextLink from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

export function Link(props: ComponentPropsWithoutRef<typeof NextLink>) {
  return <NextLink {...props} />;
}
