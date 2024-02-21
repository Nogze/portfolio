'use client';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useDisplayQueue, useDisplayQueueDispatch } from '@/lib/DisplayQueue';

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  children: string;
  hasFinished?: boolean;
}

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbols = '!@#$%&*_+|:<>?';
const characters = alphabet + symbols;

export default function GlitchyText(props: Props) {
  const text = props.children;

  const [id, setId] = useState<string>('');
  const [glitchyText, setGlitchyText] = useState<string>('');
  const [canDisplay, setCanDisplay] = useState<boolean>(false);

  const displayQueue = useDisplayQueue();
  const displayQueueDispatch = useDisplayQueueDispatch();

  const glitchEffect = async () => {
    for (let i = 0; i < text.length; i++) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          setGlitchyText((w) => {
            let str = text.slice(0, i + 1);

            for (let j = i; j < text.length - 1; j++) {
              if (text[j] === ' ') str += ' ';
              else
                str +=
                  characters[Math.floor(Math.random() * characters.length)];
            }

            return str;
          });

          displayQueueDispatch({ type: 'DECREASE_TOTAL_CHARACTERS' });
          resolve();
        }, 1000 / displayQueue.totalCharacters);
      });
    }
  };

  useEffect(() => {
    setId(uuid());
  }, []);

  useEffect(() => {
    if (id === '') return;
    displayQueueDispatch({ type: 'ADD', payload: { id, text } });
  }, [id]);

  useEffect(() => {
    if (displayQueue.ids[0] === id) setCanDisplay(true);
  }, [displayQueue]);

  useEffect(() => {
    if (!canDisplay) return;

    glitchEffect().then(() => {
      displayQueueDispatch({ type: 'REMOVE', payload: { id } });
    });
  }, [canDisplay]);

  return <p {...props}>{glitchyText}</p>;
}
