import React from 'react';

import Terminal from '@/components/Terminal';

export default function Home() {
  return (
    <main className='flex h-screen flex-col gap-2 bg-neutral-900 p-20'>
      <Terminal />
    </main>
  );
}
