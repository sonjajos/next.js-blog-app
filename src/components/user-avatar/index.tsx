'use client';

import { Avatar, Popover, PopoverTrigger, PopoverContent } from '@heroui/react';
import { useSession } from 'next-auth/react';
import SignOutForm from '../auth-buttons/SignOutForm';
import TopicModal from '../topic/topic-modal';
import { useState } from 'react';

export default function UserAvatar() {
  const session = useSession();
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Popover placement='bottom' isOpen={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Avatar
          src={session?.data?.user?.image ?? undefined}
          className='cursor-pointer'
          size='sm'
        />
      </PopoverTrigger>
      <PopoverContent className='bg-overlay'>
        <div className='p-1 bg-overlay border-b-[1px] border-b-overlay lg:hidden'>
          <TopicModal />
        </div>
        <div className='p-1 bg-overlay'>
          <SignOutForm />
        </div>
      </PopoverContent>
    </Popover>
  );
}
