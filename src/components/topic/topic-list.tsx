import { db } from '@/db';
import paths from '@/paths';
import Link from 'next/link';

export default async function TopicList() {
  const topics = await db.topic.findMany({
    take: 9,
  });

  return !!topics?.length ? (
    <>
      <h1>Hot Topics</h1>
      <div className='paragraph text-white/60'>
        {
          "Discover what's trending and join the conversation on the most popular topics across our community. From hot debates to emerging ideas, there's always something new to explore and discuss. Stay informed, get inspired, and share your thoughts!"
        }
      </div>
      <div className='flex flex-row flex-wrap items-start justify-start gap-4 w-full'>
        {topics.map((topic) => {
          return (
            <Link href={paths.topic(topic.slug)} key={`${topic.id}${topic.slug}`}>
              <div className='py-3 px-4 border-[1px] rounded-[50px] border-orange-600 border-[1px] bg-orange-600/15 text-orange-600 text-s'>
                {topic.slug}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  ) : null;
}
