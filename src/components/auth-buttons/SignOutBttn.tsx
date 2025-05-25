'use client';

import { Button } from '@heroui/react';

interface SignOutBttnProps {
  className?: string;
  textStyle?: string;
}

export default function SignOutBttn({ className, textStyle }: SignOutBttnProps) {
  return (
    <Button type='submit' className={className ?? 'w-full max-w-80 flex bg-transparent'}>
      <div className={textStyle ?? 'text-blue-500 buttonText'}>Sign out</div>
    </Button>
  );
}
