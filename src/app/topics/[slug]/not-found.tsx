import EmptyState from '@/components/empty-state';
import { ChatBubbleBottomCenterIcon, SlashIcon } from '@heroicons/react/24/outline';
import type { JSX } from 'react';

const NotFoundIcon: JSX.Element = (
  <div className='relative'>
    <div className='absolute mt-4 ml-4'>
      <ChatBubbleBottomCenterIcon width={70} />
    </div>
    <SlashIcon width={100} />
  </div>
);

export default async function TopicNotFoundPage() {
  return (
    <div className='flex-1 w-full h-screen flex flex-row items-start justify-between gap-4'>
      <EmptyState
        heading="Sorry but we couldn't find requested resource"
        paragraph="Seems like resource you're looking for doesn't exist or is deleted."
        icon={NotFoundIcon}
        showButton
      />
    </div>
  );
}
