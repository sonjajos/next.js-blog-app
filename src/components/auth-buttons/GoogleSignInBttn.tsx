'use client';

import { Button } from '@heroui/react';

export default function GoogleSignInBttn() {
  return (
    <Button type='submit' className='w-full max-w-80 flex bg-overlay'>
      <div className='buttonText'>Sign in with Google</div>
    </Button>
  );
}
