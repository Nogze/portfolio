import React from 'react';

import Prompt from '@/components/Prompt';
import GlitchyText from '@/components/GlitchyText';

type Props = {
  entry: string;
};

export default function Entry({ entry }: Props) {
  if (entry === null) return <span className='flex h-9' />;
  else if (entry.startsWith('$'))
    return (
      <div className='flex gap-2'>
        <Prompt />
        <p>{entry.slice(1)}</p>
      </div>
    );
  return <GlitchyText>{entry}</GlitchyText>;
}
