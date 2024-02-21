'use client';
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import anime from 'animejs';

import Prompt from '@/components/Prompt';

interface Props extends HTMLAttributes<HTMLInputElement> {
  value: string;
}

export default function Input(props: Props) {
  const [caretOffset, setCaretOffset] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  const movecaret = () => {
    anime({
      targets: caretRef?.current,
      left: Math.min(caretOffset * 10, inputRef.current.clientWidth),
    });
  };

  useEffect(() => {
    window.addEventListener('keydown', () => {
      inputRef.current?.focus();
    });

    return () => {
      window.removeEventListener('keydown', () => {
        inputRef.current?.focus();
      });
    };
  }, []);

  useEffect(() => {
    movecaret();
  }, [caretOffset, caretRef]);

  return (
    <div className='relative flex gap-2'>
      <Prompt />
      <div className='relative flex w-full'>
        <input
          {...props}
          ref={inputRef}
          onSelect={() => setCaretOffset(inputRef.current.selectionStart)}
          className='mr-4 w-full resize-none bg-transparent caret-transparent focus:outline-none focus:ring-0'
        />
        <span
          ref={caretRef}
          className='absolute -bottom-0.5 h-[2px] w-2.5 animate-pulse bg-red-500'
        />
      </div>
    </div>
  );
}
