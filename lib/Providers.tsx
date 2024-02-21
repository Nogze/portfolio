'use client';
import React, { ReactNode } from 'react';

import DisplayQueueProviders from '@/lib/DisplayQueue';

export default function Providers({ children }: { children: ReactNode }) {
  return <DisplayQueueProviders>{children}</DisplayQueueProviders>;
}
