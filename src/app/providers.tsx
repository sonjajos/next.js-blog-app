'use client';

import Header from '@/components/header';
import { HeroUIProvider } from '@heroui/react';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <Header />
        {children}
      </HeroUIProvider>
    </SessionProvider>
  );
}
