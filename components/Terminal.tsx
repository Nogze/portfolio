'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';

import Input from '@/components/Input';
import Entry from '@/components/Entry';

type Props = {};

const commands = [
  { name: 'about' },
  { name: 'projects' },
  { name: 'experiences' },
  { name: 'contact' },
];

const initialEntries = [
  'Welcome to my portfolio.',
  null,
  'You can select a menu by typing the its name.',
  'Here are the available menus:',
  ...commands.map((c) => `• ${c.name}`),
  null,
];

export default function Terminal({}: Props) {
  const [cmd, setCmd] = useState<string>('');
  const [entries, setEntries] = useState<string[]>(initialEntries);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCmd('');
    setEntries((e) => [...e, `$${cmd}`]);

    switch (cmd) {
      case 'about':
        const about = await import('@/resources/about.json');

        setEntries((e) => [...e, ...about.default, null]);
        break;
      case 'projects':
        console.log('projects');
        break;
      case 'experiences':
        console.log('experiences');
        break;
      case 'contact':
        console.log('contact');
        break;
      case 'clear':
        setEntries(initialEntries);
      default:
        console.log('Command not found');
    }
  };

  return (
    <div className='h-full overflow-y-auto overflow-x-clip'>
      {entries.map((e, i) => (
        <Entry key={i} entry={e} />
      ))}

      <form ref={formRef} onSubmit={handleSubmit}>
        <Input
          onChange={(e) => setCmd((e.target as HTMLInputElement).value)}
          value={cmd}
        />
      </form>
    </div>
  );
}
