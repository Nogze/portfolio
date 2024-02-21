import React from 'react';
import { JetBrains_Mono } from 'next/font/google';
import Providers from '@/lib/Providers';

import type { Metadata } from 'next';

import './globals.css';

const jetbrains_mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Hugo Dufor',
  description: 'My portfolio website.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Providers>
        <body className={jetbrains_mono.className}>{children}</body>
      </Providers>
    </html>
  );
}
