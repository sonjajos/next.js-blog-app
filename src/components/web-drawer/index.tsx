import type { JSX } from 'react';

interface WebDrawerProps {
  children: JSX.Element;
}

export default async function WebDrawer({ children }: WebDrawerProps) {
  return (
    <>
      <div className='w-[400px] right-0 mr-[-80px] top-0 h-[200px] hidden md:flex' />
      <div className='flex flex-0 h-auto flex-col items-start justify-start gap-4 w-[400px] p-8 border-l-1 border-l-overlay h-full max-h-full fixed right-0 top-0 pt-[84px] overflow-scroll hidden md:flex'>
        {children}
      </div>
    </>
  );
}
