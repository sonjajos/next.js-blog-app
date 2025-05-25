import { HeroAvatar } from '../hero-components';
import type { Post } from '@prisma/client';
import Link from 'next/link';
import paths from '@/paths';
import Reply from '../interactions/reply';
import Share from '../interactions/share';

interface PostDisplayProps {
  slug: string;
  post: Post & {
    user: {
      id: string | null;
      name: string | null;
      image: string | null;
    };
  };
  isDisabled?: boolean;
  commentsCount: number;
}

export default async function PostDisplay({
  post,
  slug,
  isDisabled = false,
  commentsCount = 0,
}: PostDisplayProps) {
  return (
    <div key={post.id} className='flex flex-col gap-4 pb-6 border-b-[1px] border-overlay'>
      <div className='flex flex-row gap-4'>
        <HeroAvatar src={post?.user?.image ?? ''} size='sm' />
        <div>
          <Link href={paths.topic(slug)}>
            <div className='font-bold text-textColor text-xs'>{slug}</div>
          </Link>
          <div className='flex flex-row gap-4'>
            <div className='text-textColor text-xs opacity-80'>{post?.user?.name}</div>
            <div className='text-textColor text-xs opacity-60'>
              {Intl.DateTimeFormat('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(post.createdAt)}
            </div>
          </div>
        </div>
      </div>
      <Link
        href={paths.post(slug, post.id)}
        tabIndex={isDisabled ? -1 : undefined}
        className={`flex flex-col gap-4 ${!isDisabled ? 'hover:bg-hover' : 'pointer-events-none'}`}
      >
        <div className='text-3xl font-bold'>{post.title}</div>
        <p>{post.content}</p>
      </Link>

      <div className='flex flex-row gap-4'>
        <Reply count={commentsCount} />
        <Share link='' />
      </div>
    </div>
  );
}
