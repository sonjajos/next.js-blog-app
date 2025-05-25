'use client';

import { Input } from '@heroui/react';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/16/solid';

export default function SearchInput() {
  return (
    <Input
      isClearable
      classNames={{
        label: 'text-black/50 dark:text-white/90',
        input: [
          'bg-transparent',
          'text-black/90 dark:text-white/90',
          'placeholder:text-default-700/50 dark:placeholder:text-white/60',
          'flex-1',
        ],
        innerWrapper: 'bg-transparent',
        inputWrapper: [
          'shadow-xl',
          'bg-overlay',
          'backdrop-blur-xl',
          'backdrop-saturate-200',
          'hover:bg-overlay',
          'dark:hover:bg-overlay',
          'group-data-[focus=true]:bg-default-200/50',
          'dark:group-data-[focus=true]:bg-default/60',
          '!cursor-text',
        ],
      }}
      placeholder='Search posts...'
      radius='lg'
      startContent={
        <MagnifyingGlassCircleIcon className='text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 w-6 h-6' />
      }
    />
  );
}
