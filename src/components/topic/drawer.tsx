import TopicModal from '@/components/topic/topic-modal';
import { PencilSquareIcon } from '@heroicons/react/16/solid';
import AddPostModal from '../post/add-post-modal';
import WebDrawer from '../web-drawer';

interface TopicDrawerProps {
  slug: string;
  description: string;
  isAdmin?: boolean;
}

export default async function TopicDrawer({
  slug,
  description,
  isAdmin = false,
}: TopicDrawerProps) {
  return (
    <WebDrawer>
      <>
        <div className='flex flex-row gap-4 w-full justify-between items-center'>
          <div className='text-2xl font-bold'>{slug}</div>

          {isAdmin && (
            <TopicModal
              slug={slug}
              defaultValues={{
                title: slug ?? '',
                description: description ?? '',
              }}
              button={
                <div className='cursor-pointer px-2'>
                  <PencilSquareIcon color='white' width={24} />
                </div>
              }
            />
          )}
        </div>
        <p>{description}</p>
        <AddPostModal slug={slug} />
      </>
    </WebDrawer>
  );
}
