import { ShareIcon } from '@heroicons/react/16/solid';

interface ShareProps {
  link: string;
}

export default async function Share(
  {
    // link,
  }: ShareProps,
) {
  return (
    <div className='cursor-pointer hover:text-blue-600 p-2 rounded-[10px] bg-overlay flex flex-row items-center gap-2'>
      <ShareIcon width={16} className='' />
      <div>Share</div>
    </div>
  );
}
